import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div css={notFoundContainer}>
      <h1 css={notFoundTitle}>404</h1>
      <h2 css={notFoundSubtitle}>페이지를 찾을 수 없습니다</h2>
      <p css={notFoundDescription}>요청하신 페이지가 삭제되었거나 잘못된 경로입니다.</p>
      <Link to='/' css={notFoundButton}>
        메인페이지로 이동
      </Link>
    </div>
  );
};

export default NotFoundPage;

// Styles
const notFoundContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 20px;
`;

const notFoundTitle = css`
  font-size: 120px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #04009a 0%, #000000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const notFoundSubtitle = css`
  font-size: 24px;
  font-weight: 600;
  margin: 20px 0;
  color: #000;
`;

const notFoundDescription = css`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const notFoundButton = css`
  display: inline-block;
  padding: 14px 24px;
  background: rgba(4, 0, 154, 0.98);
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: rgba(4, 0, 154, 0.85);
    transform: translateY(-1px);
  }
`;
