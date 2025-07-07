import { css } from '@emotion/react';

const NoticePage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>공지사항</h1>
    <div css={newsContainer}>nnn</div>
  </div>
);

export default NoticePage;

// Styles
const pageContainer = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: 700;
  color: #04009a;
  margin-bottom: 2rem;
`;

const newsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
