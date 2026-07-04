import React from 'react'

export default function ActiveProjectsList({ projects, onEdit, onDelete }) {
  // Helper to parse spec array into comma separated stack string
  const getStackText = (specs) => {
    if (!specs) return ''
    let specArr = specs
    if (typeof specs === 'string') {
      try {
        specArr = JSON.parse(specs)
      } catch (e) {
        return ''
      }
    }
    if (Array.isArray(specArr)) {
      return specArr.map(s => s.lang).join(', ')
    }
    return ''
  }

  return (
    <section className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline text-xl font-bold text-white flex items-center gap-2">
          <span className="w-1 h-6 bg-primary"></span>
          ACTIVE_PROJECTS
        </h2>
      </div>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-low rounded-xl ghost-border text-outline">
            No projects deployed. Initialize the KryptoZone forge.
          </div>
        ) : (
          projects.map((project) => {
            const isMainnet = project.status?.toLowerCase() === 'mainnet'
            const isStaging = project.status?.toLowerCase() === 'staging'
            const isBeta = project.status?.toLowerCase() === 'beta'

            return (
              <div 
                key={project.id} 
                className="bg-surface-container-low hover:bg-surface-container transition-all p-4 rounded-xl ghost-border flex items-center gap-6 group"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-variant">
                  <img 
                    className="w-full h-full object-cover" 
                    alt={project.title}
                    src={project.image_url || 'https://via.placeholder.com/64'}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-headline font-bold text-white truncate">{project.title}</h4>
                    <span 
                      className={`px-2 py-0.5 rounded-full font-label text-[9px] uppercase tracking-widest border ${
                        isMainnet 
                          ? 'bg-primary/10 text-primary border-primary/20' 
                          : isStaging 
                          ? 'bg-error-dim/10 text-error-dim border-error-dim/20'
                          : isBeta
                          ? 'bg-secondary/10 text-secondary border-secondary/20'
                          : 'bg-outline-variant/10 text-outline border-outline-variant/20'
                      }`}
                    >
                      {project.status || 'Development'}
                    </span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="font-label text-[10px] text-outline uppercase">
                      STACK: {getStackText(project.specs) || 'Not specified'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                    <span className="font-label text-[10px] text-outline">
                      VERSION: {project.version || 'v1.0.0'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onEdit(project)}
                    className="p-2 hover:text-primary transition-colors cursor-pointer text-neutral-400"
                    title="Edit project"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${project.title}?`)) {
                        onDelete(project.id)
                      }
                    }}
                    className="p-2 hover:text-error transition-colors cursor-pointer text-neutral-400"
                    title="Delete project"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </section>
  )
}
