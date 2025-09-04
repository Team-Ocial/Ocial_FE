import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import ProfileDropdown from '@/components/common/ProfileDropdown';
import { useAuthStore } from '@/store/useAuthStore';
import SquareButton from '@/components/common/SquareButton';
import Modal from '@/components/common/Modal';

const ProfileDropdownTest = () => {
  const { isLoggedIn, login, logout } = useAuthStore();

  const handleLogin = () => {
    login('test-user-123');
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>ProfileDropdown 테스트</h1>

      <div css={statusSection}>
        <p css={statusText}>
          현재 로그인 상태: <strong>{isLoggedIn ? '로그인됨' : '로그아웃됨'}</strong>
        </p>
        <div css={buttonGroup}>
          <SquareButton variant='filled' size='medium' onClick={handleLogin} disabled={isLoggedIn}>
            테스트 로그인
          </SquareButton>
          <SquareButton
            variant='outlined'
            size='medium'
            onClick={handleLogout}
            disabled={!isLoggedIn}
          >
            로그아웃
          </SquareButton>
        </div>
      </div>

      <div css={testSection}>
        <h2 css={sectionTitle}>기본 테마</h2>
        <div css={headerMockup}>
          <div css={logoArea}>OCIAL Logo</div>
          <div css={navArea}>Navigation</div>
          {isLoggedIn ? <ProfileDropdown /> : <div css={loginPrompt}>로그인해주세요</div>}
        </div>
      </div>

      <div css={testSection}>
        <h2 css={sectionTitle}>투명 배경</h2>
        <div css={[headerMockup, transparentHeaderMockup]}>
          <div css={[logoArea, lightText]}>OCIAL Logo</div>
          <div css={[navArea, lightText]}>Navigation</div>
          {isLoggedIn ? (
            <ProfileDropdown />
          ) : (
            <div css={[loginPrompt, lightText]}>로그인해주세요</div>
          )}
        </div>
      </div>

      <div css={infoSection}>
        <h3 css={infoTitle}>사용법</h3>
        <ul css={infoList}>
          <li>프로필 이미지를 클릭하면 드롭다운이 열립니다</li>
          <li>드롭다운에는 사용자 정보와 메뉴가 표시됩니다</li>
          <li>마이페이지 버튼을 클릭하면 마이페이지로 이동합니다</li>
          <li>로그아웃 버튼을 클릭하면 확인 모달이 표시됩니다</li>
          <li>모달에서 로그아웃을 확인하면 로그아웃되고 메인페이지로 이동합니다</li>
          <li>드롭다운 외부를 클릭하면 메뉴가 닫힙니다</li>
        </ul>
      </div>

      {/* 모달 컴포넌트 */}
      <Modal />
    </div>
  );
};

export default ProfileDropdownTest;

// 스타일
const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
`;

const titleStyle = css`
  font-size: ${theme.typography.headlineMedium.fontSize};
  font-weight: ${theme.typography.headlineMedium.fontWeight};
  color: ${theme.colors.grayscale[800]};
  margin-bottom: 32px;
  text-align: center;
`;

const statusSection = css`
  background: ${theme.colors.grayscale[50]};
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const statusText = css`
  font-size: ${theme.typography.labelLarge.fontSize};
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 16px;
`;

const buttonGroup = css`
  display: flex;
  gap: 12px;
`;

const testSection = css`
  margin-bottom: 40px;
`;

const sectionTitle = css`
  font-size: ${theme.typography.headlineSmall.fontSize};
  font-weight: ${theme.typography.headlineSmall.fontWeight};
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 16px;
`;

const headerMockup = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 82px;
  padding: 16px 40px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[100]};
  border-radius: 12px;
`;

const transparentHeaderMockup = css`
  background: linear-gradient(
    135deg,
    ${theme.colors.primary[100]} 0%,
    ${theme.colors.primary[200]} 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const logoArea = css`
  font-weight: 600;
  color: ${theme.colors.grayscale[800]};
`;

const navArea = css`
  font-weight: 500;
  color: ${theme.colors.grayscale[600]};
`;

const loginPrompt = css`
  font-size: ${theme.typography.labelMedium.fontSize};
  color: ${theme.colors.grayscale[500]};
`;

const lightText = css`
  color: ${theme.colors.white};
`;

const infoSection = css`
  background: ${theme.colors.white};
  padding: 24px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.grayscale[100]};
`;

const infoTitle = css`
  font-size: ${theme.typography.titleLarge.fontSize};
  font-weight: ${theme.typography.titleLarge.fontWeight};
  color: ${theme.colors.grayscale[800]};
  margin-bottom: 16px;
`;

const infoList = css`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    font-size: ${theme.typography.labelMedium.fontSize};
    color: ${theme.colors.grayscale[600]};
    padding: 8px 0;
    position: relative;
    padding-left: 20px;

    &::before {
      content: '•';
      color: ${theme.colors.primary[100]};
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
`;
