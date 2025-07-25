import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  /* Reset of the user agent styles */

  * {
    margin: 0;
    padding: 0;
    font-size: 100%;
    box-sizing: border-box;
  }
  
  // Links
  a {
    text-decoration: none;

    &:active,
    &:hover {
      outline: 0;
    }
  }

  // List
  ul,
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  // Headlines
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }

  // Default
  html,
  body {
    box-sizing: border-box;
    font-size: 16px;
    background-color: #fbfdff;
    font-family: 'Lato', sans-serif;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
  }

  img,
  audio,
  video {
    max-width: 100%;
    height: auto;
  }

  iframe {
    border: 0;
  }

  // Form
  textarea {
    resize: none;
    /*remove the resize handle on the bottom right*/
    overflow: auto;
    vertical-align: top;
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }

  input,
  textarea,
  select,
  button {
    outline: none;
    border: none;
    font-size: 100%;
    margin: 0;
  }

  button,
  input {
    line-height: normal;
  }

  // browser user agent input reset

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: rgb(0, 0, 0);
    transition: background-color 5000s ease-in-out 0s;
  }

  // Table
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
    text-align: left;
  }
`
