import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileStore } from '@/store/useProfileStore';

export interface ProfileData {
  name: string;
  birthDate: string;
  gender: string;
  location: string;
  nickname: string;
  bio: string;
  profileImage: string;
}

export const useProfileData = () => {
  const { isLoggedIn, userId } = useAuthStore();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isLoggedIn || !userId) {
        setError('로그인이 필요합니다.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // TODO: API 연동 후 실제 데이터 요청으로 변경
        // const response = await axios.get(`/api/users/${userId}/profile`);

        // 로컬 스토리지에서 프로필 데이터 가져오기
        const data = useProfileStore.getState().profileData;
        if (!data) {
          throw new Error('프로필 정보가 없습니다.');
        }

        setProfileData(data);
        setError(null);
      } catch (err) {
        setError('프로필 정보를 불러오는데 실패했습니다.');
        console.error('프로필 데이터 로드 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, userId]);

  const updateProfile = async (newData: Partial<ProfileData>) => {
    if (!isLoggedIn || !userId) {
      setError('로그인이 필요합니다.');
      return false;
    }

    try {
      setIsLoading(true);
      // TODO: API 연동 후 실제 데이터 업데이트 요청으로 변경
      // await axios.patch(`/api/users/${userId}/profile`, newData);

      // 임시 업데이트 로직
      await new Promise((resolve) => setTimeout(resolve, 1000));
      useProfileStore.getState().updateProfile(newData);
      setProfileData((prev) => (prev ? { ...prev, ...newData } : null));
      return true;
    } catch (err) {
      setError('프로필 정보 업데이트에 실패했습니다.');
      console.error('프로필 업데이트 에러:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    profileData,
    isLoading,
    error,
    updateProfile,
  };
};
