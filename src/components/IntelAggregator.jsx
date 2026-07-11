import React, { useState, useEffect } from 'react'

export default function IntelAggregator() {
  const [chainFeeds, setChainFeeds] = useState([])
  const [neuralFeeds, setNeuralFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const fetchFeeds = async () => {
      try {
        setLoading(true)
        
        // Fetch Chain Intel (Crypto News) from CryptoCompare
        const ccRes = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
        const ccData = await ccRes.json()
        const ccNews = (ccData.Data || []).slice(0, 3).map((item, index) => ({
          id: `chain-${index}`,
          category: item.categories.split('|')[0] || 'CRYPTO',
          title: item.title,
          content: item.body.substring(0, 150) + '...',
          url: item.url
        }))

        // Fetch Neural Intel (Tech/AI News) from HackerNews
        const hnRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
        const hnIds = await hnRes.json()
        const topHnIds = hnIds.slice(0, 3)
        const hnNewsPromises = topHnIds.map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
        )
        const hnNewsData = await Promise.all(hnNewsPromises)
        const hnNews = hnNewsData.map((item, index) => ({
          id: `neural-${index}`,
          category: 'TECH',
          title: item.title,
          content: `Live intel from Hacker News network. Score: ${item.score}, by ${item.by}.`,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`
        }))

        if (isMounted) {
          setChainFeeds(ccNews)
          setNeuralFeeds(hnNews)
          setLoading(false)
        }
      } catch (error) {
        console.error("Failed to fetch live intel feeds:", error)
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchFeeds()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="space-y-6">
          <div className="h-6 w-32 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
        </div>
        <div className="space-y-6">
          <div className="h-6 w-32 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
          <div className="h-24 bg-surface-variant rounded"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Chain Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight dark:text-white text-neutral-900">Chain Intel</h3>
        </div>
        
        <div className="space-y-4">
          {chainFeeds.length === 0 ? (
            <p className="font-label text-xs text-outline italic">No Chain Intel logs recorded.</p>
          ) : (
            chainFeeds.map((feed) => (
              <a 
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                key={feed.id} 
                className="block p-4 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 rounded-lg ghost-border"
              >
                <span className="font-label text-[10px] text-primary mb-2 block tracking-widest uppercase">
                  {feed.category}
                </span>
                <h4 className="font-bold text-md dark:text-white text-neutral-900 mb-2">{feed.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feed.content}</p>
              </a>
            ))
          )}
        </div>
      </div>

      {/* Neural Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight dark:text-white text-neutral-900">Neural Intel</h3>
        </div>
        
        <div className="space-y-4">
          {neuralFeeds.length === 0 ? (
            <p className="font-label text-xs text-outline italic">No Neural Intel logs recorded.</p>
          ) : (
            neuralFeeds.map((feed) => (
              <a 
                href={feed.url}
                target="_blank"
                rel="noopener noreferrer"
                key={feed.id} 
                className="block p-4 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 rounded-lg ghost-border"
              >
                <span className="font-label text-[10px] text-tertiary mb-2 block tracking-widest uppercase">
                  {feed.category}
                </span>
                <h4 className="font-bold text-md dark:text-white text-neutral-900 mb-2">{feed.title}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feed.content}</p>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
