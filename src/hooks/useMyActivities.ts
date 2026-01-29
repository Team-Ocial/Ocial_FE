import { useEffect, useState } from 'react';

import { ActivityInfo } from '@/types/activity.types';
import { getMyActivities } from '@/api/activity';

interface UseMyActivitiesReturn {
  activities: ActivityInfo[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  scheduledCount: number;
  totalPages: number;
  refetch: () => Promise<void>;
}

interface UseMyActivitiesProps {
  page?: number;
  itemsPerPage?: number;
}

export const useMyActivities = ({
  page = 1,
  itemsPerPage = 4,
}: UseMyActivitiesProps = {}): UseMyActivitiesReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<ActivityInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getMyActivities({ page, size: itemsPerPage });
      setActivities(response.activities);
      setTotalCount(response.total);
      setScheduledCount(response.scheduledCount);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('내 활동 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [page, itemsPerPage]);

  return {
    activities,
    isLoading,
    error,
    totalCount,
    scheduledCount,
    totalPages,
    refetch: fetchActivities,
  };
};
