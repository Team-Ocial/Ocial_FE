import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface BadgeProps {
  variant: 'status';
  children: string;
}

const Badge = ({ variant, children }: BadgeProps) => {
  return <span css={[badgeStyle, getBadgeStyle(variant, children)]}>{children}</span>;
};

export default Badge;

const badgeStyle = css`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  ${theme.typography.textSmall2};
  margin-bottom: 10px;
`;

const getBadgeStyle = (_variant: BadgeProps['variant'], value: string) => {
  switch (value) {
    case '모집 중':
      return css`
        background: ${theme.colors.black};
        color: ${theme.colors.white};
        border: 1px solid ${theme.colors.grayscale[700]};
      `;
    case '모집 마감':
      return css`
        background: ${theme.colors.grayscale[50]};
        color: ${theme.colors.black};
        border: 1px solid ${theme.colors.grayscale[200]};
      `;
    case '수강 마감':
      return css`
        background: ${theme.colors.grayscale[300]};
        color: ${theme.colors.black};
        border: 1px solid ${theme.colors.grayscale[700]};
      `;
    default:
      return css`
        background: ${theme.colors.white};
        color: ${theme.colors.black};
      `;
  }
};
