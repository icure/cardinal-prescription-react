// src/components/common/Icons/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function SpinnerIcn({ pathFill = "#000000", size = 12 }) {
  const sizePx = `${size}px`;
  return /* @__PURE__ */ jsx("svg", { style: { width: sizePx, height: sizePx }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", width: "24", height: "24", children: /* @__PURE__ */ jsxs("g", { children: [
    /* @__PURE__ */ jsx("circle", { strokeDasharray: "169.64600329384882 58.548667764616276", r: "36", strokeWidth: "12", stroke: pathFill, fill: "none", cy: "50", cx: "50", children: /* @__PURE__ */ jsx("animateTransform", { keyTimes: "0;1", values: "0 50 50;360 50 50", dur: "1s", repeatCount: "indefinite", type: "rotate", attributeName: "transform" }) }),
    /* @__PURE__ */ jsx("g", {})
  ] }) });
}

// src/components/form-elements/Button/styles.ts
import styled, { css as css2 } from "styled-components";

// src/styles/reset.ts
import { createGlobalStyle } from "styled-components";
var GlobalStyles = createGlobalStyle`
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
`;

// src/styles/variables.ts
var colors = {
  blue: {
    800: "#084b83",
    600: "#4b6682",
    500: "#3d87c5",
    300: "#eef6fe",
    200: "#f9fbfe",
    100: "#dce7f2"
  },
  grey: {
    900: "#1d2235",
    650: "#9ca8b2",
    600: "#848482",
    550: "#cad0d5",
    300: "#e4e4e7",
    200: "#f5f5f5",
    100: "#fcfcfd"
  },
  orange: {
    900: "#ef762f"
  },
  green: {
    400: "#b7eb8f",
    300: "#f6ffed",
    200: "#e5fae5"
  },
  red: {
    800: "#FF0000FF",
    400: "#ffccc7",
    300: "#fff1f0"
  }
};

// src/styles/elements.ts
import { css } from "styled-components";
var fieldCommonStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
var inputCommonStyles = css`
  width: 100%;
  display: flex;
  height: 32px;
  padding: 5px 12px;
  align-items: center;
  gap: 4px;
  align-self: stretch;
  cursor: pointer;

  border-radius: 6px;
  border: 1px solid ${colors.grey[550]};
  background: #fff;

  color: ${colors.grey[900]};
  font-family: 'Inter Variable', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;

  &::placeholder {
    color: ${colors.grey[650]};
  }

  &:hover,
  &:focus {
    border-color: ${colors.blue[800]};
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
  }
`;
var inputCommonStyles_disabled = css`
  cursor: not-allowed;
  background-color: ${colors.grey[200]};
  border-color: ${colors.grey[550]};
  opacity: 0.7;

  &:hover {
    border-color: ${colors.grey[550]};
  }
`;
var inputCommonStyles_error = css`
  border-color: red;
  color: red;

  &::placeholder {
    color: rgba(255, 0, 0, 0.5);
  }

  &:hover {
    border-color: rgba(255, 0, 0, 0.5);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
  }
`;
var labelCommonStyles = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 4px;
  color: ${colors.grey[900]};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  cursor: pointer;

  span {
    display: none;
  }
`;
var labelCommonStyles_required = css`
  span {
    display: flex;
    color: red;
    font-weight: bold;
  }
`;
var labelCommonStyles_error = css`
  color: red;
`;
var errorMessageCommonStyles = css`
  color: red;
  font-size: 13px;
`;

// src/components/form-elements/Button/styles.ts
var viewStyles = ($view) => {
  switch ($view) {
    case "primary":
      return css2`
        background: ${colors.blue[800]};
        color: #ffffff;

        &:hover {
          opacity: 0.9;
        }
      `;
    case "outlined":
      return css2`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};

        &:hover {
          border-color: ${colors.blue[800]};
        }
      `;
    case "withSpinner":
      return css2`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};
        gap: 8px;
      `;
    default:
      return null;
  }
};
var StyledButton = styled.button`
  display: flex;
  height: 32px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid ${colors.blue[800]};
  cursor: pointer;
  min-width: 64px;

  ${({ $view }) => viewStyles($view)}
  &[disabled],
  &[disabled]:hover {
    cursor: not-allowed;
    border-color: ${colors.grey[550]};
    background: ${colors.grey[200]};
    color: ${colors.grey[600]};
  }
