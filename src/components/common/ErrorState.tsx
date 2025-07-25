import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface ErrorStateProps {
  message: string;
  height?: string | number;
}

const ErrorState = ({ message, height = '400px' }: ErrorStateProps) => (
  <div css={errorWrapper(height)}>
    <p>{message}</p>
  </div>
);

export default ErrorState;

const errorWrapper = (height: string | number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${typeof height === 'number' ? `${height}px` : height};
  color: red;
  ${theme.typography.textLarge};
`;
