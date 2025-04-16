import { createGlobalStyle } from 'styled-components';
import { fontFace } from '@/styles/fonts';

export const GlobalStyle = createGlobalStyle`
  ${fontFace}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-text-size-adjust: 100%;
  }

  body {
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    min-height: 100vh;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`; 