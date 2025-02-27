// // src/layouts/Layout.tsx
// import { Link, Outlet } from 'react-router-dom';

// const Layout = () => {
//   return (
//     <>
//       <header>
//         <nav>
//           <ul>
//             <li><Link to="/">메인페이지</Link></li>
//             <li><Link to="/ocial/history">연혁</Link></li>
//             <li><Link to="/ocial/members">구성원</Link></li>
//             <li><Link to="/activity">Activity 목록</Link></li>
//             <li><Link to="/news/notice">공지사항</Link></li>
//             <li><Link to="/news/press">보도자료</Link></li>
//             <li><Link to="/mypage">마이페이지</Link></li>
//             <li><Link to="/mypage/edit">정보수정</Link></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <Outlet />
//       </main>
//       <footer>
//         <p>© 2025 Ocial 블로그</p>
//       </footer>
//     </>
//   );
// };

// export default Layout;

// src/layouts/Layout.tsx
import { Outlet } from 'react-router-dom';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';

const Layout = () => {
  return (
    <div>
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
