import React from 'react'

interface ProgressProps {
  value: number
  max?: number
  className?: string
}

export const Progress: React.FC<ProgressProps> = ({ value, max = 100, className = '' }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={`h-2 w-full bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-indigo-600 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

