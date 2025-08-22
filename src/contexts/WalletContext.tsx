import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface WalletState {
  isConnected: boolean
  address: string | null
  balance: string | null
  chainId: number | null
  isConnecting: boolean
  error: string | null
}

interface WalletContextType extends WalletState {
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchChain: (chainId: number) => Promise<void>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    error: null
  })

  // Check if wallet is already connected on load
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          await handleAccountsChanged(accounts)
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setWalletState(prev => ({
        ...prev,
        error: 'Please install MetaMask or another Web3 wallet'
      }))
      return
    }

    setWalletState(prev => ({ ...prev, isConnecting: true, error: null }))

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        await handleAccountsChanged(accounts)
      }
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet'
      }))
    }
  }

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
      return
    }

    try {
      const address = accounts[0]
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      })

      // Convert balance from wei to ETH
      const balanceInEth = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      setWalletState({
        isConnected: true,
        address,
        balance: balanceInEth,
        chainId: parseInt(chainId, 16),
        isConnecting: false,
        error: null
      })
    } catch (error: any) {
      setWalletState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to get wallet info'
      }))
    }
  }

  const disconnectWallet = () => {
    setWalletState({
      isConnected: false,
      address: null,
      balance: null,
      chainId: null,
      isConnecting: false,
      error: null
    })
  }

  const switchChain = async (targetChainId: number) => {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('No wallet found')
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }]
      })
    } catch (error: any) {
      // Chain doesn't exist, try to add it
      if (error.code === 4902) {
        const chainData = getChainData(targetChainId)
        if (chainData) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainData]
          })
        }
      } else {
        throw error
      }
    }
  }

  const getChainData = (chainId: number) => {
    const chains: { [key: number]: any } = {
      1: {
        chainId: '0x1',
        chainName: 'Ethereum Mainnet',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://mainnet.infura.io/v3/']
      },
      11155111: {
        chainId: '0xaa36a7',
        chainName: 'Sepolia Testnet',
        nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
        rpcUrls: ['https://sepolia.infura.io/v3/']
      }
    }
    return chains[chainId]
  }

  // Listen for account and chain changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', (chainId: string) => {
        setWalletState(prev => ({
          ...prev,
          chainId: parseInt(chainId, 16)
        }))
      })

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', () => {})
      }
    }
  }, [])

  const contextValue: WalletContextType = {
    ...walletState,
    connectWallet,
    disconnectWallet,
    switchChain
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

// Global type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
