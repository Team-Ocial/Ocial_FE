import { create } from 'zustand';

interface LikesState {
  likedActivities: number[]; // ActivityInfo[] 대신 ID만 저장
  toggleLike: (activityId: number) => void;
  isLiked: (activityId: number) => boolean;
  loadLikes: () => void;
}

const LIKES_STORAGE_KEY = 'likedActivities';

const getStoredLikes = (): number[] => {
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  const parsed = stored ? JSON.parse(stored) : [];
  return Array.isArray(parsed) ? parsed.map((value) => Number(value)) : [];
};

export const useLikesStore = create<LikesState>((set, get) => ({
  likedActivities: [],

  loadLikes: () => {
    const likes = getStoredLikes();
    set({ likedActivities: likes });
  },

  toggleLike: (activityId: number) => {
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

  isLiked: (activityId: number) => {
    return get().likedActivities.includes(activityId);
  },
}));
