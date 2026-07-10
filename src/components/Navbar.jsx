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
      <div className="relative flex items-center px-8 h-16 w-full max-w-screen-2xl mx-auto">

        {/* Left — Brand */}
        <div
          className="text-xl font-black tracking-tighter text-indigo-400 font-label cursor-pointer flex-shrink-0"
          onClick={() => handleNav('home')}
        >
          KryptoZone v2.0
        </div>

        {/* Center — Nav Links (absolutely centered) */}
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

        {/* Right — Theme toggle + Logout */}
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={toggleDarkMode}
            className="material-symbols-outlined text-neutral-400 hover:bg-white/5 p-2 rounded transition-all duration-200 cursor-pointer"
            title="Toggle theme"
          >
            {darkMode ? 'light_mode' : 'dark_mode'}
          </button>

          {user && (
            <button
              onClick={logout}
              className="bg-gradient-to-br from-error to-error-dim text-white px-4 py-1.5 font-label text-xs uppercase tracking-widest font-bold active:scale-95 transition-transform cursor-pointer rounded"
            >
              Logout
            </button>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden material-symbols-outlined text-neutral-400 hover:text-white cursor-pointer p-1"
          >
            {mobileOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-neutral-950/95 border-t border-white/5 px-8 py-4 flex flex-col gap-3">
          {navLinks.map(({ label, tab }) => (
            <button
              key={tab}
              onClick={() => handleNav(tab)}
              className={`text-left font-headline text-sm font-bold transition-all py-2 border-b border-white/5 ${
                currentTab === tab ? 'text-indigo-400' : 'text-neutral-400'
              }`}
            >
              {label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => handleNav('admin')}
              className={`text-left font-headline text-sm font-bold transition-all py-2 border-b border-white/5 ${
                currentTab === 'admin' ? 'text-indigo-400' : 'text-neutral-400'
              }`}
            >
              Control Plane
            </button>
          )}
          {user && (
            <button onClick={logout} className="text-error text-xs font-label uppercase tracking-widest py-2 text-left">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
