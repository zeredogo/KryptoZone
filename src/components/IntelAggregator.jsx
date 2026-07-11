import React, { useState, useEffect } from 'react'

// Intel APIs

export default function IntelAggregator() {
  const [chainFeeds, setChainFeeds] = useState([])
  const [neuralFeeds, setNeuralFeeds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    let isMounted = true

    const fetchFeeds = async () => {
      setLoading(true)
      setError(false)

      try {
        // ── Chain Intel: Hacker News Algolia (Crypto keyword) ──
        const ccRes = await fetch('https://hn.algolia.com/api/v1/search?query=crypto&tags=story', {
          cache: 'no-store'
        })
        const ccData = await ccRes.json()

        const ccNews = (ccData.hits || []).slice(0, 3).map((item, i) => ({
          id: `chain-${i}`,
          category: 'CRYPTO',
          title: item.title || 'Untitled',
          content: `↑ ${item.points} points · ${item.num_comments} comments · by ${item.author}`,
          url: item.url || `https://news.ycombinator.com/item?id=${item.objectID}`
        }))

        // ── Neural Intel: Hacker News (direct Firebase API, no CORS issues) ──
        const hnIdsRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json', {
          cache: 'no-store'
        })
        const hnIds = await hnIdsRes.json()
        const top3 = hnIds.slice(0, 3)

        const hnItems = await Promise.all(
          top3.map(id =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
          )
        )

        const hnNews = hnItems.map((item, i) => ({
          id: `neural-${i}`,
          category: 'TECH',
          title: item.title || 'Untitled',
          content: `↑ ${item.score} points · ${item.descendants ?? 0} comments · by ${item.by}`,
          url: item.url || `https://news.ycombinator.com/item?id=${item.id}`
        }))

        if (isMounted) {
          setChainFeeds(ccNews)
          setNeuralFeeds(hnNews)
          setLoading(false)
        }
      } catch (err) {
        console.error('IntelAggregator fetch error:', err)
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    fetchFeeds()
    return () => { isMounted = false }
  }, [])

  if (loading) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        {[0, 1].map(col => (
          <div key={col} className="space-y-6">
            <div className="h-6 w-32 bg-surface-variant rounded"></div>
            {[0, 1, 2].map(i => (
              <div key={i} className="h-24 bg-surface-variant rounded"></div>
            ))}
          </div>
        ))}
      </section>
    )
  }

  if (error) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <p className="col-span-2 font-label text-xs text-error italic">
          Failed to load live intel feeds. Check your connection and refresh.
        </p>
      </section>
    )
  }

  const FeedCard = ({ feed, accentClass }) => (
    <a
      href={feed.url}
      target="_blank"
      rel="noopener noreferrer"
      key={feed.id}
      className="block p-4 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 rounded-lg ghost-border group"
    >
      <span className={`font-label text-[10px] ${accentClass} mb-2 block tracking-widest uppercase`}>
        {feed.category}
      </span>
      <h4 className="font-bold text-sm text-white mb-2 group-hover:text-primary transition-colors">
        {feed.title}
      </h4>
      <p className="text-xs text-on-surface-variant leading-relaxed">{feed.content}</p>
    </a>
  )

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Chain Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            security
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight text-white">Chain Intel</h3>
        </div>
        <div className="space-y-4">
          {chainFeeds.length === 0
            ? <p className="font-label text-xs text-outline italic">No intel available right now.</p>
            : chainFeeds.map(feed => <FeedCard key={feed.id} feed={feed} accentClass="text-primary" />)
          }
        </div>
      </div>

      {/* Neural Intel Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
            psychology
          </span>
          <h3 className="text-xl font-bold font-headline uppercase tracking-tight text-white">Neural Intel</h3>
        </div>
        <div className="space-y-4">
          {neuralFeeds.length === 0
            ? <p className="font-label text-xs text-outline italic">No intel available right now.</p>
            : neuralFeeds.map(feed => <FeedCard key={feed.id} feed={feed} accentClass="text-tertiary" />)
          }
        </div>
      </div>
    </section>
  )
}
