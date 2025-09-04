import { ActivityCategory } from '@/types/activity.types';

export const ACTIVITY_CATEGORIES = ['원데이 클래스', '스터디'] as const;

export const ALL_ACTIVITIES_CATEGORY = '전체보기';

export type ActivityFilterCategory = (typeof ACTIVITY_CATEGORIES)[number] | typeof ALL_ACTIVITIES_CATEGORY;
