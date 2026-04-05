import { useMemo, useState } from 'react'
import { fmt } from '../utils/formatters'

export default function BalanceChart({ data }) {
  const [active, setActive] = useState(null)
  const maxBalance = useMemo(() => Math.max(...data.map((item) => item.balance)), [data])

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/75 p-5 shadow-xl shadow-slate-950/20">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">Balance trend</div>
          <div className="text-xs text-slate-500">October 2023 – April 2024</div>
        </div>
        <div className="rounded-full bg-slate-900 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-400">Preview</div>
      </div>

      <div className="grid gap-4">
        <div className="grid h-44 gap-4 rounded-[1.5rem] border border-slate-800 bg-slate-950 p-4">
          <div className="flex items-end gap-3 h-full">
            {data.map((item, index) => {
              const height = Math.max(18, (item.balance / maxBalance) * 100)
              return (
                <button
                  key={item.month}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  className="relative flex-1 self-end rounded-full bg-gradient-to-b from-indigo-400 to-violet-500 transition hover:opacity-90"
                  style={{ height: `${height}%` }}
                >
                  {active === index ? (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-2xl bg-slate-950/95 px-3 py-1 text-[10px] text-slate-100 shadow-lg shadow-slate-950/30">
                      {fmt(item.balance)}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-[10px] text-slate-400 font-mono">
          {data.map((item) => (
            <span key={item.month} className="text-center">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
