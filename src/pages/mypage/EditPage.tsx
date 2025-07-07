import { css } from '@emotion/react';

const EditPage = () => (
  <div css={pageContainer}>
    <h1 css={pageTitle}>정보 수정</h1>
    <div css={editForm}>
      <form>
        <div css={formGroup}>{/* 폼 필드들이 들어갈 자리 */}</div>
      </form>
    </div>
  </div>
);

export default EditPage;

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

const editForm = css`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const formGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;
