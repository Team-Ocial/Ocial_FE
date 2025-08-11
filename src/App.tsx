import { RouterProvider } from 'react-router-dom';
import router from '@/route/Router';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';
import { ToastContainer } from '@/components/common/Toast';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
