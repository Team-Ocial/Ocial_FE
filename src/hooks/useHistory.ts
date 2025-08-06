import { useState, useEffect } from 'react';
import { HistoryData } from '@/types/history.types';
import { INITIAL_HISTORY_DATA } from '@/mocks/data/historyData';

interface UseHistoryReturn {
  data: HistoryData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useHistory = (): UseHistoryReturn => {
  const [data, setData] = useState<HistoryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 개발 환경에서는 짧은 지연 시간 사용
      await new Promise((resolve) => setTimeout(resolve, 300));
      setData(INITIAL_HISTORY_DATA);
    } catch (err) {
      setError('히스토리 데이터를 불러오는데 실패했습니다.');
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchHistory,
  };
};
