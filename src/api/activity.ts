import {
  ActivityInfo,
  ActivityListResponse,
  ActivityDetailResponse,
  MyActivityListResponse,
} from '@/types/activity.types';
import { ACTIVITY_CONSTANTS, ActivityFilterCategory } from '@/constants/categories';
import { ACTIVITY_DETAILS, ACTIVITY_LIST } from '@/mocks/data/activityData';

type ActivitySort = 'latest' | 'popular';

interface GetActivitiesParams {
  page?: number;
  size?: number;
  category?: ActivityFilterCategory;
  sort?: ActivitySort;
}

interface GetMyActivitiesParams {
  page?: number;
  size?: number;
}

const mockDelay = async (ms = 300) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

const applyFilters = (
  activities: ActivityInfo[],
  category: ActivityFilterCategory,
  sort: ActivitySort
) => {
  let result = [...activities];

  if (category !== ACTIVITY_CONSTANTS.ALL) {
    result = result.filter((activity) => activity.category === category);
  }

  if (sort === 'latest') {
    result.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  } else {
    result.sort((a, b) => b.likes - a.likes);
  }

  return result;
};

export const getActivities = async ({
  page = 1,
  size = 12,
  category = ACTIVITY_CONSTANTS.ALL,
  sort = 'latest',
}: GetActivitiesParams = {}): Promise<ActivityListResponse> => {
  await mockDelay();

  const filtered = applyFilters(ACTIVITY_LIST, category, sort);
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * size;
  const activities = filtered.slice(startIndex, startIndex + size);

  return {
    activities,
    total,
    currentPage,
    totalPages,
  };
};

export const getActivityDetail = async (id: number): Promise<ActivityDetailResponse> => {
  await mockDelay();

  const activity = ACTIVITY_DETAILS[id];
  if (!activity) {
    throw new Error('Activity not found');
  }

  return { activity };
};

export const getMyActivities = async ({
  page = 1,
  size = 4,
}: GetMyActivitiesParams = {}): Promise<MyActivityListResponse> => {
  await mockDelay();

  const total = ACTIVITY_LIST.length;
  const scheduledCount = ACTIVITY_LIST.filter(
    (activity) => new Date(activity.startDate).getTime() > Date.now()
  ).length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * size;
  const activities = ACTIVITY_LIST.slice(startIndex, startIndex + size);

  return {
    activities,
    total,
    scheduledCount,
    currentPage,
    totalPages,
  };
};

export const cancelMyActivity = async (activityId: number) => {
  await mockDelay();
  return { activityId };
};
