import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Link } from 'react-router-dom';
import logoBlack from '@/assets/images/logo_black.png';
import logoWhite from '@/assets/images/logo_white.png';
import { NAV_LINKS } from '@/constants/navigation';

interface HeaderProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Header = ({ variant = 'dark', className }: HeaderProps) => {
  const isLight = variant === 'light';

  return (
    <header css={[headerContainer, isLight ? headerLight : headerDark, className]}>
      <Link to='/' css={logoLink}>
        <img src={isLight ? logoWhite : logoBlack} alt='OCIAL Logo' width={120} height={38} />
      </Link>

      <nav css={getNavigationStyle(isLight)}>
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to} css={getLinkStyle(isLight)}>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  padding: 16px 135px;
`;

const headerLight = css`
  background: transparent;
`;

const headerDark = css`
  background: ${theme.colors.white};
`;

const logoLink = css`
  display: flex;
  align-items: center;
`;

const getNavigationStyle = (isLight: boolean) => css`
  display: flex;
  gap: 48px;
  border-radius: 50px;
  padding: 14px 24px;
  background: ${isLight ? 'rgba(248, 249, 251, 0.1)' : theme.colors.grayscale[50]};
`;

const getLinkStyle = (isLight: boolean) => css`
  text-decoration: none;
  font-weight: 500;
  color: ${isLight ? theme.colors.white : theme.colors.black};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
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
