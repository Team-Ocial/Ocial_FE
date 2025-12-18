export interface Notice {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

export interface NoticeListResponse {
  notices: Notice[];
  total: number;
  currentPage: number;
  totalPages: number;
}
