import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)

    const { error } = await login(email, password)
    setLoading(false)

    if (error) {
      setErrorMsg(error.message || 'Authentication sequence failed.')
    } else {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-surface-container-low max-w-sm w-full p-8 rounded-xl ghost-border relative glass-panel">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer p-1"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="mb-6 space-y-1 text-center">
          <h2 className="text-2xl font-black font-headline text-white tracking-tight">OS_AUTHENTICATE</h2>
          <p className="font-label text-[10px] text-primary uppercase tracking-widest">
            Enter Credentials to decrypt node
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-error/10 border border-error/20 rounded text-error text-xs font-label">
              ACCESS_DENIED: {errorMsg}
            </div>
          )}

          <div className="space-y-1">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Admin Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="admin@kryptozone.com"
              className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 text-white rounded p-3 outline-none text-sm font-headline"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Security Passphrase</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="••••••••"
              className="w-full bg-surface-container border border-outline-variant focus:border-primary focus:ring-0 text-white rounded p-3 outline-none text-sm font-headline"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-6"
          >
            {loading ? 'AUTHENTICATING...' : 'ESTABLISH LINK'}
          </button>

          <p className="text-center font-label text-[9px] text-outline mt-4 leading-normal">
            DEMO MODE ENABLED:<br />
            Input any email/passphrase to login instantly.
          </p>
        </form>
      </div>
    </div>
  )
}
