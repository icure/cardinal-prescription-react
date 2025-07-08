import React from 'react'
import './index.css'

interface TextareaInputProps {
  label: string
  id: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange: (value: string) => void
}

const TextareaInput: React.FC<TextareaInputProps> = ({ label, id, required, disabled, value, onChange }) => (
  <div className="textareaInput">
    <label htmlFor={id} className={required ? 'required' : ''}>
      <span>*</span>
      {label}
    </label>

    <textarea placeholder={label} name={id} id={id} value={value} disabled={disabled} rows={2} onChange={(e) => onChange(e.target.value)} />
  </div>
)

export default TextareaInput
