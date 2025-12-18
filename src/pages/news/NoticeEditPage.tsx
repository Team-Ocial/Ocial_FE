import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { useParams, useNavigate } from 'react-router-dom';
import { useNoticeDetail } from '@/hooks/useNotices';
import { useState, useEffect } from 'react';
import { Notice } from '@/types/notice.types';
import { useToast } from '@/hooks/useToast';
import { NOTICE_LIST } from '@/mocks/data/noticeData';

const NoticeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notice: initialNotice, isLoading, error } = useNoticeDetail(id || '');
  const [notice, setNotice] = useState<Notice | null>(null);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (initialNotice) {
      setNotice(initialNotice);
    }
  }, [initialNotice]);

  if (isLoading) {
    return (
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <div css={messageStyle}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <div css={messageStyle}>{error}</div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div css={pageContainer}>
        <div css={contentWrapper}>
          <div css={messageStyle}>공지사항을 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 연동
      // await updateNotice(id, notice);

      // Mock 데이터 업데이트
      const index = NOTICE_LIST.findIndex((n) => n.id === id);
      if (index !== -1) {
        NOTICE_LIST[index] = {
          ...notice,
          updatedAt: new Date().toISOString(),
        };
      }

      success('공지사항이 수정되었습니다.');
      navigate(`/news/notice/${id}`);
    } catch (error) {
      showError('공지사항 수정에 실패했습니다.');
      console.error('Failed to update notice:', error);
    }
  };

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <form onSubmit={handleSubmit} css={formContainer}>
          <h1 css={titleStyle}>공지사항 수정</h1>

          {/* 제목 */}
          <div css={fieldGroupStyle}>
            <label htmlFor='title' css={labelStyle}>
              제목
            </label>
            <input
              id='title'
              type='text'
              value={notice.title}
              onChange={(e) => setNotice({ ...notice, title: e.target.value })}
              css={inputStyle}
              placeholder='제목을 입력하세요'
              required
            />
          </div>

          {/* 본문 내용 */}
          <div css={fieldGroupStyle}>
            <label htmlFor='content' css={labelStyle}>
              본문 내용
            </label>
            <textarea
              id='content'
              value={notice.content}
              onChange={(e) => setNotice({ ...notice, content: e.target.value })}
              css={textareaStyle}
              placeholder='본문 내용을 입력하세요'
              required
            />
          </div>

          {/* 버튼 영역 */}
          <div css={buttonGroupStyle}>
            <button type='button' css={cancelButtonStyle} onClick={() => navigate(`/news/notice/${id}`)}>
              취소
            </button>
            <button type='submit' css={submitButtonStyle}>
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeEditPage;

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

const formContainer = css`
  margin-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge};
  color: ${theme.colors.grayscale[900]};
  font-weight: 700;
  margin-bottom: 8px;
`;

const fieldGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const labelStyle = css`
  ${theme.typography.titleMedium};
  color: ${theme.colors.grayscale[700]};
  font-weight: 600;
`;

const inputStyle = css`
  padding: 16px;
  border: 1px solid ${theme.colors.grayscale[300]};
  border-radius: 8px;
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[900]};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[600]};
  }

  &::placeholder {
    color: ${theme.colors.grayscale[400]};
  }
`;

const textareaStyle = css`
  ${inputStyle};
  min-height: 300px;
  resize: vertical;
  line-height: 1.6;
  font-family: inherit;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const buttonBaseStyle = css`
  ${theme.typography.labelLarge};
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
`;

const cancelButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.grayscale[200]};
  color: ${theme.colors.grayscale[700]};

  &:hover {
    background-color: ${theme.colors.grayscale[300]};
  }
`;

const submitButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.primary[600]};
  color: ${theme.colors.white};

  &:hover {
    background-color: ${theme.colors.primary[500]};
  }
`;



