import { create } from 'zustand';

interface LikesState {
  likedActivities: string[]; // ActivityInfo[] 대신 ID만 저장
  toggleLike: (activityId: string) => void;
  isLiked: (activityId: string) => boolean;
  loadLikes: () => void;
}

const LIKES_STORAGE_KEY = 'likedActivities';

const getStoredLikes = (): string[] => {
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const useLikesStore = create<LikesState>((set, get) => ({
  likedActivities: [],

  loadLikes: () => {
    const likes = getStoredLikes();
    set({ likedActivities: likes });
  },

  toggleLike: (activityId: string) => {
    set((state) => {
      const isAlreadyLiked = state.likedActivities.includes(activityId);
      let newLikedActivities;

      if (isAlreadyLiked) {
        newLikedActivities = state.likedActivities.filter((id) => id !== activityId);
      } else {
        newLikedActivities = [...state.likedActivities, activityId];
      }

      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(newLikedActivities));
      return { likedActivities: newLikedActivities };
    });
  },

  isLiked: (activityId: string) => {
    return get().likedActivities.includes(activityId);
  },
}));
