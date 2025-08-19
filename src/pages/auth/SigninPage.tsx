import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import symbol2Black from '@/assets/icon/symbol2_black.svg';
import { useAuth } from '@/hooks/useAuth';

const SigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });
  const [rememberLogin, setRememberLogin] = useState(false);
  const { login, isLoading, errors } = useAuth();

  // 로그인 유지 기능을 위해 localStorage에서 저장된 ID 불러오기
  useEffect(() => {
    const savedId = localStorage.getItem('rememberedId');
    if (savedId) {
      setFormData((prev) => ({ ...prev, id: savedId }));
      setRememberLogin(true);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRememberToggle = () => {
    setRememberLogin(!rememberLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // useAuth 훅을 통한 로그인 시도
      await login(formData);

      // 로그인 성공 시에만 실행
      // 로그인 유지가 체크되어 있으면 ID를 localStorage에 저장
      if (rememberLogin) {
        localStorage.setItem('rememberedId', formData.id);
      } else {
        localStorage.removeItem('rememberedId');
      }

      // 메인 페이지로 이동
      navigate('/');
    } catch (err) {
      // 오류는 useAuth 훅에서 error 상태로 관리됨
      console.error('로그인 실패:', err);
    }
  };

  return (
    <div css={pageContainer}>
      <div css={loginContainer}>
        {/* 블랙 심볼 */}
        <div css={logoContainer}>
          <img src={symbol2Black} alt='OCIAL Symbol' css={logoStyle} />
        </div>

        {/* 제목 */}
        <h1 css={titleStyle}>오셜에 다시 오신 걸 환영합니다!</h1>

        {/* 로그인 폼 */}
        <form css={formStyle} onSubmit={handleSubmit}>
          {/* ID 입력 */}
          <div css={inputContainer}>
            <label css={labelStyle}>ID</label>
            <input
              type='text'
              name='id'
              value={formData.id}
              onChange={handleInputChange}
              placeholder='example123'
              css={inputStyle}
            />
            {errors.id && <span css={signupErrorMessageStyle}>{errors.id}</span>}
          </div>

          {/* 비밀번호 입력 */}
          <div css={inputContainer}>
            <label css={labelStyle}>비밀번호</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='••••••••'
              css={inputStyle}
            />
            {errors.password && <span css={signupErrorMessageStyle}>{errors.password}</span>}
          </div>

          {/* 로그인 유지 및 찾기 옵션 */}
          <div css={optionsContainer}>
            <label css={checkboxContainer}>
              <input
                type='checkbox'
                checked={rememberLogin}
                onChange={handleRememberToggle}
                css={checkboxStyle}
              />
              <span css={checkboxLabel}>로그인 유지</span>
            </label>
            <div css={findLinksContainer}>
              <Link to='/auth/find' css={findLink}>
                ID 찾기
              </Link>
              <span css={divider}>/</span>
              <Link to='/auth/find?tab=password' css={findLink}>
                비밀번호 찾기
              </Link>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <Button
            type='submit'
            variant='filled'
            size='large'
            width='100%'
            css={loginButtonStyle}
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인하기'}
          </Button>
        </form>

        {/* 회원가입 링크 */}
        <div css={signupContainer}>
          <span css={signupText}>아직 계정이 없으신가요?</span>
          <Link to='/auth/signup' css={signupLink}>
            지금 가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;

// 스타일 정의
const pageContainer = css`
  min-height: calc(100vh - 400px); // 푸터가 보이도록 높이 조정
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.white};
  padding: 60px 20px;
  // border: 1px solid blue;
`;

const loginContainer = css`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  // border: 1px solid red;
`;

const logoContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  // border: 1px solid red;
`;

const logoStyle = css`
  width: 120px;
  height: auto;
`;

const titleStyle = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  text-align: center;
  margin: 0;
`;

const formStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const inputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const labelStyle = css`
  ${theme.typography.labelMedium}
  color: ${theme.colors.black};
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  border: 1px solid ${theme.colors.grayscale[150]};
  border-radius: 8px;
  ${theme.typography.textMedium}
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.grayscale[300]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[100]};
  }
`;

const optionsContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const checkboxContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const checkboxStyle = css`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const checkboxLabel = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.grayscale[400]};
  cursor: pointer;
`;

const findLinksContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const findLink = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.grayscale[400]};
  text-decoration: none;

  &:hover {
    color: ${theme.colors.black};
    text-decoration: underline;
  }
`;

const divider = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.grayscale[300]};
`;

const loginButtonStyle = css`
  margin-top: 8px;
  background-color: ${theme.colors.black} !important;

  &:hover {
    background-color: ${theme.colors.grayscale[800]} !important;
  }
`;

const signupContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const signupText = css`
  ${theme.typography.labelSmall}
  color: ${theme.colors.grayscale[400]};
`;

const signupLink = css`
  ${theme.typography.labelSmall}
  color: ${theme.colors.black};
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;

const signupErrorMessageStyle = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.secondary[500]};
`;
