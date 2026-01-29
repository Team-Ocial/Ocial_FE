// src/types/activity.types.ts

export enum ActivityStatus {
  OPEN = '모집 중',
  CLOSED = '모집 마감',
}

export enum ActivityMainCategory {
  ONE_DAY = '원데이 클래스',
  STUDY = '스터디',
}

export type ActivityCategory = ActivityMainCategory | '분과';

export interface CurriculumSection {
  title: string;
  items: string[];
}

export interface ActivityInfo {
  id: number;
  title: string;
  thumbnail: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  applyDeadline: string | null;
  status: ActivityStatus;
  category: ActivityCategory;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityDetail extends ActivityInfo {
  description: string;
  curriculum: string | null;
  guidelines: string | null;
}

export interface ActivityListResponse {
  activities: ActivityInfo[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export interface MyActivityListResponse {
  activities: ActivityInfo[];
  total: number;
  scheduledCount: number;
  currentPage: number;
  totalPages: number;
}
export interface ActivityDetailResponse {
  activity: ActivityDetail;
}
