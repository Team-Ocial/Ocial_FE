import { css } from '@emotion/react';

const ActivityDetailPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>Activity 상세</h1>
    <div css={detailContainer}></div>
  </div>
);

export default ActivityDetailPage;

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

const detailContainer = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
