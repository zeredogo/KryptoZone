import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import StatsBento from './StatsBento'
import ActiveProjectsList from './ActiveProjectsList'
import ProjectForm from './ProjectForm'
import IntegrityWidget from './IntegrityWidget'

export default function ControlPlane({ 
  profile, 
  projects, 
  loading, 
  addProject, 
  updateProject, 
  deleteProject, 
  updateProfile,
  isMockMode 
}) {
  const [activeSubTab, setActiveSubTab] = useState('projects')
  const [selectedProject, setSelectedProject] = useState(null)

  // Settings tab states
  const [profileName, setProfileName] = useState(profile?.name || '')
  const [profileRole, setProfileRole] = useState(profile?.role || '')
  const [profileCredentials, setProfileCredentials] = useState(profile?.credentials || '')
  const [profileExpertise, setProfileExpertise] = useState(profile?.expertise || '')
  const [profileAvatarUrl, setProfileAvatarUrl] = useState(profile?.avatar_url || '')
  const [profileBio, setProfileBio] = useState(profile?.bio || '')
  const [profileSubmitting, setProfileSubmitting] = useState(false)
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('')

  // Handle edit trigger
  const handleEditSelect = (project) => {
    setSelectedProject(project)
  }

  // Handle CRUD submit
  const handleFormSubmit = async (fields) => {
    if (selectedProject) {
      const res = await updateProject(selectedProject.id, fields)
      if (!res.error) {
        setSelectedProject(null)
      }
      return res
    } else {
      return await addProject(fields)
    }
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileSubmitting(true)
    setProfileSuccessMsg('')
    
    const res = await updateProfile({
      name: profileName,
      role: profileRole,
      credentials: profileCredentials,
      expertise: profileExpertise,
      avatar_url: profileAvatarUrl,
      bio: profileBio
    })

    if (!res?.error) {
      setProfileSuccessMsg('SYSTEM: Profile credentials updated successfully.')
    }
    setProfileSubmitting(false)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-4 bg-background text-on-background">
      {/* Admin Sidebar Navigation */}
      <AdminSidebar activeTab={activeSubTab} setActiveTab={setActiveSubTab} />

      {/* Main Canvas Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header & Stats Banner */}
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-black font-headline tracking-tighter dark:text-white text-neutral-900">CONTROL_PLANE</h1>
                <p className="font-label text-xs text-outline uppercase tracking-widest">
                  Global Project Management & Security Node
                </p>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-6 py-3 font-label text-sm uppercase tracking-widest font-bold active:scale-95 transition-all shadow-[0_0_20px_rgba(163,166,255,0.2)] flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined">add</span>
                Add New Project
              </button>
            </div>

            {/* Bento Stats */}
            <StatsBento projectsCount={projects.length} />
          </section>

          {/* Sub-tab Router views */}
          {activeSubTab === 'projects' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Project List */}
              <ActiveProjectsList 
                projects={projects} 
                onEdit={handleEditSelect} 
                onDelete={deleteProject} 
              />

              {/* Form & Integrity Widget Column */}
              <div className="space-y-6">
                <ProjectForm 
                  selectedProject={selectedProject} 
                  onSubmit={handleFormSubmit}
                  onCancel={() => setSelectedProject(null)}
                />
                <IntegrityWidget isMockMode={isMockMode} />
              </div>
            </div>
          )}

          {activeSubTab === 'achievements' && (
            <div className="bg-surface-container p-8 rounded-xl ghost-border space-y-6">
              <h2 className="font-headline text-xl font-bold dark:text-white text-neutral-900 mb-6">SYSTEM_ACHIEVEMENTS</h2>
              <div className="space-y-4">
                <div className="p-4 bg-surface-container-low rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold dark:text-white text-neutral-900 text-md">Layer-2 Protocol Audit Approved</h4>
                    <p className="text-xs text-outline font-label mt-1">COMPLETED: MAY 2026 // AUDITOR: CERTICK</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold dark:text-white text-neutral-900 text-md">V2 Liquidity Pools Active</h4>
                    <p className="text-xs text-outline font-label mt-1">COMPLETED: JAN 2026 // NODE: MAINNET</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                </div>
                <div className="p-4 bg-surface-container-low rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold dark:text-white text-neutral-900 text-md">Former Technology Instructor Residency</h4>
                    <p className="text-xs text-outline font-label mt-1">LOGGED: DEC 2025 // SEC_ROOT</p>
                  </div>
                  <span className="material-symbols-outlined text-primary">military_tech</span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'logs' && (
            <div className="bg-neutral-950 p-8 rounded-xl ghost-border space-y-6 font-label">
              <h2 className="text-xl font-bold dark:text-white text-neutral-900 mb-6 font-headline">SYSTEM_SECURITY_LOGS</h2>
              <div className="space-y-2 text-xs text-primary/80 max-h-96 overflow-y-auto select-all">
                <p>[{new Date().toISOString()}] [OK] AUTHENTICATION GRANTED - USER: ROOT_SECURE</p>
                <p>[{new Date().toISOString()}] [OK] SECURE_CONNECTION_STABLISHED: AES-256-GCM</p>
                <p>[{new Date().toISOString()}] [OK] POSTGRESQL CONNECTION VERIFIED</p>
                <p>[{new Date().toISOString()}] [INFO] RLS POLICIES FOR ALL SCHEMAS APPLIED SUCCESSFULLY</p>
                <p>[{new Date().toISOString()}] [OK] API GATEWAY DEPLOYED AT CENTRAL PORT</p>
                <p>[{new Date().toISOString()}] [INFO] TELEMETRY STREAM NOMINAL - POLLING LIVE PRICE LOGS</p>
              </div>
            </div>
          )}

          {activeSubTab === 'settings' && (
            <div className="bg-surface-container p-8 rounded-xl ghost-border max-w-2xl">
              <h2 className="font-headline text-xl font-bold dark:text-white text-neutral-900 mb-6">SYSTEM_SETTINGS</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {profileSuccessMsg && (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded text-primary text-xs font-label">
                    {profileSuccessMsg}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Owner Name</label>
                  <input 
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    type="text" 
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Role Tag</label>
                    <input 
                      value={profileRole}
                      onChange={(e) => setProfileRole(e.target.value)}
                      type="text" 
                      className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Credentials</label>
                    <input 
                      value={profileCredentials}
                      onChange={(e) => setProfileCredentials(e.target.value)}
                      type="text" 
                      className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Core Expertise</label>
                  <input 
                    value={profileExpertise}
                    onChange={(e) => setProfileExpertise(e.target.value)}
                    type="text" 
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Avatar Image URL</label>
                  <input 
                    value={profileAvatarUrl}
                    onChange={(e) => setProfileAvatarUrl(e.target.value)}
                    type="url" 
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none text-xs" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-label text-[10px] text-outline uppercase tracking-widest block">Owner Bio Statement</label>
                  <textarea 
                    value={profileBio}
                    onChange={(e) => setProfileBio(e.target.value)}
                    rows="3" 
                    className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 dark:text-white text-neutral-900 rounded p-3 outline-none" 
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={profileSubmitting}
                  className="bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all active:scale-[0.98] cursor-pointer"
                >
                  {profileSubmitting ? 'SAVING DATA...' : 'APPLY CONFIGURATION'}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
