import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

const HistoryPage = () => (
  <div css={historyContainer}>
    <h1 css={pageTitle}>
      데이터와 함께 걸어온 길,
      <br />
      새로운 미래를 향해 나아갑니다.
    </h1>
  </div>
);

export default HistoryPage;

// Styles
const historyContainer = css`
  width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 30px 0 140px 0;
  border: 1px solid red;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: 700;
  color: #04009a;
`;
