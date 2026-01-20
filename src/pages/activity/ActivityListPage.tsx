import { css } from '@emotion/react';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Button from '@/components/common/Button';
import ActivityCard from '@/components/common/ActivityCard';
import Pagination from '@/components/common/Pagination';
import { theme } from '@/styles/theme';
import { useActivity } from '@/hooks/useActivity';
import { ACTIVITY_CONSTANTS, ActivityFilterCategory } from '@/types/activity.types';
import { useNavigate } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

type SortType = '최신순' | '인기순';

const ActivityListPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<ActivityFilterCategory>(
    ACTIVITY_CONSTANTS.ALL
  );
  const [selectedSort, setSelectedSort] = useState<SortType>('최신순');
  const [currentPage, setCurrentPage] = useState(1);

  const { activities, isLoading, error, totalPages } = useActivity({
    page: currentPage,
    category: selectedCategory,
    sort: selectedSort === '최신순' ? 'latest' : 'popular',
  });

  const handleCategoryClick = (category: ActivityFilterCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

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
              active={selectedCategory === ACTIVITY_CONSTANTS.ALL}
              onClick={() => handleCategoryClick(ACTIVITY_CONSTANTS.ALL)}
            >
              {ACTIVITY_CONSTANTS.ALL}
            </Button>
            {ACTIVITY_CONSTANTS.FILTERS.map((filter) => (
              <Button
                key={filter.label}
                variant='filter'
                active={selectedCategory === filter.value}
                onClick={() => handleCategoryClick(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div css={actionsContainer}>
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
            <button
              css={createButtonStyle}
              onClick={() => navigate('/activity/new')}
              title='활동 등록'
            >
              <MdAdd size={18} />
              <span>추가등록</span>
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

const actionsContainer = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const createButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  border: 1px solid ${theme.colors.primary[600]};
  border-radius: 8px;
  background-color: transparent;
  color: ${theme.colors.primary[600]};
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${theme.colors.primary[600]};
    color: ${theme.colors.white};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
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
