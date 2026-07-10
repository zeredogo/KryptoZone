import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ currentTab, setCurrentTab }) {
  const { user, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleDarkMode = () => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
    setDarkMode(!darkMode)
  }

  const navLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'About', tab: 'about' },
    { label: 'Projects', tab: 'projects' },
  ]

  const handleNav = (tab) => {
    setCurrentTab(tab)
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="relative flex items-center px-6 h-16 w-full max-w-screen-2xl mx-auto">

        {/* Left — Brand */}
        <div
          className="text-xl font-black tracking-tighter text-indigo-400 font-label cursor-pointer flex-shrink-0"
          onClick={() => handleNav('home')}
        >
          KryptoZone
        </div>

        {/* Center — Nav links absolutely centered on desktop */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navLinks.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => handleNav(tab)}
              className={`font-headline tracking-tight text-sm font-bold transition-all px-2 py-1 rounded cursor-pointer ${
                currentTab === tab
                  ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => handleNav('admin')}
              className={`font-headline tracking-tight text-sm font-bold transition-all px-2 py-1 rounded cursor-pointer ${
                currentTab === 'admin'
                  ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Control Plane
            </button>
          )}
        </div>

        {/* Right — Desktop: Logout only. Mobile: hamburger */}
        <div className="ml-auto flex items-center gap-3">
          {/* Logout button — desktop only when authenticated */}
          {user && (
            <button
              onClick={logout}
              className="hidden md:block bg-gradient-to-br from-error to-error-dim text-white px-4 py-1.5 font-label text-xs uppercase tracking-widest font-bold active:scale-95 transition-transform cursor-pointer rounded"
            >
              Logout
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden material-symbols-outlined text-neutral-400 hover:text-white cursor-pointer p-1 text-2xl"
          >
            {mobileOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown — includes theme toggle + all nav links */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-950/98 border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => handleNav(tab)}
              className={`text-left font-headline text-sm font-bold py-3 border-b border-white/5 transition-colors ${
                currentTab === tab ? 'text-indigo-400' : 'text-neutral-400'
              }`}
            >
              {label}
            </button>
          ))}
          {user && (
            <>
              <button
                onClick={() => handleNav('admin')}
                className={`text-left font-headline text-sm font-bold py-3 border-b border-white/5 ${
                  currentTab === 'admin' ? 'text-indigo-400' : 'text-neutral-400'
                }`}
              >
                Control Plane
              </button>
              <button onClick={logout} className="text-left text-error text-xs font-label uppercase tracking-widest py-3 border-b border-white/5">
                Logout
              </button>
            </>
          )}
          {/* Theme toggle — mobile only */}
          <button
            onClick={() => { toggleDarkMode(); setMobileOpen(false) }}
            className="flex items-center gap-3 text-neutral-400 text-sm font-label py-3 mt-1"
          >
            <span className="material-symbols-outlined text-lg">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}
