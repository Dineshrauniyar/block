import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  Activity,
  PieChart,
  RefreshCw
} from 'lucide-react'
import './Analytics.css'

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const protocolStats = {
    totalValueLocked: '$6.5B',
    totalSupplied: '$4.2B',
    totalBorrowed: '$2.3B',
    activeUsers: '124,567',
    totalTransactions: '2.4M',
    averageApy: '4.8%'
  }

  const topAssets = [
    { asset: 'ETH', tvl: '$2.4B', change: '+5.2%', percentage: 37 },
    { asset: 'USDC', tvl: '$1.8B', change: '+2.1%', percentage: 28 },
    { asset: 'USDT', tvl: '$1.2B', change: '-1.3%', percentage: 18 },
    { asset: 'DAI', tvl: '$0.6B', change: '+3.4%', percentage: 9 },
    { asset: 'SOL', tvl: '$0.5B', change: '+8.7%', percentage: 8 }
  ]

  const recentActivity = [
    { type: 'supply', user: '0x1234...5678', asset: 'ETH', amount: '5.2', value: '$8,450', time: '2 mins ago' },
    { type: 'borrow', user: '0x2345...6789', asset: 'USDT', amount: '10,000', value: '$10,000', time: '5 mins ago' },
    { type: 'repay', user: '0x3456...7890', asset: 'DAI', amount: '2,500', value: '$2,500', time: '8 mins ago' },
    { type: 'withdraw', user: '0x4567...8901', asset: 'USDC', amount: '5,000', value: '$5,000', time: '12 mins ago' },
  ]

  const chainStats = [
    { chain: 'ethereum', name: 'Ethereum', tvl: '$4.8B', users: '89,245', color: '#627eea' },
    { chain: 'solana', name: 'Solana', tvl: '$1.7B', users: '35,322', color: '#9945ff' },
  ]

  const periods = [
    { label: '24H', value: '24h' },
    { label: '7D', value: '7d' },
    { label: '30D', value: '30d' },
    { label: '90D', value: '90d' }
  ]

  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'supply': return <TrendingUp size={16} className="activity-icon supply" />
      case 'borrow': return <TrendingDown size={16} className="activity-icon borrow" />
      case 'repay': return <DollarSign size={16} className="activity-icon repay" />
      case 'withdraw': return <Activity size={16} className="activity-icon withdraw" />
      default: return <Activity size={16} className="activity-icon" />
    }
  }

  return (
    <div className="analytics">
      {/* Header */}
      <div className="analytics-header">
        <div className="header-left">
          <h1>Protocol Analytics</h1>
          <p>Real-time insights into DeFi protocol performance and usage</p>
        </div>
        
        <div className="header-actions">
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
          
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* Protocol Overview */}
      <div className="protocol-overview">
        <motion.div
          className="overview-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="stat-card main">
            <div className="stat-icon">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Value Locked</span>
              <span className="stat-value">{protocolStats.totalValueLocked}</span>
              <span className="stat-change positive">+12.5% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Supplied</span>
              <span className="stat-value">{protocolStats.totalSupplied}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingDown size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Borrowed</span>
              <span className="stat-value">{protocolStats.totalBorrowed}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Users size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Active Users</span>
              <span className="stat-value">{protocolStats.activeUsers}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Activity size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Total Transactions</span>
              <span className="stat-value">{protocolStats.totalTransactions}</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <PieChart size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Average APY</span>
              <span className="stat-value">{protocolStats.averageApy}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Top Assets */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="chart-header">
            <h2>Top Assets by TVL</h2>
            <span className="chart-subtitle">Market distribution</span>
          </div>
          
          <div className="assets-list">
            {topAssets.map((asset, index) => (
              <motion.div
                key={asset.asset}
                className="asset-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="asset-info">
                  <div className="asset-icon">{asset.asset}</div>
                  <div className="asset-details">
                    <span className="asset-name">{asset.asset}</span>
                    <span className="asset-tvl">{asset.tvl}</span>
                  </div>
                </div>
                
                <div className="asset-metrics">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${asset.percentage}%` }}
                    ></div>
                  </div>
                  <span className={`asset-change ${asset.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {asset.change}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Chain Distribution */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="chart-header">
            <h2>Chain Distribution</h2>
            <span className="chart-subtitle">TVL by blockchain</span>
          </div>
          
          <div className="chains-list">
            {chainStats.map((chain, index) => (
              <motion.div
                key={chain.chain}
                className="chain-item"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <div className="chain-info">
                  <div 
                    className="chain-icon"
                    style={{ background: chain.color }}
                  ></div>
                  <div className="chain-details">
                    <span className="chain-name">{chain.name}</span>
                    <span className="chain-users">{chain.users} users</span>
                  </div>
                </div>
                <div className="chain-tvl">{chain.tvl}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        className="activity-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="activity-header">
          <h2>Recent Protocol Activity</h2>
          <span className="activity-subtitle">Live transaction feed</span>
        </div>
        
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={`${activity.user}-${activity.time}`}
              className="activity-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="activity-info">
                {getActivityIcon(activity.type)}
                <div className="activity-details">
                  <span className="activity-type">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</span>
                  <span className="activity-user">{activity.user}</span>
                </div>
              </div>
              
              <div className="activity-asset">
                <span className="activity-amount">{activity.amount} {activity.asset}</span>
                <span className="activity-value">{activity.value}</span>
              </div>
              
              <span className="activity-time">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
