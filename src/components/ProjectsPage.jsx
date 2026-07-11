import React, { useState } from 'react'

export default function ProjectsPage({ projects, loading }) {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('ALL')

  if (loading) {
    return (
      <main className="pt-24 pb-20 px-8 max-w-screen-2xl w-full mx-auto space-y-12">
        <div className="space-y-4">
          <div className="h-8 w-64 bg-surface-variant rounded animate-pulse"></div>
          <div className="h-4 w-96 bg-surface-variant rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-surface-container rounded-xl overflow-hidden ghost-border h-96 flex flex-col animate-pulse">
              <div className="h-48 bg-surface-variant"></div>
              <div className="p-6 flex-1 space-y-4">
                <div className="h-6 w-32 bg-surface-variant rounded"></div>
                <div className="h-4 w-full bg-surface-variant rounded"></div>
                <div className="h-10 bg-surface-variant rounded mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    )
  }

  // Parse specs JSON array
  const parseSpecs = (specs) => {
    if (Array.isArray(specs)) return specs
    if (typeof specs === 'string') {
      try { return JSON.parse(specs) } catch (e) { return [] }
    }
    return []
  }

  // Filter projects by status
  const filteredProjects = projects.filter(proj => {
    if (filter === 'ALL') return true
    return proj.status?.toUpperCase() === filter
  })

  const statuses = ['ALL', 'MAINNET', 'TESTNET', 'BETA', 'DEVELOPMENT', 'STAGING']

  return (
    <main className="pt-24 pb-20 px-8 max-w-screen-2xl w-full mx-auto space-y-12">
      {/* Header */}
      <div className="border-b border-white/5 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black font-headline text-white font-bold">Protocol Repository</h1>
          <p className="font-label text-xs text-primary uppercase tracking-widest mt-1">
            Complete Index // KryptoZone Smart Blueprints
          </p>
        </div>
        
        {/* Status Filter Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 font-label text-[10px] uppercase tracking-widest border transition-all rounded cursor-pointer ${
                filter === s
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-transparent text-outline border-outline-variant/30 hover:text-white hover:border-outline-variant'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of All Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProjects.map((project) => {
          const specs = parseSpecs(project.specs)
          const isLive = ['MAINNET', 'LIVE'].includes(project.status?.toUpperCase())
          const isTestnet = project.status?.toUpperCase() === 'TESTNET'

          return (
            <div 
              key={project.id} 
              className="group bg-surface-container rounded-xl overflow-hidden ghost-border flex flex-col h-full justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={project.image_url || 'https://via.placeholder.com/400x300'}
                  />
                  <div className="absolute top-4 right-4">
                    <span 
                      className={`font-label text-[10px] px-2 py-0.5 rounded-sm font-bold ${
                        isLive
                          ? 'bg-primary-container text-on-primary-container' 
                          : isTestnet
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {project.status?.toUpperCase() || 'DEVELOPMENT'}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-4 text-white">{project.title}</h4>
                    <div className="space-y-3">
                      <p className="font-label text-[10px] text-outline tracking-widest">SYSTEM SPECS</p>
                      <div className="space-y-2">
                        {specs.map((spec, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-[10px] font-label text-on-surface-variant">
                              <span>{spec.lang?.toUpperCase()}</span>
                              <span>{spec.pct || spec.val}%</span>
                            </div>
                            <div className="w-full bg-white/5 h-1">
                              <div 
                                className={`h-full ${i === 0 ? 'bg-primary' : 'bg-primary/40'}`}
                                style={{ width: `${spec.pct || spec.val}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="flex-1 py-2 bg-surface-variant/30 hover:bg-surface-variant/60 text-white transition-all font-bold text-sm rounded cursor-pointer"
                >
                  Specs
                </button>
                <a 
                  href={project.live_url || 'https://github.com/zeredogo/KryptoZone'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-primary text-on-primary hover:brightness-110 transition-all font-bold text-sm rounded cursor-pointer text-center block"
                >
                  View Project
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20 bg-surface-container-low rounded-xl border border-dashed border-outline-variant/30">
          <span className="material-symbols-outlined text-4xl text-outline/30 mb-2">folder_open</span>
          <p className="font-label text-xs text-outline uppercase tracking-wider">No protocol blueprints found matching this query</p>
        </div>
      )}

      {/* Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-surface-container-low max-w-2xl w-full rounded-xl overflow-hidden ghost-border flex flex-col relative">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer z-10 p-2 bg-black/40 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="h-64 overflow-hidden relative">
              <img 
                alt={selectedProject.title} 
                className="w-full h-full object-cover" 
                src={selectedProject.image_url}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="bg-primary/10 text-primary border border-primary/20 font-label text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold mb-2 inline-block">
                  {selectedProject.status}
                </span>
                <h2 className="text-3xl font-black font-headline text-white mt-2">{selectedProject.title}</h2>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h5 className="font-label text-[10px] text-outline uppercase tracking-widest">DESCRIPTION</h5>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {selectedProject.description || 'No description provided for this blueprint sequence.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div>
                  <h5 className="font-label text-[10px] text-outline uppercase tracking-widest mb-2">LIVE VERSION / LINK</h5>
                  <a 
                    href={selectedProject.live_url || 'https://github.com/zeredogo/KryptoZone'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-on-primary px-4 py-2 font-label text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all rounded cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    View Project
                  </a>
                </div>
                <div>
                  <h5 className="font-label text-[10px] text-outline uppercase tracking-widest mb-3">BLUEPRINT COMPLEXITY</h5>
                  <div className="space-y-3">
                    {parseSpecs(selectedProject.specs).map((spec, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-label text-on-surface-variant">
                          <span>{spec.lang}</span>
                          <span>{spec.pct || spec.val}%</span>
                        </div>
                        <div className="w-full bg-white/5 h-1">
                          <div 
                            className={`h-full ${i === 0 ? 'bg-primary' : 'bg-primary/40'}`}
                            style={{ width: `${spec.pct || spec.val}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
