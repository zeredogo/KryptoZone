import React from 'react'

export default function StatsBento({ projectsCount }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Projects */}
      <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
          <span className="material-symbols-outlined text-4xl dark:text-white text-neutral-900">folder</span>
        </div>
        <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Total Projects</p>
        <h3 className="font-label text-3xl font-bold dark:text-white text-neutral-900">{projectsCount}</h3>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-label text-primary">
          <span className="material-symbols-outlined text-xs">trending_up</span>
          +12% VS LAST QUARTER
        </div>
      </div>

      {/* Success Ratio */}
      <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
        <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Mainnet Success</p>
        <h3 className="font-label text-3xl font-bold dark:text-white text-neutral-900">
          99.8<span className="text-primary">%</span>
        </h3>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-label text-primary">
          <span className="material-symbols-outlined text-xs">check_circle</span>
          NOMINAL OPERATION
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group border-l-2 border-l-error-dim">
        <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Security Alerts</p>
        <h3 className="font-label text-3xl font-bold text-error">02</h3>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-label text-error">
          <span className="material-symbols-outlined text-xs">warning</span>
          ACTION REQUIRED
        </div>
      </div>

      {/* Uptime */}
      <div className="bg-surface-container-low p-6 rounded-xl ghost-border relative overflow-hidden group">
        <p className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">Uptime</p>
        <h3 className="font-label text-3xl font-bold dark:text-white text-neutral-900">
          1,429<span className="text-neutral-500 text-sm">H</span>
        </h3>
        <div className="mt-4 flex items-center gap-2 text-[10px] font-label text-outline">
          <span className="material-symbols-outlined text-xs">history</span>
          SINCE LAST REBOOT
        </div>
      </div>
    </div>
  )
}
