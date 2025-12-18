/**
 * 공지사항 관련 상수
 *
 * 백엔드 API 스펙과 동기화 필요 시 이 파일을 참고하세요.
 */

export const NOTICE_CONSTANTS = {
  /** 페이지당 공지사항 개수 (프론트엔드 기본값) */
  ITEMS_PER_PAGE: 8,

  /** 기본 작성자 이름 (API에서 제공하지 않을 경우 사용) */
  DEFAULT_AUTHOR: '관리자로 할 예정 뿌잉',
} as const;
