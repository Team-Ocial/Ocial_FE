import { css } from '@emotion/react';
import { ButtonHTMLAttributes } from 'react';
import { theme } from '@/styles/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'menu' | 'filter';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  active?: boolean;
  width?: string | number;
}

const Button = ({
  children,
  variant = 'filled',
  size = 'medium',
  fullWidth = false,
  active = false,
  width,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={[
        buttonBase,
        sizes[size],
        variants[variant],
        active && activeStyles[variant],
        !active && hoverStyles[variant],
        fullWidth && fullWidthStyle,
        width &&
          css`
            width: ${typeof width === 'number' ? `${width}px` : width};
          `,
      ]}
      {...props}
    >
      <div css={buttonContentWrapper}>
        <span>{children}</span>
      </div>
    </button>
  );
};

export default Button;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  box-sizing: border-box;
  ${theme.typography.textSmall}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const sizes = {
  small: css`
    padding: 6px 14px;
    height: 33px;
    ${theme.typography.textSmall2}
  `,
  medium: css`
    padding: 14px 24px;
    height: 48px;
    ${theme.typography.labelSmall}
  `,
  large: css`
    padding: 14px 24px;
    height: 48px;
    min-width: 320px;
    ${theme.typography.labelSmall}
  `,
};

const variants = {
  filled: css`
    border-radius: 999px;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.black};
  `,
  outlined: css`
    border-radius: 999px;
    background: transparent;
    color: ${theme.colors.black};
    border: 1px solid ${theme.colors.grayscale[800]};
  `,
  menu: css`
    border-radius: 999px;
    background: transparent;
    color: ${theme.colors.black};
    border: 1px solid ${theme.colors.grayscale[800]};
    ${theme.typography.labelSmall}
  `,
  filter: css`
    border-radius: 6px;
    padding: 6px 14px;
    background: transparent;
    border: 2px solid ${theme.colors.grayscale[100]};
    color: ${theme.colors.grayscale[900]};
    height: auto;
    min-height: 33px;
    ${theme.typography.textSmall2}
  `,
};

const hoverStyles = {
  filled: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[800]};
    }
  `,
  outlined: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[100]};
    }
  `,
  menu: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[100]};
    }
  `,
  filter: css`
    &:hover:not(:disabled) {
      background: ${theme.colors.grayscale[50]};
    }
  `,
};

const activeStyles = {
  filled: css`
    background: ${theme.colors.grayscale[800]};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.grayscale[800]};
  `,
  outlined: css`
    background: ${theme.colors.grayscale[50]};
    color: ${theme.colors.black};
    border: 1px solid ${theme.colors.grayscale[800]};
  `,
  menu: css`
    background: ${theme.colors.black};
    color: ${theme.colors.white};
    border: 1px solid ${theme.colors.black};
  `,
  filter: css`
    background: ${theme.colors.grayscale[800]};
    color: ${theme.colors.white};
    border-color: ${theme.colors.grayscale[800]};
  `,
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
