import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import visionBg from '@/assets/images/visionSectionImg.png';

const VisionSection = () => {
  return (
    <section css={wrapper}>
      <div css={backgroundImage} />
      <div css={backgroundText}>VISION</div>

      <div css={content}>
        <h2 css={title}>OCIAL's Vision</h2>

        <div css={textContent}>
          <p css={paragraph}>
            데이터를 통해 과거와 미래를 연결하고,
            <br />
            지속적인 학습과 협업을 통해 혁신적인 아이디어를 실현하며,
            <br />
            IT, 교육, 비즈니스의 힘으로 사회적 문제를 해결하는 것을 목표로 합니다.
          </p>

          <p css={paragraph}>
            OCIAL은 다순한 네트워크를 넘어,
            <br />
            모든 구성원이 성장하고, 협력하며, 사회적 가치를 만들어가는 플랫폼을 지향합니다.
          </p>

          <p css={paragraph}>
            함께 배우고 도전하며, 더 나은 미래를 만들어가고자 다양한 활동을 하고 있습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;

const wrapper = css`
  width: 100%;
  height: 1344px;
  position: relative;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  overflow: hidden;
`;

const backgroundImage = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${visionBg}) no-repeat center;
  background-size: cover;
  opacity: 0.5;
  z-index: 0;
`;

const backgroundText = css`
  position: absolute;
  top: 150px;
  left: 50%;
  width: 100%;
  max-width: ${theme.layout.width.max};
  transform: translateX(-50%);
  font-size: 150px;
  font-weight: 900;
  color: ${theme.colors.grayscale[200]};
  opacity: 0.15;
  z-index: 1;
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
`;

const content = css`
  position: relative;
  z-index: 2;
  max-width: ${theme.layout.width.max};
  margin: 0 auto;
  padding: 200px 0;
  // border: 1px solid red;
`;

const title = css`
  ${theme.typography.headlineLarge};
  margin-bottom: 120px;
  display: flex;
  align-items: center;
  // border: 1px solid green;

  &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${theme.colors.white};
    margin-left: 16px;
  }
`;

const textContent = css`
  max-width: ${theme.layout.width.content};
  margin: 0 auto;
`;

const paragraph = css`
  ${theme.typography.headlineSmall};
  text-align: left;
  margin-bottom: 60px;

  &:last-child {
    margin-bottom: 0;
  }
`;
