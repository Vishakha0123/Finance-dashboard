import { useState } from 'react'
import { CATEGORIES } from '../data/financeData'

const TxModal = ({ tx, onSave, onClose }) => {
  const isEdit = !!tx?.id
  const [form, setForm] = useState({
    desc: tx?.desc || '',
    amount: tx?.amount || '',
    category: tx?.category || 'Food',
    type: tx?.type || 'expense',
    date: tx?.date || new Date().toISOString().split('T')[0],
  })

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <div className="mb-6 text-2xl font-semibold">{isEdit ? 'Edit Transaction' : 'Add Transaction'}</div>
        <div className="grid gap-5">
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-500">Type</div>
            <div className="grid grid-cols-2 gap-2">
              {['income', 'expense'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setField('type', type)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${form.type === type ? 'border-transparent text-slate-900 shadow-sm' : 'border-slate-700 text-slate-300 bg-slate-950/70'}`}
                  style={
                    form.type === 'income' && type === 'income'
                      ? { background: 'rgba(52, 211, 153, 0.18)', color: '#bbf7d0', borderColor: '#22c55e' }
                      : form.type === 'expense' && type === 'expense'
                      ? { background: 'rgba(248, 113, 113, 0.18)', color: '#fecaca', borderColor: '#f87171' }
                      : undefined
                  }
                >
                  {type === 'income' ? '↑ Income' : '↓ Expense'}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">Description</label>
            <input
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
              placeholder="e.g. Zomato Order"
              value={form.desc}
              onChange={(e) => setField('desc', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">Amount (₹)</label>
            <input
              type="number"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
              placeholder="0"
              value={form.amount}
              onChange={(e) => setField('amount', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">Category</label>
            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
              value={form.category}
              onChange={(e) => setField('category', e.target.value)}
            >
              {CATEGORIES.map((category) => (
                <option key={category} value={category} className="bg-slate-950 text-slate-100">
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500">Date</label>
            <input
              type="date"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-indigo-400"
              value={form.date}
              onChange={(e) => setField('date', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:opacity-90"
            onClick={() => {
              if (!form.desc || !form.amount) return
              onSave({ ...form, amount: Number(form.amount), id: tx?.id || Date.now() })
            }}
          >
            Save Transaction
          </button>
        </div>
      </div>
    </div>
  )
}

export default TxModal
