import React from 'react'
import './index.scss'

interface ToggleSwitchProps {
  id: string
  value: string
  checked: boolean
  label?: string
  onChange: (checked: boolean) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, value, checked, label, onChange }) => (
  <div className="switch">
    {label && <p className="switch__label">{label}</p>}
    <div className={`toggleWrapper${checked ? ' checked' : ''}`}>
      <label htmlFor={id} className="toggle">
        <input id={id} name={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="slider"></span>
      </label>
      <p>{value}</p>
    </div>
  </div>
)

export default ToggleSwitch
