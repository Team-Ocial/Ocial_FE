import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import CalendarIcon from '@/assets/icon/calendar.svg';
import RocketIcon from '@/assets/icon/rocket.svg';

interface MyPageHeaderProps {
  stats?: {
    scheduledCount: number;
    totalCount: number;
  };
}

const MyPageHeader = ({ stats = { scheduledCount: 0, totalCount: 0 } }: MyPageHeaderProps) => {
  return (
    <section css={statsSection}>
      <h2 css={statsTitle}>My Stats</h2>
      <div css={statsCards}>
        <div css={statsCard}>
          <div css={statsIconContainer}>
            <img src={CalendarIcon} alt='캘린더' css={statsIcon} />
          </div>
          <div css={statsContent}>
            <span css={statsLabel}>예정된 활동</span>
            <span css={statsNumber}>{stats.scheduledCount}</span>
          </div>
        </div>

        <div css={statsCard}>
          <div css={rocketIconContainer}>
            <img src={RocketIcon} alt='로켓' css={statsIcon} />
          </div>
          <div css={statsContent}>
            <span css={statsLabel}>활동 개수</span>
            <span css={statsNumber}>{stats.totalCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPageHeader;

// Styles
const statsSection = css`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  background: ${theme.colors.grayscale[50]};
  padding: 1.5rem;
  border-radius: 16px;
`;

const statsTitle = css`
  font-size: ${theme.typography.headlineSmall.fontSize};
  font-weight: ${theme.typography.headlineSmall.fontWeight};
  color: ${theme.colors.grayscale[700]};
  margin: 0;
`;

const statsCards = css`
  display: flex;
  gap: 1rem;
`;

const statsCard = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.white};
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex: 1;
  min-width: 0;
  width: 50%;
  position: relative;
`;

const statsIconContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
`;

const statsIcon = css`
  width: 30px;
  height: 30px;
`;

const rocketIconContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
`;

const statsContent = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  margin-left: auto;
`;

const statsLabel = css`
  ${theme.typography.labelLarge};
  color: ${theme.colors.grayscale[600]};
`;

const statsNumber = css`
  ${theme.typography.headlineSmall};
  color: ${theme.colors.grayscale[800]};
`;
