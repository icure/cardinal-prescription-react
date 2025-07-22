import React from 'react'
import { SpinnerIcn } from '../../common/Icons/Icons'

import './index.scss'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  view?: 'primary' | 'withSpinner' | 'outlined'
  type: 'button' | 'reset' | 'submit'
  form?: string
  disabled?: boolean
  handleClick?: () => void
}

const Button: React.FC<Props> = ({ title, view, handleClick, type = 'button', ...rest }) => (
  <button className={view} onClick={handleClick} type={type} {...rest}>
    {view === 'withSpinner' ? SpinnerIcn({}) : title}
  </button>
)

export default Button
