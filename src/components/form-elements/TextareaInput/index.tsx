import React from 'react'
import './index.scss'

interface TextareaInputProps {
  label: string
  id: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange: (value: string) => void
  errorMessage?: string
}

const TextareaInput: React.FC<TextareaInputProps> = ({ label, id, required, disabled, value, onChange, errorMessage }) => (
  <div className="textareaInput">
    <label htmlFor={id} className={required ? 'required' : ''}>
      <span>*</span>
      {label}
    </label>

    <textarea placeholder={label} name={id} id={id} value={value} disabled={disabled} rows={2} onChange={(e) => onChange(e.target.value)} />
    {errorMessage && <p className="textareaInput__error">{errorMessage}</p>}
  </div>
)

export default TextareaInput
