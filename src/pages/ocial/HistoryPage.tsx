import { css } from '@emotion/react';

const HistoryPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>연혁</h1>
    <div css={historyContainer}>hhhhhhhhhhhhhh</div>
  </div>
);

export default HistoryPage;

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

const historyContainer = css`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
