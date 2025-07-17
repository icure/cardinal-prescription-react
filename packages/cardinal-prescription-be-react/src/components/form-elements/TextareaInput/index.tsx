import React from 'react'
import { StyledTextarea, StyledTextareaInput, StyledTextareaInputLabel } from './styles'

interface TextareaInputProps {
  label: string
  id?: string
  required?: boolean
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
  errorMessage?: string
}

export const TextareaInput: React.FC<TextareaInputProps> = ({ label, id, required, disabled, value, onChange, errorMessage }) => {
  return (
    <StyledTextareaInput>
      <StyledTextareaInputLabel htmlFor={id} $required={required} $error={!!errorMessage}>
        <span>*</span>
        {label}
      </StyledTextareaInputLabel>

      <StyledTextarea
        placeholder={label}
        name={id}
        id={id}
        value={value}
        $disabled={disabled}
        $error={!!errorMessage}
        disabled={disabled}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
    </StyledTextareaInput>
  )
}
