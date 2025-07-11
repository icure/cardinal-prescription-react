var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  RadioInput: () => RadioInput,
  SelectInput: () => SelectInput,
  TextInput: () => TextInput,
  TextareaInput: () => TextareaInput,
  ToggleSwitch: () => ToggleSwitch
});
module.exports = __toCommonJS(index_exports);

// src/components/common/Icons/index.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function SpinnerIcn({ pathFill = "#000000", size = 12 }) {
  const sizePx = `${size}px`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { style: { width: sizePx, height: sizePx }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid", width: "24", height: "24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { strokeDasharray: "169.64600329384882 58.548667764616276", r: "36", strokeWidth: "12", stroke: pathFill, fill: "none", cy: "50", cx: "50", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", { keyTimes: "0;1", values: "0 50 50;360 50 50", dur: "1s", repeatCount: "indefinite", type: "rotate", attributeName: "transform" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {})
  ] }) });
}

// src/components/form-elements/Button/styles.ts
var import_styled_components3 = __toESM(require("styled-components"));

// src/styles/reset.ts
var import_styled_components = require("styled-components");
var GlobalStyles = import_styled_components.createGlobalStyle`
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
var import_styled_components2 = require("styled-components");
var fieldCommonStyles = import_styled_components2.css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
var inputCommonStyles = import_styled_components2.css`
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
var inputCommonStyles_disabled = import_styled_components2.css`
  cursor: not-allowed;
  background-color: ${colors.grey[200]};
  border-color: ${colors.grey[550]};
  opacity: 0.7;

  &:hover {
    border-color: ${colors.grey[550]};
  }
`;
var inputCommonStyles_error = import_styled_components2.css`
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
var labelCommonStyles = import_styled_components2.css`
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
var labelCommonStyles_required = import_styled_components2.css`
  span {
    display: flex;
    color: red;
    font-weight: bold;
  }
`;
var labelCommonStyles_error = import_styled_components2.css`
  color: red;
`;
var errorMessageCommonStyles = import_styled_components2.css`
  color: red;
  font-size: 13px;
`;

// src/components/form-elements/Button/styles.ts
var viewStyles = ($view) => {
  switch ($view) {
    case "primary":
      return import_styled_components3.css`
        background: ${colors.blue[800]};
        color: #ffffff;

        &:hover {
          opacity: 0.9;
        }
      `;
    case "outlined":
      return import_styled_components3.css`
        border-radius: 6px;
        border-color: ${colors.grey[550]};
        background: ${colors.grey[100]};
        color: ${colors.blue[800]};

        &:hover {
          border-color: ${colors.blue[800]};
        }
      `;
    case "withSpinner":
      return import_styled_components3.css`
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
var StyledButton = import_styled_components3.default.button`
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var Button = ({ title, view = "primary", handleClick, type = "button", ...rest }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GlobalStyles, {}),
  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(StyledButton, { $view: view, onClick: handleClick, type, ...rest, children: view === "withSpinner" ? SpinnerIcn({}) : title })
] });

// src/components/form-elements/RadioInput/index.tsx
var import_react = __toESM(require("react"));

// src/components/form-elements/RadioInput/styles.ts
var import_styled_components4 = __toESM(require("styled-components"));
var StyledRadioGroupLabel = import_styled_components4.default.p`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components4.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components4.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledRadioButtonToggleStuffing = import_styled_components4.default.span`
  display: none;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${colors.blue[800]};
