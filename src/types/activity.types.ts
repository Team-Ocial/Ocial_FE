// src/types/activity.types.ts

export enum ActivityStatus {
  CLOSED = '모집 마감',
  OPEN = '모집 중',
  COMPLETED = '수강 마감',
}

export enum ActivityMainCategory {
  ONE_DAY = '원데이 클래스',
  STUDY = '스터디',
}

export type ActivityCategory = ActivityMainCategory | '분과';

// =========================================================
// Activity 관련 상수 및 유틸리티
// =========================================================

/**
 * 활동 카테고리 필터링 관련 상수
 */
export const ACTIVITY_CONSTANTS = {
  /** 전체보기 필터 옵션 */
  ALL: '전체보기' as const,

  /** 활동 카테고리 필터 목록 */
  FILTERS: [
    { label: '원데이클래스', value: ActivityMainCategory.ONE_DAY },
    { label: '소모임', value: ActivityMainCategory.STUDY },
    { label: '분과', value: '분과' },
  ] as const,
} as const;

/**
 * 활동 필터링 타입
 */
export type ActivityFilterCategory =
  | ActivityMainCategory
  | '분과'
  | typeof ACTIVITY_CONSTANTS.ALL;

export interface CurriculumSection {
  title: string;
  items: string[];
}

export interface ActivityInfo {
  id: string;
  status: ActivityStatus;
  category: ActivityCategory;
  title: string;

  /** @example "서울 종로구 경희궁2길 8-4" */
  address: string;
  period: {
    start: string;
    end: string;
    time: {
      start: string;
      end: string;
    };
  };
  applyDeadline?: string;
  thumbnail: string;
  likes: number;
  isLiked: boolean;
}

export interface ActivityDetail extends ActivityInfo {
  description: string;
  curriculum?: string;
  guidelines?: string;
}

export interface ActivityListResponse {
  activities: ActivityInfo[];
  total: number;
  currentPage: number;
  totalPages: number;
}
export interface ActivityDetailResponse {
  activity: ActivityDetail;
}
