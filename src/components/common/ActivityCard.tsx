import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { ActivityInfo } from '@/types/activity.types';
import { MdLocationOn, MdCalendarMonth } from 'react-icons/md';
import { PiThumbsUpLight, PiThumbsUpFill } from 'react-icons/pi';
import Badge from './Badge';
import { formatDate } from '@/utils/formatDate';

interface ActivityCardProps {
  activity: ActivityInfo;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const { id, status, category, title, location, period, thumbnail, likes, isLiked } = activity;

  return (
    <Link
      to={`/activity/${id}`}
      css={cardStyle}
      onClick={() => console.log('Clicked activity:', id)}
    >
      <div css={imageWrapper}>
        <img src={thumbnail} alt={title} css={imageStyle} />
        <div css={badgeWrapper}>
          <Badge variant='status'>{status}</Badge>
          <div css={likeContainerStyle}>
            {isLiked ? <PiThumbsUpFill size={16} /> : <PiThumbsUpLight size={16} />}
            <span>{likes}</span>
          </div>
        </div>
      </div>
      <div css={contentStyle}>
        <Badge variant='category'>{category}</Badge>
        <h3 css={titleStyle}>{title}</h3>
        <div css={infoStyle}>
          <div css={infoItemStyle}>
            <MdLocationOn size={16} />
            <span>{location}</span>
          </div>
          <div css={infoItemStyle}>
            <MdCalendarMonth size={16} />
            <span>
              {formatDate(period.start)}-{formatDate(period.end)} {period.time.start} ~{' '}
              {period.time.end}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ActivityCard;

const cardStyle = css`
  display: block;
  text-decoration: none;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const imageWrapper = css`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const badgeWrapper = css`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const contentStyle = css`
  padding: 20px 0;
`;

const titleStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.black};
  margin: 0 0 8px 0;
`;

const infoStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[600]};
`;

const infoItemStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${theme.colors.grayscale[400]};
  }
`;

const likeContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[700]};

  svg {
    color: ${theme.colors.primary[500]};
  }
`;