`;
var StyledRadioButtonToggle = import_styled_components4.default.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid ${colors.grey[600]};
  background: #fff;

  ${({ $error }) => !!$error && import_styled_components4.css`
      border-color: red;

      &:hover {
        box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);
      }

      ${StyledRadioButtonToggleStuffing} {
        background: red;
      }
    `}
`;
var StyledRadioButtonLabel = import_styled_components4.default.span`
  ${labelCommonStyles};

  ${({ $error }) => !!$error && import_styled_components4.css`
      ${labelCommonStyles_error}
    `}

  width: auto;
  font-weight: 400;
`;
var StyledRadioButton = import_styled_components4.default.label`
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

  ${({ $error }) => !!$error && import_styled_components4.css`
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
var StyledRadioInput = import_styled_components4.default.div`
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
var import_jsx_runtime3 = require("react/jsx-runtime");
var RadioInput = ({ label, name, options, required, errorMessage }) => {
  const [value, setValue] = import_react.default.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(GlobalStyles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(StyledRadioInput, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(StyledRadioGroupLabel, { $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "radioBtnsGroup", children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(StyledRadioButton, { htmlFor: option.id, $error: !!errorMessage, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledRadioButtonToggle, { $error: !!errorMessage, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledRadioButtonToggleStuffing, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StyledRadioButtonLabel, { $error: !!errorMessage, children: option.label })
      ] }, option.id)) }),
      !!errorMessage && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/SelectInput/styles.ts
var import_styled_components5 = __toESM(require("styled-components"));
var StyledSelectInputLabel = import_styled_components5.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components5.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components5.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledSelectInput = import_styled_components5.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledSelectDropdown = import_styled_components5.default.select`
  ${inputCommonStyles};

  ${({ $error }) => !!$error && import_styled_components5.css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components5.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/SelectInput/index.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var SelectInput = ({ label, id, required, disabled, options, value, onChange, errorMessage }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GlobalStyles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(StyledSelectInput, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(StyledSelectInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(StyledSelectDropdown, { $disabled: disabled, $error: !!errorMessage, id, name: id, value, disabled, onChange: (e) => onChange(e.target.value), children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: option.value ?? "", children: option.label }, option.value ?? "")) }),
      !!errorMessage && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/TextareaInput/styles.ts
var import_styled_components6 = __toESM(require("styled-components"));
var StyledTextareaInputLabel = import_styled_components6.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components6.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components6.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextareaInput = import_styled_components6.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledTextarea = import_styled_components6.default.textarea`
  ${inputCommonStyles};
  height: unset;

  ${({ $error }) => !!$error && import_styled_components6.css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components6.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/TextareaInput/index.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var TextareaInput = ({ label, id, required, disabled, value, onChange, errorMessage }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(GlobalStyles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(StyledTextareaInput, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(StyledTextareaInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "*" }),
        label
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
      errorMessage && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "error", children: errorMessage })
    ] })
  ] });
};

// src/components/form-elements/TextInput/index.tsx
var import_react2 = require("react");

// src/components/form-elements/TextInput/styles.ts
var import_styled_components7 = __toESM(require("styled-components"));
var StyledTextInputLabel = import_styled_components7.default.label`
  ${labelCommonStyles};
  ${({ $error }) => !!$error && import_styled_components7.css`
      ${labelCommonStyles_error}
    `};
  ${({ $required }) => !!$required && import_styled_components7.css`
      ${labelCommonStyles_required}
    `};
`;
var StyledTextInput = import_styled_components7.default.div`
  ${fieldCommonStyles};

  .error {
    ${errorMessageCommonStyles}
  }
`;
var StyledInput = import_styled_components7.default.input`
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

  ${({ $error }) => !!$error && import_styled_components7.css`
      ${inputCommonStyles_error}
    `};
  ${({ $disabled }) => !!$disabled && import_styled_components7.css`
      ${inputCommonStyles_disabled}
    `};
`;

// src/components/form-elements/TextInput/index.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var TextInput = ({ label, id, required, errorMessage, disabled, autoFocus, ...rest }) => {
  const inputRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(StyledTextInput, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(StyledTextInputLabel, { htmlFor: id, $required: required, $error: !!errorMessage, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "*" }),
      label
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(StyledInput, { id, name: id, ref: inputRef, required, placeholder: label, ...rest, $disabled: disabled, $error: !!errorMessage }),
    errorMessage && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "error", children: errorMessage })
  ] });
};

// src/components/form-elements/ToggleSwitch/index.tsx
var import_react3 = __toESM(require("react"));

// src/components/form-elements/ToggleSwitch/styles.ts
var import_styled_components8 = __toESM(require("styled-components"));
var StyledSwitch = import_styled_components8.default.div`

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
var import_jsx_runtime7 = require("react/jsx-runtime");
var ToggleSwitch = ({ id, value, checked, label, onChange }) => {
  const [localChecked, setLocalChecked] = import_react3.default.useState(checked);
  const handleChange = (newChecked) => {
    setLocalChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(StyledSwitch, { children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "toggleSwitchLabel", children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "toggleWrapper", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { htmlFor: id, className: "toggle", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { id, name: id, type: "checkbox", checked: localChecked, onChange: (e) => handleChange(e.target.checked) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "slider" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: value })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  RadioInput,
  SelectInput,
  TextInput,
  TextareaInput,
  ToggleSwitch
});
//# sourceMappingURL=index.js.map