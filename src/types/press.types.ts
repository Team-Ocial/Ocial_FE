export interface PressArticle {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  publisher: string;
  publishedAt: string;
}

export interface PressListResponse {
  articles: PressArticle[];
  total: number;
  currentPage: number;
  totalPages: number;
}
