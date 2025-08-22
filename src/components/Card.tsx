import React from 'react'
import { motion } from 'framer-motion'
import './Card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'glass' | 'gradient' | 'elevated' | 'minimal'
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
}

export default function Card({
  children,
  className = '',
  variant = 'default',
  hover = false,
  padding = 'md',
  onClick
}: CardProps) {
  const cardClass = `card card-${variant} card-padding-${padding} ${className} ${
    hover ? 'card-hover' : ''
  } ${onClick ? 'card-clickable' : ''}`

  const CardComponent = onClick ? motion.button : motion.div

  return (
    <CardComponent
      className={cardClass}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-content">
        {children}
      </div>
      {hover && <div className="card-glow" />}
    </CardComponent>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function CardHeader({ title, subtitle, action, className = '' }: CardHeaderProps) {
  return (
    <div className={`card-header ${className}`}>
      <div className="card-header-content">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="card-header-action">{action}</div>}
    </div>
  )
}

interface CardBodyProps {
  children: React.ReactNode
  className?: string
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  className?: string
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  )
}
