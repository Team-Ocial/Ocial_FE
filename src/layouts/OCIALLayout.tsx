import { css } from '@emotion/react';
import { ReactNode } from 'react';
import PageHeader from '@/components/common/PageHeader';
import PageTabButtons from '@/components/common/PageTabButtons';
import { theme } from '@/styles/theme';
import { OCIAL_TABS } from '@/constants/navigation';

interface OCIALLayoutProps {
  title: string;
  children: ReactNode;
}

const OCIALLayout = ({ title, children }: OCIALLayoutProps) => {
  return (
    <div css={pageWrapper}>
      <PageHeader title={title} />
      <div css={contentWrapper}>
        <PageTabButtons tabs={OCIAL_TABS} />
        {children}
      </div>
    </div>
  );
};

export default OCIALLayout;

const pageWrapper = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
  margin-bottom: 180px;
`;
