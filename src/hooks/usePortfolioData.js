import { useState, useEffect } from 'react'
import { supabase, isMockMode } from '../utils/supabaseClient'

// Mock seeding data matching Stitch mockup
const INITIAL_MOCK_PROFILE = {
  name: 'Paul Sunday Dogo',
  role: 'CORE ARCHITECT',
  credentials: 'B.Sc. Biz Mgmt',
  expertise: 'Blockchain Tech',
  avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm8KDSvtmq65BKRG64kus0JQ1JkRwUlG6S8anrRe0pwtmW3HZTGGApAPZkgdKUkU5BjvC71hGYTaddxuyT7QZeV9GmkQeQjVLy0YH0KeNMysfgrAiEWMWALUIpJHUAbrGPUkBbALwh3v2Ih_lfSdJY5_bMrtBKx7S_kXMjjaCEYKa5_bpZzFRFwuAKy21TJxmn9XG9f1cv9RquD7KDpyuggbAofKVW9MTg6Yf4YlzmmQm05tEyRAX1HKaIZTqoTuOP9fv4ooQ4puU',
  bio: 'Former Instructor. Transitioning theoretical logic into scalable decentralized ecosystems.'
}

const INITIAL_MOCK_PROJECTS = [
  {
    id: 'p1',
    title: 'Nexus Protocol',
    description: 'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiaBjDabVYgjAsQeDyHr-7a3EeBWDa-oSndToOBGkLbvqfUO8qAA91h_4VTatlDJfqcVbQsRdtJRW9yGTAA9GKEoS399-snvW7mpu-vy2-UqSGdSpOWIgWJpzuQAOYIa6xeTZ1w9TmA3F9fmO46HJQFQdgLsYw1dMbIAsUtYbQXzY0BCm8WCrfORk_CZft6sVOxrd2Sr7OOH3a4FvdXPtVlTj9hID_NE0u0LiNdiei-R_Q6r3jDdF1kchn26UCWtcNKKps9c_iklg',
    status: 'Mainnet',
    version: 'v2.1.0',
    specs: [
      { lang: 'SOLIDITY', pct: 75 },
      { lang: 'REACT', pct: 25 }
    ]
  },
  {
    id: 'p2',
    title: 'Aeon Oracle',
    description: 'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF35Lq8AdROdO9K8XsCL8En-d8Rw048ipyFKvmcvTnugo3Bb0b-AgQ6-LD0N8gC8xD4_vvBv-HEz8nah5W_HzqMugQ9iAgPBGDr0_mK20VIs6ZqfdHRVgamNKfnUhIYVurrg8voWTSLr1bE38biaHHZ5Vp21Cz1db-chrj6oENDnN2MIKHKhX1UIHD6a-FsvYAoWwkKGI0PGp7QyCrq0Hv5aEYcAQnlSnD2tD5srsnnebx5R-OXRZ3fCQxuGUGhWpUANZ8ylv2W0E',
    status: 'Mainnet',
    version: 'v1.0.4',
    specs: [
      { lang: 'RUST', pct: 90 },
      { lang: 'GO', pct: 10 }
    ]
  },
  {
    id: 'p3',
    title: 'Neural Bridge',
    description: 'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKP12iUlmJQdKCuxqZo-kvaU2zkXtmFNqrl8qRhScTkO4xjlA_Xe1RA0vi3K_cekNAytA5azVpORo0qsb4bTYTguOff8lf89yQrpim8k8QcFLItqAmjBRDlzCfNUDnHeti8hiTl2ZrBHSxXdPgXiy6h5iEPDk9Y9BkJCe5QXA4twdbfG5UPUJTZ7m1eqTg9dzMKwWrB2fhtOxcx7RE0Nl1PLtLvibhvZCLHTOdZhJ_o31Rz6oF5qzQahsa9SsYr9sHix4RwC39TvE',
    status: 'Mainnet',
    version: 'v1.1.2',
    specs: [
      { lang: 'PYTHON', pct: 60 },
      { lang: 'PYTORCH', pct: 40 }
    ]
  },
  {
    id: 'p4',
    title: 'Void DEX',
    description: 'Technical blueprints and production-ready modules recently exited from the KryptoZone forge.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5U_jaS1VSGRxyL2uaZZmojry17SJsVSmX37FfljOv-HznDYUlwmtLcX4XDu1gxh3k8c2Dk9JZHb-GUfxQ9quniRU5QQkqPidX4ru5_e8d96MxcsQefIhy92Jt3j-5gSNEo0L3IGhPESkGsqafNJF9Y59_8DHHNl0ww_cYHC685Q6blq6RQ-XQmuVequ70IllW-dEDd-VFDHbCaLWFYthR3Kl-F9gf7qTf4NwAYWOttDn-lem3XlFEdG0lltPBJ4vIJGo9-Z_bTEU',
    status: 'Testnet',
    version: 'v0.8.0',
    specs: [
      { lang: 'TYPESCRIPT', pct: 50 },
      { lang: 'VYPER', pct: 50 }
    ]
  }
]

const INITIAL_MOCK_ORACLE = [
  { symbol: 'BTC', price: 64312.00, change_pct: 2.4, height_pct: 100 },
  { symbol: 'ETH', price: 3450.00, change_pct: 1.8, height_pct: 85 },
  { symbol: 'SOL', price: 142.10, change_pct: 5.2, height_pct: 60 },
  { symbol: 'BNB', price: 580.40, change_pct: -0.4, height_pct: 55 },
  { symbol: 'XRP', price: 0.62, change_pct: 0.2, height_pct: 40 }
]

