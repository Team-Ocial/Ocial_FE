import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface LoadingStateProps {
  height?: string | number;
}

const LoadingState = ({ height = '400px' }: LoadingStateProps) => (
  <div css={loadingWrapper(height)}>
    <div css={spinner} />
    <p css={loadingText}>로딩 중...</p>
  </div>
);

export default LoadingState;

const loadingWrapper = (height: string | number) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${typeof height === 'number' ? `${height}px` : height};
  gap: 12px;
  ${theme.typography.textLarge};
`;

const loadingText = css`
  margin: 0;
  color: ${theme.colors.grayscale[500]};
`;

const spinner = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid ${theme.colors.grayscale[200]};
  border-top-color: ${theme.colors.primary[100]};
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
