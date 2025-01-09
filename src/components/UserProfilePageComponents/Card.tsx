import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`px-6 py-4 bg-gray-50 ${className}`}>{children}</div>
}

