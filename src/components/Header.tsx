import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Link, useLocation } from 'react-router-dom';
import OCIALBlack from '@/assets/icon/OCIAL_black.svg';
import OCIALWhite from '@/assets/icon/OCIAL_white.svg';
import { NAV_LINKS } from '@/constants/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import ProfileDropdown from '@/components/common/ProfileDropdown';

interface HeaderProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const Header = ({ variant = 'dark', className }: HeaderProps) => {
  const isLight = variant === 'light';
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  // 현재 경로가 해당 네비게이션 링크와 일치하는지 확인
  const isActive = (linkPath: string) => {
    const currentPath = location.pathname;
    // OCIAL: /OCIAL로 시작하는 모든 경로
    if (linkPath === '/OCIAL/history') {
      return currentPath.startsWith('/OCIAL');
    }
    // Activity: /activity로 시작하는 모든 경로
    if (linkPath === '/activity') {
      return currentPath.startsWith('/activity');
    }
    // News: /news로 시작하는 모든 경로
    if (linkPath === '/news/press') {
      return currentPath.startsWith('/news');
    }
    return false;
  };

  return (
    <header css={[headerContainer, isLight ? headerLight : headerDark, className]}>
      <Link to='/' css={logoLink}>
        <img src={isLight ? OCIALWhite : OCIALBlack} alt='OCIAL Logo' width={120} height={38} />
      </Link>

      <nav css={getNavigationStyle(isLight)}>
        {NAV_LINKS.map((link) => {
          const active = isActive(link.to);
          return (
            <Link key={link.to} to={link.to} css={getLinkStyle(isLight, active)}>
              {link.text}
            </Link>
          );
        })}
      </nav>

      {isLoggedIn ? (
        <ProfileDropdown />
      ) : (
        <Link to='/auth/signin' css={startButton}>
          Start with OCIAL
        </Link>
      )}
    </header>
  );
};

export default Header;

const headerContainer = css`
  position: sticky;
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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

const getLinkStyle = (isLight: boolean, isActive?: boolean) => css`
  text-decoration: none;
  font-weight: ${isActive ? 800 : 500};
  color: ${isActive
    ? theme.colors.primary[100]
    : isLight
      ? theme.colors.white
      : theme.colors.black};
  transition:
    opacity 0.2s ease,
    color 0.2s ease,
    font-weight 0.2s ease;

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
