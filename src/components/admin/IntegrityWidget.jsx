import React from 'react'

export default function IntegrityWidget({ isMockMode }) {
  return (
    <div className="bg-surface-container-low p-4 rounded-xl ghost-border space-y-4">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          verified_user
        </span>
        <h3 className="font-headline font-bold text-sm text-white">SUPABASE_RLS_PROTOCOL</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between font-label text-[10px]">
          <span className="text-outline">POLICY STATUS</span>
          <span className="text-primary font-bold">ENFORCED</span>
        </div>
        <div className="w-full bg-outline-variant/20 h-1 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-full"></div>
        </div>
        <div className="flex justify-between font-label text-[10px]">
          <span className="text-outline">AUTH LEVEL</span>
          <span className="text-primary font-bold">
            {isMockMode ? 'SYSTEM_MOCK' : 'SYSTEM_ROOT'}
          </span>
        </div>
      </div>
    </div>
  )
}
