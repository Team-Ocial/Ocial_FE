import { css } from '@emotion/react';

const MainPage = () => {
  return (
    <main>
      <section css={heroSection}>Hero Section</section>
      <section css={aboutSection}>About Section</section>
      <section css={storySection}>Story Section</section>
      <section css={mnaSection}>M&A Section</section>
      <section css={visionSection}>Vision Section</section>
    </main>
  );
};

export default MainPage;
// Styles

const sectionBase = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid gray;
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
