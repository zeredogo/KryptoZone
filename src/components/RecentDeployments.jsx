import React, { useState } from 'react'

export default function RecentDeployments({ projects, loading, onViewAll }) {
  const [selectedProject, setSelectedProject] = useState(null)

  if (loading) {
    return (
      <section className="space-y-10 animate-pulse">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-surface-variant rounded"></div>
            <div className="h-4 w-96 bg-surface-variant rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface-container rounded-xl overflow-hidden ghost-border h-96 flex flex-col">
              <div className="h-48 bg-surface-variant"></div>
              <div className="p-6 flex-1 space-y-4">
                <div className="h-6 w-32 bg-surface-variant rounded"></div>
                <div className="h-4 w-full bg-surface-variant rounded"></div>
                <div className="h-10 bg-surface-variant rounded mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const parseSpecs = (specs) => {
    if (Array.isArray(specs)) return specs
    if (typeof specs === 'string') {
      try { return JSON.parse(specs) } catch (e) { return [] }
    }
    return []
  }

  // Only show the 4 most recent projects
  const recentProjects = projects.slice(0, 4)

  return (
    <section className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div className="space-y-2">
          <h3 className="text-4xl font-black font-headline text-white">Recent Deployments</h3>
          <p className="text-on-surface-variant max-w-lg">
            Technical blueprints and production-ready modules recently exited from the KryptoZone forge.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentProjects.map((project) => {
          const specs = parseSpecs(project.specs)
          const isMainnet = project.status?.toUpperCase() === 'MAINNET'

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
                    src={project.image_url || 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop'}
                  />
                  <div className="absolute top-4 right-4">
                    <span 
                      className={`font-label text-[10px] px-2 py-0.5 rounded-sm font-bold ${
                        isMainnet 
                          ? 'bg-primary-container text-on-primary-container' 
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

              {/* Action Buttons — replaced version badge with live URL button */}
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
                  className="flex-1 py-2 bg-primary text-on-primary hover:brightness-110 transition-all font-bold text-sm rounded text-center block leading-8"
                >
                  View Project
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* View All Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onViewAll}
          className="flex items-center gap-3 px-8 py-3 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 hover:border-primary/40 text-white font-label text-xs uppercase tracking-widest transition-all active:scale-[0.98] cursor-pointer rounded-lg group"
        >
          <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform text-sm">grid_view</span>
          View All Deployments
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded font-bold text-[10px]">
            {projects.length}
          </span>
        </button>
      </div>

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
                <div className="space-y-3">
                  <h5 className="font-label text-[10px] text-outline uppercase tracking-widest">LIVE LINK</h5>
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
    </section>
  )
}
