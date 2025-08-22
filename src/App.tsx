import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WalletProvider } from './contexts/WalletContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Lending from './pages/Lending'
import Borrowing from './pages/Borrowing'
import Portfolio from './pages/Portfolio'
import Bridge from './pages/Bridge'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <WalletProvider>
        <div className="app">
          <div className="background-gradient"></div>

          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/lending" element={<Lending />} />
              <Route path="/borrowing" element={<Borrowing />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/bridge" element={<Bridge />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </div>
      </WalletProvider>
    </Router>
  )
}

export default App
