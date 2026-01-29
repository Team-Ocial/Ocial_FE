import { css } from '@emotion/react';
import { MdMap, MdCalendarMonth } from 'react-icons/md';
import { useState } from 'react';

import { theme } from '@/styles/theme';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';
import { ActivityInfo, ActivityMainCategory } from '@/types/activity.types';
import { ACTIVITY_CONSTANTS } from '@/constants/categories';
import { formatDate } from '@/utils/formatDate';
import Pagination from '@/components/common/Pagination';
import SquareButton from '@/components/common/SquareButton';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useMyActivities } from '@/hooks/useMyActivities';
import { cancelMyActivity } from '@/api/activity';
import { isDeadlineClosed } from '@/utils/activity';
import { FALLBACK_IMAGE } from '@/utils/image';
import { useModalStore } from '@/store/useModalStore';
import { useToast } from '@/hooks/useToast';

const ITEMS_PER_PAGE = 4;
const getCategoryLabel = (category: ActivityInfo['category']) => {
  return (
    ACTIVITY_CONSTANTS.FILTERS.find((filter) => filter.value === category)?.label ||
    String(category)
  );
};

const ActivitiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { openModal } = useModalStore();
  const toast = useToast();
  const { activities, isLoading, error, totalCount, scheduledCount, totalPages, refetch } =
    useMyActivities({
      page: currentPage,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const handleCancel = (activityId: number) => {
    openModal({
      type: 'warning',
      title: '활동 취소',
      desc: '정말로 취소하시겠어요?\n취소 후에는 되돌릴 수 없어요.',
      actionButton: '취소하기',
      onAction: async () => {
        try {
          await cancelMyActivity(activityId);
          toast.success('활동이 취소되었습니다.');
          await refetch();
        } catch (err) {
          toast.error('활동 취소에 실패했습니다.');
        }
      },
    });
  };

  return (
    <div css={pageContainer}>
      <MyPageHeader stats={{ scheduledCount, totalCount }} />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='activities' />
        <main css={mainContent}>
          <h1 css={pageTitle}>내 활동 보기</h1>
          <div css={contentArea}>
            {isLoading ? (
              <LoadingState height={300} />
            ) : error ? (
              <ErrorState message={error} height={300} />
            ) : activities.length === 0 ? (
              <div css={emptyState}>내 활동이 없습니다.</div>
            ) : (
              <>
                <div css={activitiesList}>
                  {activities.map((activity) => (
                    <div key={activity.id} css={activityCard}>
                      <div css={thumbnailWrapper}>
                        <img
                          src={activity.thumbnail || FALLBACK_IMAGE}
                          alt={activity.title}
                          css={thumbnailImage}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
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
                          {formatDate(activity.startDate)} {activity.startTime} ~{' '}
                          {formatDate(activity.endDate)} {activity.endTime}
                          </span>
                        </div>
                        <div css={activityInfo}>
                          <span css={infoLabel}>
                            <MdMap css={infoIcon} size={16} />
                            주소
                          </span>
                        <span css={infoValue}>{activity.location}</span>
                        </div>
                        <div css={activityActions}>
                          <SquareButton
                            size='small'
                            variant='outlined'
                          disabled={isDeadlineClosed(activity.applyDeadline, activity.endDate)}
                            onClick={() => handleCancel(activity.id)}
                          >
                            {isDeadlineClosed(activity.applyDeadline, activity.endDate)
                              ? '마감'
                              : '취소하기'}
                          </SquareButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div css={paginationWrapper}>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
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

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
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

const emptyState = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: ${theme.colors.grayscale[500]};
  ${theme.typography.textLarge};
`;

const activityCard = css`
  display: flex;
  gap: 1.5rem;
  padding: 1.25rem;
  border-radius: 8px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[200]};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const thumbnailWrapper = css`
  position: relative;
  width: 220px;
  min-width: 220px;
  height: 140px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${theme.colors.grayscale[100]};

  @media (max-width: 900px) {
    width: 100%;
    min-width: auto;
  }
`;

const thumbnailImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
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
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 0.25rem;
  }
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
  word-break: keep-all;
  overflow-wrap: anywhere;
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
