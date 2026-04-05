import { useState } from 'react'

const DonutChart = ({ data }) => {
  const [hovered, setHovered] = useState(null)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (!total) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-center text-slate-400">
        No expense data available.
      </div>
    )
  }

  const R = 42
  const cx = 55
  const cy = 55
  const stroke = 18
  let cum = -Math.PI / 2
  const arcs = data.map((item) => {
    const frac = item.value / total
    const start = cum
    cum += frac * 2 * Math.PI
    const end = cum
    const x1 = cx + R * Math.cos(start)
    const y1 = cy + R * Math.sin(start)
    const x2 = cx + R * Math.cos(end)
    const y2 = cy + R * Math.sin(end)
    return {
      ...item,
      path: `M${x1},${y1} A${R},${R} 0 ${frac > 0.5 ? 1 : 0},1 ${x2},${y2}`,
      frac,
    }
  })

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <svg width={110} height={110} viewBox="0 0 110 110" className="shrink-0">
        {arcs.map((arc, i) => (
          <path
            key={arc.name}
            d={arc.path}
            fill="none"
            stroke={arc.color}
            strokeWidth={hovered === i ? stroke + 3 : stroke}
            strokeLinecap="butt"
            className={`transition-all duration-150 ${hovered != null && hovered !== i ? 'opacity-40' : ''}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        <text x={cx} y={cy - 7} textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace">
          {hovered != null ? arcs[hovered].name : 'Total'}
        </text>
        <text x={cx} y={cy + 7} textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" fontWeight="700">
          {hovered != null ? `${Math.round(arcs[hovered].frac * 100)}%` : '100%'}
        </text>
      </svg>
      <div className="grid gap-3">
        {data.slice(0, 5).map((item, index) => (
          <button
            type="button"
            key={item.name}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2 text-left transition-opacity duration-150"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-3.5 w-3.5 rounded-full" style={{ background: item.color }} />
              <span className="text-sm text-slate-200">{item.name}</span>
            </div>
            <span className="text-xs text-slate-400">{Math.round(item.frac * 100)}%</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DonutChart
