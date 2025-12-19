import { useState, useEffect } from 'react';
import { Notice, NoticePageResponse } from '@/types/notice.types';
import { apiGet } from '@/api/client';
import { NOTICE_CONSTANTS } from '@/constants/notice';

// ============================================================================
// 1. 공통 타입 및 상수
// ============================================================================

type ApiNotice = {
  id: number | string;
  title: string;
  content: string;
  pinned?: boolean;
  createdAt: string;
  updatedAt?: string;
};

// ============================================================================
// 2. 공통 유틸리티 함수
// ============================================================================

const normalizeNotice = (notice: ApiNotice): Notice => ({
  id: String(notice.id),
  title: notice.title,
  content: notice.content,
  author: NOTICE_CONSTANTS.DEFAULT_AUTHOR,
  createdAt: notice.createdAt,
  updatedAt: notice.updatedAt,
  pinned: notice.pinned,
});

// ============================================================================
// 3. useNotices - 공지사항 목록 조회 (서버 사이드 페이지네이션)
// ============================================================================

export const useNotices = (page = 1) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // 백엔드: page는 1부터 시작, pageSize는 10으로 고정
        // 응답 구조: { data: { content: [...], totalPages: ..., number: ... } }
        const response = await apiGet<{ data: NoticePageResponse }>(`/api/notices?page=${page}`);

        // Spring Page 구조에서 데이터 추출
        const normalized = (response.data.content || []).map(normalizeNotice);
        setNotices(normalized);
        setTotalPages(response.data.totalPages || 1);
        // number는 0부터 시작하지만, 프론트엔드는 1부터 사용
        setCurrentPage((response.data.number || 0) + 1);
      } catch (err) {
        console.error('공지사항 API 에러:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
        setNotices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [page]);

  return { notices, isLoading, error, totalPages, currentPage };
};

// ============================================================================
// 4. useNoticeDetail - 공지사항 상세 조회
// ============================================================================

interface UseNoticeDetailReturn {
  notice: Notice | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  deleteNotice: () => Promise<boolean>;
}

export const useNoticeDetail = (id: string): UseNoticeDetailReturn => {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNoticeDetail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiGet<{ data: ApiNotice }>(`/api/notices/${id}`);
      setNotice(normalizeNotice(response.data));
    } catch (err) {
      console.error('공지 상세 API 에러:', err);
      setError('공지사항을 불러오는데 실패했습니다.');
      setNotice(null);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotice = async (): Promise<boolean> => {
    // DELETE /api/notices/{id} 생기면 여기서 사용
    return false;
  };

  useEffect(() => {
    if (!id) {
      setNotice(null);
      setIsLoading(false);
      return;
    }
    fetchNoticeDetail();
  }, [id]);

  return {
    notice,
    isLoading,
    error,
    refetch: fetchNoticeDetail,
    deleteNotice,
  };
};
