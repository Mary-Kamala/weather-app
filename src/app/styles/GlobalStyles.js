// src/styles/GlobalStyles.js
import { createGlobalStyle } from "styled-components";
 
const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
  }
  body {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    min-height: 100vh;
  }
    h1,h2,h3,h4,h5{
        margin:0;
    }
`;
 
export default GlobalStyles;