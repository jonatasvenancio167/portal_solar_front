import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


type Props = {
  children?: React.ReactNode // 👈️ type children
}

const PublicRoute = ({ children }: Props) => {
  const { status } = useAuth()

  if(status) {
    return <Navigate to='home' />
  }

  return (<>{children}</>)
}

export { PublicRoute }