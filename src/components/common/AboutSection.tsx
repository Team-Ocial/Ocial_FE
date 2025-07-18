import { css, keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

const AboutSection = () => {
  return (
    <section css={aboutWrapper}>
      <div css={backgroundWrapper}>
        <div css={backgroundText}>ABOUT</div>
      </div>

      <div css={container}>
        <h2 css={title}>
          About OCIAL
          <div css={underline} />
        </h2>

        <p css={Paragraph1}>
          OCIAL은 ‘Social’에서 ‘S’를 뺀 이름으로, 사회를 대표하는 의미를 담고 있습니다.
        </p>

        {/* ✅ SOCIAL → OCIAL 애니메이션 텍스트 */}
        <div css={animationBox}>
          <span css={sLetter}>S</span>
          <span>OCIAL</span>
        </div>

        <div css={Paragraph2}>
          <p>
            영단어에서 s를 뺀다는 것은 복수형을 단수형으로 바꾼다는 의미입니다.
            <br />
            사회를 나타내는 단어인 Social에서 S를 뺀 OCIAL은 사회를 대표한다는 의미를 담고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

// ================== Styles ==================

const aboutWrapper = css`
  width: 100%;
  height: 975px;
  position: relative;
  background-color: ${theme.colors.white};
  // overflow: hidden;
`;

const backgroundWrapper = css`
  position: absolute;
  width: 100%;
  max-width: ${theme.layout.width.max};
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 0;
`;

const backgroundText = css`
  font-size: 150px;
  font-weight: 900;
  font-family: 'Pretendard';
  color: ${theme.colors.grayscale[400]};
  opacity: 0.15;
  letter-spacing: -5px;
  pointer-events: none;
  user-select: none;
`;

const container = css`
  position: relative;
  z-index: 1;
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
  top: 265px;
  box-sizing: border-box;
`;

const title = css`
  ${theme.typography.headlineLarge2};
  display: flex;
  align-items: center;
  gap: 16px; /* 텍스트와 라인 사이 간격 */
  color: ${theme.colors.black};
  margin-bottom: 100px;
`;

const underline = css`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.primary[100]};
`;

const Paragraph1 = css`
  ${theme.typography.headlineSmall};
  color: ${theme.colors.black};
`;

const Paragraph2 = css`
  ${theme.typography.headlineSmall};
  color: ${theme.colors.black};
`;

// ============ Animation Part ============

const animationBox = css`
  ${theme.typography.displayMedium};
  margin: 100px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* ✅ 왼쪽 정렬 */
`;

const fadeOutLeft = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

const sLetter = css`
  display: inline-block;
  animation: ${fadeOutLeft} 1s ease forwards;
  animation-delay: 0.5s;
`;
