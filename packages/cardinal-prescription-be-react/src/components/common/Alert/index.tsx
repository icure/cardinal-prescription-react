import React, { FC } from 'react'
import { StyledAlert } from './styles'
import { StatusErrorIcn, StatusSuccessIcn } from '../Icons'

interface AlertProps {
  status: 'success' | 'error'
  title: string
  description: string
}

export const Alert: FC<AlertProps> = ({ status, title, description }) => {
  return (
    <StyledAlert className="StyledAlert" $success={status === 'success'} $error={status === 'error'}>
      <div className="heading">
        {status === 'success' && <StatusSuccessIcn />}
        {status === 'error' && <StatusErrorIcn />}
        <h4>{title}</h4>
      </div>
      <p>{description}</p>
    </StyledAlert>
  )
}
