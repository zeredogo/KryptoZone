import React from 'react'

export default function IntelAggregator({ feeds, loading }) {
  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-6">
          <div className="h-6 w-32 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
        </div>
        <div className="space-y-6">
          <div className="h-6 w-32 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
        </div>
      </section>
    )
  }

  const chainFeeds = feeds.filter(f => f.feed_type === 'chain')
  const neuralFeeds = feeds.filter(f => f.feed_type === 'neural')

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Chain Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight text-white">Chain Intel</h3>
        </div>
        
        <div className="space-y-4">
          {chainFeeds.length === 0 ? (
            <p className="font-label text-xs text-outline italic">No Chain Intel logs recorded.</p>
          ) : (
            chainFeeds.map((feed) => (
              <div 
                key={feed.id} 
                className="p-4 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 rounded-lg ghost-border"
              >
                <span className="font-label text-[10px] text-primary mb-2 block tracking-widest uppercase">
                  {feed.category}
                </span>
                <h4 className="font-bold text-md text-white mb-2">{feed.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feed.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Neural Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight text-white">Neural Intel</h3>
        </div>
        
        <div className="space-y-4">
          {neuralFeeds.length === 0 ? (
            <p className="font-label text-xs text-outline italic">No Neural Intel logs recorded.</p>
          ) : (
            neuralFeeds.map((feed) => (
              <div 
                key={feed.id} 
                className="p-4 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 rounded-lg ghost-border"
              >
                <span className="font-label text-[10px] text-tertiary mb-2 block tracking-widest uppercase">
                  {feed.category}
                </span>
                <h4 className="font-bold text-md text-white mb-2">{feed.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feed.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
