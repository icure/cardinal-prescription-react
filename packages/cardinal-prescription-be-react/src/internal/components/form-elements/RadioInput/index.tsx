import React, { forwardRef, useId } from 'react'
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
  const groupLabelId = useId()
  const errorId = useId()
  return (
    <StyledRadioInput className="StyledRadioInput">
      <StyledRadioGroupLabel id={groupLabelId} className="StyledRadioGroupLabel" $required={required} $error={!!errorMessage}>
        <span aria-hidden="true">*</span>
        {label}
      </StyledRadioGroupLabel>
      <div
        className="radioBtnsGroup"
        role="radiogroup"
        aria-labelledby={groupLabelId}
        aria-required={required || undefined}
        aria-invalid={!!errorMessage || undefined}
        aria-describedby={errorMessage ? errorId : undefined}
      >
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
      {!!errorMessage && (
        <p id={errorId} className="error">
          {errorMessage}
        </p>
      )}
    </StyledRadioInput>
  )
})

RadioInput.displayName = 'RadioInput'
