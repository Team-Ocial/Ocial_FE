import { css } from '@emotion/react';
import PageHeader from '@/components/common/PageHeader';
import PageTabButtons from '@/components/common/PageTabButtons';
import { theme } from '@/styles/theme';

const NoticePage = () => {
  return (
    <div css={pageContainer}>
      <PageHeader title={'우리의 연결이\n새로운 가능성을 만듭니다.'} />
      <div css={contentWrapper}>
        <PageTabButtons
          tabs={[
            { label: '보도자료', path: '/news/press' },
            { label: '공지사항', path: '/news/notice' },
          ]}
        />
      </div>
    </div>
  );
};

export default NoticePage;

// Styles
const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 0 ${theme.layout.spacing.gutter};
`;
