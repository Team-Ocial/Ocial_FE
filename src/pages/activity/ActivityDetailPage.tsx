import { useMemo } from 'react';
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import Badge from '@/components/common/Badge';
import { MdLocationOn, MdAccessTime, MdCalendarMonth, MdMap } from 'react-icons/md';
import { PiThumbsUpLight } from 'react-icons/pi';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivityDetail } from '@/hooks/useActivityDetail';
import { formatDate } from '@/utils/formatDate';
import { generateKey } from '@/utils/generateKey';

// TODO: 실제 인증 상태 관리로 대체
const isAdmin = true; // 임시로 관리자 상태 설정

const ActivityDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { activity, isLoading, error } = useActivityDetail(id || '');

  const parsedCurriculum = useMemo(() => {
    if (!activity?.curriculum) return [];
    return activity.curriculum.split('\n\n').map((section) => {
      const [title, ...items] = section.split('\n');
      return {
        title: title.trim(),
        items: items.filter((item) => item.trim()).map((item) => item.replace(/^-\s*/, '').trim()),
      };
    });
  }, [activity?.curriculum]);

  const parsedGuidelines = useMemo(() => {
    if (!activity?.guidelines) return [];
    return activity.guidelines
      .split('\n')
      .filter((line) => line.trim())
      .map((line) => line.replace(/^-\s*/, '').trim());
  }, [activity?.guidelines]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!activity) {
    return <div>Activity not found</div>;
  }

  const { title, category, location, address, period, description } = activity;

  return (
    <div>
      {/* 헤더 섹션 */}
      <div css={headerStyle}>
        <div
          css={headerBackgroundStyle}
          style={{ backgroundImage: `url(${activity.thumbnail})` }}
        />
        <div css={headerContentStyle}>
          <div css={categoryBadgeStyle}>
            <Badge variant='category'>{category}</Badge>
          </div>
          <h1 css={titleStyle}>{title}</h1>
          <div css={actionButtonsStyle}>
            <button css={primaryButtonStyle}>신청하기</button>
            <button css={secondaryButtonStyle}>
              좋아요
              <PiThumbsUpLight size={20} />
            </button>
            {isAdmin && (
              <button css={editButtonStyle} onClick={() => navigate(`/activity/edit/${id}`)}>
                수정하기
              </button>
            )}
          </div>
        </div>
      </div>

      <div css={contentContainerStyle}>
        {/* 상세 정보 섹션 */}
        <section css={sectionStyle}>
          <h2 css={sectionTitleStyle}>상세 정보</h2>
          <div css={infoListStyle}>
            <div css={infoItemStyle}>
              <MdCalendarMonth size={20} css={infoIconStyle} />
              <div css={infoContentStyle}>
                <span css={infoLabelStyle}>일정</span>
                <span css={infoValueStyle}>
                  {formatDate(period.start)}-{formatDate(period.end)}
                </span>
              </div>
            </div>
            <div css={infoItemStyle}>
              <MdAccessTime size={20} css={infoIconStyle} />
              <div css={infoContentStyle}>
                <span css={infoLabelStyle}>시간</span>
                <span css={infoValueStyle}>
                  {period.time.start} ~ {period.time.end}
                </span>
              </div>
            </div>
            <div css={infoItemStyle}>
              <MdLocationOn size={20} css={infoIconStyle} />
              <div css={infoContentStyle}>
                <span css={infoLabelStyle}>장소</span>
                <span css={infoValueStyle}>{location}</span>
              </div>
            </div>
            <div css={infoItemStyle}>
              <MdMap size={20} css={infoIconStyle} />
              <div css={infoContentStyle}>
                <span css={infoLabelStyle}>주소</span>
                <span css={infoValueStyle}>{address}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 소개 섹션 */}
        <section css={sectionStyle}>
          <h2 css={sectionTitleStyle}>소개</h2>
          <div css={descriptionStyle}>
            {description.split('\n\n').map((paragraph) => (
              <p key={generateKey('desc', paragraph)}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* 커리큘럼 섹션 */}
        <section css={sectionStyle}>
          <h2 css={sectionTitleStyle}>커리큘럼</h2>
          <div css={curriculumContainerStyle}>
            {parsedCurriculum.map((section) => (
              <div key={generateKey('curriculum', section.title)}>
                <h3 css={curriculumTitleStyle}>{section.title}</h3>
                <ul css={curriculumListStyle}>
                  {section.items.map((item) => (
                    <li key={generateKey('item', item)}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 안내사항 섹션 */}
        <section css={sectionStyle}>
          <h2 css={sectionTitleStyle}>안내사항</h2>
          <ul css={guidelineListStyle}>
            {parsedGuidelines.map((item) => (
              <li key={generateKey('guideline', item)}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ActivityDetailPage;

// Styles (기존 스타일과 일부 추가/수정된 스타일)
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
`;

const headerContentStyle = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const categoryBadgeStyle = css`
  margin-bottom: 8px;
`;

const titleStyle = css`
  ${theme.typography.headlineLarge};
  margin: 0;
  color: ${theme.colors.white};
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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

const primaryButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.white};
  color: ${theme.colors.black};
  border: none;

  &:hover {
    background-color: ${theme.colors.grayscale[200]};
  }
`;

const secondaryButtonStyle = css`
  ${buttonBaseStyle};
  background-color: transparent;
  color: ${theme.colors.white};
  border: 1px solid ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const editButtonStyle = css`
  ${buttonBaseStyle};
  background-color: ${theme.colors.primary[600]};
  color: ${theme.colors.white};
  border: none;

  &:hover {
    background-color: ${theme.colors.primary[500]};
  }
`;

const contentContainerStyle = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
`;

const sectionStyle = css`
  margin-bottom: 48px;
`;

const sectionTitleStyle = css`
  ${theme.typography.headlineMedium};
  color: ${theme.colors.black};
  margin-bottom: 24px;
  font-weight: 600;
`;

const infoListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${theme.colors.grayscale[50]};
  padding: 32px;
  border-radius: 8px;
`;

const infoItemStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
`;

const infoIconStyle = css`
  width: 24px;
  height: 24px;
  color: ${theme.colors.grayscale[400]};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const infoContentStyle = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const infoLabelStyle = css`
  min-width: 40px;
  ${theme.typography.titleMedium};
  color: ${theme.colors.grayscale[700]};
`;

const infoValueStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
`;

const descriptionStyle = css`
  ${theme.typography.textLarge};
  color: ${theme.colors.grayscale[700]};
  line-height: 1.6;

  p {
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const curriculumContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const curriculumTitleStyle = css`
  ${theme.typography.titleMedium};
  font-weight: 600;
  margin-bottom: 12px;
`;

const curriculumListStyle = css`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    padding-left: 16px;
    position: relative;
    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: ${theme.colors.primary[500]};
    }
  }
`;

const guidelineListStyle = css`
  list-style-type: disc;
  padding-left: 20px;

  li {
    margin-bottom: 12px;
  }
`;
