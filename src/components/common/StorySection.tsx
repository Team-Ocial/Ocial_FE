import { css } from '@emotion/react';

const StorySection = () => {
  return <section css={storySection}>Story Section</section>;
};

export default StorySection;

const storySection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
  border-bottom: 1px solid gray;
  height: 1687px;
`;