const INITIAL_MOCK_FEEDS = [
  { id: 'f1', feed_type: 'chain', category: 'SECURITY_ALERT', title: 'Protocol Vulnerability Detected in Layer-2 Bridges', content: 'Critical vulnerability patch released for cross-chain liquidity providers.' },
  { id: 'f2', feed_type: 'chain', category: 'ECOSYSTEM_GROWTH', title: 'Web3 Privacy Layer Reaches Mainnet Milestone', content: 'Zero-knowledge proofs integration completes final audit phase.' },
  { id: 'f3', feed_type: 'neural', category: 'AI_MODEL_UPDATE', title: 'GPT-5 Training Setups leaked in Research Paper', content: 'Deep-dive into the architectural changes for the next-gen LLMs.' },
  { id: 'f4', feed_type: 'neural', category: 'CHIP_WARS', title: 'The Shift to On-Device Neural Processing', content: 'Edge computing becomes the priority for silicon manufacturers in 2024.' }
]

export const usePortfolioData = () => {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [oracleData, setOracleData] = useState([])
  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    if (isMockMode) {
      // Fetch from localStorage or use defaults
      const localProfile = localStorage.getItem('kryptozone_profile')
      const localProjects = localStorage.getItem('kryptozone_projects')
      const localOracle = localStorage.getItem('kryptozone_oracle')
      const localFeeds = localStorage.getItem('kryptozone_feeds')

      setProfile(localProfile ? JSON.parse(localProfile) : INITIAL_MOCK_PROFILE)
      setProjects(localProjects ? JSON.parse(localProjects) : INITIAL_MOCK_PROJECTS)
      setOracleData(localOracle ? JSON.parse(localOracle) : INITIAL_MOCK_ORACLE)
      setFeeds(localFeeds ? JSON.parse(localFeeds) : INITIAL_MOCK_FEEDS)
      setLoading(false)
      return
    }

    try {
      // 1. Fetch Profile
      const { data: profileData, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .maybeSingle()
      
      // If profile doesn't exist, we fall back to initial mock
      setProfile(profileErr || !profileData ? INITIAL_MOCK_PROFILE : profileData)

      // 2. Fetch Projects
      const { data: projectsData, error: projectsErr } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (projectsErr) throw projectsErr
      setProjects(projectsData || [])

      // 3. Fetch Market Oracle
      const { data: oracleStats, error: oracleErr } = await supabase
        .from('market_oracle')
        .select('*')
        .order('price', { ascending: false })
      
      if (oracleErr) throw oracleErr
      setOracleData(oracleStats || [])

      // 4. Fetch Feeds
      const { data: feedsData, error: feedsErr } = await supabase
        .from('intel_feeds')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (feedsErr) throw feedsErr
      setFeeds(feedsData || [])

    } catch (err) {
      console.error('Error fetching data from Supabase:', err)
      setError(err.message || 'Failed to fetch database content.')
      
      // Graceful fallback to initial mocks in case of db query error
      setProfile(INITIAL_MOCK_PROFILE)
      setProjects(INITIAL_MOCK_PROJECTS)
      setOracleData(INITIAL_MOCK_ORACLE)
      setFeeds(INITIAL_MOCK_FEEDS)
    } finally {
      setLoading(false)
    }
  }

  // Effect to load initial data
  useEffect(() => {
    fetchData()

    // Setup real-time updates for market oracle when not in mock mode
    if (!isMockMode) {
      const channel = supabase
        .channel('schema-db-changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'market_oracle' },
          () => {
            // Refetch oracle data when changed
            supabase
              .from('market_oracle')
              .select('*')
              .order('price', { ascending: false })
              .then(({ data }) => {
                if (data) setOracleData(data)
              })
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  // CRUD for Projects
  const addProject = async (projectInput) => {
    if (isMockMode) {
      const newProj = {
        ...projectInput,
        id: 'mock-' + Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      }
      const updated = [newProj, ...projects]
      setProjects(updated)
      localStorage.setItem('kryptozone_projects', JSON.stringify(updated))
      return { data: newProj, error: null }
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([projectInput])
        .select()
        .single()
      
      if (error) throw error
      setProjects(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      console.error('Error inserting project:', err)
      return { data: null, error: err }
    }
  }

  const updateProject = async (id, updatedFields) => {
    if (isMockMode) {
      const updated = projects.map(p => p.id === id ? { ...p, ...updatedFields } : p)
      setProjects(updated)
      localStorage.setItem('kryptozone_projects', JSON.stringify(updated))
      return { error: null }
    }

    try {
      const { error } = await supabase
        .from('projects')
        .update(updatedFields)
        .eq('id', id)
      
      if (error) throw error
      setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p))
      return { error: null }
    } catch (err) {
      console.error('Error updating project:', err)
      return { error: err }
    }
  }

  const deleteProject = async (id) => {
    if (isMockMode) {
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      localStorage.setItem('kryptozone_projects', JSON.stringify(updated))
      return { error: null }
    }

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      setProjects(prev => prev.filter(p => p.id !== id))
      return { error: null }
    } catch (err) {
      console.error('Error deleting project:', err)
      return { error: err }
    }
  }

  // Update Profile
  const updateProfile = async (updatedFields) => {
    if (isMockMode) {
      const updated = { ...profile, ...updatedFields }
      setProfile(updated)
      localStorage.setItem('kryptozone_profile', JSON.stringify(updated))
      return { error: null }
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updatedFields)
        .eq('id', profile.id)
      
      if (error) throw error
      setProfile(prev => ({ ...prev, ...updatedFields }))
      return { error: null }
    } catch (err) {
      console.error('Error updating profile:', err)
      return { error: err }
    }
  }

  return {
    profile,
    projects,
    oracleData,
    feeds,
    loading,
    error,
    refreshData: fetchData,
    addProject,
    updateProject,
    deleteProject,
    updateProfile
  }
}
