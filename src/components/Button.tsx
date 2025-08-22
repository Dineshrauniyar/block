import React from 'react'
import { motion } from 'framer-motion'
import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${
    isLoading ? 'btn-loading' : ''
  }`

  return (
    <motion.button
      className={buttonClass}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {isLoading && (
        <div className="btn-spinner">
          <div className="spinner" />
        </div>
      )}
      
      {leftIcon && !isLoading && (
        <span className="btn-icon-left">{leftIcon}</span>
      )}
      
      <span className={`btn-content ${isLoading ? 'btn-content-loading' : ''}`}>
        {children}
      </span>
      
      {rightIcon && !isLoading && (
        <span className="btn-icon-right">{rightIcon}</span>
      )}
      
      <div className="btn-ripple" />
    </motion.button>
  )
}
