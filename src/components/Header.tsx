import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import logoImage from '@/assets/images/logo_white.png';
import { theme } from '@/styles/theme';

const Header = () => {
  return (
    <header css={headerContainer}>
      <Link to='/' css={logoLink}>
        <img src={logoImage} alt='OCIAL Logo' width={120} height={38} />
      </Link>

      <nav css={navigation}>
        <Link to='/OCIAL/history' css={navLink}>
          OCIAL
        </Link>
        <Link to='/activity' css={navLink}>
          Activity
        </Link>
        <Link to='/news/notice' css={navLink}>
          News
        </Link>
      </nav>

      <Link to='/auth/signup' css={startButton}>
        Start with OCIAL
      </Link>
    </header>
  );
};

export default Header;

// Styles
const headerContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  padding: 16px 135px;
  border: 1px solid yellow;
`;

const logoLink = css`
  display: flex;
  align-items: center;
`;

const navigation = css`
  display: flex;
  gap: 48px;
  background: rgba(248, 249, 251, 0.1);
  border-radius: 50px;
  padding: 8px 24px;
`;

const navLink = css`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const startButton = css`
  padding: 14px 24px;
  background-color: ${theme.colors.primary[100]};
  color: #fff;
  text-decoration: none;
  border-radius: 999px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
