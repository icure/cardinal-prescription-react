import React, { forwardRef } from 'react'
import { StyledSelectDropdown, StyledSelectInput, StyledSelectInputLabel } from './styles'

export interface SelectOption {
  value: string | null
  label: string
}

interface SelectInputProps {
  label: string
  id: string
  options: SelectOption[]
  required?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string | number | null
  errorMessage?: string
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(({ label, id, required, disabled, options, value, onChange, errorMessage, ...rest }, ref) => (
  <StyledSelectInput className="StyledSelectInput">
    <StyledSelectInputLabel className="StyledSelectInputLabel" htmlFor={id} $required={required} $error={!!errorMessage}>
      <span>*</span>
      {label}
    </StyledSelectInputLabel>
    <StyledSelectDropdown className="StyledSelectDropdown" ref={ref} id={id} name={id} value={value} onChange={onChange} disabled={disabled} {...rest}>
      {options.map((option) => (
        <option key={option.value ?? ''} value={option.value ?? ''}>
          {option.label}
        </option>
      ))}
    </StyledSelectDropdown>
    {!!errorMessage && <p className="error">{errorMessage}</p>}
  </StyledSelectInput>
))
