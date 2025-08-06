import { css } from '@emotion/react';
import HeroSlider from '@/components/main/HeroSlider';
import AboutSection from '@/components/main/AboutSection';
import StorySection from '@/components/main/StorySection';
import MnaSection from '@/components/main/MnaSection';
import VisionSection from '@/components/main/VisionSection';

const MainPage = () => {
  return (
    <div css={mainPageWrapper}>
      <section>
        <HeroSlider />
      </section>
      <section>
        <AboutSection />
      </section>
      <section>
        <StorySection />
      </section>
      <section>
        <MnaSection />
      </section>
      <section>
        <VisionSection />
      </section>
    </div>
  );
};

export default MainPage;
// Styles

const mainPageWrapper = css`
  margin-top: -120px; // 헤더 높이만큼 negative margin
`;
