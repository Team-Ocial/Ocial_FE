import { css } from '@emotion/react';
import { useEffect } from 'react';
import Step1 from '@/components/common/SignupStep1';
import Step2 from '@/components/common/SignupStep2';
import { useSignupStore } from '@/store/useSignupStore';
import { theme } from '@/styles/theme';

const SignupPage = () => {
  const { currentStep, resetForm } = useSignupStore();

  useEffect(() => {
    // 페이지가 처음 렌더링될 때 폼 상태를 초기화합니다.
    resetForm();
  }, [resetForm]);

  return (
    <div css={containerStyle}>
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}
    </div>
  );
};

const containerStyle = css`
  min-height: calc(100vh - 200px);
  background-color: ${theme.colors.white};
`;

export default SignupPage;
