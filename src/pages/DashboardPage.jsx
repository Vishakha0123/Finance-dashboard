import { useMemo } from 'react'
import { fmt, fmtSign, fmtDate } from '../utils/formatters'
import BalanceChart from '../components/BalanceChart'
import DonutChart from '../components/DonutChart'
import TxModal from '../components/TxModal'
import Sidebar from '../components/Sidebar'
import { CATEGORY_ICONS, CATEGORY_COLORS, CATEGORIES, BALANCE_TREND } from '../data/financeData'

export default function DashboardPage({
  transactions,
  setTransactions,
  view,
  setView,
  role,
  setRole,
  search,
  setSearch,
  filterCat,
  setFilterCat,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  sortDir,
  setSortDir,
  modal,
  setModal,
  onBack,
}) {
  const income = useMemo(() => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0), [transactions])
  const expense = useMemo(() => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0), [transactions])
  const balance = income - expense
  const aprIncome = useMemo(() => transactions.filter((t) => t.type === 'income' && t.date.startsWith('2024-04')).reduce((sum, t) => sum + t.amount, 0), [transactions])
  const aprExpense = useMemo(() => transactions.filter((t) => t.type === 'expense' && t.date.startsWith('2024-04')).reduce((sum, t) => sum + t.amount, 0), [transactions])
  const marExpense = useMemo(() => transactions.filter((t) => t.type === 'expense' && t.date.startsWith('2024-03')).reduce((sum, t) => sum + t.amount, 0), [transactions])
  const febExpense = useMemo(() => transactions.filter((t) => t.type === 'expense' && t.date.startsWith('2024-02')).reduce((sum, t) => sum + t.amount, 0), [transactions])

  const categorySpend = useMemo(() => {
    const map = {}
    transactions.filter((t) => t.type === 'expense').forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount
    })
    return Object.entries(map)
      .sort(([, a], [, b]) => b - a)
      .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] }))
  }, [transactions])

  const topCategory = categorySpend[0]

  const filteredTx = useMemo(() => {
    let list = [...transactions]
    if (search) list = list.filter((t) => t.desc.toLowerCase().includes(search.toLowerCase()))
    if (filterCat !== 'All') list = list.filter((t) => t.category === filterCat)
    if (filterType !== 'All') list = list.filter((t) => t.type === filterType)
    list.sort((a, b) => {
      const av = sortBy === 'date' ? new Date(a.date) : a.amount
      const bv = sortBy === 'date' ? new Date(b.date) : b.amount
      return sortDir === 'desc' ? bv - av : av - bv
    })
    return list
  }, [transactions, search, filterCat, filterType, sortBy, sortDir])

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir((dir) => (dir === 'desc' ? 'asc' : 'desc'))
    else {
      setSortBy(field)
      setSortDir('desc')
    }
  }

  const maxME = Math.max(aprExpense, marExpense, febExpense, 1)

  const titles = {
    dashboard: 'Dashboard Overview',
    transactions: 'Transactions',
    insights: 'Insights',
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <Sidebar view={view} setView={setView} role={role} setRole={setRole} />

      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/95 px-6 py-5 backdrop-blur-md">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">{titles[view]}</h1>
              <p className="text-sm text-slate-400">April 2024 · FY 2024–25</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={onBack} className="rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs text-slate-300 transition hover:border-indigo-500 hover:text-indigo-200">
                Back to landing
              </button>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-sm shadow-emerald-500/10">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Live
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6 lg:px-8">
          {view === 'dashboard' && (
            <>
              <div className="grid gap-5 xl:grid-cols-3">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Net Balance</div>
                    <div className="text-2xl">◈</div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-white">{fmt(balance)}</div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-300">
                    <span>↑ 13.5%</span>
                    <span className="text-slate-500">vs last month</span>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Income</div>
                    <div className="text-2xl">↑</div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-emerald-300">{fmt(aprIncome)}</div>
                  <div className="mt-4 text-sm text-slate-500">Apr 2024</div>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Total Expenses</div>
                    <div className="text-2xl">↓</div>
                  </div>
                  <div className="mt-5 text-3xl font-semibold text-rose-400">{fmt(aprExpense)}</div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-rose-300">
                    <span>↑ 18.2%</span>
                    <span className="text-slate-500">vs last month</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <BalanceChart data={BALANCE_TREND} />
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">Spending Breakdown</div>
                      <div className="text-xs text-slate-500">By category</div>
                    </div>
                  </div>
                  <DonutChart data={categorySpend} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">Recent Transactions</div>
                  </div>
                  <button type="button" className="text-sm font-semibold text-indigo-300 hover:text-indigo-200" onClick={() => setView('transactions')}>
                    View all →
                  </button>
                </div>
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
                  <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead className="bg-slate-950/60 text-slate-500">
                      <tr>
                        <th className="px-4 py-4">Description</th>
                        <th className="px-4 py-4">Category</th>
                        <th className="px-4 py-4">Date</th>
                        <th className="px-4 py-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 5).map((t) => (
                        <tr key={t.id} className="border-t border-slate-800/70 hover:bg-slate-900/80">
                          <td className="px-4 py-4 font-medium text-slate-100">{t.desc}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-3 py-1 text-xs text-slate-300">
                              <span>{CATEGORY_ICONS[t.category]}</span>
                              {t.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500">{fmtDate(t.date)}</td>
                          <td className="px-4 py-4 font-semibold text-slate-100">
                            <span className={t.type === 'income' ? 'text-emerald-300' : 'text-rose-300'}>{fmtSign(t.amount, t.type)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {view === 'transactions' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">All Transactions</div>
                  <div className="text-xs text-slate-500">{filteredTx.length} records</div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <label className="relative flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-400">
                    🔍
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-40 bg-transparent outline-none placeholder:text-slate-500"
                    />
                  </label>
                  <select className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 outline-none" value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
                    <option>All</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                  <select className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 outline-none" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option>All</option>
                    <option>income</option>
                    <option>expense</option>
                  </select>
                  <button type="button" className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-500 hover:text-indigo-200" onClick={() => toggleSort('date')}>
                    Date {sortBy === 'date' ? (sortDir === 'desc' ? '↓' : '↑') : '↕'}
                  </button>
                  <button type="button" className="rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 text-sm text-slate-200 transition hover:border-indigo-500 hover:text-indigo-200" onClick={() => toggleSort('amount')}>
                    Amount {sortBy === 'amount' ? (sortDir === 'desc' ? '↓' : '↑') : '↕'}
                  </button>
                  {role === 'admin' && (
                    <button type="button" className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90" onClick={() => setModal({ tx: null })}>
                      + Add
                    </button>
                  )}
                </div>
              </div>

              {filteredTx.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-16 text-center text-slate-500">
                  <div className="mb-3 text-4xl">📭</div>
                  <p>No transactions match your filters.</p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
                  <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
                    <thead className="bg-slate-950/60 text-slate-500">
                      <tr>
                        <th className="px-4 py-4">Description</th>
                        <th className="px-4 py-4">Category</th>
                        <th className="px-4 py-4">Type</th>
                        <th className="px-4 py-4">Date</th>
                        <th className="px-4 py-4">Amount</th>
                        {role === 'admin' && <th className="px-4 py-4">Actions</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTx.map((t) => (
                        <tr key={t.id} className="border-t border-slate-800/70 hover:bg-slate-900/80">
                          <td className="px-4 py-4 font-medium text-slate-100">{t.desc}</td>
                          <td className="px-4 py-4">
                            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950/90 px-3 py-1 text-xs text-slate-300">
                              <span>{CATEGORY_ICONS[t.category]}</span>
                              {t.category}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300'}`}>
                              {t.type}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-xs text-slate-500">{fmtDate(t.date)}</td>
                          <td className="px-4 py-4 font-semibold text-slate-100">{fmtSign(t.amount, t.type)}</td>
                          {role === 'admin' && (
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-indigo-500 hover:text-indigo-200" onClick={() => setModal({ tx: t })}>
                                  Edit
                                </button>
                                <button type="button" className="rounded-2xl border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-rose-500 hover:text-rose-300" onClick={() => setTransactions((ts) => ts.filter((x) => x.id !== t.id))}>
                                  Del
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {view === 'insights' && (
            <>
              <div className="grid gap-5 xl:grid-cols-3">
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="text-sm font-semibold text-white">🔥 Top Spend Category</div>
                  {topCategory ? (
                    <>
                      <div className="mt-4 text-2xl font-semibold" style={{ color: topCategory.color }}>
                        {CATEGORY_ICONS[topCategory.name]} {topCategory.name}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-400">
                        {fmt(topCategory.value)} spent — {Math.round((topCategory.value / expense) * 100)}% of total expenses.
                      </p>
                    </>
                  ) : (
                    <p className="mt-4 text-sm text-slate-400">No expense data.</p>
                  )}
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="text-sm font-semibold text-white">📊 Monthly Comparison</div>
                  <div className="mt-5 space-y-4">
                    {[
                      ['Apr', aprExpense],
                      ['Mar', marExpense],
                      ['Feb', febExpense],
                    ].map(([month, value]) => (
                      <div key={month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-slate-400">
                          <span>{month} 2024</span>
                          <span>{fmt(value)}</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-950">
                          <div className={`h-full rounded-full ${month === 'Apr' ? 'bg-violet-500' : 'bg-slate-500'}`} style={{ width: `${(value / maxME) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                  <div className="text-sm font-semibold text-white">💡 Savings Rate</div>
                  <div className="mt-4 text-3xl font-semibold text-amber-300">
                    {aprIncome > 0 ? Math.round(((aprIncome - aprExpense) / aprIncome) * 100) : 0}%
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    You saved {fmt(aprIncome - aprExpense)} this month. {aprIncome - aprExpense > 20000 ? 'Great job staying on budget! 🎉' : 'Consider reducing discretionary spending.'}
                  </p>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-slate-950/30">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-white">Category Breakdown</div>
                    <div className="text-xs text-slate-500">All expense categories ranked</div>
                  </div>
                </div>
                {categorySpend.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-14 text-center text-slate-500">
                    <div className="mb-3 text-4xl">📊</div>
                    <p>No expense data available.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {categorySpend.map((c) => (
                      <div key={c.name} className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 text-sm font-medium text-slate-100">
                            <span className="text-lg">{CATEGORY_ICONS[c.name]}</span>
                            {c.name}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>{Math.round((c.value / expense) * 100)}%</span>
                            <span className="font-semibold" style={{ color: c.color }}>{fmt(c.value)}</span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-slate-950">
                          <div className="h-full rounded-full" style={{ width: `${(c.value / categorySpend[0].value) * 100}%`, background: c.color, opacity: 0.85 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      {modal && (
        <TxModal
          tx={modal.tx}
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (data.id && transactions.find((t) => t.id === data.id)) {
              setTransactions((ts) => ts.map((t) => (t.id === data.id ? data : t)))
            } else {
              setTransactions((ts) => [data, ...ts])
            }
            setModal(null)
          }}
        />
      )}
    </div>
  )
}
