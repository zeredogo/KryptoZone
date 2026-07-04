import React, { useState, useEffect, useRef } from 'react'

export default function ProjectForm({ selectedProject, onSubmit, onCancel }) {
  const [title, setTitle] = useState('')
  const [techStack, setTechStack] = useState('')
  const [status, setStatus] = useState('Mainnet')
  const [version, setVersion] = useState('v1.0.0')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  // Populates form when editing
  useEffect(() => {
    if (selectedProject) {
      setTitle(selectedProject.title || '')
      setStatus(selectedProject.status || 'Mainnet')
      setVersion(selectedProject.version || 'v1.0.0')
      setDescription(selectedProject.description || '')
      const url = selectedProject.image_url || ''
      setImageUrl(url)
      setImagePreview(url)

      // Parse specs JSON array back to comma-separated string
      let specs = selectedProject.specs
      if (typeof specs === 'string') {
        try { specs = JSON.parse(specs) } catch (e) { specs = [] }
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
    setImagePreview('')
    setErrorMsg('')
  }

  // Convert a File to a base64 data URL
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (PNG, JPG, WEBP, etc.)')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Image must be under 2MB.')
      return
    }
    setErrorMsg('')
    const dataUrl = await fileToDataUrl(file)
    setImageUrl(dataUrl)
    setImagePreview(dataUrl)
  }

  const handleFileInput = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
  }

  const handleUrlChange = (e) => {
    const val = e.target.value
    setImageUrl(val)
    setImagePreview(val)
  }

  const clearImage = () => {
    setImageUrl('')
    setImagePreview('')
    if (fileInputRef.current) fileInputRef.current.value = ''
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

    const count = stackItems.length
    const pctSplit = count > 0 ? Math.floor(100 / count) : 0
    const specs = stackItems.map((lang, index) => {
      const pct = (index === count - 1) ? (100 - (pctSplit * (count - 1))) : pctSplit
      return { lang: lang.toUpperCase(), pct }
    })

    const payload = {
      title,
      status,
      version,
      description,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop',
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

          {/* Project Name */}
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

          {/* Tech Stack */}
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

          {/* Status + Version */}
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

          {/* Description */}
          <div className="space-y-1.5">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest">Project Details</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-0 text-white font-headline text-sm rounded-lg p-3 mt-2 outline-none"
              placeholder="Describe the project scope and security measures..."
              rows="3"
            ></textarea>
          </div>

          {/* ── IMAGE UPLOAD SECTION ── */}
          <div className="space-y-2">
            <label className="font-label text-[10px] text-outline uppercase tracking-widest flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">image</span>
              Project Cover Image
            </label>

            {/* Preview area / Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !imagePreview && fileInputRef.current?.click()}
              className={`relative w-full h-40 rounded-lg border-2 border-dashed overflow-hidden transition-all duration-200 cursor-pointer
                ${dragOver
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : imagePreview
                    ? 'border-primary/30'
                    : 'border-outline-variant hover:border-primary/50 hover:bg-primary/5'
                }`}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setImagePreview('')}
                  />
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary text-xs font-label rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">upload</span>
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); clearImage() }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-error text-white text-xs font-label rounded cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                      Remove
                    </button>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-outline">
                  <span className="material-symbols-outlined text-4xl text-outline/50">cloud_upload</span>
                  <p className="font-label text-[10px] uppercase tracking-widest">
                    {dragOver ? 'Drop to upload' : 'Click or drag image here'}
                  </p>
                  <p className="font-label text-[9px] text-outline/50">PNG, JPG, WEBP · Max 2MB</p>
                </div>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />

            {/* URL fallback input */}
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-outline/60">link</span>
              <input
                value={imageUrl.startsWith('data:') ? '' : imageUrl}
                onChange={handleUrlChange}
                className="flex-1 bg-transparent border-0 border-b border-outline-variant/50 focus:border-primary focus:ring-0 text-outline font-label text-[10px] transition-all px-0 py-1.5 outline-none placeholder:text-outline/40"
                placeholder="Or paste an image URL directly..."
                type="text"
              />
              {imageUrl && !imageUrl.startsWith('data:') && (
                <button
                  type="button"
                  onClick={clearImage}
                  className="material-symbols-outlined text-sm text-outline/60 hover:text-error transition-colors cursor-pointer"
                >
                  close
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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
