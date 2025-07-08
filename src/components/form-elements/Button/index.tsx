import React from 'react'
import { SpinnerIcn } from '../../common/Icons/Icons'

import './index.css'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  view?: 'primary' | 'busy' | 'outlined'
  type: 'button' | 'reset' | 'submit'
  form?: string
  disabled?: boolean
  handleClick?: () => void
}

const Button: React.FC<Props> = ({ title, view, handleClick, type = 'button', ...rest }) => (
  <button className={`Button ${view}`} onClick={handleClick} type={type} {...rest}>
    {view === 'busy' ? SpinnerIcn({}) : title}
  </button>
)

export default Button
