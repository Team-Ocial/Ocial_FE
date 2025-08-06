import { RouterProvider } from 'react-router-dom';
import router from '@/route/Router';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from './styles/globalStyle';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
