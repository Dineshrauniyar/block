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
  Plus,
  Sparkles,
  BarChart3,
  Activity
} from 'lucide-react'
import Card, { CardHeader, CardBody } from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
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
      {/* Floating Decorations */}
      <div className="floating-decorations">
        <motion.div
          className="floating-crypto bitcoin"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img
            src="https://images.pexels.com/photos/8830896/pexels-photo-8830896.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt="Bitcoin coin"
            className="crypto-icon"
          />
        </motion.div>

        <motion.div
          className="floating-crypto ethereum"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="eth-icon">ETH</div>
        </motion.div>

        <motion.div
          className="floating-crypto solana"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 12, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="sol-icon">SOL</div>
        </motion.div>
      </div>

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
        <motion.div
          className="overview-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="overview-title">
            <h2>Portfolio Overview</h2>
            <p>Track your DeFi positions and performance in real-time</p>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Activity size={16} />}>
            Refresh Data
          </Button>
        </motion.div>

        <div className="overview-grid">
          {portfolioData.map((item, index) => (
            <Card
              key={item.name}
              variant="glass"
              hover
              padding="lg"
              className={`overview-card ${index === 0 ? 'overview-card-featured' : ''}`}
            >
              <div className="overview-card-content">
                <div className="overview-card-header">
                  <div className="overview-card-icon">
                    {index === 0 && <DollarSign size={20} />}
                    {index === 1 && <TrendingDown size={20} />}
                    {index === 2 && <TrendingUp size={20} />}
                    {index === 3 && <Shield size={20} />}
                  </div>
                  <Badge
                    variant={item.positive ? 'success' : 'error'}
                    size="sm"
                  >
                    {item.change}
                  </Badge>
                </div>
                <div className="overview-card-body">
                  <h3 className="overview-card-label">{item.name}</h3>
                  <div className="overview-card-value">{item.value}</div>
                </div>
                {index === 0 && (
                  <div className="overview-card-trend">
                    <Sparkles size={16} />
                    <span>+12.3% this month</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <Card variant="gradient" padding="xl" className="actions-header-card">
          <div className="actions-header">
            <div className="actions-text">
              <h2>Quick Actions</h2>
              <p>Start your DeFi journey with these essential tools</p>
            </div>
            <div className="actions-image">
              <img
                src="https://images.pexels.com/photos/2068664/pexels-photo-2068664.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Person using mobile phone for currency trading"
                className="actions-bg"
              />
            </div>
          </div>
        </Card>

        <div className="actions-grid">
          <Card
            variant="glass"
            hover
            padding="lg"
            onClick={() => window.location.href = '/lending'}
            className="action-card supply-card"
          >
            <div className="action-visual">
              <div className="action-icon-wrapper supply">
                <TrendingUp className="action-icon" />
              </div>
            </div>
            <div className="action-content">
              <h3>Supply Assets</h3>
              <p>Earn interest on your crypto assets</p>
              <Badge variant="success" size="sm">4.2% APY</Badge>
            </div>
          </Card>

          <Card
            variant="glass"
            hover
            padding="lg"
            onClick={() => window.location.href = '/borrowing'}
            className="action-card borrow-card"
          >
            <div className="action-visual">
              <div className="action-icon-wrapper borrow">
                <TrendingDown className="action-icon" />
              </div>
            </div>
            <div className="action-content">
              <h3>Borrow Assets</h3>
              <p>Access liquidity without selling</p>
              <Badge variant="warning" size="sm">5.1% APY</Badge>
            </div>
          </Card>

          <Card
            variant="glass"
            hover
            padding="lg"
            onClick={() => window.location.href = '/bridge'}
            className="action-card bridge-card"
          >
            <div className="action-visual">
              <div className="action-icon-wrapper bridge">
                <ArrowUpDown className="action-icon" />
              </div>
            </div>
            <div className="action-content">
              <h3>Cross-Chain Bridge</h3>
              <p>Move assets between chains</p>
              <Badge variant="cyan" size="sm">2-5 mins</Badge>
            </div>
          </Card>

          <Card
            variant="glass"
            hover
            padding="lg"
            onClick={() => window.location.href = '/portfolio'}
            className="action-card portfolio-card"
          >
            <div className="action-visual">
              <div className="action-icon-wrapper portfolio">
                <PieChart className="action-icon" />
              </div>
            </div>
            <div className="action-content">
              <h3>View Portfolio</h3>
              <p>Track your positions</p>
              <Badge variant="purple" size="sm">Live</Badge>
            </div>
          </Card>
        </div>
      </section>

      {/* Analytics Visual */}
      <Card variant="gradient" padding="none" className="analytics-visual-card">
        <div className="analytics-visual">
          <img
            src="https://images.pexels.com/photos/5716001/pexels-photo-5716001.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Business professionals discussing data charts and graphs"
            className="analytics-image"
          />
          <div className="analytics-overlay">
            <div className="analytics-content">
              <BarChart3 size={32} />
              <h3>Real-time Analytics</h3>
              <p>Track your DeFi performance with advanced metrics and insights</p>
              <Button variant="outline" size="sm" rightIcon={<ArrowUpDown size={16} />}>
                View Analytics
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Positions */}
      <div className="positions-section">
        {/* Supply Positions */}
        <Card variant="glass" padding="xl">
          <CardHeader
            title="Your Supply Positions"
            subtitle="Assets earning interest"
            action={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Eye size={16} />}
                onClick={() => window.location.href = '/lending'}
              >
                View All
              </Button>
            }
          />

          <CardBody>
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
                    <div className="asset-details">
                      <span className="asset-name">{position.asset}</span>
                      <Badge variant="success" size="sm">Earning</Badge>
                    </div>
                  </div>
                  <span className="font-mono">{position.amount}</span>
                  <span className="font-mono">{position.value}</span>
                  <Badge variant="success" size="sm">{position.apy}</Badge>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
                    Supply
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Borrow Positions */}
        <Card variant="glass" padding="xl">
          <CardHeader
            title="Your Borrow Positions"
            subtitle="Assets you've borrowed"
            action={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Eye size={16} />}
                onClick={() => window.location.href = '/borrowing'}
              >
                View All
              </Button>
            }
          />

          <CardBody>
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
                    <div className="asset-details">
                      <span className="asset-name">{position.asset}</span>
                      <Badge variant="warning" size="sm">Borrowed</Badge>
                    </div>
                  </div>
                  <span className="font-mono">{position.amount}</span>
                  <span className="font-mono">{position.value}</span>
                  <Badge variant="error" size="sm">{position.apy}</Badge>
                  <Button variant="secondary" size="sm">
                    Repay
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
