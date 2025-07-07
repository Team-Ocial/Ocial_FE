import { css } from '@emotion/react';

const MyPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>마이페이지</h1>
    <div css={profileContainer}>
      <div>{/* 프로필 이미지 영역 */}</div>
      <div css={profileInfo}>{/* 사용자 정보 영역 */}</div>
    </div>
  </div>
);

export default MyPage;

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

const profileContainer = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const profileInfo = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
