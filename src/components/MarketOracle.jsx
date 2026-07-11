import React from 'react'

export default function MarketOracle({ oracleData, loading }) {
  if (loading) {
    return (
      <section className="bg-surface-container-low p-8 rounded-xl ghost-border animate-pulse">
        <div className="h-6 w-48 bg-surface-variant rounded mb-10"></div>
        <div className="grid grid-cols-5 gap-8 h-64 items-end">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex flex-col gap-4 h-full justify-end">
              <div className="bg-surface-variant w-full rounded-t-lg" style={{ height: `${20 + i * 15}%` }}></div>
              <div className="h-4 bg-surface-variant rounded w-12 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  // Format currency
  const formatPrice = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: val < 10 ? 2 : 0
    }).format(val)
  }

  return (
    <section className="bg-surface-container-low p-8 rounded-xl ghost-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h3 className="text-2xl font-black font-headline dark:text-white text-neutral-900">Market Oracle</h3>
          <p className="font-label text-xs text-outline tracking-wider">REAL-TIME TELEMETRY // TOP 5 ASSETS</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          <span className="font-label text-[10px] text-on-surface-variant">STREAMING LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center h-auto mt-16 md:mt-0">
        {oracleData.map((asset) => {
          const isPositive = asset.change_pct >= 0
          // Mapping symbols to coin names for the logo URL
          const getLogoUrl = (symbol) => {
            const map = {
              'BTC': 'bitcoin-btc',
              'ETH': 'ethereum-eth',
              'SOL': 'solana-sol',
              'BNB': 'bnb-bnb',
              'XRP': 'xrp-xrp'
            }
            const mapped = map[symbol.toUpperCase()] || `${symbol.toLowerCase()}-${symbol.toLowerCase()}`
            return `https://cryptologos.cc/logos/${mapped}-logo.png`
          }

          return (
            <div key={asset.symbol} className="flex flex-col items-center gap-4 group cursor-pointer p-4 bg-surface-variant/10 rounded-xl hover:bg-surface-variant/30 transition-colors border border-white/5 hover:border-primary/20">
              <div className="w-16 h-16 relative">
                <img 
                  src={getLogoUrl(asset.symbol)} 
                  alt={asset.symbol}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://cryptologos.cc/logos/tether-usdt-logo.png" // fallback
                  }}
                />
              </div>
              
              <div className="text-center space-y-1">
                <p className="font-bold text-lg dark:text-white text-neutral-900">{asset.symbol}</p>
                <div className="font-label text-xs text-outline">{formatPrice(asset.price)}</div>
                <div className={`font-label text-[10px] inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/40 ${isPositive ? 'text-primary' : 'text-error'}`}>
                  <span className="material-symbols-outlined text-[10px]">
                    {isPositive ? 'trending_up' : 'trending_down'}
                  </span>
                  {isPositive ? '+' : ''}{asset.change_pct}%
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