`;

// src/components/form-elements/Button/index.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var Button = ({ title, view = "primary", handleClick, type = "button", ...rest }) => /* @__PURE__ */ jsxs2(Fragment, { children: [
  /* @__PURE__ */ jsx2(GlobalStyles, {}),
  /* @__PURE__ */ jsx2(StyledButton, { $view: view, onClick: handleClick, type, ...rest, children: view === "withSpinner" ? SpinnerIcn({}) : title })
] });

// src/components/form-elements/RadioInput/index.tsx
import React from "react";

// src/components/form-elements/RadioInput/styles.ts
import styled2, { css as css3 } from "styled-components";
var StyledRadioGroupLabel = styled2.p`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && css3`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && css3`
      ${labelCommonStyles_required}
    `};
`;
var StyledRadioButtonToggleStuffing = styled2.span`
  display: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${colors.blue[800]};
`;
var StyledRadioButtonToggle = styled2.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${colors.grey[600]};
  background: #fff;

  ${({ $error }) => !!$error && css3`
      border-color: red;

      &:hover {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
      }

      ${StyledRadioButtonToggleStuffing} {
        background: red;
      }
    `}
`;
var StyledRadioButtonLabel = styled2.span`
  ${labelCommonStyles};

  ${({ $error }) => !!$error && css3`
      ${labelCommonStyles_error}
    `}

  width: auto;
  font-weight: 400;
`;
var StyledRadioButton = styled2.label`
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  cursor: pointer;

  &:hover {
    ${StyledRadioButtonToggle} {
      box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
      border-color: ${colors.blue[800]};
    }
  }

  input {
    display: none;

    &:checked + ${StyledRadioButtonToggle} {
      border-color: ${colors.blue[800]};

      ${StyledRadioButtonToggleStuffing} {
        display: flex;
      }
    }
  }

  ${({ $error }) => !!$error && css3`
      &:hover {
        ${StyledRadioButtonToggle} {
          box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
          border-color: red;
        }
      }

      input {
        display: none;

        &:checked + ${StyledRadioButtonToggle} {
          border-color: red;

          ${StyledRadioButtonToggleStuffing} {
            display: flex;
          }
        }
      }
    `}
`;
var StyledRadioInput = styled2.div`
  ${fieldCommonStyles};

  .radioBtnsGroup {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
  }

  .error {
    ${errorMessageCommonStyles}
  }
`;

// src/components/form-elements/RadioInput/index.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var RadioInput = ({ label, name, options, required, errorMessage }) => {
  const [value, setValue] = React.useState(false);
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx3(GlobalStyles, {}),
    /* @__PURE__ */ jsxs3(StyledRadioInput, { children: [
      /* @__PURE__ */ jsxs3(StyledRadioGroupLabel, { $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ jsx3("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ jsx3("div", { className: "radioBtnsGroup", children: options.map((option) => /* @__PURE__ */ jsxs3(StyledRadioButton, { htmlFor: option.id, $error: !!errorMessage, children: [
        /* @__PURE__ */ jsx3(
          "input",
          {
            id: option.id,
            name,
            type: "radio",
            checked: value === option.value,
            value: String(option.value),
            required,
            onChange: () => setValue(option.value)
          }
        ),
        /* @__PURE__ */ jsx3(StyledRadioButtonToggle, { $error: !!errorMessage, children: /* @__PURE__ */ jsx3(StyledRadioButtonToggleStuffing, {}) }),
        /* @__PURE__ */ jsx3(StyledRadioButtonLabel, { $error: !!errorMessage, children: option.label })
      ] }, option.id)) }),
      !!errorMessage && /* @__PURE__ */ jsx3("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/SelectInput/styles.ts
import styled3, { css as css4 } from "styled-components";
var StyledSelectInputLabel = styled3.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && css4`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && css4`
      ${labelCommonStyles_required}
    `};
