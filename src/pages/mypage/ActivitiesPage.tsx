import { css } from '@emotion/react';
import { MdMap, MdCalendarMonth } from 'react-icons/md';
import { useMemo, useState } from 'react';

import { theme } from '@/styles/theme';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';
import { ActivityInfo, ACTIVITY_CONSTANTS, ActivityMainCategory } from '@/types/activity.types';
import { ACTIVITY_LIST } from '@/mocks/data/activityData';
import { formatDate } from '@/utils/formatDate';
import Pagination from '@/components/common/Pagination';
import SquareButton from '@/components/common/SquareButton';

const ITEMS_PER_PAGE = 4;

const isDeadlineClosed = (deadline: string) => {
  return new Date(deadline).getTime() < Date.now();
};

const getCategoryLabel = (category: ActivityInfo['category']) => {
  return (
    ACTIVITY_CONSTANTS.FILTERS.find((filter) => filter.value === category)?.label ||
    String(category)
  );
};

const ActivitiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const activities = useMemo(() => ACTIVITY_LIST, []);
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);

  const scheduledCount = activities.filter(
    (activity) => new Date(activity.period.start).getTime() > Date.now()
  ).length;
  const totalCount = activities.length;

  return (
    <div css={pageContainer}>
      <MyPageHeader stats={{ scheduledCount, totalCount }} />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='activities' />
        <main css={mainContent}>
          <h1 css={pageTitle}>내 활동 보기</h1>
          <div css={contentArea}>
            <div css={activitiesList}>
              {activities
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((activity) => (
                  <div key={activity.id} css={activityCard}>
                    <div css={thumbnailWrapper}>
                      <img src={activity.thumbnail} alt={activity.title} css={thumbnailImage} />
                    </div>
                    <div css={activityContent}>
                      <div css={categoryBadge(activity.category)}>
                        {getCategoryLabel(activity.category)}
                      </div>
                      <h3 css={activityTitle}>{activity.title}</h3>
                      <div css={activityInfo}>
                        <span css={infoLabel}>
                          <MdCalendarMonth css={infoIcon} size={16} />
                          일시
                        </span>
                        <span css={infoValue}>
                          {formatDate(activity.period.start)} {activity.period.time.start} ~{' '}
                          {formatDate(activity.period.end)} {activity.period.time.end}
                        </span>
                      </div>
                      <div css={activityInfo}>
                        <span css={infoLabel}>
                          <MdMap css={infoIcon} size={16} />
                          주소
                        </span>
                        <span css={infoValue}>{activity.address}</span>
                      </div>
                      <div css={activityActions}>
                        <SquareButton
                          size='small'
                          variant='outlined'
                          disabled={isDeadlineClosed(activity.applyDeadline || activity.period.end)}
                        >
                          {isDeadlineClosed(activity.applyDeadline || activity.period.end)
                            ? '마감'
                            : '취소하기'}
                        </SquareButton>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div css={paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActivitiesPage;

const pageContainer = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 0.5rem;
`;

const mainContainer = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const mainContent = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const contentArea = css`
  background: ${theme.colors.white};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const activitiesList = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const activityCard = css`
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem;
  border-radius: 8px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[200]};
`;

const thumbnailWrapper = css`
  position: relative;
  width: 220px;
  min-width: 220px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
`;

const thumbnailImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const activityContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const categoryBadge = (category: ActivityInfo['category']) => css`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  ${category === ActivityMainCategory.ONE_DAY &&
  `
    background-color: ${theme.colors.white};
    color: ${theme.colors.grayscale[900]};
    border: 1px solid ${theme.colors.grayscale[200]};

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${theme.colors.blue[500]};
    }
  `}

  ${category === ActivityMainCategory.STUDY &&
  `
    background-color: ${theme.colors.white};
    color: ${theme.colors.grayscale[900]};
    border: 1px solid ${theme.colors.grayscale[200]};

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${theme.colors.secondary[500]};
    }
  `}

  ${category === '분과' &&
  `
    background-color: ${theme.colors.white};
    color: ${theme.colors.grayscale[900]};
    border: 1px solid ${theme.colors.grayscale[200]};

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${theme.colors.grayscale[500]};
    }
  `}
`;

const activityTitle = css`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.grayscale[900]};
  line-height: 1.4;
`;

const activityInfo = css`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const infoLabel = css`
  min-width: 60px;
  color: ${theme.colors.grayscale[500]};
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const infoIcon = css`
  color: ${theme.colors.blue[300]};
`;

const infoValue = css`
  color: ${theme.colors.grayscale[700]};
  font-size: 0.875rem;
`;

const activityActions = css`
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid ${theme.colors.grayscale[200]};
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
