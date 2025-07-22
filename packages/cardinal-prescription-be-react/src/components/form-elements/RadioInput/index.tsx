import React, { forwardRef } from 'react'
import { StyledRadioButton, StyledRadioButtonLabel, StyledRadioButtonToggle, StyledRadioButtonToggleStuffing, StyledRadioGroupLabel, StyledRadioInput } from './styles'

export interface RadioOption {
  label: string
  value: boolean
  id: string
}

interface RadioInputProps {
  label: string
  name: string
  options: RadioOption[]
  required?: boolean
  errorMessage?: string
  value?: boolean
  onChange?: (value: boolean) => void
}

export const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>(({ label, name, options, required, errorMessage, value, onChange }, ref) => {
  return (
    <StyledRadioInput className="StyledRadioInput">
      <StyledRadioGroupLabel className="StyledRadioGroupLabel" $required={required} $error={!!errorMessage}>
        <span>*</span>
        {label}
      </StyledRadioGroupLabel>
      <div className="radioBtnsGroup">
        {options.map((option) => (
          <StyledRadioButton className="StyledRadioButton" key={option.id} htmlFor={option.id} $error={!!errorMessage}>
            <input
              id={option.id}
              name={name}
              type="radio"
              checked={value === option.value}
              value={String(option.value)}
              required={required}
              onChange={() => onChange?.(option.value)}
              ref={ref}
            />
            <StyledRadioButtonToggle className="StyledRadioButtonToggle" $error={!!errorMessage}>
              <StyledRadioButtonToggleStuffing className="StyledRadioButtonToggleStuffing" />
            </StyledRadioButtonToggle>
            <StyledRadioButtonLabel $error={!!errorMessage}>{option.label}</StyledRadioButtonLabel>
          </StyledRadioButton>
        ))}
      </div>
      {!!errorMessage && <p className="error">{errorMessage}</p>}
    </StyledRadioInput>
  )
})

RadioInput.displayName = 'RadioInput'
