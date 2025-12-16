import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Member } from '@/types/member.types';
import { useState } from 'react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      css={cardStyle}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div css={imageContainerStyle}>
        <div css={[flipperStyle, isFlipped && flippedStyle]}>
          <div css={imageFrontStyle}>
            <img src={member.imageUrl} alt={member.name} css={imageStyle} />
          </div>
          <div css={imageBackStyle}>
            <p css={bioStyle}>{member.bio || '소개가 준비중입니다.'}</p>
          </div>
        </div>
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
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const imageContainerStyle = css`
  width: 100%;
  aspect-ratio: 0.87;
  perspective: 1000px;
  cursor: pointer;
  transform-style: preserve-3d;
`;

const flipperStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  transform-origin: center;
`;

const flippedStyle = css`
  transform: rotateY(180deg);
`;

const imageFrontStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
  transform: rotateY(0deg);
`;

const imageBackStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: ${theme.colors.grayscale[100]};
  transform: rotateY(180deg);
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  top: 0;
  left: 0;
`;

const imageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${cardStyle}:hover & {
    transform: scale(1.05);
  }
`;

const bioStyle = css`
  ${theme.typography.textMedium};
  color: ${theme.colors.grayscale[700]};
  line-height: 1.6;
  word-break: keep-all;
  padding: 0 16px;
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
