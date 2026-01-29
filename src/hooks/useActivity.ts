import { useState, useEffect, useMemo } from 'react';
import { ActivityInfo } from '@/types/activity.types';
import { useLikesStore } from '@/store/useLikesStore';
import { ActivityFilterCategory, ACTIVITY_ALL } from '@/constants/categories';
import { getActivities } from '@/api/activity';

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
  category = ACTIVITY_ALL,
  sort = 'latest',
}: UseActivityProps = {}): UseActivityReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(1);
  const { likedActivities } = useLikesStore(); // 좋아요 상태 구독

  const activitiesWithLikes = useMemo(() => {
    return activities.map((activity) => {
      const isLiked = likedActivities.includes(activity.id);
      const likeCount = isLiked ? activity.likes + 1 : activity.likes;
      return {
        ...activity,
        isLiked,
        likes: likeCount,
      };
    });
  }, [activities, likedActivities]);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getActivities({
        page,
        size: ITEMS_PER_PAGE,
        category,
        sort,
      });
      setActivities(response.activities);
      setTotal(response.total);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
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
    activities: activitiesWithLikes,
    isLoading,
    error,
    total,
    currentPage,
    totalPages,
    refetch: fetchActivities,
  };
};
