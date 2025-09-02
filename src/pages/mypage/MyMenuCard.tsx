import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface MyMenuCardProps {
  activeMenu: 'activities' | 'profile';
}

const MyMenuCard = ({ activeMenu }: MyMenuCardProps) => {
  return (
    <aside css={sidebar}>
      <h3 css={sidebarTitle}>마이 오셜</h3>
      <nav css={sidebarNav}>
        <a
          href='/mypage/activities'
          css={[sidebarItem, activeMenu === 'activities' && activeSidebarItem]}
        >
          활동내역
        </a>

        <a href='/mypage/edit' css={[sidebarItem, activeMenu === 'profile' && activeSidebarItem]}>
          정보수정
        </a>
      </nav>
    </aside>
  );
};

export default MyMenuCard;

// Styles
const sidebar = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const sidebarTitle = css`
  font-size: ${theme.typography.headlineSmall.fontSize};
  font-weight: ${theme.typography.headlineSmall.fontWeight};
  color: ${theme.colors.grayscale[700]};
  margin: 0;
`;

const sidebarNav = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const sidebarItem = css`
  display: block;
  padding: 1rem 1.5rem;
  text-decoration: none;
  color: ${theme.colors.grayscale[600]};
  ${theme.typography.labelSmall};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.grayscale[50]};
    color: ${theme.colors.grayscale[700]};
  }
`;

const activeSidebarItem = css`
  background: ${theme.colors.grayscale[100]};
  color: ${theme.colors.grayscale[700]};
  font-weight: 600;
`;
