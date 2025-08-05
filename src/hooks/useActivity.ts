import { useState, useEffect, useMemo } from 'react';
import { ActivityInfo, ActivityListResponse } from '@/types/activity.types';
import { ACTIVITY_LIST } from '@/mocks/data/activityData';

interface UseActivityReturn {
  activities: ActivityInfo[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  refetch: () => Promise<void>;
}

interface UseActivityProps {
  page?: number;
  category?: string;
  sort?: 'latest' | 'popular';
}

const ITEMS_PER_PAGE = 12; // 한 페이지당 12개 표시 (3개씩 4줄)

export const useActivity = ({
  page = 1,
  category = '전체보기',
  sort = 'latest',
}: UseActivityProps = {}): UseActivityReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터링된 활동 목록
  const filteredActivities = useMemo(() => {
    let result = [...ACTIVITY_LIST];

    // 카테고리 필터링
    if (category !== '전체보기') {
      result = result.filter((activity) => activity.category === category);
    }

    // 정렬
    if (sort === 'latest') {
      result.sort(
        (a, b) => new Date(b.period.start).getTime() - new Date(a.period.start).getTime()
      );
    }
    // 인기순 정렬 로직은 추후 추가

    return result;
  }, [category, sort]);

  // 페이지네이션 계산
  const total = filteredActivities.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const activities = filteredActivities.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 실제 API 호출을 시뮬레이션하기 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      setError('활동 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [page, category, sort]);

  return {
    activities,
    isLoading,
    error,
    total,
    currentPage,
    totalPages,
    refetch: fetchActivities,
  };
};
