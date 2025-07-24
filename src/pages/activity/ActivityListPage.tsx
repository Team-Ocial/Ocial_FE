import { css } from '@emotion/react';
import PageHeader from '@/components/common/PageHeader';

const ActivityListPage = () => {
  return (
    <div css={pageContainer}>
      <PageHeader
        title='새로운 배움과 만남이 시작되는 곳'
        description={
          '오셜은 배움과 네트워킹을 통해 함께 성장하고\n활발한 커뮤니티 문화를 만들어갑니다.'
        }
      />
    </div>
  );
};

export default ActivityListPage;

// Styles
const pageContainer = css`
  width: 100%;
`;
