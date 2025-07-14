import { css } from '@emotion/react';

const MembersPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>구성원</h1>
    <div css={membersContainer}>ppppppppp</div>
  </div>
);

export default MembersPage;

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

const membersContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;
