// src/route/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import MainPage from '@/pages/MainPage';
import HistoryPage from '@/pages/ocial/HistoryPage';
import MembersPage from '@/pages/ocial/MembersPage';
import ActivityListPage from '@/pages/activity/ActivityListPage';
import ActivityDetailPage from '@/pages/activity/ActivityDetailPage';
import NoticePage from '@/pages/news/NoticePage';
import PressPage from '@/pages/news/PressPage';
import MyPage from '@/pages/mypage/MyPage';
import EditPage from '@/pages/mypage/EditPage';
import NotFoundPage from '@/pages/error/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout을 공통으로 사용
    children: [
      { path: '', element: <MainPage /> }, // 메인페이지
      { path: 'ocial/history', element: <HistoryPage /> }, // 오셜,연혁페이지
      { path: 'ocial/members', element: <MembersPage /> }, // 오셜,구성원
      { path: 'activity', element: <ActivityListPage /> }, // Activity 목록
      { path: 'activity/detail', element: <ActivityDetailPage /> }, // Activity 상세
      { path: 'news/notice', element: <NoticePage /> }, // 공지사항
      { path: 'news/press', element: <PressPage /> }, // 보도자료
      { path: 'mypage', element: <MyPage /> }, // 마이페이지
      { path: 'mypage/edit', element: <EditPage /> }, // 정보수정
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // 404 페이지
  },
]);

export default router;
