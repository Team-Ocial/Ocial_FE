import { css } from '@emotion/react';
import Step1 from '@/components/common/SignupStep1';
import Step2 from '@/components/common/SignupStep2';
import { useSignupStore } from '@/store/useSignupStore';
import { theme } from '@/styles/theme';

const SignupPage = () => {
  const { currentStep } = useSignupStore();

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
