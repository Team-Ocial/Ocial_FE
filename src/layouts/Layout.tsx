import { Outlet } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Layout = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <div css={layoutStyle}>
        <Header />
        <main css={mainStyle}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

const layoutStyle = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const mainStyle = css`
  flex: 1;
  margin-top: -82px; // 헤더 높이만큼 negative margin
`;
