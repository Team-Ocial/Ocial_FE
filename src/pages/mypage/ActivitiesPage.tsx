import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';

const ActivitiesPage = () => {
  return (
    <div css={pageContainer}>
      <MyPageHeader />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='activities' />
        <main css={mainContent}>
          <h1 css={pageTitle}>내 활동 보기</h1>
          <div css={contentArea}>
            <p css={placeholderText}>활동내역 탭 내용이 여기에 표시됩니다.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivitiesPage;

// Styles
const pageContainer = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 2rem;
`;

const mainContainer = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const mainContent = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const contentArea = css`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const placeholderText = css`
  color: ${theme.colors.grayscale[500]};
  text-align: center;
  font-size: 16px;
`;
