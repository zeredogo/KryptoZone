import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase, isMockMode } from '../utils/supabaseClient'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isMockMode) {
      // Look for persisted mock user
      const storedUser = localStorage.getItem('kryptozone_mock_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
      return
    }

    // Real Supabase Auth listener
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user || null)
      } catch (err) {
        console.error('Error fetching session:', err)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
      setLoading(false)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    if (isMockMode) {
      // Mock login always succeeds
      const mockUser = {
        id: '00000000-0000-0000-0000-000000000000',
        email: email || 'admin@kryptozone.com',
        user_metadata: { role: 'ROOT_SECURE' }
      }
      setUser(mockUser)
      localStorage.setItem('kryptozone_mock_user', JSON.stringify(mockUser))
      return { data: { user: mockUser }, error: null }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      console.error('Login error:', err)
      return { data: null, error: err }
    }
  }

  const logout = async () => {
    if (isMockMode) {
      setUser(null)
      localStorage.removeItem('kryptozone_mock_user')
      return { error: null }
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (err) {
      console.error('Logout error:', err)
      return { error: err }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isMockMode }}>
      {children}
    </AuthContext.Provider>
  )
}
