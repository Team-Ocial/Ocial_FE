import { css } from '@emotion/react';

const PressPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>보도자료</h1>
    <div css={newsContainer}>ddddd</div>
  </div>
);

export default PressPage;

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
