import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { usePortfolioData } from './hooks/usePortfolioData'

// Public Components
import Navbar from './components/Navbar'
import TerminalHero from './components/TerminalHero'
import IdentityCard from './components/IdentityCard'
import MarketOracle from './components/MarketOracle'
import IntelAggregator from './components/IntelAggregator'
import RecentDeployments from './components/RecentDeployments'
import Footer from './components/Footer'

// Admin Components
import ControlPlane from './components/admin/ControlPlane'
import LoginModal from './components/LoginModal'

function AppContent() {
  const [currentTab, setCurrentTab] = useState('home')
  const [loginOpen, setLoginOpen] = useState(false)
  const { user, isMockMode } = useAuth()

  // Retrieve unified portfolio data queries
  const {
    profile,
    projects,
    oracleData,
    feeds,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    updateProfile
  } = usePortfolioData()

  // If user signs out and is on Admin tab, route back to Home
  React.useEffect(() => {
    if (!user && currentTab === 'admin') {
      setCurrentTab('home')
    }
  }, [user, currentTab])

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body">
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onOpenLogin={() => setLoginOpen(true)} 
      />

      {/* Dynamic Main Canvas View Router */}
      {currentTab === 'admin' && user ? (
        <div className="pt-16 flex-1 flex flex-col">
          <ControlPlane 
            profile={profile}
            projects={projects}
            loading={loading}
            addProject={addProject}
            updateProject={updateProject}
            deleteProject={deleteProject}
            updateProfile={updateProfile}
            isMockMode={isMockMode}
          />
        </div>
      ) : (
        <main className="pt-24 pb-20 px-8 max-w-screen-2xl w-full mx-auto space-y-20 flex-1 flex flex-col justify-start">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 text-error font-label text-xs rounded-xl">
              SYSTEM_ALERT: {error}. Falling back to cached local storage.
            </div>
          )}

          {/* Hero & Identity Bento Row */}
          <section className="grid grid-cols-12 gap-6 min-h-[600px]">
            <TerminalHero />
            <IdentityCard profile={profile} loading={loading} />
          </section>

          {/* Real-time Market Telemetry */}
          <MarketOracle oracleData={oracleData} loading={loading} />

          {/* Chain vs Neural Feeds */}
          <IntelAggregator feeds={feeds} loading={loading} />

          {/* Recent Portfolio Projects */}
          <RecentDeployments projects={projects} loading={loading} />
        </main>
      )}

      {/* Shared Footer */}
      <Footer />

      {/* Security Authentication Overlay */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
