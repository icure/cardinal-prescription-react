import React from 'react'
import { StyledSwitch } from './styles'

interface ToggleSwitchProps {
  id: string
  value: string
  checked: boolean
  label?: string
  onChange?: (checked: boolean) => void
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, value, checked, label, onChange }) => {
  const [localChecked, setLocalChecked] = React.useState(checked)
  const handleChange = (newChecked: boolean) => {
    setLocalChecked(newChecked)
    if (onChange) {
      onChange(newChecked)
    }
  }

  return (
    <StyledSwitch>
      {label && <p className="toggleSwitchLabel">{label}</p>}
      <div className="toggleWrapper">
        <label htmlFor={id} className="toggle">
          <input id={id} name={id} type="checkbox" checked={localChecked} onChange={(e) => handleChange(e.target.checked)} />
          <span className="slider"></span>
        </label>
        <p>{value}</p>
      </div>
    </StyledSwitch>
  )
}
