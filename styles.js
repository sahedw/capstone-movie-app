import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    font-family: Normal;
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.fontColor};
  }

  main {
    margin-bottom: 100px;
  }

  @font-face {
    font-family: 'BIGLetters';
    src: url('/fonts/BebasNeue-Regular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'Normal';
    src: url('/fonts/DoHyeon-Regular.ttf') format('truetype');
  }

`;
export const lightTheme = {
  body: "white",
  fontColor: "black",
  navigation: "white",
  buttonText: "white",
};

export const darkTheme = {
  body: "#212121",
  fontColor: "#f5f5f5",
  navigation: "#8c8d8d",
};

/* background-color: #212121;
color: #f5f5f5; */
