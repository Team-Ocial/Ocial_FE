import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import mnaSectionImg from '@/assets/images/mnaSectionImg.png';

const MnaSection = () => {
  return (
    <section css={wrapper}>
      <div css={backgroundImage} />
      <div css={content}>
        <h2 css={title}>
          M&A THE DATA,
          <br />
          MAKE NEW VALUE
        </h2>
        <p css={description}>
          개개인의 역사, 기록, 경험이 만나
          <br />
          새로운 가치와 가능성을 창출하며, 팀 시너지 효과를 발휘합니다.
        </p>
      </div>
    </section>
  );
};

export default MnaSection;

const wrapper = css`
  width: 100%;
  height: 1024px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const backgroundImage = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${mnaSectionImg}) no-repeat center;
  background-size: cover;
  z-index: 0;
`;

const content = css`
  position: relative;
  z-index: 1;
  max-width: ${theme.layout.width.content};
  width: 100%;
  color: ${theme.colors.white};
`;

const title = css`
  color: ${theme.colors.white};
  font-family: 'Anton', sans-serif;
  font-size: 133px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  font-variant: all-small-caps;
  letter-spacing: -1.99px;
  margin-bottom: 40px;
`;

const description = css`
  ${theme.typography.titleLarge};
`;