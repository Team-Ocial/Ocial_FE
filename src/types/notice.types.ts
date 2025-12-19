export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  pinned?: boolean;
}

export interface NoticePageResponse {
  content: Notice[];
  totalPages: number;
  number: number; // 0부터 시작 (하지만 API 요청은 1부터)
}
