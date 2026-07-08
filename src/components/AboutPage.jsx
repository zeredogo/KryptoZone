import React from 'react'

export default function AboutPage() {
  const skills = [
    { name: 'Blockchain Architecture', pct: 95 },
    { name: 'Solidity & Smart Contracts', pct: 90 },
    { name: 'React & Frontend Architecture', pct: 88 },
    { name: 'Database & Supabase Systems', pct: 85 },
    { name: 'Business & Project Management', pct: 80 }
  ]

  const experiences = [
    {
      year: 'Present',
      role: 'Core Architect',
      organization: 'KryptoZone Protocol v2.0',
      description: 'Designing and deploying web3 portfolio platforms, integrating Supabase with secure Postgres schemas, RLS policies, and interactive telemetry nodes.'
    },
    {
      year: 'Former',
      role: 'Blockchain Technology Instructor',
      organization: 'Academic & Training Programs',
      description: 'Instructed students and professionals on blockchain theoretical mechanics, cryptography foundations, consensus protocol design, and decentralized database integrity.'
    },
    {
      year: 'Academic',
      role: 'B.Sc. Business Management Graduate',
      organization: 'University Studies',
      description: 'Analyzed organization architectures, project development lifecycles, and operational risk mitigation — applying business logic to protocol engineering.'
    }
  ]

  return (
    <main className="pt-24 pb-20 px-8 max-w-screen-2xl w-full mx-auto space-y-12">
      {/* Page Header */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-4xl font-black font-headline text-white">System Profile</h1>
        <p className="font-label text-xs text-primary uppercase tracking-widest mt-1">
          Identity Verification // Core Architect Info
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Avatar Card */}
        <div className="lg:col-span-4 bg-surface-container p-6 rounded-xl ghost-border flex flex-col items-center text-center space-y-6">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-primary/20 group">
            <img 
              src="/paul_sunday_dogo.jpg" 
              alt="Paul Sunday Dogo" 
              className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent"></div>
          </div>
          
          <div>
            <h2 className="text-2xl font-black font-headline text-white">Paul Sunday Dogo</h2>
            <p className="font-label text-xs text-primary uppercase tracking-widest mt-1">Core Architect</p>
          </div>

          <div className="w-full pt-6 border-t border-white/5 text-left space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline uppercase font-label">Status</span>
              <span className="text-primary font-label flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                ACTIVE_NODE
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline uppercase font-label">Location</span>
              <span className="text-white font-label">Node-US-East</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-outline uppercase font-label">Degree</span>
              <span className="text-white font-label">B.Sc. Biz Mgmt</span>
            </div>
          </div>
        </div>

        {/* Right Side: Professional details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Biography */}
          <div className="bg-surface-container-low p-8 rounded-xl ghost-border space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm font-bold">terminal</span>
              <h3 className="font-label text-xs text-primary uppercase tracking-wider font-bold">Mission Statement</h3>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              As an elite protocol designer and developer, I specialize in bridging high-level business objectives with raw technical execution. Transitioning from academic instruction to core software design has equipped me with the unique capability to verify, explain, and construct secure distributed systems.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              My philosophy centers around absolute transparency, complete database verification through Row Level Security, and rich, user-centric layout presentation.
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="bg-surface-container-low p-8 rounded-xl ghost-border space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm font-bold">timeline</span>
              <h3 className="font-label text-xs text-primary uppercase tracking-wider font-bold">Operational History</h3>
            </div>
            
            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
              {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 group">
                  {/* Timeline Node */}
                  <span className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-neutral-900 border-2 border-primary group-hover:scale-125 transition-transform duration-300"></span>
                  
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h4>
                      <span className="font-label text-[10px] text-primary/80 uppercase bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full w-max mt-1 sm:mt-0">
                        {exp.year}
                      </span>
                    </div>
                    <p className="font-label text-xs text-outline tracking-wide">{exp.organization}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed pt-1">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="bg-surface-container-low p-8 rounded-xl ghost-border space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm font-bold">bar_chart</span>
              <h3 className="font-label text-xs text-primary uppercase tracking-wider font-bold">Capability Spectrum</h3>
            </div>

            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-label">
                    <span className="text-white">{skill.name}</span>
                    <span className="text-primary font-bold">{skill.pct}%</span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-gradient-to-r from-primary to-indigo-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
