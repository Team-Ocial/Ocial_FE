import { useState, useEffect } from 'react';
import { ActivityDetail } from '@/types/activity.types';
import { ACTIVITY_DETAILS } from '@/mocks/data/activityData';

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

  const fetchActivityDetail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // API 연동 시 실제 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      const mockActivity = ACTIVITY_DETAILS[id];

      if (mockActivity) {
        setActivity(mockActivity);
      } else {
        throw new Error('Activity not found');
      }
    } catch (err) {
      setError('활동 상세 정보를 불러오는데 실패했습니다.');
      setActivity(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchActivityDetail();
    }
  }, [id]);

  return {
    activity,
    isLoading,
    error,
    refetch: fetchActivityDetail,
  };
};
