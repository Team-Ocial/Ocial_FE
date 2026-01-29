import { useState, useEffect, useMemo } from 'react';
import { ActivityDetail } from '@/types/activity.types';
import { useLikesStore } from '@/store/useLikesStore';
import { getActivityDetail } from '@/api/activity';

interface UseActivityDetailReturn {
  activity: ActivityDetail | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useActivityDetail = (id: string): UseActivityDetailReturn => {
  const [activity, setActivity] = useState<ActivityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { likedActivities } = useLikesStore(); // 좋아요 상태 구독

  const fetchActivityDetail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const numericId = Number(id);
      const response = await getActivityDetail(numericId);
      setActivity(response.activity);
    } catch (err) {
      setError('활동 상세 정보를 불러오는데 실패했습니다.');
      setActivity(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 좋아요 상태가 반영된 활동 데이터
  const activityWithLikes = useMemo(() => {
    if (!activity) return null;

    const isLiked = likedActivities.includes(activity.id);
    const likeCount = isLiked ? activity.likes + 1 : activity.likes;

    return {
      ...activity,
      isLiked,
      likes: likeCount,
    };
  }, [activity, likedActivities]);

  useEffect(() => {
    if (id) {
      fetchActivityDetail();
    }
  }, [id]);

  return {
    activity: activityWithLikes, // 좋아요 상태가 반영된 데이터 반환
    isLoading,
    error,
    refetch: fetchActivityDetail,
  };
};
