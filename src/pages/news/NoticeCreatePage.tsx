import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Notice } from '@/types/notice.types';
import { useToast } from '@/hooks/useToast';
import { NOTICE_LIST } from '@/mocks/data/noticeData';
import { NOTICE_CONSTANTS } from '@/constants/notice';

const NoticeCreatePage = () => {
  const navigate = useNavigate();
  const { success, error: showError } = useToast();
  const [notice, setNotice] = useState<Omit<Notice, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    content: '',
    author: NOTICE_CONSTANTS.DEFAULT_AUTHOR,
    pinned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 연동
      // await createNotice(notice);

      // Mock 데이터 추가
      const newNotice: Notice = {
        ...notice,
        id: `notice-${Date.now()}`, // 임시 ID 생성
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      NOTICE_LIST.unshift(newNotice); // 맨 앞에 추가 (최신순)

      success('공지사항이 등록되었습니다.');
      navigate(`/news/notice/${newNotice.id}`);
    } catch (error) {
      showError('공지사항 등록에 실패했습니다.');
      console.error('Failed to create notice:', error);
    }
  };

  return (
    <div css={pageContainer}>
      <div css={contentWrapper}>
        <form onSubmit={handleSubmit} css={formContainer}>
          <h1 css={titleStyle}>공지사항 등록</h1>

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

          {/* 고정 여부 */}
          <div css={fieldGroupStyle}>
            <label css={checkboxLabelStyle}>
              <input
                type='checkbox'
                checked={notice.pinned || false}
                onChange={(e) => setNotice({ ...notice, pinned: e.target.checked })}
                css={checkboxStyle}
              />
              <span>공지사항 고정 (상단에 항상 표시)</span>
            </label>
          </div>

          {/* 버튼 영역 */}
          <div css={buttonGroupStyle}>
            <button type='button' css={cancelButtonStyle} onClick={() => navigate('/news/notice')}>
              취소
            </button>
            <button type='submit' css={submitButtonStyle}>
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoticeCreatePage;

// Styles
const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
`;

const formContainer = css`
  margin-top: 80px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge2};
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

const checkboxLabelStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;
`;

const checkboxStyle = css`
  width: 20px;
  height: 20px;
  border: 1px solid ${theme.colors.grayscale[300]};
  border-radius: 4px;
  cursor: pointer;
  accent-color: ${theme.colors.primary[600]};

  &:checked {
    background-color: ${theme.colors.primary[600]};
    border-color: ${theme.colors.primary[600]};
  }
`;
