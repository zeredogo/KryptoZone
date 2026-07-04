import React, { useState } from 'react'

export default function RecentDeployments({ projects, loading }) {
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

  // Helper to parse spec array
  const parseSpecs = (specs) => {
    if (Array.isArray(specs)) return specs
    if (typeof specs === 'string') {
      try {
        return JSON.parse(specs)
      } catch (e) {
        return []
      }
    }
    return []
  }

  return (
    <section className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <div className="space-y-2">
          <h3 className="text-4xl font-black font-headline text-white">Recent Deployments</h3>
          <p className="text-on-surface-variant max-w-lg">
            Technical blueprints and production-ready modules recently exited from the KryptoZone forge.
          </p>
        </div>
        <div className="font-label text-xs text-primary underline underline-offset-8 cursor-pointer mt-4 md:mt-0">
          ARCHIVE_SYSTEM_04
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => {
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
                    src={project.image_url || 'https://via.placeholder.com/400x300'}
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

              <div className="p-6 pt-0">
                <button 
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2 bg-surface-variant/30 hover:bg-primary text-on-surface hover:text-on-primary transition-all font-bold text-sm rounded cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          )
        })}
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
                <div>
                  <h5 className="font-label text-[10px] text-outline uppercase tracking-widest mb-1">VERSION</h5>
                  <p className="font-label text-sm text-primary font-bold">{selectedProject.version || 'v1.0.0'}</p>
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
