/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Button from '@/components/common/Button';
import { theme } from '@/styles/theme';

const ButtonTest = () => {
  return (
    <div css={container}>
      <section>
        <h2>필터 버튼</h2>
        <div css={buttonGroup}>
          <Button variant='filter' active>
            전체보기
          </Button>
          <Button variant='filter'>예정된 활동</Button>
          <Button variant='filter'>활동 중</Button>
          <Button variant='filter'>수료</Button>
        </div>
      </section>

      <section>
        <h2>메뉴 버튼 (150px)</h2>
        <div css={buttonGroup}>
          <Button variant='outlined' size='medium' width={150} active>
            현재 페이지
          </Button>
          <Button variant='outlined' size='medium' width={150}>
            다른 페이지
          </Button>
        </div>
      </section>

      <section>
        <h2>Large 버튼 (320px)</h2>
        <div css={buttonGroup}>
          <Button size='large' width={320}>
            Button
          </Button>
          <Button size='large' width={320} variant='outlined'>
            Button
          </Button>
        </div>
      </section>

      <section>
        <h2>Medium 버튼 (150px)</h2>
        <div css={buttonGroup}>
          <Button size='medium' width={150}>
            Button
          </Button>
          <Button size='medium' width={150} variant='outlined'>
            Button
          </Button>
        </div>
      </section>

      <section>
        <h2>Small 버튼 (73px)</h2>
        <div css={buttonGroup}>
          <Button size='small' width={73}>
            Button
          </Button>
          <Button size='small' width={73} variant='outlined'>
            Button
          </Button>
        </div>
      </section>

      <section>
        <h2>전체 너비 버튼</h2>
        <div css={buttonGroup}>
          <Button fullWidth>Full Width Button</Button>
          <Button variant='outlined' fullWidth>
            Full Width Button
          </Button>
        </div>
      </section>

      <section>
        <h2>비활성화 버튼</h2>
        <div css={buttonGroup}>
          <Button disabled>Disabled Button</Button>
          <Button variant='outlined' disabled>
            Disabled Button
          </Button>
        </div>
      </section>

      <section>
        <h2>실제 사용 예시</h2>
        <div css={[buttonGroup, exampleBackground]}>
          <Button size='large' width={320}>
            시작하기
          </Button>
          <Button size='large' width={320} variant='outlined'>
            더 알아보기
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ButtonTest;

const container = css`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;

  section {
    margin-bottom: 40px;
  }

  h2 {
    margin-bottom: 16px;
    font-size: 18px;
    color: ${theme.colors.grayscale[700]};
  }
`;

const buttonGroup = css`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const exampleBackground = css`
  background: ${theme.colors.grayscale[50]};
  padding: 20px;
  border-radius: 8px;
`;
