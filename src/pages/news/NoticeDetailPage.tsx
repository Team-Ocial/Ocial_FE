import { css } from '@emotion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { useNoticeDetail } from '@/hooks/useNotices';
import { formatDate } from '@/utils/formatDate';
import { useIsAdmin } from '@/utils/auth';
import { useModalStore } from '@/store/useModalStore';
import { useToast } from '@/hooks/useToast';
import { MdPerson, MdAccessTime, MdEdit, MdDelete } from 'react-icons/md';
import NotFoundPage from '@/pages/error/NotFoundPage';
import { useEffect } from 'react';

const NoticeDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { notice, isLoading, error, isNotFound, deleteNotice } = useNoticeDetail(id || '');
  const isAdmin = useIsAdmin();
  const { openModal } = useModalStore();
  const { success, error: showError } = useToast();

  // id가 없는 경우 목록으로 리다이렉트
  useEffect(() => {
    if (!id) {
      navigate('/news/notice', { replace: true });
    }
  }, [id, navigate]);

  const handleDelete = () => {
    openModal({
      type: 'warning',
      title: '공지사항 삭제',
      desc: '정말로 이 공지사항을 삭제하시겠습니까?\n삭제된 공지사항은 복구할 수 없습니다.',
      actionButton: '삭제하기',
      onAction: async () => {
        try {
          const result = await deleteNotice();
          if (result) {
            success('공지사항이 삭제되었습니다.');
            navigate('/news/notice');
          } else {
            showError('공지사항 삭제에 실패했습니다.');
          }
        } catch (err) {
          showError('공지사항 삭제 중 오류가 발생했습니다.');
        }
      },
    });
  };

  const handleEdit = () => {
    navigate(`/news/notice/edit/${id}`);
  };

  // id가 없는 경우 (리다이렉트 중이므로 아무것도 렌더링하지 않음)
  if (!id) {
    return null;
  }

  if (isLoading) {
    return (
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <div css={messageStyle}>로딩 중...</div>
        </div>
      </div>
    );
  }

  // 404 에러 또는 공지사항이 없는 경우
  if (isNotFound || !notice) {
    return (
      <NotFoundPage
        title="공지사항을 찾을 수 없습니다"
        description="요청하신 공지사항이 삭제되었거나 존재하지 않습니다."
        backTo="/news/notice"
        backText="공지사항 목록으로"
      />
    );
  }

  // 일반 에러 (404가 아닌 경우)
  if (error) {
    return (
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <div css={messageStyle}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <div css={detailContainer}>
          {/* 제목 */}
          <h1 css={titleStyle}>{notice.title}</h1>

          {/* 메타 정보 */}
          <div css={metaInfoWrapperStyle}>
            <div css={metaInfoStyle}>
              <div css={metaItemStyle}>
                <MdPerson size={18} css={metaIconStyle} />
                <span css={metaLabelStyle}>작성자</span>
                <span css={metaValueStyle}>{notice.author}</span>
              </div>
              <div css={metaItemStyle}>
                <MdAccessTime size={18} css={metaIconStyle} />
                <span css={metaLabelStyle}>작성일</span>
                <span css={metaValueStyle}>{formatDate(notice.createdAt)}</span>
              </div>
              {notice.updatedAt && notice.updatedAt !== notice.createdAt && (
                <div css={metaItemStyle}>
                  <MdAccessTime size={18} css={metaIconStyle} />
                  <span css={metaLabelStyle}>수정일</span>
                  <span css={metaValueStyle}>{formatDate(notice.updatedAt)}</span>
                </div>
              )}
            </div>
            {isAdmin && (
              <div css={actionButtonsStyle}>
                <button css={iconButtonStyle} onClick={handleEdit} title='수정하기'>
                  <MdEdit size={20} />
                </button>
                <button css={iconButtonDeleteStyle} onClick={handleDelete} title='삭제하기'>
                  <MdDelete size={20} />
                </button>
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div css={dividerStyle} />

          {/* 본문 내용 */}
          <div css={contentStyle}>
            {notice.content.split('\n\n').map((paragraph, index) => (
              <p key={index} css={paragraphStyle}>
                {paragraph.split('\n').map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line}
                    {lineIndex < paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {/* 목록으로 버튼 */}
          <div css={buttonContainerStyle}>
            <button css={backButtonStyle} onClick={() => navigate('/news/notice')}>
              목록으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;

// Styles
const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
`;

const messageStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.grayscale[400]};
  text-align: center;
  padding: 120px 0;
`;

const detailContainer = css`
  margin-top: 80px;
  padding-bottom: 80px;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge2};
  color: ${theme.colors.grayscale[900]};
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.4;
`;

const metaInfoWrapperStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
`;

const metaInfoStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  flex: 1;
`;

const metaItemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const metaIconStyle = css`
  color: ${theme.colors.grayscale[400]};
  flex-shrink: 0;
`;

const metaLabelStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[500]};
`;

const metaValueStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
  font-weight: 500;
`;

const dividerStyle = css`
  width: 100%;
  height: 1px;
  background-color: ${theme.colors.grayscale[200]};
  margin-bottom: 40px;
`;

const contentStyle = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[700]};
  line-height: 1.8;
  min-height: 200px;
  white-space: pre-wrap;
`;

const paragraphStyle = css`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const actionButtonsStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const iconButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.primary[600]};
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.primary[600]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.primary[600]};
    color: ${theme.colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const iconButtonDeleteStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.secondary[200]};
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.secondary[200]};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.secondary[200]};
    color: ${theme.colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const buttonContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;

const backButtonStyle = css`
  ${theme.typography.labelLarge};
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  background-color: ${theme.colors.grayscale[900]};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.grayscale[700]};
  }
`;
