import { css } from '@emotion/react';
import { theme } from '@/styles/theme';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader = ({ title, description, className }: PageHeaderProps) => {
  return (
    <section css={headerStyle} className={className}>
      <div css={containerStyle}>
        <h1 css={titleStyle}>{title}</h1>
        {description && <p css={descriptionStyle}>{description}</p>}
      </div>
    </section>
  );
};

export default PageHeader;

const headerStyle = css`
  width: 100%;
  background: ${theme.colors.white};
  // border: 2px solid red;
`;

const containerStyle = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 70px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  // border: 2px solid green;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge2};
  color: ${theme.colors.black};
  white-space: pre-line;
`;

const descriptionStyle = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.black};
  white-space: pre-line;
`;
