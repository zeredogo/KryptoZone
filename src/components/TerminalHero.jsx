import React, { useState, useEffect } from 'react'

export default function TerminalHero() {
  const bootLogs = [
    '> INITIALIZING KRYPTOZONE_OS...',
    '> KERNEL_LOAD: [####################] 100%',
    '> FETCHING ARCHITECTURAL_MODULES... DONE',
    '> SYSTEM READY. WELCOME TO THE NEXUS.'
  ]

  const [visibleLogs, setVisibleLogs] = useState([])
  const [logIndex, setLogIndex] = useState(0)

  useEffect(() => {
    if (logIndex < bootLogs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs(prev => [...prev, bootLogs[logIndex]])
        setLogIndex(prev => prev + 1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [logIndex])

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-low p-8 rounded-xl ghost-border relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0"></div>
      <div className="font-label text-sm text-primary/60 mb-6 flex justify-between items-center">
        <span>SYSTEM_STATUS: OK</span>
        <span>SESSION_ID: KRYP-882-OS</span>
      </div>
      
      {/* Animated Terminal Logs */}
      <div className="space-y-3 font-label text-primary terminal-glow min-h-[120px]">
        {visibleLogs.map((log, i) => (
          <p 
            key={i} 
            className={`transition-opacity duration-500 ${
              i === 0 ? 'opacity-100' : i === 1 ? 'opacity-90' : i === 2 ? 'opacity-70' : 'opacity-50'
            }`}
          >
            {log}
          </p>
        ))}
        {logIndex < bootLogs.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1"></span>
        )}
      </div>

      <div className="mt-12 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-tight mb-6">
          The Next <span className="text-primary italic">Evolution</span> <br />of Architecture.
        </h1>
        <p className="max-w-xl text-on-surface-variant text-lg">
          Bridging the speed of Web2 and the trustless security of Web3. We build seamless data pipelines for decentralized networks.
        </p>
      </div>

      {/* Decorative SVG/Icon */}
      <div className="absolute bottom-[-20px] right-[-20px] opacity-10 pointer-events-none select-none">
        <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          terminal
        </span>
      </div>
    </div>
  )
}
