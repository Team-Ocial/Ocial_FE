// src/styles/GlobalStyle.tsx
import { Global, css } from '@emotion/react';
import { theme } from './theme';

function GlobalStyle() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html,
        body {
          font-family: 'Pretendard', sans-serif;
          font-size: 16px;
          background-color: ${theme.colors.grayscale[0]};
          color: ${theme.colors.grayscale[900]};
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        button {
          font-family: inherit;
          background: none;
          border: none;
          cursor: pointer; /* 마우스 올릴 때 손가락 모양 */
        }
      `}
    />
  );
}

export default GlobalStyle;
