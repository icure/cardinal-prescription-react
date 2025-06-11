import React from 'react'
import './RadioButton.css'

export interface RadioOption {
  label: string
  value: boolean
  id: string
}

interface RadioButtonProps {
  label: string
  name: string
  value: boolean
  options: RadioOption[]
  required?: boolean
  errorMessage?: string
  onChange: (value: boolean) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, value, options, required, errorMessage, onChange }) => (
  <div className="radioBtnsGroup">
    <p className={`radioBtnsGroup__label${required ? ' required' : ''}`}>
      <span>*</span>
      {label}
    </p>
    <div className="radioBtnsGroup__buttons">
      {options.map((option) => (
        <label key={option.id} htmlFor={option.id} className="radioButton">
          <input
            id={option.id}
            name={name}
            type="radio"
            checked={value === option.value}
            value={String(option.value)}
            required={required}
            onChange={() => onChange(option.value)}
          />
          <span className="radioButton__toggle">
            <span className="radioButton__toggle__inside" />
          </span>
          <span className="radioButton__label">{option.label}</span>
        </label>
      ))}
    </div>
    {!!errorMessage && <p className="radioBtnsGroup__error">{errorMessage}</p>}
  </div>
)

export default RadioButton
