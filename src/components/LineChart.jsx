import { useRef, useState } from 'react'

const LineChart = ({ data }) => {
  const [tooltip, setTooltip] = useState(null)
  const svgRef = useRef(null)
  const W = 320
  const H = 160
  const pad = { t: 24, b: 24, l: 24, r: 24 }
  const values = data.map((d) => d.balance)
  const min = Math.min(...values) * 0.95
  const max = Math.max(...values) * 1.02
  const xStep = (W - pad.l - pad.r) / (data.length - 1)
  const points = data.map((d, i) => ({
    x: pad.l + i * xStep,
    y: pad.t + (1 - (d.balance - min) / (max - pad.t - pad.b)) * (H - pad.t - pad.b),
    ...d,
  }))

  const line = points.map((p, index) => `${index === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${points[points.length - 1].x},${H - pad.b} L${points[0].x},${H - pad.b} Z`

  return (
    <div className="relative w-full rounded-[2rem] bg-slate-950/60 px-3 py-4">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-44 overflow-visible">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={t}
            x1={pad.l}
            x2={W - pad.r}
            y1={pad.t + t * (H - pad.t - pad.b)}
            y2={pad.t + t * (H - pad.t - pad.b)}
            stroke="rgba(148,163,184,0.16)"
            strokeDasharray="4 5"
          />
        ))}
        <path d={area} fill="url(#areaGrad)" />
        <path d={line} fill="none" stroke="#c4b5fd" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#0f172a"
            stroke="#c4b5fd"
            strokeWidth="2"
            className="cursor-pointer transition-all duration-150 hover:r-5 hover:stroke-[3]"
            onMouseEnter={() => {
              if (!svgRef.current) return
              const rect = svgRef.current.getBoundingClientRect()
              setTooltip({
                x: (point.x / W) * rect.width + 8,
                y: (point.y / H) * rect.height - 14,
                label: point.month,
                value: point.balance,
              })
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </svg>
      <div className="mt-4 grid grid-cols-7 gap-1 text-[10px] text-slate-400 font-mono">
        {points.map((point) => (
          <span key={point.month} className="text-center">
            {point.month}
          </span>
        ))}
      </div>
      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 rounded-2xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-slate-400">{tooltip.label} '24</div>
          <div className="text-indigo-300 font-semibold">₹{tooltip.value.toLocaleString('en-IN')}</div>
        </div>
      ) : null}
    </div>
  )
}

export default LineChart
