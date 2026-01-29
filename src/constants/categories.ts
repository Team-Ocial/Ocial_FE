//

import { ActivityMainCategory } from '@/types/activity.types';

export const ACTIVITY_ALL = '전체보기';
export const EXTRA_ACTIVITY_CATEGORY = '분과';

export const ACTIVITY_FILTERS = [
  { label: '원데이 클래스', value: ActivityMainCategory.ONE_DAY },
  { label: '스터디', value: ActivityMainCategory.STUDY },
  { label: '분과', value: EXTRA_ACTIVITY_CATEGORY },
] as const;

export const ACTIVITY_CONSTANTS = {
  ALL: ACTIVITY_ALL,
  FILTERS: ACTIVITY_FILTERS,
} as const;

export type ActivityFilterCategory =
  | ActivityMainCategory
  | typeof EXTRA_ACTIVITY_CATEGORY
  | typeof ACTIVITY_ALL;

// 타입 가드
export const isMainCategory = (
  category: ActivityFilterCategory
): category is ActivityMainCategory => {
  return category !== ACTIVITY_ALL;
};
