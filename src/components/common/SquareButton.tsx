import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import { theme } from '@/styles/theme';

interface SquareButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'gray' | 'plain' | 'text' | 'disabled';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  active?: boolean;
  width?: string | number;
}

const SquareButton = ({
  children,
  variant = 'filled',
  size = 'medium',
  fullWidth = false,
  active = false,
  width,
  disabled = false,
  ...props
}: SquareButtonProps) => {
  const currentVariant = disabled ? 'disabled' : variant;

  return (
    <button
      css={[
        buttonBase,
        sizes[size],
        variants[currentVariant],
        active && activeStyles[currentVariant],
        !active && !disabled && hoverStyles[currentVariant],
        fullWidth && fullWidthStyle,
        width &&
          css`
            width: ${typeof width === 'number' ? `${width}px` : width};
          `,
      ]}
      disabled={disabled}
      {...props}
    >
      <div css={buttonContentWrapper}>
        <span>{children}</span>
      </div>
    </button>
  );
};

export default SquareButton;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  box-sizing: border-box;
  border-radius: 8px; /* 스퀘어 버튼의 핵심 */
  ${theme.typography.labelMedium}

  &:disabled {
    cursor: not-allowed;
  }
`;

const sizes = {
  small: css`
    padding: 8px 16px;
    height: 36px;
    ${theme.typography.textSmall2}
  `,
  medium: css`
    padding: 12px 20px;
    height: 44px;
    ${theme.typography.labelSmall}
  `,
  large: css`
    padding: 16px 24px;
    height: 52px;
    ${theme.typography.labelMedium}
  `,
};

const variants = {
  filled: css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.black};
  `,
  outlined: css`
    background: ${theme.colors.white};
    color: ${theme.colors.black};
    border: 1px solid ${theme.colors.grayscale[100]};
  `,
  gray: css`
    background: ${theme.colors.grayscale[100]};
    color: ${theme.colors.grayscale[700]};
    border: 1px solid ${theme.colors.grayscale[200]};
  `,
  plain: css`
    background: ${theme.colors.grayscale[100]};
    color: ${theme.colors.grayscale[700]};
    border: none;
  `,
  text: css`
    background: transparent;
    color: ${theme.colors.grayscale[700]};
    border: none;
    cursor: default;
  `,
  disabled: css`
    background: ${theme.colors.grayscale[100]};
    color: ${theme.colors.grayscale[400]};
    border: 1px solid ${theme.colors.grayscale[200]};
    opacity: 0.6;
  `,
};

const hoverStyles = {
  filled: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[800]};
      border-color: ${theme.colors.grayscale[800]};
    }
  `,
  outlined: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[50]};
      border-color: ${theme.colors.grayscale[200]};
    }
  `,
  gray: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[200]};
      border-color: ${theme.colors.grayscale[300]};
    }
  `,
  plain: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[200]};
    }
  `,
  text: css``, // text는 hover 없음 (텍스트처럼)
  disabled: css``, // disabled는 hover 없음
};

const activeStyles = {
  filled: css`
    background: ${theme.colors.grayscale[900]};
    border-color: ${theme.colors.grayscale[900]};
  `,
  outlined: css`
    background: ${theme.colors.grayscale[800]};
    color: ${theme.colors.white};
    border-color: ${theme.colors.grayscale[800]};
  `,
  gray: css`
    background: ${theme.colors.grayscale[300]};
    border-color: ${theme.colors.grayscale[400]};
  `,
  plain: css`
    background: ${theme.colors.grayscale[300]};
  `,
  text: css``, // text는 active 없음 (텍스트처럼)
  disabled: css``, // disabled는 active 없음
};

const fullWidthStyle = css`
  width: 100%;
`;

const buttonContentWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
