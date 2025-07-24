import { css } from '@emotion/react';
import PageHeader from '@/components/common/PageHeader';

const HistoryPage = () => {
  return (
    <div css={historyContainer}>
      <PageHeader title={'데이터와 함께 걸어온 길,\n새로운 미래를 향해 나아갑니다.'} />
      {/* 페이지 컨텐츠 */}
    </div>
  );
};

export default HistoryPage;

const historyContainer = css`
  width: 100%;
`;
