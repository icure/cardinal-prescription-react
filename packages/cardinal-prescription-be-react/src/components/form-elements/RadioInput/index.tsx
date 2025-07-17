// index.tsx
import React from 'react'
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
  onChange?: (value: boolean) => void
}

export const RadioInput: React.FC<RadioInputProps> = ({ label, name, options, required, errorMessage }) => {
  const [value, setValue] = React.useState(false)
  return (
    <StyledRadioInput>
      <StyledRadioGroupLabel $required={required} $error={!!errorMessage}>
        <span>*</span>
        {label}
      </StyledRadioGroupLabel>
      <div className="radioBtnsGroup">
        {options.map((option) => (
          <StyledRadioButton key={option.id} htmlFor={option.id} $error={!!errorMessage}>
            <input
              id={option.id}
              name={name}
              type="radio"
              checked={value === option.value}
              value={String(option.value)}
              required={required}
              onChange={() => setValue(option.value)}
            />
            <StyledRadioButtonToggle $error={!!errorMessage}>
              <StyledRadioButtonToggleStuffing />
            </StyledRadioButtonToggle>
            <StyledRadioButtonLabel $error={!!errorMessage}>{option.label}</StyledRadioButtonLabel>
          </StyledRadioButton>
        ))}
      </div>
      {!!errorMessage && <p className="error">{errorMessage}</p>}
    </StyledRadioInput>
  )
}
