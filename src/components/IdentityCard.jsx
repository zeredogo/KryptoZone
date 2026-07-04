import React from 'react'

export default function IdentityCard({ profile, loading }) {
  if (loading || !profile) {
    return (
      <div className="col-span-12 lg:col-span-4 bg-surface-container p-6 rounded-xl ghost-border flex flex-col justify-center items-center h-[550px] animate-pulse">
        <div className="w-32 h-32 rounded-full bg-surface-variant mb-6"></div>
        <div className="h-6 w-48 bg-surface-variant rounded mb-3"></div>
        <div className="h-4 w-32 bg-surface-variant rounded mb-6"></div>
        <div className="h-4 w-full bg-surface-variant rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-surface-variant rounded"></div>
      </div>
    )
  }

  return (
    <div className="col-span-12 lg:col-span-4 bg-surface-container p-1 rounded-xl ghost-border flex flex-col justify-between">
      <div className="flex-1 flex flex-col">
        <div className="relative overflow-hidden rounded-t-xl h-64 md:h-72">
          <img 
            alt={profile.name} 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            src={profile.avatar_url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-black font-headline text-white">{profile.name}</h2>
            <span className="font-label text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {profile.role}
            </span>
          </div>
        </div>
        
        <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="font-label text-[10px] text-outline uppercase tracking-widest">Credentials</p>
              <p className="text-sm font-bold text-white">{profile.credentials}</p>
            </div>
            <div className="space-y-1">
              <p className="font-label text-[10px] text-outline uppercase tracking-widest">Expertise</p>
              <p className="text-sm font-bold text-white">{profile.expertise}</p>
            </div>
          </div>
          
          <div className="pt-6 border-t border-white/5">
            <p className="text-sm text-on-surface-variant leading-relaxed italic">
              "{profile.bio}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
