import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import symbol5 from '@/assets/icon/symbol5.svg';

interface SignupLayoutProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const SignupLayout = ({ step, title, children }: SignupLayoutProps) => {
  return (
    <div css={containerStyle}>
      <div css={stepIndicatorStyle}>
        <div css={logoContainer}>
          <img src={symbol5} alt='OCIAL Symbol' css={logoStyle} />
        </div>
        <div css={stepTextStyle}>{step}/2</div>
        <h2 css={titleStyle}>{title}</h2>
      </div>
      {children}
    </div>
  );
};

// 공통 스타일 정의
export const containerStyle = css`
  max-width: 480px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const stepIndicatorStyle = css`
  text-align: center;
  margin-bottom: 40px;
`;

export const logoContainer = css`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const logoStyle = css`
  width: 60px;
  height: auto;
`;

export const stepTextStyle = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  margin-bottom: 8px;
`;

export const titleStyle = css`
  ${theme.typography.headlineSmall}
  color: ${theme.colors.black};
  margin: 0;
`;

export const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const inputGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const labelStyle = css`
  ${theme.typography.labelSmall}
  color: ${theme.colors.grayscale[800]};
`;

export const requiredStyle = css`
  color: ${theme.colors.secondary[500]};
`;

export const optionalStyle = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.grayscale[400]};
`;

export const inputStyle = css`
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${theme.colors.grayscale[200]};
  border-radius: 8px;
  ${theme.typography.textMedium}
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
  }
  &::placeholder {
    color: ${theme.colors.grayscale[400]};
  }
`;

export const selectStyle = css`
  ${inputStyle}
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L7 7L13 1" stroke="%23666666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
`;

export const dateInputStyle = css`
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
  &::-webkit-datetime-edit-text {
    color: ${theme.colors.grayscale[400]};
  }
  &::-webkit-datetime-edit-placeholder {
    color: ${theme.colors.grayscale[400]};
  }
`;

export const errorMessageStyle = css`
  ${theme.typography.textSmall}
  color: ${theme.colors.secondary[500]};
`;

export const buttonStyle = css`
  margin-top: 50px;
`;

export default SignupLayout;
