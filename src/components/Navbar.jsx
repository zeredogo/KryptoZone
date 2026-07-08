import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ currentTab, setCurrentTab, onOpenLogin }) {
  const { user, logout, isMockMode } = useAuth()
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
    setDarkMode(!darkMode)
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <div className="flex justify-between items-center px-8 h-16 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <div 
            className="text-xl font-black tracking-tighter text-indigo-400 font-label cursor-pointer"
            onClick={() => setCurrentTab('home')}
          >
            KryptoZone v2.0
          </div>
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentTab('home')}
              className={`font-headline tracking-tight text-sm font-bold transition-all px-2 py-1 rounded cursor-pointer ${
                currentTab === 'home' 
                  ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentTab('about')}
              className={`font-headline tracking-tight text-sm font-bold transition-all px-2 py-1 rounded cursor-pointer ${
                currentTab === 'about' 
                  ? 'text-indigo-400 border-b-2 border-indigo-500 pb-1' 
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              About
            </button>
            {user && (
              <button 
                onClick={() => setCurrentTab('admin')}
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
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface-container-low rounded-lg ghost-border">
            <span className="material-symbols-outlined text-sm text-primary">security</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-primary">
              RLS: {isMockMode ? 'Mock Sandboxed' : 'Active'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="material-symbols-outlined text-neutral-400 hover:bg-white/5 p-2 rounded transition-all duration-200 cursor-pointer"
            >
              {darkMode ? 'light_mode' : 'dark_mode'}
            </button>
            
            {user && (
              <button 
                onClick={logout}
                className="bg-gradient-to-br from-error to-error-dim text-white px-4 py-1.5 font-label text-xs uppercase tracking-widest font-bold active:scale-95 transition-transform cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
