import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface LoadingStateProps {
  height?: string | number;
}

const LoadingState = ({ height = '400px' }: LoadingStateProps) => (
  <div css={loadingWrapper(height)}>
    <p>Loading...</p>
  </div>
);

export default LoadingState;

const loadingWrapper = (height: string | number) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${typeof height === 'number' ? `${height}px` : height};
  ${theme.typography.textLarge};
`;
