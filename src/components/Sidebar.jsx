const navItems = [
  { id: 'dashboard', icon: '⬡', label: 'Overview' },
  { id: 'transactions', icon: '⇄', label: 'Transactions' },
  { id: 'insights', icon: '◈', label: 'Insights' },
]

export default function Sidebar({ view, setView, role, setRole }) {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900 px-6 py-8 lg:flex">
      <div className="mb-8 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 text-lg shadow-lg shadow-indigo-500/20">
          ₹
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
            FIN<span className="text-indigo-400">IO</span>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setView(item.id)}
            className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
              view === item.id
                ? 'bg-indigo-500/10 text-indigo-200 shadow-inner shadow-slate-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-3xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Role</div>
        <div className="mt-3 flex gap-2">
          {['viewer', 'admin'].map((roleOption) => (
            <button
              key={roleOption}
              type="button"
              onClick={() => setRole(roleOption)}
              className={`w-full rounded-2xl border px-3 py-2 text-xs font-semibold transition ${
                role === roleOption
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-200'
                  : 'border-slate-700 text-slate-400 hover:border-slate-500'
              }`}
            >
              {roleOption}
            </button>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
          <span className={`inline-flex h-2.5 w-2.5 rounded-full ${role === 'admin' ? 'bg-indigo-400' : 'bg-slate-500'}`} />
          <span>{role === 'admin' ? 'Full access' : 'Read only'}</span>
        </div>
      </div>
    </aside>
  )
}
