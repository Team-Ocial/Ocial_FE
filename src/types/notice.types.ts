export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NoticeListResponse {
  notices: Notice[];
  total: number;
  currentPage: number;
  totalPages: number;
}
