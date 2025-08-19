import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import { GoCheckCircleFill } from 'react-icons/go';

const IdFoundPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/auth/signin');
  };

  const handlePasswordFindClick = () => {
    navigate('/auth/find?tab=password');
  };

  return (
    <div css={pageContainer}>
      <div css={findContainer}>
        {/* 성공 아이콘 */}
        <div css={successIconContainer}>
          <GoCheckCircleFill css={successIcon} />
        </div>

        {/* 성공 메시지 */}
        <div css={successContent}>
          <p css={successText}>
            귀하의 아이디는
            <br />
            <strong css={foundIdText}>ocial123</strong> 입니다.
          </p>
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
            로그인하기
          </Button>
          <Button
            type='button'
            variant='outlined'
            size='large'
            width='100%'
            css={passwordFindButtonStyle}
            onClick={handlePasswordFindClick}
          >
            비밀번호 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IdFoundPage;

// 스타일 정의
const pageContainer = css`
  min-height: calc(100vh - 400px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  padding: 60px 20px;
`;

const findContainer = css`
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

const successText = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  line-height: 1.6;
  margin: 0;
`;

const foundIdText = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  font-weight: 700;
  text-decoration: underline;
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

const passwordFindButtonStyle = css`
  border-color: ${theme.colors.black} !important;
  color: ${theme.colors.black} !important;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.grayscale[100]} !important;
  }
`;
