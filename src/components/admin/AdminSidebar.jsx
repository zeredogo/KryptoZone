import React from 'react'

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'projects', label: 'Projects', icon: 'grid_view' },
    { id: 'achievements', label: 'Achievements', icon: 'military_tech' },
    { id: 'logs', label: 'Security Logs', icon: 'terminal' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ]

  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-surface-container-low border-r border-white/5 flex flex-col p-6 gap-8 min-h-screen">
      <div className="space-y-2">
        <p className="font-label text-[10px] text-outline uppercase tracking-[0.2em] mb-4">Core Systems</p>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded transition-all cursor-pointer ${
                isActive 
                  ? 'bg-primary-container text-on-primary-container font-semibold' 
                  : 'text-on-surface-variant hover:bg-white/5 hover:dark:text-white text-neutral-900'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-headline text-sm">{item.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto p-4 bg-surface-container rounded-xl ghost-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-label text-[10px] text-outline">AUTH STATE</span>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        </div>
        <div className="font-label text-xs text-on-surface-variant">
          USER: <span class="text-primary font-bold">ROOT_SECURE</span>
        </div>
        <div className="h-[1px] bg-outline-variant/30"></div>
        <div className="font-label text-[10px] text-outline leading-tight">
          ENCRYPTION: AES-256-GCM<br />
          NODE: US-EAST-01
        </div>
      </div>
    </aside>
  )
}
