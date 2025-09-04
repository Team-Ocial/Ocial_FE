import { create } from 'zustand';
import { ActivityInfo } from '@/types/activity.types';

interface LikesState {
  likedActivities: ActivityInfo[];
  toggleLike: (activity: ActivityInfo) => void;
  isLiked: (activityId: string) => boolean;
  loadLikes: () => void;
}

const LIKES_STORAGE_KEY = 'likedActivities';

const getStoredLikes = (): ActivityInfo[] => {
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useLikesStore = create<LikesState>((set, get) => ({
  likedActivities: [],

  loadLikes: () => {
    const likes = getStoredLikes();
    set({ likedActivities: likes });
  },

  toggleLike: (activity: ActivityInfo) => {
    set((state) => {
      const isAlreadyLiked = state.likedActivities.some((item) => item.id === activity.id);
      let newLikedActivities;

      if (isAlreadyLiked) {
        newLikedActivities = state.likedActivities.filter((item) => item.id !== activity.id);
      } else {
        newLikedActivities = [...state.likedActivities, { ...activity, isLiked: true }];
      }

      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(newLikedActivities));
      return { likedActivities: newLikedActivities };
    });
  },

  isLiked: (activityId: string) => {
    return get().likedActivities.some((activity) => activity.id === activityId);
  },
}));
