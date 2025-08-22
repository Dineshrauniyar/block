import React from 'react'
import './Badge.css'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  dot?: boolean
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  dot = false
}: BadgeProps) {
  const badgeClass = `badge badge-${variant} badge-${size} ${className} ${
    dot ? 'badge-dot' : ''
  }`

  return (
    <span className={badgeClass}>
      {dot && <span className="badge-dot-indicator" />}
      <span className="badge-content">{children}</span>
    </span>
  )
}
