import { create } from 'zustand';
import { ProfileData } from '@/hooks/useProfileData';

interface ProfileState {
  profileData: ProfileData | null;
  setProfile: (data: ProfileData) => void;
  updateProfile: (data: Partial<ProfileData>) => void;
}

// 프로필 데이터용 로컬 스토리지 키
const PROFILE_STORAGE_KEY = 'userProfile';

// 초기 프로필 데이터 로드
const getInitialProfile = (): ProfileData | null => {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const useProfileStore = create<ProfileState>((set) => ({
  profileData: getInitialProfile(),

  setProfile: (data: ProfileData) => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(data));
    set({ profileData: data });
  },

  updateProfile: (data: Partial<ProfileData>) => {
    set((state) => {
      const updatedData = state.profileData ? { ...state.profileData, ...data } : null;
      if (updatedData) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedData));
      }
      return { profileData: updatedData };
    });
  },
}));
