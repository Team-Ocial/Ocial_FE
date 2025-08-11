// src/route/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import MainPage from '@/pages/MainPage';
import HistoryPage from '@/pages/OCIAL/HistoryPage';
import MembersPage from '@/pages/OCIAL/MembersPage';
import ActivityListPage from '@/pages/activity/ActivityListPage';
import ActivityDetailPage from '@/pages/activity/ActivityDetailPage';
import ActivityEditPage from '@/pages/activity/ActivityEditPage';
import NoticePage from '@/pages/news/NoticePage';
import PressPage from '@/pages/news/PressPage';
import MyPage from '@/pages/mypage/MyPage';
import EditPage from '@/pages/mypage/EditPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import SigninPage from '@/pages/auth/SigninPage';
import SignupPage from '@/pages/auth/SignupPage';
import ToastTest from '@/pages/test-page/ToastTest';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout을 공통으로 사용
    children: [
      { path: '', element: <MainPage /> }, // 메인페이지
      { path: 'OCIAL/history', element: <HistoryPage /> }, // 오셜,연혁페이지
      { path: 'OCIAL/members', element: <MembersPage /> }, // 오셜,구성원
      { path: 'activity', element: <ActivityListPage /> }, // Activity 목록
      { path: 'activity/:id', element: <ActivityDetailPage /> }, // Activity 상세
      { path: 'activity/edit/:id', element: <ActivityEditPage /> }, // Activity 수정
      { path: 'news/press', element: <PressPage /> }, // 보도자료,뉴스
      { path: 'news/notice', element: <NoticePage /> }, // 공지사항
      { path: 'mypage', element: <MyPage /> }, // 마이페이지
      { path: 'mypage/edit', element: <EditPage /> }, // 정보수정
      { path: '/auth/signin', element: <SigninPage /> }, // 로그인
      { path: '/auth/signup', element: <SignupPage /> }, // 회원가입
      { path: 'test/toast', element: <ToastTest /> }, // Toast 테스트 페이지
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // 404 페이지
  },
]);

export default router;
