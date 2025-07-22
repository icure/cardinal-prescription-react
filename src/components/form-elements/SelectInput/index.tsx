import React from 'react'
import './index.scss'

export interface SelectOption {
  value: string | null
  label: string
}

interface SelectInputProps {
  label: string
  id: string
  required?: boolean
  disabled?: boolean
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  errorMessage?: string
}

const SelectInput: React.FC<SelectInputProps> = ({ label, id, required, disabled, options, value, onChange, errorMessage }) => (
  <div className="selectInput">
    <label htmlFor={id} className={required ? 'required' : ''}>
      <span>*</span>
      {label}
    </label>
    <select id={id} name={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value ?? ''} value={option.value ?? ''}>
          {option.label}
        </option>
      ))}
    </select>
    {!!errorMessage && <p className="selectInput__error">{errorMessage}</p>}
  </div>
)

export default SelectInput
