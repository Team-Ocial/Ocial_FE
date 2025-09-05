import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '@/route/Router';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';
import { ToastContainer } from '@/components/common/Toast';
import { useLikesStore } from '@/store/useLikesStore';

const App = () => {
  const { loadLikes } = useLikesStore();

  useEffect(() => {
    loadLikes(); // 앱 시작 시 저장된 좋아요 상태 로드
  }, [loadLikes]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
