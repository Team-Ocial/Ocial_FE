/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Link, useLocation } from 'react-router-dom';
import logoBlack from '@/assets/images/logo_black.png';
import logoWhite from '@/assets/images/logo_white.png';

const navLinks = [
  { to: '/OCIAL/history', text: 'OCIAL' },
  { to: '/activity', text: 'Activity' },
  { to: 'news/press', text: 'News' },
];

const Header = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header css={headerContainer}>
      <Link to='/' css={logoLink}>
        <img src={isMainPage ? logoWhite : logoBlack} alt='OCIAL Logo' width={120} height={38} />
      </Link>

      <nav css={[navigation, isMainPage ? mainNavigation : subNavigation]}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            css={[navLink, isMainPage ? navLinkWhite : navLinkBlack]}
          >
            {link.text}
          </Link>
        ))}
      </nav>

      <Link to='/auth/signup' css={startButton}>
        Start with OCIAL
      </Link>
    </header>
  );
};

export default Header;

const headerContainer = css`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  padding: 16px 135px;
`;

const logoLink = css`
  display: flex;
  align-items: center;
`;

const navigation = css`
  display: flex;
  gap: 48px;
  border-radius: 50px;
  padding: 14px 24px;
`;

const mainNavigation = css`
  background: rgba(248, 249, 251, 0.1);
`;

const subNavigation = css`
  background: ${theme.colors.grayscale[50]};
`;

const navLink = css`
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const navLinkWhite = css`
  color: ${theme.colors.white};
`;

const navLinkBlack = css`
  color: ${theme.colors.black};
`;

const startButton = css`
  padding: 14px 24px;
  background-color: ${theme.colors.primary[100]};
  color: ${theme.colors.white};
  text-decoration: none;
  border-radius: 999px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
