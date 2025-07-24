import { css } from '@emotion/react';
import PageHeader from '@/components/common/PageHeader';

const MembersPage = () => {
  return (
    <div css={pageContainer}>
      <PageHeader title={'오셜을 만들어가는 사람들\nTeam. OCIAL'} />
      {/* 페이지 컨텐츠 */}
    </div>
  );
};

export default MembersPage;

// Styles
const pageContainer = css`
  width: 100%;
`;
