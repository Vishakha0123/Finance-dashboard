import { BALANCE_TREND } from '../data/financeData'
import BalanceChart from '../components/BalanceChart'

export default function LandingPage({ onStart }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-indigo-500/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-indigo-300">
              Finance dashboard
            </span>
            <h1 className="max-w-2xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Modern finance insights for every month.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-400">
              Track your income, expenses and category trends from one beautiful dashboard. Skip the clutter and focus on fast decisions.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={onStart} className="rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:opacity-90">
                Open dashboard
              </button>
              <button onClick={onStart} className="rounded-3xl border border-slate-700 bg-slate-900/80 px-8 py-4 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
                View live demo
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="text-sm font-semibold text-white">Live balance view</div>
                <p className="mt-3 text-sm leading-6 text-slate-400">See income and expense patterns in one glance.</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
                <div className="text-sm font-semibold text-white">Smart category breakdown</div>
                <p className="mt-3 text-sm leading-6 text-slate-400">Understand where your money goes by category.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/30">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Balance trend</div>
                <div className="text-sm text-slate-400">Preview from Oct to Apr</div>
              </div>
              <div className="rounded-full bg-slate-800 px-3 py-2 text-[11px] uppercase tracking-[0.3em] text-slate-400">
                Live
              </div>
            </div>
            <BalanceChart data={BALANCE_TREND} />
          </div>
        </div>
      </div>
    </div>
  )
}
