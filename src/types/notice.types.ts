// ============================================================================
// API 응답 타입 (백엔드에서 받는 원본 데이터)
// ============================================================================

export interface ApiNotice {
  id: number | string;
  title: string;
  content: string;
  pinned?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// ============================================================================
// 프론트엔드 도메인 타입 (정규화된 데이터)
// ============================================================================

export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  pinned?: boolean;
}

// ============================================================================
// API 응답 타입
// ============================================================================

export interface NoticePageResponse {
  content: ApiNotice[]; // API에서 받는 원본 데이터 배열
  totalPages: number;
  number: number; // 0부터 시작 (하지만 API 요청은 1부터)
}
