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
    <StyledSwitch className="StyledSwitch">
      {label && <p className="toggleSwitchLabel">{label}</p>}
      <div className="toggleWrapper">
        <span className="toggle">
          {/* The checkbox covers the whole switch, so the switch itself is the touch target. */}
          <input id={id} name={id} type="checkbox" role="switch" checked={checked} onChange={onChange} ref={ref} />
          <span className="slider" aria-hidden="true"></span>
        </span>
        <label htmlFor={id} className="toggleSwitchText">
          {value}
        </label>
      </div>
    </StyledSwitch>
  )
})

ToggleSwitch.displayName = 'ToggleSwitch'
