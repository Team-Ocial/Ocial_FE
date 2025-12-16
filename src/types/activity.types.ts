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

export type ActivityCategory = ActivityMainCategory;

// =========================================================
// Activity 관련 상수 및 유틸리티
// =========================================================

/**
 * 활동 카테고리 필터링 관련 상수
 */
export const ACTIVITY_CONSTANTS = {
  /** 전체보기 필터 옵션 */
  ALL: '전체보기' as const,

  /** 활동 카테고리 목록 */
  CATEGORIES: Object.values(ActivityMainCategory),

  /** 카테고리 표시 이름 */
  DISPLAY_NAMES: {
    [ActivityMainCategory.STUDY]: '소그룹',
    [ActivityMainCategory.ONE_DAY]: '원데이 클래스',
  } as const,
} as const;

/**
 * 활동 필터링 타입
 */
export type ActivityFilterCategory = ActivityMainCategory | typeof ACTIVITY_CONSTANTS.ALL;

/**
 * 카테고리가 메인 카테고리인지 확인하는 타입 가드
 */
export const isMainCategory = (
  category: ActivityFilterCategory
): category is ActivityMainCategory => {
  return category !== ACTIVITY_CONSTANTS.ALL;
};

export interface CurriculumSection {
  title: string;
  items: string[];
}

export interface ActivityInfo {
  id: string;
  status: ActivityStatus;
  category: ActivityCategory;
  title: string;

  /** @example "Y-Space 광화문" */
  location: string;
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
