import { css } from '@emotion/react';
import { MdLocationOn, MdCalendarMonth } from 'react-icons/md';
import { useState } from 'react';

import { theme } from '@/styles/theme';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';
import { MyActivity } from '@/types/myActivity.types';
import Pagination from '@/components/common/Pagination';
import thumbnail1 from '@/assets/images/thumbnail1.png';
import thumbnail2 from '@/assets/images/thumbnail2.png';

const mockActivities: MyActivity[] = [
  {
    id: '1',
    type: '예정된 활동',
    status: '신청이 완료',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail1,
  },
  {
    id: '2',
    type: '활동 중',
    status: '스터디',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail2,
  },
  {
    id: '3',
    type: '수료',
    status: '스터디',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail1,
  },
  {
    id: '4',
    type: '수료',
    status: '스터디',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail2,
  },
  {
    id: '5',
    type: '활동 중',
    status: '스터디',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail1,
  },
  {
    id: '6',
    type: '예정된 활동',
    status: '스터디',
    title: '종료되는 한 해, 새로운 시작을 준비다',
    date: '2025.03.01 오전 10시 30분 ~ 오후 5시',
    location: '서울 종로구 경희궁2길 8-4 (뉴욕 시립 및 공공 연극) Y.Space 광화문',
    thumbnail: thumbnail2,
  },
];

const ITEMS_PER_PAGE = 4;

const ActivitiesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockActivities.length / ITEMS_PER_PAGE);

  return (
    <div css={pageContainer}>
      <MyPageHeader />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='activities' />
        <main css={mainContent}>
          <h1 css={pageTitle}>내 활동 보기</h1>
          <div css={contentArea}>
            <div css={filterTabs}>
              <button css={[filterTab, filterTabActive]}>전체보기</button>
              <button css={filterTab}>예정된 활동</button>
              <button css={filterTab}>활동 중</button>
              <button css={filterTab}>수료</button>
            </div>
            <div css={activitiesList}>
              {mockActivities
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((activity) => (
                  <div key={activity.id} css={activityCard}>
                    <div css={thumbnailWrapper}>
                      <img src={activity.thumbnail} alt={activity.title} css={thumbnailImage} />
                    </div>
                    <div css={activityContent}>
                      <div css={activityType(activity.type)}>{activity.type}</div>
                      <h3 css={activityTitle}>{activity.title}</h3>
                      <div css={activityInfo}>
                        <span css={infoLabel}>
                          <MdCalendarMonth css={infoIcon} size={16} />
                          일시
                        </span>
                        <span css={infoValue}>{activity.date}</span>
                      </div>
                      <div css={activityInfo}>
                        <span css={infoLabel}>
                          <MdLocationOn css={infoIcon} size={16} />
                          장소
                        </span>
                        <span css={infoValue}>{activity.location}</span>
                      </div>
                      <div css={activityActions}>
                        {activity.type === '예정된 활동' && (
                          <button css={actionButton}>취소하기</button>
                        )}
                        {activity.type === '활동 중' && <div css={statusButton}>활동 중</div>}
                        {activity.type === '수료' && (
                          <button css={[actionButton, certificateButton]}>수료증 보기</button>
                        )}
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

const filterTabs = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const filterTab = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: 1px solid transparent;
  box-sizing: border-box;
  ${theme.typography.textSmall2}
  border-radius: 6px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid ${theme.colors.grayscale[100]};
  color: ${theme.colors.grayscale[800]};
  height: 32px;

  &:hover:not(:disabled) {
    background: ${theme.colors.grayscale[50]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const filterTabActive = css`
  background: ${theme.colors.grayscale[800]};
  color: ${theme.colors.white};
  border-color: ${theme.colors.grayscale[800]};
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

const activityType = (type: string) => css`
  margin-bottom: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  ${type === '예정된 활동' &&
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

  ${type === '활동 중' &&
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

  ${type === '수료' &&
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

const actionButton = css`
  padding: 0.5rem 1rem;
  border: 1px solid ${theme.colors.grayscale[300]};
  border-radius: 4px;
  background: none;
  color: ${theme.colors.grayscale[700]};
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.colors.grayscale[100]};
  }
`;

const statusButton = css`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: ${theme.colors.white};
  color: ${theme.colors.grayscale[500]};
  font-size: 0.875rem;
  cursor: default;
`;

const certificateButton = css`
  background: ${theme.colors.grayscale[100]};
  color: ${theme.colors.grayscale[700]};
  border: none;

  &:hover {
    background: ${theme.colors.grayscale[200]};
  }
`;

const paginationWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
