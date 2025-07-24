import { css } from '@emotion/react';
import PageHeader from '@/components/common/PageHeader';

const NoticePage = () => {
  return (
    <div css={pageContainer}>
      <PageHeader title={'우리의 연결이\n새로운 가능성을 만듭니다.'} />
    </div>
  );
};

export default NoticePage;

// Styles
const pageContainer = css`
  width: 100%;
`;
