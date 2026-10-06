import React, { forwardRef, useEffect, useRef } from 'react'
import { StyledInput, StyledTextInput, StyledTextInputLabel } from './styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  autoFocus?: boolean
  type?: 'text' | 'number' | 'date' | 'password' | 'file'
  min?: string | number
}

export const TextInput = forwardRef<HTMLInputElement, Props>(({ label, min, type, id, required, errorMessage, disabled, autoFocus, ...rest }, ref) => {
  const localRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && localRef.current) {
      localRef.current.focus()
    }
  }, [autoFocus])

  return (
    <StyledTextInput className="StyledTextInput">
      <StyledTextInputLabel className="StyledTextInputLabel" htmlFor={id} $required={required} $error={!!errorMessage}>
        <span aria-hidden="true">*</span>
        {label}
      </StyledTextInputLabel>
      <StyledInput
        className="StyledInput"
        id={id}
        name={id}
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          localRef.current = node
        }}
        placeholder={label}
        type={type ?? 'text'}
        min={min}
        aria-required={required || undefined}
        aria-invalid={!!errorMessage || undefined}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        {...rest}
        disabled={disabled}
        $disabled={disabled}
        $error={!!errorMessage}
      />
      {errorMessage && (
        <p id={`${id}-error`} className="error">
          {errorMessage}
        </p>
      )}
    </StyledTextInput>
  )
})

TextInput.displayName = 'TextInput'
