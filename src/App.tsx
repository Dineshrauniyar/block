import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, Shield, Zap, ArrowUpDown, DollarSign } from 'lucide-react'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="background-gradient"></div>
      
      {/* Header */}
      <header className="header">
        <motion.div 
          className="logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Zap className="logo-icon" />
          <span className="logo-text">DeFiCross</span>
        </motion.div>
        
        <motion.button 
          className="connect-wallet-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wallet size={20} />
          Connect Wallet
        </motion.button>
      </header>

      {/* Hero Section */}
      <main className="main-content">
        <motion.section 
          className="hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="hero-title">
            Cross-Chain DeFi
            <span className="gradient-text"> Revolution</span>
          </h1>
          <p className="hero-subtitle">
            Lend, borrow, and earn across Ethereum and Solana with institutional-grade security
          </p>
          
          <div className="hero-stats">
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <DollarSign className="stat-icon" />
              <div className="stat-value">$2.4B+</div>
              <div className="stat-label">Total Value Locked</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="stat-icon" />
              <div className="stat-value">12.5%</div>
              <div className="stat-label">Average APY</div>
            </motion.div>
            
            <motion.div 
              className="stat-card"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="stat-icon" />
              <div className="stat-value">99.9%</div>
              <div className="stat-label">Security Score</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="section-title">Why Choose DeFiCross?</h2>
          
          <div className="features-grid">
            <motion.div 
              className="feature-card"
              whileHover={{ y: -5 }}
            >
              <ArrowUpDown className="feature-icon" />
              <h3>Cross-Chain Bridge</h3>
              <p>Seamlessly move assets between Ethereum and Solana with minimal fees</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ y: -5 }}
            >
              <Shield className="feature-icon" />
              <h3>Security First</h3>
              <p>Audited smart contracts with re-entrancy protection and flash-loan resistance</p>
            </motion.div>
            
            <motion.div 
              className="feature-card"
              whileHover={{ y: -5 }}
            >
              <TrendingUp className="feature-icon" />
              <h3>Optimized Yields</h3>
              <p>AI-powered yield optimization across multiple protocols and chains</p>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2>Ready to Start Earning?</h2>
          <div className="cta-buttons">
            <motion.button 
              className="cta-btn primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Lending
            </motion.button>
            <motion.button 
              className="cta-btn secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  )
}

export default App
