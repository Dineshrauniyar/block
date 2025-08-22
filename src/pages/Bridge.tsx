import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowUpDown, 
  ArrowRight,
  Info,
  Clock,
  Shield,
  Zap,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import './Bridge.css'

export default function Bridge() {
  const [fromChain, setFromChain] = useState('ethereum')
  const [toChain, setToChain] = useState('solana')
  const [selectedAsset, setSelectedAsset] = useState('USDC')
  const [amount, setAmount] = useState('')

  const chains = [
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#627eea' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', color: '#9945ff' },
  ]

  const assets = [
    { symbol: 'USDC', name: 'USD Coin', balance: '4,250.00' },
    { symbol: 'USDT', name: 'Tether USD', balance: '1,850.00' },
    { symbol: 'ETH', name: 'Ethereum', balance: '5.2' },
    { symbol: 'SOL', name: 'Solana', balance: '125.8' },
  ]

  const bridgeInfo = {
    estimatedTime: '2-5 minutes',
    bridgeFee: '$2.50',
    networkFee: '$8.45',
    totalFee: '$10.95',
    minAmount: '10 USDC',
    maxAmount: '50,000 USDC'
  }

  const recentTransfers = [
    { 
      asset: 'USDC', 
      amount: '1,500', 
      from: 'ethereum', 
      to: 'solana', 
      status: 'completed',
      time: '2 hours ago',
      txHash: '0x1234...5678'
    },
    { 
      asset: 'ETH', 
      amount: '0.5', 
      from: 'ethereum', 
      to: 'solana', 
      status: 'pending',
      time: '10 minutes ago',
      txHash: '0x2345...6789'
    },
    { 
      asset: 'SOL', 
      amount: '25', 
      from: 'solana', 
      to: 'ethereum', 
      status: 'completed',
      time: '1 day ago',
      txHash: '0x3456...7890'
    },
  ]

  const swapChains = () => {
    const temp = fromChain
    setFromChain(toChain)
    setToChain(temp)
  }

  const getChainInfo = (chainId: string) => {
    return chains.find(chain => chain.id === chainId)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return '#43e97b'
      case 'pending': return '#ffa726'
      case 'failed': return '#f5576c'
      default: return '#667eea'
    }
  }

  const getAssetBalance = (asset: string) => {
    const assetInfo = assets.find(a => a.symbol === asset)
    return assetInfo?.balance || '0'
  }

  return (
    <div className="bridge">
      {/* Header */}
      <div className="bridge-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Cross-Chain Bridge</h1>
            <p>Transfer assets seamlessly between Ethereum and Solana networks</p>
          </div>
          
          <div className="bridge-stats">
            <div className="stat">
              <span className="stat-label">Total Bridged</span>
              <span className="stat-value">$2.4B+</span>
            </div>
            <div className="stat">
              <span className="stat-label">Average Time</span>
              <span className="stat-value">3 mins</span>
            </div>
            <div className="stat">
              <span className="stat-label">Success Rate</span>
              <span className="stat-value">99.9%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bridge Form */}
      <motion.div
        className="bridge-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <h2>Transfer Assets</h2>
          <div className="security-badge">
            <Shield size={16} />
            <span>Secured by Multi-Sig</span>
          </div>
        </div>

        {/* Chain Selection */}
        <div className="chain-selection">
          <div className="chain-selector">
            <label>From</label>
            <div className="chain-dropdown">
              <select 
                value={fromChain} 
                onChange={(e) => setFromChain(e.target.value)}
              >
                {chains.map(chain => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="chain-visual">
                <div 
                  className="chain-icon" 
                  style={{ background: getChainInfo(fromChain)?.color }}
                ></div>
                <span>{getChainInfo(fromChain)?.name}</span>
              </div>
            </div>
          </div>

          <motion.button
            className="swap-chains-btn"
            onClick={swapChains}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpDown size={20} />
          </motion.button>

          <div className="chain-selector">
            <label>To</label>
            <div className="chain-dropdown">
              <select 
                value={toChain} 
                onChange={(e) => setToChain(e.target.value)}
              >
                {chains.filter(chain => chain.id !== fromChain).map(chain => (
                  <option key={chain.id} value={chain.id}>
                    {chain.name}
                  </option>
                ))}
              </select>
              <div className="chain-visual">
                <div 
                  className="chain-icon" 
                  style={{ background: getChainInfo(toChain)?.color }}
                ></div>
                <span>{getChainInfo(toChain)?.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asset Selection */}
        <div className="asset-section">
          <label>Select Asset</label>
          <div className="asset-grid">
            {assets.map(asset => (
              <motion.button
                key={asset.symbol}
                className={`asset-card ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                onClick={() => setSelectedAsset(asset.symbol)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="asset-icon">{asset.symbol}</div>
                <div className="asset-info">
                  <span className="asset-symbol">{asset.symbol}</span>
                  <span className="asset-balance">Balance: {asset.balance}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <label>Amount to Bridge</label>
          <div className="amount-input">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="amount-info">
              <span className="asset-symbol">{selectedAsset}</span>
              <button className="max-btn">MAX</button>
            </div>
          </div>
          <div className="amount-details">
            <span>Balance: {getAssetBalance(selectedAsset)} {selectedAsset}</span>
            <span>Min: {bridgeInfo.minAmount} | Max: {bridgeInfo.maxAmount}</span>
          </div>
        </div>

        {/* Bridge Info */}
        <div className="bridge-info">
          <div className="info-grid">
            <div className="info-item">
              <Clock size={16} />
              <div>
                <span className="info-label">Estimated Time</span>
                <span className="info-value">{bridgeInfo.estimatedTime}</span>
              </div>
            </div>
            
            <div className="info-item">
              <Zap size={16} />
              <div>
                <span className="info-label">Bridge Fee</span>
                <span className="info-value">{bridgeInfo.bridgeFee}</span>
              </div>
            </div>
            
            <div className="info-item">
              <Info size={16} />
              <div>
                <span className="info-label">Network Fee</span>
                <span className="info-value">{bridgeInfo.networkFee}</span>
              </div>
            </div>
            
            <div className="info-item total">
              <div>
                <span className="info-label">Total Fee</span>
                <span className="info-value">{bridgeInfo.totalFee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bridge Button */}
        <motion.button
          className="bridge-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!amount || parseFloat(amount) <= 0}
        >
          <span>Bridge {selectedAsset}</span>
          <ArrowRight size={20} />
        </motion.button>
      </motion.div>

      {/* Recent Transfers */}
      <motion.div
        className="recent-transfers"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="transfers-header">
          <h2>Recent Transfers</h2>
          <button className="refresh-btn">
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="transfers-list">
          {recentTransfers.map((transfer, index) => (
            <motion.div
              key={transfer.txHash}
              className="transfer-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="transfer-info">
                <div className="transfer-asset">
                  <div className="asset-icon">{transfer.asset}</div>
                  <div className="transfer-details">
                    <span className="transfer-amount">{transfer.amount} {transfer.asset}</span>
                    <div className="transfer-route">
                      <div 
                        className="route-chain" 
                        style={{ background: getChainInfo(transfer.from)?.color }}
                      ></div>
                      <ArrowRight size={12} />
                      <div 
                        className="route-chain" 
                        style={{ background: getChainInfo(transfer.to)?.color }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="transfer-meta">
                  <div 
                    className="status-badge"
                    style={{ 
                      background: `${getStatusColor(transfer.status)}20`,
                      color: getStatusColor(transfer.status),
                      border: `1px solid ${getStatusColor(transfer.status)}40`
                    }}
                  >
                    {transfer.status}
                  </div>
                  <span className="transfer-time">{transfer.time}</span>
                </div>
              </div>
              
              <button className="tx-link">
                <ExternalLink size={16} />
                View Transaction
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
