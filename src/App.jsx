import React, { useState, useEffect } from 'react'
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
import AboutPage from './components/AboutPage'
import ProjectsPage from './components/ProjectsPage'

// Admin Components
import ControlPlane from './components/admin/ControlPlane'

function AppContent() {
  const [currentTab, setCurrentTab] = useState('home')
  const { user, login, logout, isMockMode } = useAuth()

  // Dedicated state for admin login on /admin route
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Portfolio data
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

  // Routing: detect /admin path to show the hidden admin portal
  useEffect(() => {
    const handleRouting = () => {
      const isPrivileged = window.location.pathname === '/admin' || window.location.hash === '#/admin'
      if (isPrivileged) {
        setCurrentTab('admin')
      } else if (currentTab === 'admin' && !user) {
        setCurrentTab('home')
      }
    }
    handleRouting()
    window.addEventListener('popstate', handleRouting)
    window.addEventListener('hashchange', handleRouting)
    return () => {
      window.removeEventListener('popstate', handleRouting)
      window.removeEventListener('hashchange', handleRouting)
    }
  }, [user])

  const handleTabChange = (tab) => {
    // Reset URL back to root when leaving admin path
    if (tab !== 'admin') {
      if (window.location.pathname === '/admin' || window.location.hash === '#/admin') {
        window.history.pushState({}, '', '/')
      }
    }
    setCurrentTab(tab)
    // Scroll back to top on tab change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')
    setLoginLoading(true)
    const { error } = await login(adminEmail, adminPassword)
    setLoginLoading(false)
    if (error) {
      setLoginError(error.message || 'Authentication sequence failed.')
    } else {
      setAdminEmail('')
      setAdminPassword('')
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background font-body">
      {/* Navbar — always visible */}
      <Navbar currentTab={currentTab} setCurrentTab={handleTabChange} />

      {/* === ROUTING === */}

      {/* Admin Route — hidden portal at /admin */}
      {currentTab === 'admin' ? (
        user ? (
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
          /* Full-page Admin Login Gateway */
          <main className="pt-28 pb-20 px-8 flex-1 flex flex-col justify-center items-center">
            <div className="bg-surface-container-low max-w-sm w-full p-8 rounded-xl ghost-border glass-panel space-y-6">
              <div className="text-center space-y-1">
                <span className="material-symbols-outlined text-4xl text-primary animate-pulse">terminal</span>
                <h2 className="text-xl font-black font-headline text-white">Admin Gateway</h2>
                <p className="font-label text-[10px] text-outline uppercase tracking-wider">SECURE LEVEL ACCESS REQUIRED</p>
              </div>

              {loginError && (
                <div className="p-3 bg-error/10 border border-error/20 rounded text-error text-xs font-label">
                  ACCESS_DENIED: {loginError}
                </div>
              )}

              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest">Operator Email</label>
                  <input
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-headline text-sm transition-all px-0 py-2 outline-none"
                    placeholder="name@kryptozone.com"
                    type="email"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest">Access Phrase</label>
                  <input
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-headline text-sm transition-all px-0 py-2 outline-none"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-gradient-to-r from-primary to-indigo-500 text-on-primary py-3 font-label text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? 'AUTHORIZING...' : 'INITIALIZE SESSION'}
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => handleTabChange('home')}
                  className="text-[10px] font-label text-outline hover:text-white transition-colors cursor-pointer"
                >
                  ← Return to Public Terminal
                </button>
              </div>
            </div>
          </main>
        )

      /* About Page */
      ) : currentTab === 'about' ? (
        <AboutPage />

      /* All Projects Page */
      ) : currentTab === 'projects' ? (
        <ProjectsPage projects={projects} loading={loading} />

      /* Public Home View */
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
            <IdentityCard
              profile={profile}
              loading={loading}
              onViewAbout={() => handleTabChange('about')}
            />
          </section>

          {/* Real-time Market Telemetry */}
          <MarketOracle oracleData={oracleData} loading={loading} />

          {/* Chain vs Neural Feeds */}
          <IntelAggregator feeds={feeds} loading={loading} />

          {/* Recent Portfolio Projects — 4 cards + View All button */}
          <RecentDeployments
            projects={projects}
            loading={loading}
            onViewAll={() => handleTabChange('projects')}
          />
        </main>
      )}

      {/* Shared Footer */}
      <Footer />
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