`;
var StyledSelectInput = styled3.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledSelectDropdown = styled3.select`
  ${inputCommonStyles};

  ${({ $error }) => !!$error && css4`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && css4`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/SelectInput/index.tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var SelectInput = ({ label, id, required, disabled, options, value, onChange, errorMessage }) => {
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsx4(GlobalStyles, {}),
    /* @__PURE__ */ jsxs4(StyledSelectInput, { children: [
      /* @__PURE__ */ jsxs4(StyledSelectInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ jsx4("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ jsx4(StyledSelectDropdown, { $disabled: disabled, $error: !!errorMessage, id, name: id, value, disabled, onChange: (e) => onChange(e.target.value), children: options.map((option) => /* @__PURE__ */ jsx4("option", { value: option.value ?? "", children: option.label }, option.value ?? "")) }),
      !!errorMessage && /* @__PURE__ */ jsx4("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/TextareaInput/styles.ts
import styled4, { css as css5 } from "styled-components";
var StyledTextareaInputLabel = styled4.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && css5`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && css5`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextareaInput = styled4.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledTextarea = styled4.textarea`
  ${inputCommonStyles};
  height: unset;

  ${({ $error }) => !!$error && css5`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && css5`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/TextareaInput/index.tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var TextareaInput = ({ label, id, required, disabled, value, onChange, errorMessage }) => {
  return /* @__PURE__ */ jsxs5(Fragment4, { children: [
    /* @__PURE__ */ jsx5(GlobalStyles, {}),
    /* @__PURE__ */ jsxs5(StyledTextareaInput, { children: [
      /* @__PURE__ */ jsxs5(StyledTextareaInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ jsx5("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ jsx5(
        StyledTextarea,
        {
          placeholder: label,
          name: id,
          id,
          value,
          $disabled: disabled,
          $error: !!errorMessage,
          disabled,
          rows: 3,
          onChange: (e) => onChange(e.target.value)
        }
      ),
      errorMessage && /* @__PURE__ */ jsx5("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/TextInput/index.tsx
import { useEffect, useRef } from "react";

// src/components/form-elements/TextInput/styles.ts
import styled5, { css as css6 } from "styled-components";
var StyledTextInputLabel = styled5.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && css6`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && css6`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextInput = styled5.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledInput = styled5.input`
  ${inputCommonStyles};

  &::file-selector-button {
    border-radius: 0;
    height: 100%;
    cursor: pointer;
    background-color: white;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.16);
    margin-right: 16px;
    padding-right: 12px;
    transition: background-color 200ms;
  }

  ${({ $error }) => !!$error && css6`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && css6`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/TextInput/index.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
var TextInput = ({ label, id, required, errorMessage, disabled, autoFocus, ...rest }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ jsxs6(StyledTextInput, { children: [
    /* @__PURE__ */ jsxs6(StyledTextInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
      /* @__PURE__ */ jsx6("span", { children: "*" }),
      label
    ] }),
    /* @__PURE__ */ jsx6(StyledInput, { id, name: id, ref: inputRef, required, placeholder: label, ...rest, $disabled: disabled, $error: !!errorMessage }),
    errorMessage && /* @__PURE__ */ jsx6("p", { className: "error", children: errorMessage })
  ] });
};

// src/components/form-elements/ToggleSwitch/index.tsx
import React3 from "react";

// src/components/form-elements/ToggleSwitch/styles.ts
import styled6 from "styled-components";
var StyledSwitch = styled6.div`

  ${fieldCommonStyles};

  .toggleSwitchLabel {
    ${labelCommonStyles};
  }

  .toggleWrapper {
    display: flex;
    padding: 4px 0;
    align-items: center;
    gap: 12px;
    align-self: stretch;

    .toggle {
      position: relative;
      display: inline-block;
      width: 46px;
      height: 24px;

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${colors.grey[550]};
        border: 1px solid transparent;
        transition: 0.4s;
        border-radius: 34px;

        &:hover {
          border-color: ${colors.blue[800]};
          box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
        }

        &::before {
          position: absolute;
          content: '';
          height: 18px;
          width: 18px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
      }

      input {
        opacity: 0;
        width: 0;
        height: 0;

        &:checked + .slider {
          background-color: ${colors.blue[800]};
        }

        &:checked + .slider:hover {
          box-shadow: 0 0 0 2px rgba(61, 135, 197, 0.2);
        }

        &:focus + .slider {
          box-shadow: 0 0 1px ${colors.blue[800]};
        }

        &:checked + .slider::before {
          -webkit-transform: translateX(20px);
          -ms-transform: translateX(20px);
          transform: translateX(20px);
        }
      }
    }

    p {
      ${labelCommonStyles};
    }
`;

// src/components/form-elements/ToggleSwitch/index.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "react/jsx-runtime";
var ToggleSwitch = ({ id, value, checked, label, onChange }) => {
  const [localChecked, setLocalChecked] = React3.useState(checked);
  const handleChange = (newChecked) => {
    setLocalChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };
  return /* @__PURE__ */ jsxs7(StyledSwitch, { children: [
    label && /* @__PURE__ */ jsx7("p", { className: "toggleSwitchLabel", children: label }),
    /* @__PURE__ */ jsxs7("div", { className: "toggleWrapper", children: [
      /* @__PURE__ */ jsxs7("label", { htmlFor: id, className: "toggle", children: [
        /* @__PURE__ */ jsx7("input", { id, name: id, type: "checkbox", checked: localChecked, onChange: (e) => handleChange(e.target.checked) }),
        /* @__PURE__ */ jsx7("span", { className: "slider" })
      ] }),
      /* @__PURE__ */ jsx7("p", { children: value })
    ] })
  ] });
};
export {
  Button,
  RadioInput,
  SelectInput,
  TextInput,
  TextareaInput,
  ToggleSwitch
};
//# sourceMappingURL=index.mjs.map