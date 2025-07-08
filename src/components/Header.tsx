/** @jsxImportSource @emotion/react */
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

const Header = () => {
  return (
    <header css={headerContainer}>
      <Link to='/' css={logoLink}>
        <img
          src='https://cdn.builder.io/api/v1/image/assets/TEMP/715bc504f51434731ff03a828cb112d176455775?width=241'
          alt='Ocial Logo'
          width={120}
          height={38}
        />
      </Link>

      <nav css={navigation}>
        <Link to='/ocial/history' css={navLink}>
          Ocial
        </Link>
        <Link to='/activity' css={navLink}>
          Activity
        </Link>
        <Link to='/news/notice' css={navLink}>
          News
        </Link>
      </nav>

      <Link to='/auth/signup' css={startButton}>
        Start with Ocial
      </Link>
    </header>
  );
};

export default Header;

// Styles
const headerContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 135px;
  background: rgba(248, 249, 251, 0.1);
  backdrop-filter: blur(2px);
`;

const logoLink = css`
  display: flex;
  align-items: center;
`;

const navigation = css`
  display: flex;
  gap: 48px;
`;

const navLink = css`
  color: #fff;
  text-decoration: none;
`;

const startButton = css`
  padding: 14px 24px;
  background: rgba(4, 0, 154, 0.98);
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
`;
