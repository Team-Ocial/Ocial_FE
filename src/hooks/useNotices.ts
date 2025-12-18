import { useState, useEffect, useMemo } from 'react';
import { Notice } from '@/types/notice.types';
import { apiGet } from '@/api/client';
import { NOTICE_CONSTANTS } from '@/constants/notice';

// ============================================================================
// 1. 공통 타입 및 상수
// ============================================================================

const ITEMS_PER_PAGE = NOTICE_CONSTANTS.ITEMS_PER_PAGE;

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
});

// ============================================================================
// 3. useNotices - 공지사항 목록 조회
// ============================================================================

export const useNotices = (page = 1) => {
  const [allNotices, setAllNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 백엔드에서 정렬된 데이터를 받아오므로 프론트엔드 정렬 불필요
  const totalPages = Math.max(1, Math.ceil(allNotices.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pagedNotices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, allNotices]);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiGet<{ data: ApiNotice[] }>('/api/notices');
        const normalized = (response.data || []).map(normalizeNotice);
        setAllNotices(normalized);
      } catch (err) {
        console.error('공지사항 API 에러:', err);
        setError('공지사항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return { notices: pagedNotices, isLoading, error, totalPages, currentPage };
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
