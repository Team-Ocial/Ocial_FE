import { css } from '@emotion/react';
import HeroSlider from '@/components/common/HeroSlider';
import AboutSection from '@/components/common/AboutSection';
import StorySection from '@/components/common/StorySection';

const MainPage = () => {
  return (
    <div css={mainPageWrapper}>
      <section css={heroSection}>
        <HeroSlider />
      </section>
      <section css={aboutSection}>
        <AboutSection />
      </section>
      <section css={storySection}>
        <StorySection />
      </section>

      <section css={mnaSection}>M&A Section</section>
      <section css={visionSection}>Vision Section</section>
    </div>
  );
};

export default MainPage;
// Styles

const mainPageWrapper = css`
  margin-top: -120px; // 헤더 높이만큼 negative margin
`;

const sectionBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px solid gray; // 삭제해야함
`;

// 각각의 섹션 높이
const heroSection = css`
  ${sectionBase};
  height: 880px;
  border: 2px solid blue;
`;

const aboutSection = css`
  ${sectionBase};
  height: 975px;
`;

const storySection = css`
  ${sectionBase};
  height: 1687px;
`;

const mnaSection = css`
  ${sectionBase};
  height: 1024px;
`;

const visionSection = css`
  ${sectionBase};
  height: 1344px;
`;
