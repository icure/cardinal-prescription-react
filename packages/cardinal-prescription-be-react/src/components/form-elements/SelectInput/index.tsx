import React from 'react'
import { GlobalStyles } from '../../../styles'
import { StyledSelectDropdown, StyledSelectInput, StyledSelectInputLabel } from './styles'

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
  onChange?: (value: string) => void
  errorMessage?: string
}

export const SelectInput: React.FC<SelectInputProps> = ({ label, id, required, disabled, options, value, onChange, errorMessage }) => {
  return (
    <>
      <GlobalStyles />
      <StyledSelectInput>
        <StyledSelectInputLabel htmlFor={id} $required={required} $error={!!errorMessage}>
          <span>*</span>
          {label}
        </StyledSelectInputLabel>

        <StyledSelectDropdown $disabled={disabled} $error={!!errorMessage} id={id} name={id} value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
          {options.map((option) => (
            <option key={option.value ?? ''} value={option.value ?? ''}>
              {option.label}
            </option>
          ))}
        </StyledSelectDropdown>
        {!!errorMessage && <p className="error">{errorMessage}</p>}
      </StyledSelectInput>
    </>
  )
}
