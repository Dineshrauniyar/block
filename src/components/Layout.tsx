import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wallet,
  Home,
  TrendingUp,
  TrendingDown,
  PieChart,
  ArrowUpDown,
  BarChart3,
  Settings,
  Menu,
  X,
  Zap,
  ChevronDown
} from 'lucide-react'
import { useWallet } from '../contexts/WalletContext'
import './Layout.css'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const { isConnected, address, balance, isConnecting, connectWallet, disconnectWallet } = useWallet()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Lending', href: '/lending', icon: TrendingUp },
    { name: 'Borrowing', href: '/borrowing', icon: TrendingDown },
    { name: 'Portfolio', href: '/portfolio', icon: PieChart },
    { name: 'Bridge', href: '/bridge', icon: ArrowUpDown },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  return (
    <div className="layout">
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <Zap className="logo-icon" />
            <span className="logo-text">DeFiCross</span>
          </Link>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'nav-item-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Wallet Status */}
        <div className="sidebar-wallet">
          {isConnected ? (
            <motion.div
              className="wallet-status connected"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Wallet size={20} />
              <div className="wallet-info">
                <span className="wallet-label">Connected</span>
                <span className="wallet-address">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                </span>
                <span className="wallet-balance">{balance} ETH</span>
              </div>
              <motion.button
                className="disconnect-btn"
                onClick={disconnectWallet}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              className="wallet-status disconnected"
              onClick={connectWallet}
              disabled={isConnecting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Wallet size={20} />
              <div className="wallet-info">
                <span className="wallet-label">
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </span>
              </div>
            </motion.button>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="main-layout">
        {/* Top Header */}
        <header className="top-header">
          <button 
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="header-content">
            <h1 className="page-title">
              {navigation.find(item => isActive(item.href))?.name || 'DeFiCross'}
            </h1>
            
            <motion.button 
              className="connect-wallet-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet size={20} />
              Connect Wallet
            </motion.button>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}
