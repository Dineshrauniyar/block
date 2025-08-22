import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  ArrowUpDown, 
  PieChart,
  Eye,
  Plus
} from 'lucide-react'
import './Dashboard.css'

export default function Dashboard() {
  const portfolioData = [
    { name: 'Total Supplied', value: '$12,450.00', change: '+5.2%', positive: true },
    { name: 'Total Borrowed', value: '$8,920.00', change: '-2.1%', positive: false },
    { name: 'Net Worth', value: '$3,530.00', change: '+8.7%', positive: true },
    { name: 'Health Factor', value: '2.45', change: 'Safe', positive: true },
  ]

  const supplyPositions = [
    { asset: 'ETH', amount: '5.2', value: '$8,450.00', apy: '4.2%' },
    { asset: 'USDC', amount: '4,000', value: '$4,000.00', apy: '3.8%' },
  ]

  const borrowPositions = [
    { asset: 'USDT', amount: '6,500', value: '$6,500.00', apy: '5.1%' },
    { asset: 'DAI', amount: '2,420', value: '$2,420.00', apy: '4.9%' },
  ]

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to <span className="gradient-text">DeFiCross</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your gateway to cross-chain DeFi. Lend, borrow, and earn across Ethereum and Solana with institutional-grade security.
            </motion.p>
          </div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="https://images.pexels.com/photos/30547584/pexels-photo-30547584.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Abstract futuristic cyber landscape with digital matrix and glowing lights"
              className="hero-bg-image"
            />
            <div className="hero-overlay"></div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="portfolio-overview">
        <div className="overview-grid">
          {portfolioData.map((item, index) => (
            <motion.div
              key={item.name}
              className="overview-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="card-header">
                <h3>{item.name}</h3>
                <div className={`change ${item.positive ? 'positive' : 'negative'}`}>
                  {item.change}
                </div>
              </div>
              <div className="card-value">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/lending" className="action-card">
            <TrendingUp className="action-icon" />
            <h3>Supply Assets</h3>
            <p>Earn interest on your crypto</p>
          </Link>
          
          <Link to="/borrowing" className="action-card">
            <TrendingDown className="action-icon" />
            <h3>Borrow Assets</h3>
            <p>Access liquidity without selling</p>
          </Link>
          
          <Link to="/bridge" className="action-card">
            <ArrowUpDown className="action-icon" />
            <h3>Cross-Chain Bridge</h3>
            <p>Move assets between chains</p>
          </Link>
          
          <Link to="/portfolio" className="action-card">
            <PieChart className="action-icon" />
            <h3>View Portfolio</h3>
            <p>Track your positions</p>
          </Link>
        </div>
      </section>

      {/* Positions */}
      <div className="positions-section">
        {/* Supply Positions */}
        <section className="positions-card">
          <div className="positions-header">
            <h2>Your Supply Positions</h2>
            <Link to="/lending" className="view-all-btn">
              <Eye size={16} />
              View All
            </Link>
          </div>
          
          <div className="positions-table">
            <div className="table-header">
              <span>Asset</span>
              <span>Amount</span>
              <span>Value</span>
              <span>APY</span>
              <span>Action</span>
            </div>
            
            {supplyPositions.map((position, index) => (
              <motion.div
                key={position.asset}
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="asset-info">
                  <div className="asset-icon">{position.asset}</div>
                  <span>{position.asset}</span>
                </div>
                <span>{position.amount}</span>
                <span>{position.value}</span>
                <span className="apy-positive">{position.apy}</span>
                <button className="action-btn">
                  <Plus size={16} />
                  Supply More
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Borrow Positions */}
        <section className="positions-card">
          <div className="positions-header">
            <h2>Your Borrow Positions</h2>
            <Link to="/borrowing" className="view-all-btn">
              <Eye size={16} />
              View All
            </Link>
          </div>
          
          <div className="positions-table">
            <div className="table-header">
              <span>Asset</span>
              <span>Amount</span>
              <span>Value</span>
              <span>APY</span>
              <span>Action</span>
            </div>
            
            {borrowPositions.map((position, index) => (
              <motion.div
                key={position.asset}
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="asset-info">
                  <div className="asset-icon">{position.asset}</div>
                  <span>{position.asset}</span>
                </div>
                <span>{position.amount}</span>
                <span>{position.value}</span>
                <span className="apy-negative">{position.apy}</span>
                <button className="action-btn secondary">
                  Repay
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
