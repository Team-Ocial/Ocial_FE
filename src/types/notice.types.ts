export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  views: number;
}

export interface NoticeListResponse {
  notices: Notice[];
  total: number;
  currentPage: number;
  totalPages: number;
}
