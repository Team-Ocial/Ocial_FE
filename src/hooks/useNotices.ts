import { useState, useEffect, useMemo } from 'react';
import { Notice } from '@/types/notice.types';
import { NOTICE_LIST } from '@/mocks/data/noticeData';

const ITEMS_PER_PAGE = 8;

export const useNotices = (page = 1) => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 정렬된 전체 목록 (한 번만 계산)
  const sortedList = useMemo(() =>
    [...NOTICE_LIST].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    []
  );

  const totalPages = Math.ceil(sortedList.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages);

  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        setNotices(sortedList.slice(startIndex, startIndex + ITEMS_PER_PAGE));
      } catch (err) {
        setError('공지사항을 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, [currentPage, sortedList]);

  return { notices, isLoading, error, totalPages, currentPage };
};
