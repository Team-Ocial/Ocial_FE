/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import story1 from '@/assets/images/story1.jpg';
import story2 from '@/assets/images/story2.jpg';
import story3 from '@/assets/images/story3.jpg';
import story4 from '@/assets/images/story4.jpg';
import bgImage from '@/assets/images/story_background.png'; // story_background.png 파일이 없어서 임시로 hero1.png 사용

const StorySection = () => {
  return (
    <section css={storyWrapper}>
      <div css={backgroundWrapper}>
        <div css={backgroundImage} />
      </div>

      <div css={container}>
        <div css={titleWrapper}>
          <div css={backgroundText}>STORY</div>

          <div css={titleRow}>
            <div css={underline} />
            <h2 css={title}>Our Story</h2>
            <div css={[underline, rightUnderline]} />
          </div>
        </div>

        <div css={lineWrapper}>
          <p css={paragraph}>
            대학생 시절, <br />
            비전공자를 위한 IT 모임 Team Beagle로 시작해
          </p>

          <div css={lineAndCircle}>
            <div css={circle} />
            <div css={line} />
          </div>

          <p css={paragraph}>
            현재는 기술, 비즈니스, 예술, 인문학 등 다양한 분야의 사람들이 모여
            <br />
            지식과 경험을 나누며 함께 성장하는 커뮤니티로 발전해 왔습니다.
          </p>
        </div>

        <div css={imageGrid}>
          <img src={story1} alt='story-1' />
          <img src={story2} alt='story-2' />
          <img src={story3} alt='story-3' />
          <img src={story4} alt='story-4' />
        </div>
      </div>
    </section>
  );
};

export default StorySection;

const storyWrapper = css`
  width: 100%;
  height: 1687px;
  position: relative;
  background-color: ${theme.colors.white};
`;

const backgroundWrapper = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 922px;
  z-index: 0;
`;

const backgroundImage = css`
  width: 100%;
  height: 100%;
  background: url(${bgImage}) no-repeat center;
  background-size: cover;
  margin: 0 auto;
`;

const container = css`
  position: relative;
  z-index: 1;
  max-width: ${theme.layout.width.max};
  margin: 0 auto;
  padding-top: 200px;
  box-sizing: border-box;
`;

const titleWrapper = css`
  position: relative;
  margin-bottom: 100px;
  max-width: ${theme.layout.width.max};
  margin: 0 auto;
`;

const backgroundText = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 150px;
  font-weight: 900;
  font-family: 'Pretendard';
  color: ${theme.colors.grayscale[400]};
  opacity: 0.15;
  letter-spacing: -5px;
  pointer-events: none;
  user-select: none;
  z-index: 0;
`;

const titleRow = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: relative;
  margin-bottom: 100px;
`;

const underline = css`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.primary[100]};
`;

const rightUnderline = css`
  opacity: 0;
`;

const title = css`
  ${theme.typography.headlineLarge2};
  color: ${theme.colors.black};
  white-space: nowrap;
  flex-shrink: 0;
`;

const paragraph = css`
  ${theme.typography.headlineSmall};
  color: ${theme.colors.black};
  text-align: center;
  margin: 80px 0;
`;

const lineWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const circle = css`
  width: 20px;
  height: 20px;
  border: 4px solid #1f284d; /* 딥네이비/블랙 */
  border-radius: 50%;
  background-color: white;
`;

const line = css`
  width: 3px;
  height: 300px;
  background: linear-gradient(to bottom, #1f284d, transparent);
  margin-top: -2px;
`;

const lineAndCircle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const imageGrid = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-top: 200px;
  max-width: ${theme.layout.width.max};
  margin-left: auto;
  margin-right: auto;

  img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    border-radius: 5px;
  }
`;
