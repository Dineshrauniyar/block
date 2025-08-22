import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingDown, 
  Search, 
  Filter, 
  Plus,
  Info,
  AlertTriangle,
  ArrowRight,
  Shield
} from 'lucide-react'
import './Borrowing.css'

export default function Borrowing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChain, setSelectedChain] = useState('all')
  const [showBorrowModal, setShowBorrowModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const borrowingPools = [
    { 
      asset: 'USDT', 
      chain: 'ethereum',
      totalBorrowed: '$1.2B', 
      borrowApy: '5.1%', 
      liquidity: '$187M',
      yourBorrow: '6,500 USDT',
      yourDebt: '$6,532.45',
      collateralRequired: '125%'
    },
    { 
      asset: 'USDC', 
      chain: 'ethereum',
      totalBorrowed: '$980M', 
      borrowApy: '4.8%', 
      liquidity: '$298M',
      yourBorrow: '0',
      yourDebt: '$0',
      collateralRequired: '120%'
    },
    { 
      asset: 'DAI', 
      chain: 'ethereum',
      totalBorrowed: '$750M', 
      borrowApy: '4.9%', 
      liquidity: '$156M',
      yourBorrow: '2,420 DAI',
      yourDebt: '$2,431.80',
      collateralRequired: '120%'
    },
    { 
      asset: 'ETH', 
      chain: 'ethereum',
      totalBorrowed: '$2.1B', 
      borrowApy: '6.2%', 
      liquidity: '$145M',
      yourBorrow: '0',
      yourDebt: '$0',
      collateralRequired: '140%'
    },
    { 
      asset: 'SOL', 
      chain: 'solana',
      totalBorrowed: '$320M', 
      borrowApy: '7.8%', 
      liquidity: '$67M',
      yourBorrow: '0',
      yourDebt: '$0',
      collateralRequired: '150%'
    },
  ]

  const filteredPools = borrowingPools.filter(pool => {
    const matchesSearch = pool.asset.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChain = selectedChain === 'all' || pool.chain === selectedChain
    return matchesSearch && matchesChain
  })

  const handleBorrow = (asset) => {
    setSelectedAsset(asset)
    setShowBorrowModal(true)
  }

  const healthFactor = 2.45 // This would come from user's actual position
  const borrowPower = '$5,230.00' // Available borrowing power
  const totalCollateral = '$18,750.00' // Total collateral value

  return (
    <div className="borrowing">
      {/* Header */}
      <div className="borrowing-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Borrow Assets</h1>
            <p>Access liquidity without selling your crypto assets</p>
          </div>
          
          <div className="header-stats">
            <div className="stat">
              <span className="stat-label">Total Borrowed</span>
              <span className="stat-value">$8,920</span>
            </div>
            <div className="stat">
              <span className="stat-label">Borrow Power</span>
              <span className="stat-value">{borrowPower}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Health Factor</span>
              <span className={`stat-value ${healthFactor > 1.5 ? 'safe' : healthFactor > 1.1 ? 'warning' : 'danger'}`}>
                {healthFactor}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="risk-warning">
        <AlertTriangle size={20} />
        <div className="warning-content">
          <h3>Borrowing Risk Notice</h3>
          <p>
            Borrowing crypto carries liquidation risk. Ensure your health factor stays above 1.0 
            to avoid liquidation of your collateral.
          </p>
        </div>
      </div>

      {/* Collateral Overview */}
      <div className="collateral-overview">
        <h2>Your Collateral</h2>
        <div className="collateral-grid">
          <div className="collateral-card">
            <span className="label">Total Collateral Value</span>
            <span className="value">{totalCollateral}</span>
          </div>
          <div className="collateral-card">
            <span className="label">Available to Borrow</span>
            <span className="value">{borrowPower}</span>
          </div>
          <div className="collateral-card">
            <span className="label">Health Factor</span>
            <span className={`value ${healthFactor > 1.5 ? 'safe' : healthFactor > 1.1 ? 'warning' : 'danger'}`}>
              {healthFactor}
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="chain-filter">
          <Filter size={16} />
          <select 
            value={selectedChain} 
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="all">All Chains</option>
            <option value="ethereum">Ethereum</option>
            <option value="solana">Solana</option>
          </select>
        </div>
      </div>

      {/* Borrowing Pools Table */}
      <div className="pools-section">
        <div className="pools-header">
          <h2>Available Borrowing Pools</h2>
          <div className="header-actions">
            <button className="info-btn">
              <Info size={16} />
              How borrowing works
            </button>
          </div>
        </div>

        <div className="pools-table">
          <div className="table-header">
            <span>Asset</span>
            <span>Chain</span>
            <span>Borrow APY</span>
            <span>Total Borrowed</span>
            <span>Liquidity</span>
            <span>Your Debt</span>
            <span>Action</span>
          </div>

          {filteredPools.map((pool, index) => (
            <motion.div
              key={`${pool.asset}-${pool.chain}`}
              className="table-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="asset-info">
                <div className="asset-icon">{pool.asset}</div>
                <div className="asset-details">
                  <span className="asset-name">{pool.asset}</span>
                  <span className="collateral-required">
                    <Shield size={12} />
                    {pool.collateralRequired} collateral
                  </span>
                </div>
              </div>
              
              <div className="chain-badge">
                <div className={`chain-icon ${pool.chain}`}></div>
                <span>{pool.chain}</span>
              </div>
              
              <div className="apy-cell">
                <span className="apy-value borrow">{pool.borrowApy}</span>
                <TrendingDown size={14} className="trend-icon borrow" />
              </div>
              
              <span className="total-borrowed">{pool.totalBorrowed}</span>
              <span className="liquidity">{pool.liquidity}</span>
              
              <div className="user-debt">
                <span className="debt-amount">{pool.yourBorrow}</span>
                {pool.yourDebt !== '$0' && (
                  <span className="debt-value">{pool.yourDebt}</span>
                )}
              </div>
              
              <div className="action-cell">
                <motion.button
                  className="borrow-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBorrow(pool)}
                  disabled={parseFloat(borrowPower.replace('$', '').replace(',', '')) <= 0}
                >
                  <Plus size={16} />
                  Borrow
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Borrow Modal */}
      {showBorrowModal && selectedAsset && (
        <div className="modal-overlay" onClick={() => setShowBorrowModal(false)}>
          <motion.div
            className="borrow-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Borrow {selectedAsset.asset}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBorrowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="borrow-info">
                <div className="info-row">
                  <span>Borrow APY</span>
                  <span className="highlight borrow">{selectedAsset.borrowApy}</span>
                </div>
                <div className="info-row">
                  <span>Collateral Required</span>
                  <span>{selectedAsset.collateralRequired}</span>
                </div>
                <div className="info-row">
                  <span>Available Liquidity</span>
                  <span>{selectedAsset.liquidity}</span>
                </div>
                <div className="info-row">
                  <span>Your Borrow Power</span>
                  <span>{borrowPower}</span>
                </div>
              </div>
              
              <div className="borrow-form">
                <div className="input-group">
                  <label>Amount to Borrow</label>
                  <div className="amount-input">
                    <input 
                      type="number" 
                      placeholder="0.00"
                    />
                    <span className="asset-label">{selectedAsset.asset}</span>
                  </div>
                  <div className="balance">
                    Max borrowable: {borrowPower}
                    <button className="max-btn">MAX</button>
                  </div>
                </div>
                
                <div className="borrow-summary">
                  <div className="summary-row">
                    <span>Monthly Interest:</span>
                    <span className="highlight borrow">$42.50</span>
                  </div>
                  <div className="summary-row">
                    <span>New Health Factor:</span>
                    <span className="warning">1.85</span>
                  </div>
                  <div className="summary-row">
                    <span>Liquidation Price:</span>
                    <span>$1,450.00</span>
                  </div>
                </div>
                
                <div className="risk-notice">
                  <AlertTriangle size={16} />
                  <span>Keep your health factor above 1.0 to avoid liquidation</span>
                </div>
                
                <motion.button
                  className="confirm-borrow-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Borrow {selectedAsset.asset}
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
