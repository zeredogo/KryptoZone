import React from 'react'

export default function ContactSection() {
  return (
    <section className="py-16 px-8 max-w-screen-2xl mx-auto w-full border-t border-white/5">
      <div className="bg-surface-container rounded-xl p-10 flex flex-col items-center justify-center text-center ghost-border relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-primary/5 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-lg space-y-6">
          <div className="space-y-2">
            <h3 className="text-3xl font-black font-headline text-white">Let's Connect</h3>
            <p className="text-on-surface-variant text-sm">
              Have a project in mind or want to collaborate on the next big web3 protocol? My inbox is always open.
            </p>
          </div>
          
          <a
            href="mailto:zeredogo@gmail.com"
            className="inline-flex items-center gap-3 bg-primary hover:brightness-110 text-on-primary px-8 py-3 rounded font-label text-xs uppercase tracking-widest font-bold transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            Message Me
          </a>
        </div>
      </div>
    </section>
  )
}
