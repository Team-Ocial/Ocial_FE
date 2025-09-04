import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileData } from '@/hooks/useProfileData';
import { useModalStore } from '@/store/useModalStore';
import profileImageIcon from '@/assets/icon/profile image.svg';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { logout } = useAuthStore();
  const { profileData } = useProfileData();
  const { openModal } = useModalStore();

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMyPageClick = () => {
    setIsOpen(false);
    navigate('/mypage');
  };

  const handleLogoutClick = () => {
    setIsOpen(false);
    openModal({
      type: 'confirm',
      title: '로그아웃',
      desc: '정말 로그아웃 하시겠습니까?',
      actionButton: '로그아웃',
      onAction: () => {
        logout();
        navigate('/');
      },
    });
  };

  // 프로필 이미지 결정
  const displayImage = profileData?.profileImage || profileImageIcon;
  const displayName = profileData?.nickname || profileData?.name || '사용자';

  return (
    <div css={dropdownContainer} ref={dropdownRef}>
      {/* 프로필 버튼 */}
      <button
        type='button'
        css={profileButton}
        onClick={handleProfileClick}
        aria-label='프로필 메뉴'
      >
        <img src={displayImage} alt='Profile' css={profileImageStyle} />
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div css={dropdownMenu}>
          {/* 프로필 정보 섹션 */}
          <div css={profileInfo}>
            <img src={displayImage} alt='Profile' css={dropdownProfileImage} />
            <span css={profileName}>{displayName}</span>
          </div>

          {/* 구분선 */}
          <div css={divider} />

          {/* 메뉴 항목들 */}
          <div css={menuItems}>
            <button type='button' css={menuItem} onClick={handleMyPageClick}>
              마이페이지
            </button>
            <button type='button' css={menuItem} onClick={handleLogoutClick}>
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

// 스타일
const dropdownContainer = css`
  position: relative;
  display: flex;
  align-items: center;
`;

const profileButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: none;
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary[100]};
    outline-offset: 2px;
  }
`;

const profileImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const dropdownMenu = css`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  border-radius: 12px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[100]};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.2s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const profileInfo = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
`;

const dropdownProfileImage = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const profileName = css`
  font-size: ${theme.typography.labelLarge.fontSize};
  font-weight: ${theme.typography.labelLarge.fontWeight};
  line-height: ${theme.typography.labelLarge.lineHeight};
  color: ${theme.colors.grayscale[800]};
`;

const divider = css`
  height: 1px;
  background: ${theme.colors.grayscale[100]};
  margin: 0 16px;
`;

const menuItems = css`
  padding: 8px 0;
`;

const menuItem = css`
  display: block;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  text-align: left;
  font-size: ${theme.typography.labelMedium.fontSize};
  font-weight: ${theme.typography.labelMedium.fontWeight};
  line-height: ${theme.typography.labelMedium.lineHeight};
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.grayscale[50]};
  }
`;
