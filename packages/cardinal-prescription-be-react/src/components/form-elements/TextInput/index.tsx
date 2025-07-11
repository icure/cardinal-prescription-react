import React, { useEffect, useRef } from 'react'
import { StyledInput, StyledTextInput, StyledTextInputLabel } from './styles'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  required?: boolean
  disabled?: boolean
  errorMessage?: string
  autoFocus?: boolean
}

export const TextInput: React.FC<Props> = ({ label, id, required, errorMessage, disabled, autoFocus, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <StyledTextInput>
      <StyledTextInputLabel htmlFor={id} $required={required} $error={!!errorMessage}>
        <span>*</span>
        {label}
      </StyledTextInputLabel>
      <StyledInput id={id} name={id} ref={inputRef} required={required} placeholder={label} {...rest} $disabled={disabled} $error={!!errorMessage} />
      {errorMessage && <p className="error">{errorMessage}</p>}
    </StyledTextInput>
  )
}
