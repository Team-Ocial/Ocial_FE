import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '@/assets/icon/profile image.svg';
import { ProfileData } from '@/types/profile.types';

export const useProfileSetup = (initialData: ProfileData) => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileData>(initialData);
  const [tempNickname, setTempNickname] = useState(initialData.nickname);
  const [isEditingNickname, setIsEditingNickname] = useState(false);

  const [profilePreview, setProfilePreview] = useState<string>(defaultProfileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memory leak prevention for blob URL
  useEffect(() => {
    return () => {
      if (profilePreview && profilePreview.startsWith('blob:')) {
        URL.revokeObjectURL(profilePreview);
      }
    };
  }, [profilePreview]);

  const openFilePicker = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const isUnder5MB = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isImage) {
      alert('이미지 파일만 업로드할 수 있어요.');
      e.target.value = '';
      return;
    }
    if (!isUnder5MB) {
      alert('이미지는 5MB 이하만 선택해 주세요.');
      e.target.value = '';
      return;
    }

    if (profilePreview && profilePreview.startsWith('blob:')) {
      URL.revokeObjectURL(profilePreview);
    }

    const objectUrl = URL.createObjectURL(file);
    setProfilePreview(objectUrl);
  };

  const clearSelectedImage = () => {
    if (profilePreview && profilePreview.startsWith('blob:')) {
      URL.revokeObjectURL(profilePreview);
    }
    setProfilePreview(defaultProfileImage);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditNickname = () => {
    setIsEditingNickname(true);
    setTempNickname(profile.nickname);
  };

  const handleSaveNickname = () => {
    const newNickname = tempNickname.trim();
    if (newNickname) {
      setProfile((prev) => ({ ...prev, nickname: newNickname }));
      setIsEditingNickname(false);
    }
  };

  const handleCancelNickname = () => {
    setTempNickname(profile.nickname);
    setIsEditingNickname(false);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfile((prev) => ({ ...prev, bio: e.target.value }));
  };

  const handleSave = () => {
    console.log({ ...profile, profilePreview });
    alert('프로필이 저장되었습니다.');
    navigate('/');
  };

  return {
    profile,
    tempNickname,
    setTempNickname,
    isEditingNickname,
    profilePreview,
    fileInputRef,
    actions: {
      openFilePicker,
      handleImageChange,
      clearSelectedImage,
      handleEditNickname,
      handleSaveNickname,
      handleCancelNickname,
      handleBioChange,
      handleSave,
    },
  };
};
