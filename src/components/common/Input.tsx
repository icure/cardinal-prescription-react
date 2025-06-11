import React, { useRef, useEffect } from 'react'
import './Input.css'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
  required?: boolean
  errorMessage?: string
  autoFocus?: boolean
}

const Input: React.FC<Props> = ({ label, id, required, errorMessage, autoFocus, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="inputWrapper">
      <label htmlFor={id} className={required ? 'required' : ''}>
        <span>*</span>
        {label}
      </label>
      <input
        id={id}
        name={id}
        ref={inputRef}
        required={required}
        placeholder={label}
        {...rest}
        className={`${rest.disabled ? 'disabled' : ''} ${errorMessage ? 'errorMessage' : ''}`}
      />
      {errorMessage && <p className="inputWrapper__error">{errorMessage}</p>}
    </div>
  )
}

export default Input
