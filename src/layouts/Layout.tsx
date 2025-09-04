import { css } from '@emotion/react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/common/Modal';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <div css={layoutContainer}>
      <Header variant={isMainPage ? 'light' : 'dark'} />
      <main css={mainStyle}>
        <Outlet />
      </main>
      <Footer />
      {/* 전역 모달 */}
      <Modal />
    </div>
  );
};

export default Layout;

const layoutContainer = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const mainStyle = css`
  // flex: 1;
  // margin-top: 114px;
`;
