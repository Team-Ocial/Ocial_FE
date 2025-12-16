import { useState, useEffect } from 'react';
import { Notice } from '@/types/notice.types';
import { NOTICE_LIST } from '@/mocks/data/noticeData';

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
      // API 연동 시 실제 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

      const mockNotice = NOTICE_LIST.find((n) => n.id === id);

      if (mockNotice) {
        // TODO: 실제 API 연동 시 조회수 증가 API 호출
        setNotice(mockNotice);
      } else {
        throw new Error('Notice not found');
      }
    } catch (err) {
      setError('공지사항을 불러오는데 실패했습니다.');
      setNotice(null);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotice = async (): Promise<boolean> => {
    try {
      // API 연동 시 실제 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay

      const index = NOTICE_LIST.findIndex((n) => n.id === id);
      if (index !== -1) {
        NOTICE_LIST.splice(index, 1);
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    if (id) {
      fetchNoticeDetail();
    }
  }, [id]);

  return {
    notice,
    isLoading,
    error,
    refetch: fetchNoticeDetail,
    deleteNotice,
  };
};
