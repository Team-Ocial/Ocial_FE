import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import { GoCheckCircleFill } from 'react-icons/go';

const PasswordResetPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/signin');
  };

  const handleResendPasswordClick = () => {
    // 임시 비밀번호 재발송 기능 (디자인만 구현)
    console.log('임시 비밀번호 재발송 요청');
  };

  return (
    <div css={pageContainer}>
      <div css={resetContainer}>
        {/* 성공 아이콘 */}
        <div css={successIconContainer}>
          <GoCheckCircleFill css={successIcon} />
        </div>

        {/* 성공 메시지 */}
        <div css={successContent}>
          <h2 css={mainMessageText}>이메일로 임시 비밀번호를 전송했습니다.</h2>
          <p css={subMessageText}>로그인 후 마이페이지에서 비밀번호를 수정해주세요.</p>
        </div>

        {/* 버튼들 */}
        <div css={buttonContainer}>
          <Button
            type='button'
            variant='filled'
            size='large'
            width='100%'
            css={loginButtonStyle}
            onClick={handleLoginClick}
          >
            로그인 하기
          </Button>
          <Button
            type='button'
            variant='outlined'
            size='large'
            width='100%'
            css={resendButtonStyle}
            onClick={handleResendPasswordClick}
          >
            임시 비밀번호 재발송 하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;

// 스타일 정의
const pageContainer = css`
  min-height: calc(100vh - 400px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  padding: 60px 20px;
`;

const resetContainer = css`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const successIconContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const successIcon = css`
  font-size: 48px;
  color: #59e27b; // 초록색
`;

const successContent = css`
  text-align: center;
  margin-bottom: 16px;
`;

const mainMessageText = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  margin: 0 0 12px 0;
`;

const subMessageText = css`
  ${theme.typography.textMedium}
  color: ${theme.colors.black};
  line-height: 1.6;
  margin: 0;
`;

const buttonContainer = css`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const loginButtonStyle = css`
  background-color: ${theme.colors.black} !important;

  &:hover {
    background-color: ${theme.colors.grayscale[800]} !important;
  }
`;

const resendButtonStyle = css`
  border-color: ${theme.colors.black} !important;
  color: ${theme.colors.black} !important;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.grayscale[100]} !important;
  }
`;
