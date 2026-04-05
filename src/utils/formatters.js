export const fmt = (n) => `₹${n.toLocaleString('en-IN')}`
export const fmtSign = (n, t) => (t === 'income' ? `+${fmt(n)}` : `-${fmt(n)}`)
export const fmtDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
