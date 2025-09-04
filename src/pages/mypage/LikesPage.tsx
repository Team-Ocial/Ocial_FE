import { css } from '@emotion/react';
import { IoClose } from 'react-icons/io5';
import { MdLocationOn, MdCalendarMonth } from 'react-icons/md';
import { useState, useEffect } from 'react';

import { theme } from '@/styles/theme';
import Badge from '@/components/common/Badge';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';
import { useLikesStore } from '@/store/useLikesStore';
import { formatDate } from '@/utils/formatDate';
import Pagination from '@/components/common/Pagination';

const ITEMS_PER_PAGE = 4;

const LikesPage = () => {
  const { likedActivities, toggleLike, loadLikes } = useLikesStore();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(likedActivities.length / ITEMS_PER_PAGE);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  // 현재 페이지에 해당하는 활동들만 필터링
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentActivities = likedActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div css={pageContainer}>
      <MyPageHeader />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='likes' />
        <main css={mainContent}>
          <h1 css={pageTitle}>좋아요</h1>
          <div css={contentArea}>
            <div css={activitiesList}>
              {likedActivities.length === 0 ? (
                <div css={emptyState}>좋아요한 활동이 없습니다.</div>
              ) : (
                currentActivities.map((activity) => (
                  <div key={activity.id} css={activityCard}>
                    <div css={thumbnailWrapper}>
                      <img src={activity.thumbnail} alt={activity.title} css={thumbnailImage} />
                      <div css={badgeWrapper}>
                        <Badge variant='status'>{activity.status}</Badge>
                      </div>
                    </div>
                    <div css={activityContent}>
                      <div css={activityHeader}>
                        <Badge variant='category'>{activity.category}</Badge>
                        <button
                          css={closeButton}
                          onClick={() => toggleLike(activity)}
                          aria-label='좋아요 취소'
                        >
                          <IoClose size={20} />
                        </button>
                      </div>
                      <h3 css={activityTitle}>{activity.title}</h3>
                      <div css={activityInfo}>
                        <div css={infoItem}>
                          <MdCalendarMonth css={infoIcon} size={16} />
                          <span css={infoText}>
                            {formatDate(activity.period.start)}-{formatDate(activity.period.end)}{' '}
                            {activity.period.time.start} ~ {activity.period.time.end}
                          </span>
                        </div>
                        <div css={infoItem}>
                          <MdLocationOn css={infoIcon} size={16} />
                          <span css={infoText}>{activity.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {likedActivities.length > 0 && (
              <div css={paginationWrapper}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LikesPage;

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
`;

const badgeWrapper = css`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
`;

const activityContent = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  // padding: 0.5rem 0;
`;

const activityHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const closeButton = css`
  background: none;
  border: none;
  padding: 4px;
  color: ${theme.colors.grayscale[400]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.colors.grayscale[600]};
  }
`;

const activityTitle = css`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.grayscale[900]};
  line-height: 1.4;
`;

const activityInfo = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const infoItem = css`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
`;

const infoIcon = css`
  color: ${theme.colors.blue[300]};
  flex-shrink: 0;
  margin-top: 2px;
`;

const infoText = css`
  color: ${theme.colors.grayscale[600]};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const emptyState = css`
  text-align: center;
  padding: 3rem;
  color: ${theme.colors.grayscale[500]};
  font-size: 1rem;
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
