import { css } from '@emotion/react';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/common/Button';
import ActivityCard from '@/components/common/ActivityCard';
import Pagination from '@/components/common/Pagination';
import { theme } from '@/styles/theme';
import { useActivity } from '@/hooks/useActivity';

type SortType = '최신순' | '인기순';

const ActivityListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체보기');
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const { activities, isLoading, error, totalPages } = useActivity({
    page: currentPage,
    category: selectedCategory,
    sort: selectedSort === '최신순' ? 'latest' : 'popular',
  });

  return (
    <div css={pageContainer}>
      <PageHeader
        title='새로운 배움과 만남이 시작되는 곳'
        description={
          '오셜은 배움과 네트워킹을 통해 함께 성장하고\n활발한 커뮤니티 문화를 만들어갑니다.'
        }
      />
      <div css={contentWrapper}>
        <div css={filterContainer}>
          <div css={categoryButtons}>
            <Button
              variant='filter'
              active={selectedCategory === '전체보기'}
              onClick={() => {
                setSelectedCategory('전체보기');
                setCurrentPage(1);
              }}
            >
              전체보기
            </Button>
            <Button
              variant='filter'
              active={selectedCategory === '원데이 클래스'}
              onClick={() => {
                setSelectedCategory('원데이 클래스');
                setCurrentPage(1);
              }}
            >
              원데이 클래스
            </Button>
            <Button
              variant='filter'
              active={selectedCategory === '스터디'}
              onClick={() => {
                setSelectedCategory('스터디');
                setCurrentPage(1);
              }}
            >
              소그룹
            </Button>
          </div>
          <div css={sortButtons}>
            <button
              css={[sortButtonStyle, selectedSort === '최신순' && sortButtonActiveStyle]}
              onClick={() => {
                setSelectedSort('최신순');
                setCurrentPage(1);
              }}
            >
              최신순
            </button>
            <div css={dividerStyle} />
            <button
              css={[sortButtonStyle, selectedSort === '인기순' && sortButtonActiveStyle]}
              onClick={() => {
                setSelectedSort('인기순');
                setCurrentPage(1);
              }}
            >
              인기순
            </button>
          </div>
        </div>

        {isLoading ? (
          <div css={messageStyle}>로딩 중...</div>
        ) : error ? (
          <div css={messageStyle}>{error}</div>
        ) : activities.length === 0 ? (
          <div css={messageStyle}>활동이 없습니다.</div>
        ) : (
          <>
            <div css={activitiesContainer}>
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
            <div css={paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityListPage;

const pageContainer = css`
  width: 100%;
`;

const contentWrapper = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  padding: 40px ${theme.layout.spacing.gutter} 80px;
`;

const filterContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const categoryButtons = css`
  display: flex;
  gap: 12px;
`;

const sortButtons = css`
  display: flex;
  align-items: center;
`;

const sortButtonStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[400]};
  background: none;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.grayscale[600]};
  }
`;

const sortButtonActiveStyle = css`
  color: ${theme.colors.grayscale[900]};
  font-weight: 600;
`;

const dividerStyle = css`
  width: 1px;
  height: 12px;
  background-color: ${theme.colors.grayscale[200]};
  margin: 0 8px;
`;

const messageStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.grayscale[400]};
  text-align: center;
  padding: 120px 0;
`;

const activitiesContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 60px;
`;
