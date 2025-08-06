// src/types/activity.types.ts

/**
 * 활동의 현재 모집/진행 상태
 * @example "모집 중"
 */
export type ActivityStatus = '모집 마감' | '모집 중' | '수강 마감';

/**
 * 활동의 종류를 구분하는 카테고리
 * @example "스터디"
 */
export type ActivityCategory = '원데이 클래스' | '스터디';

/**
 * 커리큘럼의 섹션 구조
 */
export interface CurriculumSection {
  /** @example "1주차: 컴퓨터 비전 기초" */
  title: string;
  /** @example ["OpenCV 설치 및 기본 사용법", "이미지 입출력 및 색 공간 변환"] */
  items: string[];
}

/**
 * 활동의 기본 정보를 담는 인터페이스 (목록용)
 */
export interface ActivityInfo {
  /** @example "1" */
  id: string;
  /** @example "모집 중" */
  status: ActivityStatus;
  /** @example "스터디" */
  category: ActivityCategory;
  /** @example "Vision 스터디" */
  title: string;

  /** @example "Y-Space 광화문" */
  location: string;
  /** @example "서울 종로구 경희궁2길 8-4" */
  address: string;
  period: {
    /**
     * 활동 시작일 (ISO 8601 형식)
     * @example "2025-03-01T00:00:00.000Z"
     */
    start: string;
    /**
     * 활동 종료일 (ISO 8601 형식)
     * @example "2025-04-30T00:00:00.000Z"
     */
    end: string;
    time: {
      /**
       * 일일 활동 시작 시간 (HH:mm 형식)
       * @example "10:30"
       */
      start: string;
      /**
       * 일일 활동 종료 시간 (HH:mm 형식)
       * @example "12:30"
       */
      end: string;
    };
  };
  /** @example "/path/to/thumbnail.png" */
  thumbnail: string;
  /** @example 42 */
  likes: number;
  /** @example false */
  isLiked: boolean;
}

/**
 * 활동의 상세 정보를 담는 인터페이스
 */
export interface ActivityDetail extends ActivityInfo {
  /**
   * 활동에 대한 상세 설명 (줄글)
   * @example "비전 스터디는 컴퓨터 비전과 이미지 처리 기술을 함께 학습하는 프로그램입니다.\n\nOpenCV와 딥러닝 프레임워크를 활용하여 실전 프로젝트를 수행하며, 이론과 실습을 병행합니다."
   */
  description: string;
  /**
   * 커리큘럼 정보 (줄글 형태, 각 항목은 줄바꿈으로 구분)
   * @example "1주차: 기초 학습\n- 개념 이해하기\n- 실습 환경 설정\n\n2주차: 심화 학습\n- 응용 사례 분석"
   */
  curriculum?: string;
  /**
   * 활동 관련 안내사항 (줄글 형태, 각 항목은 줄바꿈으로 구분)
   * @example "- 노트북 필수 지참\n- Python 기초 문법 숙지 필요"
   */
  guidelines?: string;
}

/**
 * 활동 목록 조회 API 응답 타입
 */
export interface ActivityListResponse {
  activities: ActivityInfo[];
  total: number;
  currentPage: number;
  totalPages: number;
}

/**
 * 활동 상세 조회 API 응답 타입
 */
export interface ActivityDetailResponse {
  activity: ActivityDetail;
}
