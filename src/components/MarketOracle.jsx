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
          <h3 className="text-2xl font-black font-headline text-white">Market Oracle</h3>
          <p className="font-label text-xs text-outline tracking-wider">REAL-TIME TELEMETRY // TOP 5 ASSETS</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-surface-variant/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          <span className="font-label text-[10px] text-on-surface-variant">STREAMING LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-end h-auto md:h-64 mt-16 md:mt-0">
        {oracleData.map((asset) => {
          const isPositive = asset.change_pct >= 0
          return (
            <div key={asset.symbol} className="flex flex-col gap-4 group cursor-pointer">
              <div className="flex-1 flex flex-col justify-end h-32 md:h-full relative">
                <div 
                  className="bg-primary/20 hover:bg-primary/40 transition-all duration-300 rounded-t-lg relative w-full" 
                  style={{ height: `${asset.height_pct}%`, minHeight: '30px' }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-label text-xs text-primary whitespace-nowrap font-bold">
                    {formatPrice(asset.price)}
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <p className="font-bold text-sm text-white">{asset.symbol}</p>
                <p className={`font-label text-[10px] ${isPositive ? 'text-primary' : 'text-error'}`}>
                  {isPositive ? '+' : ''}{asset.change_pct}%
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
