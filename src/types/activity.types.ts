// src/types/activity.types.ts

export type ActivityStatus = '모집 마감' | '모집 중' | '수강 마감';

export type ActivityCategory = '원데이 클래스' | '스터디';

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
