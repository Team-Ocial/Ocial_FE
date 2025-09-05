import { useState, useEffect, useMemo } from 'react';
import { ActivityInfo } from '@/types/activity.types';
import { ACTIVITY_LIST } from '@/mocks/data/activityData';
import { useLikesStore } from '@/store/useLikesStore';
import { ActivityFilterCategory, ALL_ACTIVITIES_CATEGORY } from '@/constants/categories';

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
  category?: ActivityFilterCategory;
  sort?: 'latest' | 'popular';
}

const ITEMS_PER_PAGE = 12; // 한 페이지당 12개 표시 (3개씩 4줄)

export const useActivity = ({
  page = 1,
  category = ALL_ACTIVITIES_CATEGORY,
  sort = 'latest',
}: UseActivityProps = {}): UseActivityReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { likedActivities } = useLikesStore(); // 좋아요 상태 구독

  // 필터링된 활동 목록 (좋아요 상태 반영)
  const filteredActivities = useMemo(() => {
    let result = [...ACTIVITY_LIST];

    // 카테고리 필터링
    if (category !== ALL_ACTIVITIES_CATEGORY) {
      result = result.filter((activity) => activity.category === category);
    }

    // 좋아요 상태 업데이트
    result = result.map((activity) => {
      const isLiked = likedActivities.includes(activity.id);
      const likeCount = isLiked ? activity.likes + 1 : activity.likes;

      return {
        ...activity,
        isLiked,
        likes: likeCount,
      };
    });

    // 정렬
    if (sort === 'latest') {
      result.sort(
        (a, b) => new Date(b.period.start).getTime() - new Date(a.period.start).getTime()
      );
    } else if (sort === 'popular') {
      result.sort((a, b) => b.likes - a.likes); // 좋아요 순 정렬
    }

    return result;
  }, [category, sort, likedActivities]); // likedActivities 의존성 추가

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
