import React from 'react'
import { StyledTextarea, StyledTextareaInput, StyledTextareaInputLabel } from './styles'

interface TextareaInputProps {
  label: string
  id?: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
}

export const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(({ label, id, required, disabled, errorMessage, ...rest }, ref) => (
  <StyledTextareaInput className="StyledTextareaInput">
    <StyledTextareaInputLabel className="StyledTextareaInputLabel" htmlFor={id} $required={required} $error={!!errorMessage}>
      <span aria-hidden="true">*</span>
      {label}
    </StyledTextareaInputLabel>

    <StyledTextarea
      className="StyledTextarea"
      placeholder={label}
      name={id}
      id={id}
      $disabled={disabled}
      $error={!!errorMessage}
      disabled={disabled}
      rows={3}
      aria-required={required || undefined}
      aria-invalid={!!errorMessage || undefined}
      aria-describedby={errorMessage && id ? `${id}-error` : undefined}
      ref={ref}
      {...rest}
    />
    {errorMessage && (
      <p id={id ? `${id}-error` : undefined} className="error">
        {errorMessage}
      </p>
    )}
  </StyledTextareaInput>
))
