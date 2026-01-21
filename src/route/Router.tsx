// src/route/Router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import MainPage from '@/pages/MainPage';
import HistoryPage from '@/pages/ocial/HistoryPage';
import MembersPage from '@/pages/ocial/MembersPage';
import ActivityListPage from '@/pages/activity/ActivityListPage';
import ActivityDetailPage from '@/pages/activity/ActivityDetailPage';
import ActivityEditPage from '@/pages/activity/ActivityEditPage';
import ActivityCreatePage from '@/pages/activity/ActivityCreatePage';
import NoticePage from '@/pages/news/NoticePage';
import NoticeDetailPage from '@/pages/news/NoticeDetailPage';
import NoticeEditPage from '@/pages/news/NoticeEditPage';
import NoticeCreatePage from '@/pages/news/NoticeCreatePage';
import PressPage from '@/pages/news/PressPage';
import { Navigate } from 'react-router-dom';
import ActivitiesPage from '@/pages/mypage/ActivitiesPage';
import EditPage from '@/pages/mypage/EditPage';
import LikesPage from '@/pages/mypage/LikesPage';
import NotFoundPage from '@/pages/error/NotFoundPage';
import SigninPage from '@/pages/auth/SigninPage';
import SignupPage from '@/pages/auth/SignupPage';
import WelcomePage from '@/pages/auth/WelcomePage';
import ProfileSetupPage from '@/pages/mypage/ProfileSetupPage';
import FindPage from '@/pages/auth/FindPage';
import IdFoundPage from '@/pages/auth/IdFoundPage';
import PasswordResetPage from '@/pages/auth/PasswordResetPage';
import ToastTest from '@/pages/test-page/ToastTest';
import SquareButtonTest from '@/pages/test-page/SquareButtonTest';
import ModalTest from '@/pages/test-page/ModalTest';
import ProfileDropdownTest from '@/pages/test-page/ProfileDropdownTest';
import ProtectedRoute from '@/components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout을 공통으로 사용
    children: [
      { path: '', element: <MainPage /> }, // 메인페이지
      { path: 'ocial/history', element: <HistoryPage /> }, // 오셜,연혁페이지
      { path: 'ocial/members', element: <MembersPage /> }, // 오셜,구성원
      { path: 'activity', element: <ActivityListPage /> }, // Activity 목록
      { path: 'activity/:id', element: <ActivityDetailPage /> }, // Activity 상세
      {
        path: 'activity/new',
        element: (
          <ProtectedRoute>
            <ActivityCreatePage />
          </ProtectedRoute>
        ),
      }, // Activity 등록 (로그인 필요)
      {
        path: 'activity/edit/:id',
        element: (
          <ProtectedRoute>
            <ActivityEditPage />
          </ProtectedRoute>
        ),
      }, // Activity 수정 (로그인 필요)
      { path: 'news/press', element: <PressPage /> }, // 보도자료,뉴스
      { path: 'news/notice', element: <NoticePage /> }, // 공지사항
      { path: 'news/notice/:id', element: <NoticeDetailPage /> }, // 공지사항 상세
      {
        path: 'news/notice/new',
        element: (
          <ProtectedRoute>
            <NoticeCreatePage />
          </ProtectedRoute>
        ),
      }, // 공지사항 등록 (로그인 필요)
      {
        path: 'news/notice/edit/:id',
        element: (
          <ProtectedRoute>
            <NoticeEditPage />
          </ProtectedRoute>
        ),
      }, // 공지사항 수정 (로그인 필요)
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <Navigate to='/mypage/activities' replace />
          </ProtectedRoute>
        ),
      }, // 마이페이지 리다이렉트
      {
        path: 'mypage/activities',
        element: (
          <ProtectedRoute>
            <ActivitiesPage />
          </ProtectedRoute>
        ),
      }, // 활동내역 페이지 (로그인 필요)
      {
        path: 'mypage/likes',
        element: (
          <ProtectedRoute>
            <LikesPage />
          </ProtectedRoute>
        ),
      }, // 좋아요 페이지 (로그인 필요)
      {
        path: 'mypage/edit',
        element: (
          <ProtectedRoute>
            <EditPage />
          </ProtectedRoute>
        ),
      }, // 정보수정 (로그인 필요)
      { path: '/auth/signin', element: <SigninPage /> }, // 로그인
      { path: '/auth/signup', element: <SignupPage /> }, // 회원가입
      { path: '/auth/welcome', element: <WelcomePage /> }, // 회원가입 완료
      {
        path: '/mypage/profilesetup',
        element: (
          <ProtectedRoute>
            <ProfileSetupPage />
          </ProtectedRoute>
        ),
      }, // 프로필 설정
      { path: '/auth/find', element: <FindPage /> }, // ID/비밀번호 찾기
      { path: '/auth/id-found', element: <IdFoundPage /> }, // ID 찾기 성공
      { path: '/auth/password-reset', element: <PasswordResetPage /> }, // 비밀번호 찾기 성공
      { path: 'test/toast', element: <ToastTest /> }, // Toast 테스트 페이지
      { path: 'test/square-button', element: <SquareButtonTest /> }, // SquareButton 테스트 페이지
      { path: 'test/modal', element: <ModalTest /> }, // Modal 테스트 페이지
      { path: 'test/profile-dropdown', element: <ProfileDropdownTest /> }, // ProfileDropdown 테스트 페이지
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />, // 404 페이지
  },
]);

export default router;
