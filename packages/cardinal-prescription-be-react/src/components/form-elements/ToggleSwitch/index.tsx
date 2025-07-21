import React, { forwardRef } from 'react'
import { StyledSwitch } from './styles'

interface ToggleSwitchProps {
  id: string
  value: string
  label?: string
  checked?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(({ id, value, label, onChange, checked }, ref) => {
  return (
    <StyledSwitch>
      {label && <p className="toggleSwitchLabel">{label}</p>}
      <div className="toggleWrapper">
        <label htmlFor={id} className="toggle">
          <input id={id} name={id} type="checkbox" checked={checked} onChange={onChange} ref={ref} />
          <span className="slider"></span>
        </label>
        <p>{value}</p>
      </div>
    </StyledSwitch>
  )
})

ToggleSwitch.displayName = 'ToggleSwitch'
