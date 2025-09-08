import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { IoCameraSharp } from 'react-icons/io5';
import { FaRegEdit } from 'react-icons/fa';
import Button from '@/components/common/Button';
import MyPageHeader from './MyPageHeader';
import MyMenuCard from './MyMenuCard';
import defaultProfileImage from '@/assets/icon/profile image.svg';
import { useProfileData, type ProfileData } from '@/hooks/useProfileData';
import { useRef, useState, useEffect } from 'react';

const EditPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { profileData, isLoading, error, updateProfile } = useProfileData();
  const [profilePreview, setProfilePreview] = useState(defaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>(
    profileData || {
      name: '',
      birthDate: '',
      gender: '',
      address: '',
      nickname: '',
      bio: '',
      profileImage: defaultProfileImage,
    }
  );

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
      setProfilePreview(profileData.profileImage || defaultProfileImage);
    }
  }, [profileData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  if (isLoading) {
    return <div css={loadingContainer}>프로필 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div css={errorContainer}>{error}</div>;
  }

  return (
    <div css={pageContainer}>
      <MyPageHeader />
      <div css={mainContainer}>
        <MyMenuCard activeMenu='profile' />
        <main css={mainContent}>
          <h1 css={pageTitle}>내 정보 수정하기</h1>
          <div css={editForm}>
            <div css={profileSection}>
              <div css={imageWrapper}>
                <img src={profilePreview} alt='프로필 이미지' css={profileImage} />
                <button
                  type='button'
                  css={imageEditButton}
                  onClick={() => fileInputRef.current?.click()}
                  aria-label='프로필 이미지 변경'
                >
                  <IoCameraSharp size={20} />
                </button>
                <input
                  type='file'
                  accept='image/*'
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <button type='button' css={editButton} onClick={handleEditClick}>
                <FaRegEdit css={editIcon} />
                수정
              </button>
            </div>

            <form css={formStyle}>
              <div css={formGroup}>
                <label css={label}>이름</label>
                <input
                  type='text'
                  value={formData.name}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div css={formGroup}>
                <label css={label}>생년월일</label>
                <input
                  type='text'
                  value={formData.birthDate}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                />
              </div>

              <div css={formGroup}>
                <label css={label}>성별</label>
                <input
                  type='text'
                  value={formData.gender}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                />
              </div>

              <div css={formGroup}>
                <label css={label}>주소지(활동지)</label>
                <input
                  type='text'
                  value={formData.address}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div css={formGroup}>
                <label css={label}>직업 (선택)</label>
                <input
                  type='text'
                  value={formData.job || ''}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                  placeholder='직업을 입력해주세요'
                />
              </div>

              <div css={formGroup}>
                <label css={label}>활동명</label>
                <input
                  type='text'
                  value={formData.nickname}
                  disabled={!isEditing}
                  css={input}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                />
              </div>

              <div css={formGroup}>
                <label css={label}>나를 소개합니다</label>
                <textarea
                  value={formData.bio}
                  disabled={!isEditing}
                  css={textarea}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              {isEditing && (
                <div css={buttonContainer}>
                  <Button variant='filled' size='large' onClick={handleSave}>
                    저장하기
                  </Button>
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditPage;

// Styles
const pageContainer = css`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const pageTitle = css`
  font-size: 2rem;
  font-weight: 700;
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 0.5rem;
  width: 100%;
`;

const mainContainer = css`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
`;

const mainContent = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  align-items: center;
`;

const editForm = css`
  width: 100%;
  background: ${theme.colors.white};
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const profileSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
`;

const imageWrapper = css`
  position: relative;
  width: 120px;
  height: 120px;
`;

const profileImage = css`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${theme.colors.grayscale[100]};
`;

const imageEditButton = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.grayscale[600]};

  &:hover {
    background-color: ${theme.colors.grayscale[50]};
  }
`;

const editButton = css`
  ${theme.typography.labelSmall};
  color: ${theme.colors.blue[500]};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  align-self: flex-end;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: ${theme.colors.blue[500]};
  }
`;

const editIcon = css`
  font-size: 14px;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

const formGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const label = css`
  ${theme.typography.labelMedium};
  color: ${theme.colors.grayscale[700]};
`;

const input = css`
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-bottom: 1px solid ${theme.colors.grayscale[200]};
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[900]};
  background-color: transparent;

  &:focus {
    outline: none;
    border-bottom-color: ${theme.colors.primary[100]};
  }

  &:disabled {
    background-color: transparent;
    color: ${theme.colors.grayscale[600]};
  }
`;

const textarea = css`
  width: 100%;
  height: 120px;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.grayscale[200]};
  border-radius: 8px;
  resize: none;
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[900]};
  background-color: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[100]};
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  button {
    width: 60%;
    max-width: 300px;
  }
`;

const loadingContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  ${theme.typography.titleMedium};
  color: ${theme.colors.grayscale[600]};
`;

const errorContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  ${theme.typography.titleMedium};
  color: ${theme.colors.grayscale[600]};
`;
