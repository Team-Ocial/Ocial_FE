import { css, keyframes } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { theme } from '@/styles/theme';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 섹션이 화면에서 사라지면 다시 false로 설정하여 재실행 가능하게 함
          setTimeout(() => {
            if (!entry.isIntersecting) {
              setIsVisible(false);
            }
          }, 100);
        } else {
          // 섹션이 완전히 화면에서 사라지면 애니메이션 상태 리셋
          setTimeout(() => {
            setIsVisible(false);
          }, 500);
        }
      },
      {
        threshold: 0.3, // 30% 이상 보일 때 트리거
        rootMargin: '0px 0px -100px 0px', // 하단에서 100px 전에 트리거
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} css={aboutWrapper}>
      <div css={backgroundWrapper}>
        <div css={backgroundText}>ABOUT</div>
      </div>

      <div css={container}>
        <div css={titleRow}>
          <h2 css={title}>About OCIAL</h2>
          <div css={underline} />
        </div>

        <p css={Paragraph}>
          OCIAL은 'Social'에서 'S'를 뺀 이름으로, 사회를 대표하는 의미를 담고 있습니다.
        </p>

        {/* ✅ SOCIAL → OCIAL 애니메이션 텍스트 */}
        <div css={animationBox}>
          <span css={sLetter(isVisible)}>S</span>
          <span>OCIAL</span>
        </div>

        <p css={Paragraph}>영단어에서 s를 뺀다는 것은 복수형을 단수형으로 바꾼다는 의미입니다.</p>
        <p css={Paragraph}>
          사회를 나타내는 단어인 Social에서 S를 뺀 OCIAL은 사회를 대표한다는 의미를 담고 있습니다.
        </p>
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
  max-width: ${theme.layout.width.max};
  margin: 0 auto;
  top: 265px;
  box-sizing: border-box;
`;

const titleRow = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 100px;
`;

const title = css`
  ${theme.typography.headlineLarge2};
  color: ${theme.colors.black};
  white-space: nowrap;
`;

const underline = css`
  flex: 1;
  height: 1px;
  background-color: ${theme.colors.primary[100]};
`;

const Paragraph = css`
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

const sLetter = (isVisible: boolean) => css`
  display: inline-block;
  animation: ${isVisible ? fadeOutLeft : 'none'} 1s ease forwards;
  animation-delay: 0.5s;
`;
