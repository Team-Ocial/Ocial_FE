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
      <h3 css={nameStyle}>{member.name}</h3>
      <p css={positionStyle}>{member.position}</p>
    </div>
  );
};

export default MemberCard;

const cardStyle = css`
  width: 100%;
`;

const imageWrapper = css`
  width: 100%;
  aspect-ratio: 1;
  margin-bottom: 10px;
  overflow: hidden;
  // border-radius: 4px;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const nameStyle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.grayscale[900]};
  margin: 0 0 8px 0;
`;

const positionStyle = css`
  ${theme.typography.textSmall};
  color: ${theme.colors.grayscale[600]};
  margin: 0;
`;
