import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-neutral-950 w-full py-12 px-8 border-t border-white/5 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-neutral-500 font-label text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} KryptoZone v2.0. System Status: 
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/5 rounded border border-primary/10">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
            <span className="font-label text-[9px] text-primary tracking-wider font-bold">OPERATIONAL</span>
          </div>
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-neutral-600 hover:text-indigo-400 transition-colors font-label text-xs uppercase tracking-widest">
            Twitter
          </a>
          <a href="#" className="text-neutral-600 hover:text-indigo-400 transition-colors font-label text-xs uppercase tracking-widest">
            GitHub
          </a>
          <a href="#" className="text-neutral-600 hover:text-indigo-400 transition-colors font-label text-xs uppercase tracking-widest">
            Discord
          </a>
          <a href="#" className="text-neutral-600 hover:text-indigo-400 transition-colors font-label text-xs uppercase tracking-widest">
            Docs
          </a>
        </div>
      </div>
    </footer>
  )
}
