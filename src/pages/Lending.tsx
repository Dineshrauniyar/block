import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Search, 
  Filter, 
  Plus,
  Info,
  Shield,
  ArrowRight
} from 'lucide-react'
import './Lending.css'

export default function Lending() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedChain, setSelectedChain] = useState('all')
  const [showSupplyModal, setShowSupplyModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(null)

  const lendingPools = [
    { 
      asset: 'ETH', 
      chain: 'ethereum',
      totalSupplied: '$2.4B', 
      supplyApy: '4.2%', 
      liquidity: '$145M',
      collateralFactor: '75%',
      yourSupply: '5.2 ETH',
      yourEarnings: '$127.45'
    },
    { 
      asset: 'USDC', 
      chain: 'ethereum',
      totalSupplied: '$1.8B', 
      supplyApy: '3.8%', 
      liquidity: '$298M',
      collateralFactor: '85%',
      yourSupply: '4,000 USDC',
      yourEarnings: '$98.32'
    },
    { 
      asset: 'USDT', 
      chain: 'ethereum',
      totalSupplied: '$1.2B', 
      supplyApy: '3.5%', 
      liquidity: '$187M',
      collateralFactor: '80%',
      yourSupply: '0',
      yourEarnings: '$0'
    },
    { 
      asset: 'SOL', 
      chain: 'solana',
      totalSupplied: '$450M', 
      supplyApy: '5.8%', 
      liquidity: '$67M',
      collateralFactor: '70%',
      yourSupply: '0',
      yourEarnings: '$0'
    },
    { 
      asset: 'USDC', 
      chain: 'solana',
      totalSupplied: '$680M', 
      supplyApy: '4.1%', 
      liquidity: '$112M',
      collateralFactor: '85%',
      yourSupply: '0',
      yourEarnings: '$0'
    },
  ]

  const filteredPools = lendingPools.filter(pool => {
    const matchesSearch = pool.asset.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChain = selectedChain === 'all' || pool.chain === selectedChain
    return matchesSearch && matchesChain
  })

  const handleSupply = (asset) => {
    setSelectedAsset(asset)
    setShowSupplyModal(true)
  }

  return (
    <div className="lending">
      {/* Header */}
      <div className="lending-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Supply Assets</h1>
            <p>Earn interest by supplying your crypto assets to lending pools</p>
          </div>
          
          <div className="header-stats">
            <div className="stat">
              <span className="stat-label">Total Supplied</span>
              <span className="stat-value">$6.5B</span>
            </div>
            <div className="stat">
              <span className="stat-label">Your Supply</span>
              <span className="stat-value">$12,450</span>
            </div>
            <div className="stat">
              <span className="stat-label">Monthly Earnings</span>
              <span className="stat-value">$225.77</span>
            </div>
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

      {/* Lending Pools Table */}
      <div className="pools-section">
        <div className="pools-header">
          <h2>Available Lending Pools</h2>
          <div className="header-actions">
            <button className="info-btn">
              <Info size={16} />
              How it works
            </button>
          </div>
        </div>

        <div className="pools-table">
          <div className="table-header">
            <span>Asset</span>
            <span>Chain</span>
            <span>Supply APY</span>
            <span>Total Supplied</span>
            <span>Liquidity</span>
            <span>Your Supply</span>
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
                  <span className="collateral-factor">
                    <Shield size={12} />
                    {pool.collateralFactor} collateral
                  </span>
                </div>
              </div>
              
              <div className="chain-badge">
                <div className={`chain-icon ${pool.chain}`}></div>
                <span>{pool.chain}</span>
              </div>
              
              <div className="apy-cell">
                <span className="apy-value">{pool.supplyApy}</span>
                <TrendingUp size={14} className="trend-icon" />
              </div>
              
              <span className="total-supplied">{pool.totalSupplied}</span>
              <span className="liquidity">{pool.liquidity}</span>
              
              <div className="user-supply">
                <span className="supply-amount">{pool.yourSupply}</span>
                {pool.yourEarnings !== '$0' && (
                  <span className="earnings">+{pool.yourEarnings}</span>
                )}
              </div>
              
              <div className="action-cell">
                <motion.button
                  className="supply-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSupply(pool)}
                >
                  <Plus size={16} />
                  Supply
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Supply Modal */}
      {showSupplyModal && selectedAsset && (
        <div className="modal-overlay" onClick={() => setShowSupplyModal(false)}>
          <motion.div
            className="supply-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Supply {selectedAsset.asset}</h3>
              <button 
                className="close-btn"
                onClick={() => setShowSupplyModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-content">
              <div className="supply-info">
                <div className="info-row">
                  <span>Supply APY</span>
                  <span className="highlight">{selectedAsset.supplyApy}</span>
                </div>
                <div className="info-row">
                  <span>Collateral Factor</span>
                  <span>{selectedAsset.collateralFactor}</span>
                </div>
                <div className="info-row">
                  <span>Available Liquidity</span>
                  <span>{selectedAsset.liquidity}</span>
                </div>
              </div>
              
              <div className="supply-form">
                <div className="input-group">
                  <label>Amount to Supply</label>
                  <div className="amount-input">
                    <input 
                      type="number" 
                      placeholder="0.00"
                    />
                    <span className="asset-label">{selectedAsset.asset}</span>
                  </div>
                  <div className="balance">
                    Balance: 10.5 {selectedAsset.asset}
                    <button className="max-btn">MAX</button>
                  </div>
                </div>
                
                <div className="supply-summary">
                  <div className="summary-row">
                    <span>You will receive:</span>
                    <span>a{selectedAsset.asset} tokens</span>
                  </div>
                  <div className="summary-row">
                    <span>Est. Monthly Earnings:</span>
                    <span className="highlight">$45.20</span>
                  </div>
                </div>
                
                <motion.button
                  className="confirm-supply-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Supply {selectedAsset.asset}
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
