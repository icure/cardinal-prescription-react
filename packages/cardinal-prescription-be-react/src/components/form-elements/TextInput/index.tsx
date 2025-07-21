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
    <StyledTextInput>
      <StyledTextInputLabel htmlFor={id} $required={required} $error={!!errorMessage}>
        <span>*</span>
        {label}
      </StyledTextInputLabel>
      <StyledInput
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
        {...rest}
        $disabled={disabled}
        $error={!!errorMessage}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
    </StyledTextInput>
  )
})

TextInput.displayName = 'TextInput'
