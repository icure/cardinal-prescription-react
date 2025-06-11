import React from 'react'
import './Switch.css'

interface SwitchProps {
  id: string
  value: string
  checked: boolean
  label?: string
  onChange: (checked: boolean) => void
}

const Switch: React.FC<SwitchProps> = ({ id, value, checked, label, onChange }) => (
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

export default Switch
