import { css } from '@emotion/react';
import { IoCameraSharp } from 'react-icons/io5';

import Button from '@/components/common/Button';
import { theme } from '@/styles/theme';
import defaultProfileImage from '@/assets/icon/profile image.svg';
import { useProfileSetup } from '@/hooks/useProfileSetup';

const ProfileSetupPage = () => {
  const { profile, tempNickname, setTempNickname, isEditingNickname, profilePreview, fileInputRef, actions } = useProfileSetup({
    nickname: '김오셜',
    bio: '',
  });

  return (
    <div css={layout}>
      <main css={container}>
        <div css={header}>
          <h1 css={title}>내 프로필 작성하기</h1>
          <p css={subtitle}>다른 멤버들에게 나를 소개해보세요!</p>
        </div>

        <div css={profileImageSection}>
          <div css={imageWrapper}>
            <img src={profilePreview} alt='프로필 이미지' css={profileImage} />
            <button
              type='button'
              css={imageEditButton}
              onClick={actions.openFilePicker}
              aria-label='프로필 이미지 변경'
            >
              <IoCameraSharp size={20} />
            </button>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={actions.handleImageChange}
            />
          </div>
          {profilePreview !== defaultProfileImage && (
            <button type='button' css={resetThumbButton} onClick={actions.clearSelectedImage}>
              기본 이미지로 되돌리기
            </button>
          )}
        </div>

        <form css={form}>
          <div css={field}>
            <label css={label}>활동명</label>
            {isEditingNickname ? (
              <div css={nicknameEditWrapper}>
                <input
                  type='text'
                  css={nicknameInput}
                  value={tempNickname}
                  onChange={(e) => setTempNickname(e.target.value)}
                  placeholder='활동명을 입력하세요'
                />
                <div css={editButtons}>
                  <button type='button' css={saveButton} onClick={actions.handleCancelNickname}>
                    취소
                  </button>
                  <button type='button' css={cancelButton} onClick={actions.handleSaveNickname}>
                    저장하기
                  </button>
                </div>
              </div>
            ) : (
              <div css={nicknameWrapper}>
                <span>{profile.nickname}</span>
                <button type='button' css={textButton} onClick={actions.handleEditNickname}>
                  수정
                </button>
              </div>
            )}
          </div>

          <div css={field}>
            <label css={label} htmlFor='bio'>
              자신을 소개해주세요.
            </label>
            <textarea
              id='bio'
              css={textarea}
              value={profile.bio}
              onChange={actions.handleBioChange}
              placeholder='나는 어떤 사람인가요?'
            />
          </div>

          <div css={buttonContainer}>
            <Button variant='filled' size='large' onClick={actions.handleSave}>
              저장하기
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileSetupPage;

// Styles remain the same
const resetThumbButton = css`
  margin-top: 8px;
  ${theme.typography.labelSmall};
  color: ${theme.colors.grayscale[600]};
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: ${theme.colors.grayscale[800]};
  }
`;

const layout = css`
  display: flex;
  justify-content: center;
  padding: 60px 24px;
  background-color: ${theme.colors.white};
`;

const container = css`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const header = css`
  text-align: left;
  margin-bottom: 100px;
`;

const title = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.black};
`;

const subtitle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
  margin-top: 8px;
`;

const profileImageSection = css`
  margin-bottom: 40px;
  align-self: center;
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

  img {
    width: 20px;
    height: 20px;
  }
`;

const form = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const field = css`
  width: 100%;
`;

const label = css`
  display: block;
  ${theme.typography.labelMedium};
  color: ${theme.colors.grayscale[500]};
  margin-bottom: 8px;
`;

const nicknameWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid ${theme.colors.grayscale[200]};
  ${theme.typography.titleLarge};
  color: ${theme.colors.black};
`;

const textButton = css`
  ${theme.typography.labelSmall};
  color: ${theme.colors.blue[500]};
  cursor: pointer;
  background: none;
  border: none;
`;

const nicknameEditWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const nicknameInput = css`
  width: 100%;
  padding: 4px 0;
  border: none;
  border-bottom: 1px solid ${theme.colors.grayscale[200]};
  background: transparent;
  ${theme.typography.titleLarge};
  color: ${theme.colors.black};

  &:focus {
    outline: none;
    border-bottom-color: ${theme.colors.primary[100]};
  }
`;

const editButtons = css`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const saveButton = css`
  padding: 6px 12px;
  border: 1px solid ${theme.colors.grayscale[300]};
  border-radius: 4px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  ${theme.typography.labelSmall};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.grayscale[50]};
  }
`;

const cancelButton = css`
  padding: 6px 12px;
  border: 1px solid ${theme.colors.grayscale[50]};
  border-radius: 4px;
  background-color: ${theme.colors.grayscale[50]};
  color: ${theme.colors.black};
  ${theme.typography.labelSmall};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.grayscale[100]};
  }
`;

const textarea = css`
  width: 100%;
  height: 120px;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.grayscale[200]};
  border-radius: 8px;
  resize: none;
  ${theme.typography.textMedium};
  color: ${theme.colors.black};

  &::placeholder {
    color: ${theme.colors.grayscale[400]};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[100]};
  }
`;

const buttonContainer = css`
  display: flex;
  justify-content: center;
  width: 100%;

  button {
    width: 60%;
    max-width: 300px;
  }
`;