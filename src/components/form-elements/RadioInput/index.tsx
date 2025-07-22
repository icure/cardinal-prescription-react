import React from 'react'
import './index.css'

export interface RadioOption {
  label: string
  value: boolean
  id: string
}

interface RadioInputProps {
  label: string
  name: string
  value: boolean
  options: RadioOption[]
  required?: boolean
  errorMessage?: string
  onChange: (value: boolean) => void
}

const RadioInput: React.FC<RadioInputProps> = ({ label, name, value, options, required, errorMessage, onChange }) => (
  <div className="radioBtnsGroup">
    <p className={`radioBtnsGroup__label ${required ? ' required' : ''} ${errorMessage ? ' error' : ''}`}>
      <span>*</span>
      {label}
    </p>
    <div className="radioBtnsGroup__buttons">
      {options.map((option) => (
        <label key={option.id} htmlFor={option.id} className={`radioButton ${errorMessage ? ' error' : ''}`}>
          <input
            id={option.id}
            name={name}
            type="radio"
            checked={value === option.value}
            value={String(option.value)}
            required={required}
            onChange={() => onChange(option.value)}
          />
          <span className={`radioButton__toggle ${errorMessage ? ' error' : ''}`}>
            <span className="radioButton__toggle__inside" />
          </span>
          <span className={`radioButton__label  ${errorMessage ? ' error' : ''}`}>{option.label}</span>
        </label>
      ))}
    </div>
    {!!errorMessage && <p className="radioBtnsGroup__error">{errorMessage}</p>}
  </div>
)

export default RadioInput
