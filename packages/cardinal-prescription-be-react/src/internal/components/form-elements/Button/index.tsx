import React from 'react'
import { SpinnerIcn } from '../../common/Icons'
import { StyledButton } from './styles'

export type ButtonViewType = 'primary' | 'withSpinner' | 'outlined'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  view?: ButtonViewType
  type?: 'button' | 'reset' | 'submit'
  form?: string
  disabled?: boolean
  handleClick?: () => void
}

export const Button: React.FC<Props> = ({ title, view = 'primary', handleClick, type = 'button', ...rest }) => {
  return (
    <StyledButton className="StyledButton" $view={view} onClick={handleClick} type={type} {...rest}>
      {view === 'withSpinner' ? SpinnerIcn({}) : title}
    </StyledButton>
  )
}
