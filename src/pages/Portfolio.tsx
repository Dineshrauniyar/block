import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  BarChart3,
  Activity
} from 'lucide-react'
import './Portfolio.css'

export default function Portfolio() {
  const [hideBalances, setHideBalances] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const portfolioStats = {
    totalNetWorth: '$14,530.00',
    totalSupplied: '$12,450.00',
    totalBorrowed: '$8,920.00',
    netApy: '+5.8%',
    healthFactor: '2.45',
    monthlyEarnings: '$225.77'
  }

  const supplyPositions = [
    { 
      asset: 'ETH', 
      chain: 'ethereum',
      amount: '5.2', 
      value: '$8,450.00', 
      apy: '4.2%',
      earned: '$127.45',
      marketPrice: '$1,625.00',
      change24h: '+2.3%'
    },
    { 
      asset: 'USDC', 
      chain: 'ethereum',
      amount: '4,000', 
      value: '$4,000.00', 
      apy: '3.8%',
      earned: '$98.32',
      marketPrice: '$1.00',
      change24h: '0.0%'
    },
  ]

  const borrowPositions = [
    { 
      asset: 'USDT', 
      chain: 'ethereum',
      amount: '6,500', 
      value: '$6,500.00', 
      apy: '5.1%',
      interest: '$32.12',
      marketPrice: '$1.00',
      change24h: '0.0%'
    },
    { 
      asset: 'DAI', 
      chain: 'ethereum',
      amount: '2,420', 
      value: '$2,420.00', 
      apy: '4.9%',
      interest: '$15.68',
      marketPrice: '$1.00',
      change24h: '-0.1%'
    },
  ]

  const recentTransactions = [
    { type: 'supply', asset: 'ETH', amount: '1.5 ETH', value: '$2,437.50', time: '2 hours ago', hash: '0x1234...5678' },
    { type: 'borrow', asset: 'USDT', amount: '1,500 USDT', value: '$1,500.00', time: '1 day ago', hash: '0x2345...6789' },
    { type: 'repay', asset: 'DAI', amount: '500 DAI', value: '$500.00', time: '3 days ago', hash: '0x3456...7890' },
    { type: 'withdraw', asset: 'USDC', amount: '1,000 USDC', value: '$1,000.00', time: '5 days ago', hash: '0x4567...8901' },
  ]

  const periods = [
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' },
    { label: '1Y', value: '1y' }
  ]

  const maskValue = (value: string) => {
    return hideBalances ? '****' : value
  }

  const getTransactionIcon = (type: string) => {
    switch(type) {
      case 'supply': return <TrendingUp size={16} className="tx-icon supply" />
      case 'borrow': return <TrendingDown size={16} className="tx-icon borrow" />
      case 'repay': return <DollarSign size={16} className="tx-icon repay" />
      case 'withdraw': return <Download size={16} className="tx-icon withdraw" />
      default: return <Activity size={16} className="tx-icon" />
    }
  }

  return (
    <div className="portfolio">
      {/* Header */}
      <div className="portfolio-header">
        <div className="header-left">
          <h1>Portfolio Overview</h1>
          <p>Track your DeFi positions and earnings across all protocols</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="hide-balances-btn"
            onClick={() => setHideBalances(!hideBalances)}
          >
            {hideBalances ? <Eye size={16} /> : <EyeOff size={16} />}
            {hideBalances ? 'Show' : 'Hide'} Balances
          </button>
          
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="portfolio-stats">
        <motion.div
          className="stat-card main-stat"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-header">
            <span className="stat-label">Total Net Worth</span>
            <div className="period-selector">
              {periods.map(period => (
                <button
                  key={period.value}
                  className={`period-btn ${selectedPeriod === period.value ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <div className="stat-value large">{maskValue(portfolioStats.totalNetWorth)}</div>
          <div className="stat-change positive">{portfolioStats.netApy} this month</div>
        </motion.div>

        <div className="stats-grid">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="stat-label">Total Supplied</span>
            <span className="stat-value">{maskValue(portfolioStats.totalSupplied)}</span>
            <span className="stat-sublabel">Earning interest</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="stat-label">Total Borrowed</span>
            <span className="stat-value">{maskValue(portfolioStats.totalBorrowed)}</span>
            <span className="stat-sublabel">Paying interest</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span className="stat-label">Health Factor</span>
            <span className="stat-value safe">{portfolioStats.healthFactor}</span>
            <span className="stat-sublabel">Safe range</span>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="stat-label">Monthly Earnings</span>
            <span className="stat-value positive">{maskValue(portfolioStats.monthlyEarnings)}</span>
            <span className="stat-sublabel">Net interest earned</span>
          </motion.div>
        </div>
      </div>

      {/* Positions */}
      <div className="positions-section">
        {/* Supply Positions */}
        <motion.div
          className="positions-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="positions-header">
            <h2>Supply Positions</h2>
            <div className="header-value">
              Total: {maskValue(portfolioStats.totalSupplied)}
            </div>
          </div>

          <div className="positions-table">
            <div className="table-header">
              <span>Asset</span>
              <span>Amount</span>
              <span>Value</span>
              <span>APY</span>
              <span>Earned</span>
              <span>24h Change</span>
            </div>

            {supplyPositions.map((position, index) => (
              <div key={position.asset} className="table-row">
                <div className="asset-info">
                  <div className="asset-icon">{position.asset}</div>
                  <div className="asset-details">
                    <span className="asset-name">{position.asset}</span>
                    <div className="chain-badge">
                      <div className={`chain-icon ${position.chain}`}></div>
                      <span>{position.chain}</span>
                    </div>
                  </div>
                </div>
                <span className="amount">{maskValue(position.amount)}</span>
                <span className="value">{maskValue(position.value)}</span>
                <span className="apy positive">{position.apy}</span>
                <span className="earned positive">+{maskValue(position.earned)}</span>
                <span className={`change ${position.change24h.startsWith('+') ? 'positive' : position.change24h.startsWith('-') ? 'negative' : 'neutral'}`}>
                  {position.change24h}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Borrow Positions */}
        <motion.div
          className="positions-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="positions-header">
            <h2>Borrow Positions</h2>
            <div className="header-value">
              Total: {maskValue(portfolioStats.totalBorrowed)}
            </div>
          </div>

          <div className="positions-table">
            <div className="table-header">
              <span>Asset</span>
              <span>Amount</span>
              <span>Value</span>
              <span>APY</span>
              <span>Interest</span>
              <span>24h Change</span>
            </div>

            {borrowPositions.map((position, index) => (
              <div key={position.asset} className="table-row">
                <div className="asset-info">
                  <div className="asset-icon">{position.asset}</div>
                  <div className="asset-details">
                    <span className="asset-name">{position.asset}</span>
                    <div className="chain-badge">
                      <div className={`chain-icon ${position.chain}`}></div>
                      <span>{position.chain}</span>
                    </div>
                  </div>
                </div>
                <span className="amount">{maskValue(position.amount)}</span>
                <span className="value">{maskValue(position.value)}</span>
                <span className="apy negative">{position.apy}</span>
                <span className="interest negative">-{maskValue(position.interest)}</span>
                <span className={`change ${position.change24h.startsWith('+') ? 'positive' : position.change24h.startsWith('-') ? 'negative' : 'neutral'}`}>
                  {position.change24h}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        className="transactions-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <button className="view-all-btn">View All</button>
        </div>

        <div className="transactions-list">
          {recentTransactions.map((tx, index) => (
            <motion.div
              key={tx.hash}
              className="transaction-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="tx-info">
                {getTransactionIcon(tx.type)}
                <div className="tx-details">
                  <span className="tx-type">{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                  <span className="tx-asset">{tx.amount}</span>
                </div>
              </div>
              
              <div className="tx-meta">
                <span className="tx-value">{maskValue(tx.value)}</span>
                <span className="tx-time">{tx.time}</span>
              </div>
              
              <button className="tx-hash" title="View on Explorer">
                {tx.hash}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
