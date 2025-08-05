import { useState, useEffect } from 'react';
import { PressArticle } from '@/types/press.types';
import { PRESS_LIST } from '@/mocks/data/pressData';

const ITEMS_PER_PAGE = 9;

export const usePress = (page = 1) => {
  const [articles, setArticles] = useState<PressArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPages = Math.ceil(PRESS_LIST.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages);

  useEffect(() => {
    const fetchPress = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // API 연동 시 실제 API 호출로 대체
        await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        setArticles(PRESS_LIST.slice(startIndex, startIndex + ITEMS_PER_PAGE));
      } catch (err) {
        setError('보도자료를 불러오는데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPress();
  }, [currentPage]);

  return { articles, isLoading, error, totalPages, currentPage };
};
