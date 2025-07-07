import { css } from '@emotion/react';

const MainPage = () => (
  <div css={mainContainer}>
    <h1 css={mainTitle}>메인페이지</h1>
    <div css={mainContent}>{/* 추후 메인 페이지 컨텐츠가 추가될 영역 */}</div>
  </div>
);

export default MainPage;

// Styles
const mainContainer = css`
  text-align: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const mainTitle = css`
  font-size: 2.5rem;
  font-weight: 700;
  color: #04009a;
  margin-bottom: 1.5rem;
`;

const mainContent = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
