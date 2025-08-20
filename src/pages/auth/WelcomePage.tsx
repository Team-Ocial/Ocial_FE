import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import welcomeBg from '@/assets/images/welcome.png';
import Button from '@/components/common/Button';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleCreateProfileClick = () => {
    // 마이페이지로 이동
    navigate('/mypage');
  };

  return (
    <div css={containerStyle}>
      <div css={contentStyle}>
        <h1 css={welcomeTitle}>환영합니다!</h1>
        <p css={welcomeSubtitle}>오셜과 함께 새 여정으로의 첫 걸음을 시작해볼까요?</p>
        <Button
          variant='filled'
          size='large'
          width='40%'
          css={createProfileButtonStyle}
          onClick={handleCreateProfileClick}
        >
          내 프로필 작성하기
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;

const containerStyle = css`
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%),
    url(${welcomeBg});
  background-size: cover, cover;
  background-position: center, center;
  background-repeat: no-repeat, no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
`;

const welcomeTitle = css`
  ${theme.typography.headlineMedium}
  color: ${theme.colors.black};
  margin: 0;
`;

const welcomeSubtitle = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  line-height: 1.6;
  margin: 0;
`;

const createProfileButtonStyle = css`
  background-color: ${theme.colors.primary[100]} !important;
  border-color: ${theme.colors.primary[100]} !important;
  max-width: 400px;

  &:hover {
    background-color: ${theme.colors.primary[200]} !important;
    border-color: ${theme.colors.primary[200]} !important;
  }
`;
