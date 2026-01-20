//

import { ActivityMainCategory } from '@/types/activity.types';

export const ALL_ACTIVITIES_CATEGORY = '전체보기';
export const EXTRA_ACTIVITY_CATEGORY = '분과';

export const ACTIVITY_CATEGORIES = Object.values(ActivityMainCategory);

export const CATEGORY_DISPLAY_NAMES: Record<ActivityMainCategory, string> = {
  [ActivityMainCategory.STUDY]: '소그룹',
  [ActivityMainCategory.ONE_DAY]: '원데이 클래스',
};

export type ActivityFilterCategory =
  | ActivityMainCategory
  | typeof EXTRA_ACTIVITY_CATEGORY
  | typeof ALL_ACTIVITIES_CATEGORY;

// 타입 가드
export const isMainCategory = (
  category: ActivityFilterCategory
): category is ActivityMainCategory => {
  return category !== ALL_ACTIVITIES_CATEGORY;
};
