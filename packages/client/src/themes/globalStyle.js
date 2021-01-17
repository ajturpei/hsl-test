import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Open Sans", Helvetica, Sans-Serif;
  }
  h1, h2, h3, h4, h5 {
    font-family: "Ubuntu", "Open Sans", Helvetica, Sans-Serif;
    font-weight: 700;
  }
  p, div, span {
    font-family: "Ubuntu", "Open Sans", Helvetica, Sans-Serif;
    font-weight: 500;
  }
`;

export default GlobalStyle;
