import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bell,
  Shield,
  Palette,
  Globe,
  Wallet,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Save,
  RefreshCw
} from 'lucide-react'
import './Settings.css'

export default function Settings() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [privateMode, setPrivateMode] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' }
  ]

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
  ]

  const settingSections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: SettingsIcon,
      settings: [
        {
          id: 'language',
          label: 'Language',
          type: 'select',
          value: selectedLanguage,
          options: languages,
          onChange: setSelectedLanguage
        },
        {
          id: 'currency',
          label: 'Display Currency',
          type: 'select',
          value: selectedCurrency,
          options: currencies,
          onChange: setSelectedCurrency
        },
        {
          id: 'darkMode',
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          id: 'privateMode',
          label: 'Private Mode',
          description: 'Hide balances and sensitive information',
          type: 'toggle',
          value: privateMode,
          onChange: setPrivateMode
        },
        {
          id: 'autoLock',
          label: 'Auto-lock Timeout',
          type: 'select',
          value: '30',
          options: [
            { code: '5', name: '5 minutes' },
            { code: '15', name: '15 minutes' },
            { code: '30', name: '30 minutes' },
            { code: '60', name: '1 hour' },
            { code: 'never', name: 'Never' }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'notifications',
          label: 'Enable Notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        },
        {
          id: 'autoRefresh',
          label: 'Auto-refresh Data',
          description: 'Automatically update prices and balances',
          type: 'toggle',
          value: autoRefresh,
          onChange: setAutoRefresh
        }
      ]
    }
  ]

  const walletConnections = [
    { name: 'MetaMask', address: '0x1234...5678', status: 'connected' },
    { name: 'Phantom', address: 'BQWa...Xy9Z', status: 'connected' },
    { name: 'WalletConnect', address: null, status: 'disconnected' }
  ]

  return (
    <div className="settings">
      {/* Header */}
      <div className="settings-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Settings</h1>
            <p>Customize your DeFi experience and manage your preferences</p>
          </div>
          
          <motion.button
            className="save-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Save size={16} />
            Save Changes
          </motion.button>
        </div>
      </div>

      <div className="settings-grid">
        {/* Settings Sections */}
        <div className="settings-main">
          {settingSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              className="settings-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
            >
              <div className="section-header">
                <section.icon size={20} />
                <h2>{section.title}</h2>
              </div>

              <div className="settings-list">
                {section.settings.map((setting) => (
                  <div key={setting.id} className="setting-item">
                    <div className="setting-info">
                      <label className="setting-label">{setting.label}</label>
                      {setting.description && (
                        <span className="setting-description">{setting.description}</span>
                      )}
                    </div>

                    <div className="setting-control">
                      {setting.type === 'toggle' && (
                        <motion.button
                          className={`toggle ${setting.value ? 'active' : ''}`}
                          onClick={() => setting.onChange(!setting.value)}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="toggle-handle"></div>
                        </motion.button>
                      )}

                      {setting.type === 'select' && (
                        <select
                          value={setting.value}
                          onChange={(e) => setting.onChange(e.target.value)}
                          className="setting-select"
                        >
                          {setting.options.map((option) => (
                            <option key={option.code} value={option.code}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Advanced Settings */}
          <motion.div
            className="settings-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="section-header">
              <Palette size={20} />
              <h2>Advanced Settings</h2>
            </div>

            <div className="settings-list">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Slippage Tolerance</label>
                  <span className="setting-description">Maximum price difference for transactions</span>
                </div>
                <div className="setting-control">
                  <div className="slippage-options">
                    {['0.1%', '0.5%', '1.0%', '2.0%'].map(value => (
                      <button key={value} className="slippage-btn active">
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label className="setting-label">Transaction Deadline</label>
                  <span className="setting-description">Time limit for transaction execution</span>
                </div>
                <div className="setting-control">
                  <div className="input-with-unit">
                    <input type="number" defaultValue="20" />
                    <span>minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="settings-sidebar">
          {/* Connected Wallets */}
          <motion.div
            className="sidebar-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sidebar-header">
              <Wallet size={18} />
              <h3>Connected Wallets</h3>
            </div>

            <div className="wallets-list">
              {walletConnections.map((wallet, index) => (
                <div key={wallet.name} className="wallet-item">
                  <div className="wallet-info">
                    <span className="wallet-name">{wallet.name}</span>
                    {wallet.address && (
                      <span className="wallet-address">{wallet.address}</span>
                    )}
                  </div>
                  <div className={`wallet-status ${wallet.status}`}>
                    {wallet.status}
                  </div>
                </div>
              ))}
            </div>

            <button className="connect-wallet-btn">
              <Wallet size={16} />
              Connect New Wallet
            </button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="sidebar-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="sidebar-header">
              <RefreshCw size={18} />
              <h3>Quick Actions</h3>
            </div>

            <div className="quick-actions">
              <button className="action-btn">
                <RefreshCw size={16} />
                Refresh All Data
              </button>
              
              <button className="action-btn">
                {privateMode ? <Eye size={16} /> : <EyeOff size={16} />}
                {privateMode ? 'Show' : 'Hide'} Balances
              </button>
              
              <button className="action-btn">
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            className="sidebar-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="sidebar-header">
              <Globe size={18} />
              <h3>Help & Support</h3>
            </div>

            <div className="support-links">
              <a href="#" className="support-link">Documentation</a>
              <a href="#" className="support-link">FAQ</a>
              <a href="#" className="support-link">Contact Support</a>
              <a href="#" className="support-link">Community Discord</a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
