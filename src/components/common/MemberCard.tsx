import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Member } from '@/types/member.types';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div css={cardStyle}>
      <div css={imageWrapper}>
        <img src={member.imageUrl} alt={member.name} css={imageStyle} />
      </div>
      <div css={textWrapper}>
        <h3 css={nameStyle}>{member.name}</h3>
        <p css={positionStyle}>{member.position}</p>
      </div>
    </div>
  );
};

export default MemberCard;

const cardStyle = css`
  width: 100%;
  margin-bottom: 70px;
`;

const imageWrapper = css`
  width: 100%;
  aspect-ratio: 0.87;
  overflow: hidden;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const textWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  gap: 4px;
`;

const nameStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.grayscale[900]};
  margin: 0;
`;

const positionStyle = css`
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[600]};
  margin: 0;
`;
