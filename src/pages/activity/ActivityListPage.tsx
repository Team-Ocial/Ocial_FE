import { css } from '@emotion/react';

const ActivityListPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>Activity</h1>
    <div css={listContainer}>sssssssssss</div>
  </div>
);

export default ActivityListPage;

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

const listContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;
