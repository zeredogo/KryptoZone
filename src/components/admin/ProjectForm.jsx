import React, { useState, useEffect } from 'react'

export default function ProjectForm({ selectedProject, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [techStack, setTechStack] = useState('')
  const [status, setStatus] = useState('Mainnet')
  const [version, setVersion] = useState('v1.0.0')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  // Populates form when editing
  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title || '')
      setStatus(selectedProject.status || 'Mainnet')
      setVersion(selectedProject.version || 'v1.0.0')
      setDescription(selectedProject.description || '')
      setImageUrl(selectedProject.image_url || '')
      
      // Parse specs JSON array back to comma-separated string
      let specs = selectedProject.specs
      if (typeof specs === 'string') {
        try {
          specs = JSON.parse(specs)
        } catch (e) {
          specs = []
        }
      }
      if (Array.isArray(specs)) {
        setTechStack(specs.map(s => s.lang).join(', '))
      } else {
        setTechStack('')
      }
    } else {
      resetForm()
    }
  }, [selectedProject])

  const resetForm = () => {
    setTitle('')
    setTechStack('')
    setStatus('Mainnet')
    setVersion('v1.0.0')
    setDescription('')
    setImageUrl('')
    setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    
    if (!title.trim()) {
      setErrorMsg('Project Name is required.')
      return
    }

    setSubmitting(true)

    // Convert comma-separated stack into specs array
    const stackItems = techStack
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
    
    // Distribute percentages evenly
    const count = stackItems.length
    const pctSplit = count > 0 ? Math.floor(100 / count) : 0
    const specs = stackItems.map((lang, index) => {
      // Last item gets remainder to sum to exactly 100%
      const pct = (index === count - 1) ? (100 - (pctSplit * (count - 1))) : pctSplit
      return { lang: lang.toUpperCase(), pct }
    })

    const payload = {
      title,
      status,
      version,
      description,
      image_url: imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiaBjDabVYgjAsQeDyHr-7a3EeBWDa-oSndToOBGkLbvqfUO8qAA91h_4VTatlDJfqcVbQsRdtJRW9yGTAA9GKEoS399-snvW7mpu-vy2-UqSGdSpOWIgWJpzuQAOYIa6xeTZ1w9TmA3F9fmO46HJQFQdgLsYw1dMbIAsUtYbQXzY0BCm8WCrfORk_CZft6sVOxrd2Sr7OOH3a4FvdXPtVlTj9hID_NE0u0LiNdiei-R_Q6r3jDdF1kchn26UCWtcNKKps9c_iklg', // fallback mock image
      specs
    }

    try {
      const res = await onSubmit(payload)
      if (res?.error) {
        setErrorMsg(res.error.message || 'Operation failed.')
      } else {
        resetForm()
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelClick = () => {
    resetForm()
    if (onCancel) onCancel()
  }

  return (
    <section className="space-y-6">
      <div className="bg-surface-container p-6 rounded-xl ghost-border glass-panel relative">
        <div className="absolute -top-3 left-6 bg-background px-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">edit_note</span>
          <h2 className="font-label text-[10px] text-primary uppercase tracking-[0.3em]">
            {selectedProject ? 'EDIT_PROJECT' : 'ADD_NEW_PROJECT'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {errorMsg && (
            <div className="p-3 bg-error/10 border border-error/20 rounded text-error text-xs font-label">
              ERROR: {errorMsg}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest">Project Name</label>
            <input 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-headline transition-all px-0 py-2 outline-none" 
              placeholder="e.g. Nebula Protocol" 
              type="text"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest">Tech Stack (comma separated)</label>
            <input 
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-headline transition-all px-0 py-2 outline-none" 
              placeholder="React, Solidity, Tailwind" 
              type="text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-label text-[10px] text-outline uppercase tracking-widest">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-headline transition-all px-0 py-2 appearance-none outline-none cursor-pointer"
              >
                <option value="Mainnet" className="bg-surface-container">Mainnet</option>
                <option value="Staging" className="bg-surface-container">Staging</option>
                <option value="Beta" className="bg-surface-container">Beta</option>
                <option value="Development" className="bg-surface-container">Development</option>
                <option value="Testnet" className="bg-surface-container">Testnet</option>
              </select>
            </div>
            
            <div className="space-y-1.5">
              <label className="font-label text-[10px] text-outline uppercase tracking-widest">Version</label>
              <input 
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-label text-sm transition-all px-0 py-2 outline-none" 
                placeholder="v1.0.0" 
                type="text"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest">Project Details</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 text-white font-headline text-sm rounded-lg p-3 mt-2 outline-none" 
              placeholder="Describe the project scope and security measures..." 
              rows="4"
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest">Project Hero Image URL</label>
            <div className="flex gap-2 items-center">
              <input 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 text-white font-label text-xs transition-all px-0 py-2 outline-none" 
                placeholder="https://..." 
                type="url"
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-on-primary py-3 font-label text-xs uppercase tracking-widest font-bold hover:bg-primary-fixed-dim transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'PROCESSING...' : selectedProject ? 'DEPLOY CHANGES' : 'CREATE PROTOCOL'}
            </button>
            <button 
              type="button" 
              onClick={handleCancelClick}
              className="w-full bg-surface-variant/20 text-outline border border-outline-variant/30 py-3 font-label text-xs uppercase tracking-widest hover:text-white transition-all cursor-pointer"
            >
              Cancel Operation
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
