import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ActivityDetail,
  ActivityMainCategory,
  ActivityStatus,
} from '@/types/activity.types';
import { ACTIVITY_CONSTANTS } from '@/constants/categories';
import thumbnail1 from '@/assets/images/thumbnail1.png';
import { MdExpandMore } from 'react-icons/md';

const createInitialActivity = (): ActivityDetail => {
  const today = new Date().toISOString().slice(0, 10);

  return {
    id: 0,
    status: ActivityStatus.OPEN,
    category: ActivityMainCategory.STUDY,
    title: '',
    location: '',
    startDate: today,
    endDate: today,
    startTime: '10:00',
    endTime: '12:00',
    applyDeadline: today,
    thumbnail: thumbnail1,
    likes: 0,
    isLiked: false,
    createdAt: `${today}T00:00:00.000Z`,
    updatedAt: `${today}T00:00:00.000Z`,
    description: '',
    curriculum: null,
    guidelines: null,
  };
};

const ActivityCreatePage = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState<ActivityDetail>(createInitialActivity());
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const selectedCategoryLabel =
    ACTIVITY_CONSTANTS.FILTERS.find((filter) => filter.value === activity.category)?.label ||
    String(activity.category);

  const handleCategorySelect = (value: ActivityDetail['category']) => {
    setActivity({ ...activity, category: value });
    setIsCategoryOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: API 연동
      // const newId = await createActivity(activity);
      // navigate(`/activity/${newId}`);
      navigate('/activity');
    } catch (error) {
      console.error('Failed to create activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 헤더 섹션 */}
      <div css={headerStyle}>
        <div
          css={headerBackgroundStyle}
          style={{ backgroundImage: `url(${activity.thumbnail})` }}
        />
        <div css={headerContentStyle}>
          <input
            type='text'
            value={activity.title}
            onChange={(e) => setActivity({ ...activity, title: e.target.value })}
            css={titleInputStyle}
            placeholder='제목을 입력하세요'
          />
          <div css={actionButtonsStyle}>
            <label htmlFor='thumbnail' css={uploadButtonStyle}>
              이미지 변경
            </label>
            <input
              id='thumbnail'
              type='file'
              accept='image/*'
              css={fileInputStyle}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setActivity({
                      ...activity,
                      thumbnail: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <button type='button' css={cancelButtonStyle} onClick={() => navigate('/activity')}>
              취소
            </button>
          </div>
        </div>
      </div>

      <div css={containerStyle}>
        <div css={formStyle}>
          {/* 기본 정보 */}
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>기본 정보</h2>
            <div css={fieldGroupStyle}>
              <div css={fieldStyle}>
                <label htmlFor='title'>제목</label>
                <input
                  id='title'
                  type='text'
                  value={activity.title}
                  onChange={(e) => setActivity({ ...activity, title: e.target.value })}
                  css={inputStyle}
                />
              </div>
              <div css={dateFieldGroupStyle}>
                <div css={fieldStyle}>
                  <label htmlFor='category'>카테고리</label>
                  <div css={selectWrapperStyle}>
                    <button
                      id='category'
                      type='button'
                      css={selectButtonStyle}
                      onClick={() => setIsCategoryOpen((prev) => !prev)}
                      aria-haspopup='listbox'
                      aria-expanded={isCategoryOpen}
                    >
                      <span>{selectedCategoryLabel}</span>
                      <MdExpandMore
                        size={20}
                        css={[selectIconStyle, isCategoryOpen && selectIconOpenStyle]}
                      />
                    </button>
                    {isCategoryOpen && (
                      <ul css={selectListStyle} role='listbox'>
                        {ACTIVITY_CONSTANTS.FILTERS.map((filter) => (
                          <li key={filter.label}>
                            <button
                              type='button'
                              css={[
                                selectItemStyle,
                                activity.category === filter.value && selectItemActiveStyle,
                              ]}
                              onClick={() => handleCategorySelect(filter.value)}
                            >
                              {filter.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div css={fieldStyle}>
                  <label htmlFor='applyDeadline'>신청 마감일</label>
                  <input
                    id='applyDeadline'
                    type='date'
                    value={(activity.applyDeadline ?? activity.endDate).slice(0, 10)}
                    onChange={(e) =>
                      setActivity({
                        ...activity,
                        applyDeadline: e.target.value,
                      })
                    }
                    css={inputStyle}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 일정 정보 */}
          <section css={sectionStyle}>
            <h3 css={groupTitleStyle}>활동일정</h3>
            <div css={fieldGroupStyle}>
              <div css={inlineFieldGroupStyle}>
                <div css={dateFieldGroupStyle}>
                  <div css={fieldStyle}>
                    <label htmlFor='startDate'>시작일</label>
                    <input
                      id='startDate'
                      type='date'
                      value={activity.startDate}
                      onChange={(e) =>
                        setActivity({
                          ...activity,
                          startDate: e.target.value,
                        })
                      }
                      css={inputStyle}
                    />
                  </div>
                  <div css={fieldStyle}>
                    <label htmlFor='endDate'>종료일</label>
                    <input
                      id='endDate'
                      type='date'
                      value={activity.endDate}
                      onChange={(e) =>
                        setActivity({
                          ...activity,
                          endDate: e.target.value,
                        })
                      }
                      css={inputStyle}
                    />
                  </div>
                </div>
                <div css={dateFieldGroupStyle}>
                  <div css={fieldStyle}>
                    <label htmlFor='startTime'>시작 시간</label>
                    <input
                      id='startTime'
                      type='time'
                      value={activity.startTime}
                      onChange={(e) =>
                        setActivity({
                          ...activity,
                          startTime: e.target.value,
                        })
                      }
                      css={inputStyle}
                    />
                  </div>
                  <div css={fieldStyle}>
                    <label htmlFor='endTime'>종료 시간</label>
                    <input
                      id='endTime'
                      type='time'
                      value={activity.endTime}
                      onChange={(e) =>
                        setActivity({
                          ...activity,
                          endTime: e.target.value,
                        })
                      }
                      css={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 장소 정보 */}
          <section css={sectionStyle}>
            <div css={fieldGroupStyle}>
              <div css={fieldStyle}>
                <label htmlFor='location'>장소명</label>
                <input
                  id='location'
                  type='text'
                  value={activity.location}
                  onChange={(e) => setActivity({ ...activity, location: e.target.value })}
                  css={inputStyle}
                />
              </div>
            </div>
          </section>

          {/* 활동 소개 */}
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>활동 소개</h2>
            <div css={fieldStyle}>
              <label htmlFor='description'>활동 설명</label>
              <textarea
                id='description'
                value={activity.description}
                onChange={(e) => setActivity({ ...activity, description: e.target.value })}
                css={textareaStyle}
                placeholder='활동에 대한 상세한 설명을 입력해주세요.'
              />
            </div>
          </section>

          {/* 커리큘럼 */}
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>커리큘럼</h2>
            <div css={fieldStyle}>
              <label htmlFor='curriculum'>커리큘럼 내용</label>
              <textarea
                id='curriculum'
                value={activity.curriculum || ''}
                onChange={(e) => {
                  setActivity({ ...activity, curriculum: e.target.value });
                }}
                css={textareaStyle}
                placeholder='커리큘럼을 입력해주세요.
예시:
1주차: 기초 학습
- 개념 이해하기
- 실습 환경 설정
- 기본 예제 실습

2주차: 심화 학습
- 응용 사례 분석
- 프로젝트 기획
- 팀 구성 및 역할 분담'
              />
            </div>
          </section>

          {/* 안내사항 */}
          <section css={sectionStyle}>
            <h2 css={sectionTitleStyle}>안내사항</h2>
            <div css={fieldStyle}>
              <label htmlFor='guidelines'>안내사항 내용</label>
              <textarea
                id='guidelines'
                value={activity.guidelines || ''}
                onChange={(e) => {
                  setActivity({ ...activity, guidelines: e.target.value });
                }}
                css={textareaStyle}
                placeholder='안내사항을 입력해주세요.
예시:
- 노트북 필수 지참
- 사전 학습 자료 제공
- 중간 발표 필수
- 출석률 80% 이상 필수'
              />
            </div>
          </section>

          {/* 버튼 */}
          <div css={buttonGroupStyle}>
            <button type='submit' css={submitButtonStyle}>
              등록
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ActivityCreatePage;

// Styles
const headerStyle = css`
  position: relative;
  padding: 120px 40px 60px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 24px;
  color: ${theme.colors.white};
  overflow: hidden;
`;

const headerBackgroundStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
  filter: brightness(0.8);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }
`;

const headerContentStyle = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const titleInputStyle = css`
  ${theme.typography.headlineLarge};
  color: ${theme.colors.white};
  margin: 0;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background: transparent;
  border: none;
  padding: 0;
  width: 100%;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const actionButtonsStyle = css`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  max-width: 600px;
`;

const buttonBaseStyle = css`
  padding: 16px 24px;
  min-width: 200px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
  ${theme.typography.labelSmall};
`;

const uploadButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.grayscale[200]};
  }
`;

const fileInputStyle = css`
  display: none;
`;

const containerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const sectionTitleStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.black};
  margin-bottom: 24px;
  font-weight: 600;
`;

const groupTitleStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.grayscale[800]};
  margin-bottom: 6px;
  font-weight: 600;
`;

const fieldGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const dateFieldGroupStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const inlineFieldGroupStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 16px;
  border: 1px solid ${theme.colors.grayscale[200]};
  border-radius: 12px;
  background-color: ${theme.colors.grayscale[50]};
`;

const fieldStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    ${theme.typography.titleLarge};
    color: ${theme.colors.grayscale[700]};
  }
`;

const inputStyle = css`
  padding: 16px;
  border: 1px solid ${theme.colors.grayscale[300]};
  border-radius: 8px;
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[900]};
  background-color: ${theme.colors.white};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[600]};
  }

  &::placeholder {
    color: ${theme.colors.grayscale[400]};
  }
`;

const selectWrapperStyle = css`
  position: relative;
  width: 100%;
`;

const selectButtonStyle = css`
  ${inputStyle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  text-align: left;
`;

const selectIconStyle = css`
  transition: transform 0.2s ease;
  color: ${theme.colors.grayscale[500]};
  flex-shrink: 0;
`;

const selectIconOpenStyle = css`
  transform: rotate(180deg);
`;

const selectListStyle = css`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayscale[200]};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
  z-index: 10;

  li + li button {
    border-top: 1px solid ${theme.colors.grayscale[100]};
  }
`;

const selectItemStyle = css`
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[800]};

  &:hover {
    background-color: ${theme.colors.grayscale[50]};
  }
`;

const selectItemActiveStyle = css`
  color: ${theme.colors.primary[600]};
  font-weight: 600;
`;

const textareaStyle = css`
  ${inputStyle};
  min-height: 200px;
  resize: vertical;
  line-height: 1.6;
`;

const buttonGroupStyle = css`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const cancelButtonStyle = css`
  ${buttonBaseStyle};
  background-color: transparent;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const submitButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.primary[600]};
  color: ${theme.colors.white};
  border: none;

  &:hover {
    background-color: ${theme.colors.primary[500]};
  }
`;
