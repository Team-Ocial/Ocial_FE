import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '@/styles/theme';
import heroImage1 from '@/assets/images/hero1.png';
import heroImage2 from '@/assets/images/hero2.png';
import heroImage3 from '@/assets/images/hero3.png';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BsArrowRightCircleFill } from 'react-icons/bs';

const slides = [
  {
    image: heroImage1,
    title: '데이터 기반의\n직장인 창업 동아리,OCIAL',
    subtitle: 'About OCIAL',
    link: 'OCIAL/history',
  },
  {
    image: heroImage2,
    title: 'M&A The Data,\nMake New Value',
    subtitle: 'OCIAL이 추구하는 가치',
    link: 'activity',
  },
  {
    image: heroImage3,
    title: 'OCIAL의 소식을\n만나보세요',
    subtitle: 'NEWS',
    link: 'news/press',
  },
];

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleSubtitleClick = () => {
    navigate(slides[currentIndex].link);
  };

  return (
    <div css={sliderWrapper}>
      <div css={slideImage(slides[currentIndex].image)}>
        <div css={overlay}>
          <div css={textBlock}>
            <button onClick={handleSubtitleClick} css={subtitle}>
              {slides[currentIndex].subtitle} <BsArrowRightCircleFill className='icon' />
            </button>
            <h2 css={title}>{slides[currentIndex].title}</h2>
          </div>

          <div css={bottomNav}>
            <div css={progressContainer}>
              <span css={pageText}>{`0${currentIndex + 1}`}</span>
              <div css={progressBarWrapper}>
                <div css={progressBarFill(currentIndex, slides.length)} />
              </div>
              <span css={pageText}>{`0${slides.length}`}</span>
            </div>
            <div css={arrowButtons}>
              <button onClick={goToPrev}>
                <MdKeyboardArrowLeft className='arrow' />
              </button>
              <button onClick={goToNext}>
                <MdKeyboardArrowRight className='arrow' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;

// styles
const sliderWrapper = css`
  width: 100%;
  height: 880px;
  position: relative;
  overflow: hidden;
`;

const slideImage = (url: string) => css`
  width: 100%;
  height: 100%;
  background-image: url(${url});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const overlay = css`
  width: 100%;
  height: 100%;
  padding: 0;
  background: rgba(0, 0, 0, 0.4);
  color: ${theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const textBlock = css`
  position: absolute;
  top: 300px;
  left: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const subtitle = css`
  ${theme.typography.headlineSmall};
  color: ${theme.colors.white};
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 16px;

  .icon {
    font-size: 24px;
  }
`;

const title = css`
  ${theme.typography.displaySmall};
  white-space: pre-line;
  color: ${theme.colors.white};
`;

const bottomNav = css`
  position: absolute;
  left: 200px;
  bottom: 230px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const progressContainer = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const pageText = css`
  ${theme.typography.labelMedium};
  color: ${theme.colors.white};
`;

const progressBarWrapper = css`
  position: relative;
  width: 100px;
  height: 2px;
  background-color: ${theme.colors.grayscale[600]};
  flex-shrink: 0;
`;

const progressBarFill = (index: number, total: number) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${((index + 1) / total) * 100}%;
  background-color: ${theme.colors.white};
  transition: width 0.3s ease;
`;

const arrowButtons = css`
  display: flex;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    .arrow {
      font-size: 24px;
      color: ${theme.colors.white};
    }
  }
`;
