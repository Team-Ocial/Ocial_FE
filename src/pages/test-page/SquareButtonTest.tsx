import { css } from '@emotion/react';
import { theme } from '@/styles/theme';
import SquareButton from '@/components/common/SquareButton';

const SquareButtonTest = () => {
  return (
    <div css={pageContainer}>
      <h1 css={title}>SquareButton 컴포넌트 테스트</h1>

      {/* Variant 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>Variant 테스트</h2>
        <div css={buttonGroup}>
          <SquareButton variant='filled'>Button (Filled)</SquareButton>
          <SquareButton variant='outlined'>Button (Outlined)</SquareButton>
          <SquareButton variant='gray'>Menu (Gray)</SquareButton>
          <SquareButton variant='plain'>Plain (No Border)</SquareButton>
          <SquareButton variant='text'>Text (Like Text)</SquareButton>
          <SquareButton disabled>Menu (Disabled)</SquareButton>
        </div>
      </section>

      {/* Size 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>Size 테스트</h2>
        <div css={buttonGroup}>
          <SquareButton size='small' variant='filled'>
            Small
          </SquareButton>
          <SquareButton size='medium' variant='filled'>
            Medium
          </SquareButton>
          <SquareButton size='large' variant='filled'>
            Large
          </SquareButton>
        </div>
      </section>

      {/* Active 상태 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>Active 상태 테스트</h2>
        <div css={buttonGroup}>
          <SquareButton variant='filled' active>
            Active Filled
          </SquareButton>
          <SquareButton variant='outlined' active>
            Active Outlined
          </SquareButton>
          <SquareButton variant='gray' active>
            Active Gray
          </SquareButton>
          <SquareButton variant='plain' active>
            Active Plain
          </SquareButton>
        </div>
      </section>

      {/* Width 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>Width 테스트</h2>
        <div css={buttonColumn}>
          <SquareButton width={200} variant='outlined'>
            Width 200px
          </SquareButton>
          <SquareButton width='300px' variant='gray'>
            Width 300px
          </SquareButton>
          <SquareButton fullWidth variant='filled'>
            Full Width Button
          </SquareButton>
        </div>
      </section>

      {/* 클릭 이벤트 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>클릭 이벤트 테스트</h2>
        <div css={buttonGroup}>
          <SquareButton variant='filled' onClick={() => alert('Filled 버튼 클릭!')}>
            클릭해보세요
          </SquareButton>
          <SquareButton variant='outlined' onClick={() => console.log('Outlined 버튼 클릭됨')}>
            콘솔 확인
          </SquareButton>
        </div>
      </section>

      {/* 조합 테스트 */}
      <section css={section}>
        <h2 css={sectionTitle}>다양한 조합 테스트</h2>
        <div css={buttonGrid}>
          <SquareButton size='small' variant='filled'>
            Small Filled
          </SquareButton>
          <SquareButton size='small' variant='outlined'>
            Small Outlined
          </SquareButton>
          <SquareButton size='small' variant='gray'>
            Small Gray
          </SquareButton>

          <SquareButton size='medium' variant='filled'>
            Medium Filled
          </SquareButton>
          <SquareButton size='medium' variant='outlined'>
            Medium Outlined
          </SquareButton>
          <SquareButton size='medium' variant='gray'>
            Medium Gray
          </SquareButton>

          <SquareButton size='large' variant='filled'>
            Large Filled
          </SquareButton>
          <SquareButton size='large' variant='outlined'>
            Large Outlined
          </SquareButton>
          <SquareButton size='large' variant='gray'>
            Large Gray
          </SquareButton>
        </div>
      </section>
    </div>
  );
};

export default SquareButtonTest;

// Styles
const pageContainer = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const title = css`
  ${theme.typography.headlineLarge};
  color: ${theme.colors.black};
  margin-bottom: 2rem;
  text-align: center;
`;

const section = css`
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const sectionTitle = css`
  ${theme.typography.titleLarge};
  color: ${theme.colors.grayscale[700]};
  margin-bottom: 1.5rem;
`;

const buttonGroup = css`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const buttonColumn = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
`;

const buttonGrid = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
