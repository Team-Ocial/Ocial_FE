import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import Button from '@/components/common/Button';
import symbol2Blue from '@/assets/icon/symbol2_blue.svg';

type TabType = 'id' | 'password';

const FindPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('id');
  const [passwordFormData, setPasswordFormData] = useState({
    id: '',
    email: '',
  });

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'password') {
      setActiveTab('password');
    }
  }, [searchParams]);

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIdVerification = () => {
    // 본인인증 버튼 클릭 시 ID 찾기 성공 페이지로 이동
    navigate('/auth/id-found');
  };

  const handlePasswordFind = () => {
    // 비밀번호 찾기 버튼 클릭 시 비밀번호 재설정 성공 페이지로 이동
    navigate('/auth/password-reset');
  };

  return (
    <div css={pageContainer}>
      <div css={findContainer}>
        {/* 블루 심볼 */}
        <div css={logoContainer}>
          <img src={symbol2Blue} alt='OCIAL Symbol' css={logoStyle} />
        </div>

        {/* 제목 */}
        <h1 css={titleStyle}>ID / 비밀번호 찾기</h1>

        {/* 탭 메뉴 */}
        <div css={tabContainer}>
          <button
            css={[tabButton, activeTab === 'id' && activeTabButton]}
            onClick={() => handleTabClick('id')}
          >
            ID 찾기
          </button>
          <button
            css={[tabButton, activeTab === 'password' && activeTabButton]}
            onClick={() => handleTabClick('password')}
          >
            비밀번호 찾기
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div css={contentContainer}>
          {activeTab === 'id' ? (
            <div css={tabContent}>
              <p css={descriptionText}>
                아이디가 생각나지 않으세요?
                <br />
                본인인증 후 아이디를 확인하실 수 있습니다.
              </p>
              <button type='button' css={verificationButtonStyle} onClick={handleIdVerification}>
                본인인증
              </button>
            </div>
          ) : (
            <div css={tabContent}>
              <p css={descriptionText}>
                비밀번호가 생각나지 않으세요?
                <br />
                본인인증 후 비밀번호를 변경하실 수 있습니다.
              </p>

              <div css={inputFormStyle}>
                <div css={inputContainer}>
                  <label css={labelStyle}>
                    ID <span css={requiredStyle}>*</span>
                  </label>
                  <input
                    type='text'
                    name='id'
                    value={passwordFormData.id}
                    onChange={handleInputChange}
                    placeholder='아이디를 입력해주세요.'
                    css={inputStyle}
                  />
                </div>

                <div css={inputContainer}>
                  <label css={labelStyle}>
                    이메일 <span css={requiredStyle}>*</span>
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={passwordFormData.email}
                    onChange={handleInputChange}
                    placeholder='이메일을 입력해주세요.'
                    css={inputStyle}
                  />
                </div>

                <Button
                  type='button'
                  variant='filled'
                  size='large'
                  width='100%'
                  css={passwordFindButtonStyle}
                  onClick={handlePasswordFind}
                >
                  비밀번호 찾기
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 하단 링크 */}
        <div css={bottomLinkContainer}>
          <span css={bottomText}>계정이 기억나셨나요?</span>
          <Link to='/auth/signin' css={bottomLink}>
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindPage;

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
  gap: 24px;
`;

const logoContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
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

const tabContainer = css`
  display: flex;
  width: 100%;
  // border-bottom: 1px solid ${theme.colors.grayscale[150]};
  margin-bottom: 8px;
`;

const tabButton = css`
  flex: 1;
  padding: 16px 0;
  background: none;
  border: none;
  ${theme.typography.labelMedium}
  font-weight: 600;
  color: ${theme.colors.grayscale[400]};
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.colors.black};
  }
`;

const activeTabButton = css`
  color: ${theme.colors.black} !important;
  border-bottom-color: ${theme.colors.black};
`;

const contentContainer = css`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const tabContent = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const descriptionText = css`
  ${theme.typography.titleMedium}
  color: ${theme.colors.black};
  line-height: 1.6;
  margin: 0;
  text-align: center;
`;

const verificationButtonStyle = css`
  height: 48px;
  background-color: ${theme.colors.grayscale[100]};
  border: none;
  border-radius: 8px;
  ${theme.typography.labelMedium}
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: ${theme.colors.grayscale[200]};
  }
`;

const inputFormStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`;

const inputContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const labelStyle = css`
  ${theme.typography.labelMedium}
  color: ${theme.colors.black};
  text-align: left;
  width: 100%;
`;

const requiredStyle = css`
  color: ${theme.colors.secondary[500]};
`;

const inputStyle = css`
  width: 100%;
  padding: 16px;
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

const passwordFindButtonStyle = css`
  background-color: ${theme.colors.black} !important;
  margin-top: 24px;

  &:hover {
    background-color: ${theme.colors.grayscale[800]} !important;
  }
`;

const bottomLinkContainer = css`
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: center;
  margin-top: 16px;
`;

const bottomText = css`
  ${theme.typography.labelSmall}
  color: ${theme.colors.grayscale[400]};
`;

const bottomLink = css`
  ${theme.typography.labelSmall}
  color: ${theme.colors.black};
  text-decoration: none;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`;
