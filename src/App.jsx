import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import { INITIAL_TRANSACTIONS } from './data/financeData'

export default function App() {
  const [page, setPage] = useState('landing')
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)
  const [view, setView] = useState('dashboard')
  const [role, setRole] = useState('admin')
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')
  const [filterType, setFilterType] = useState('All')
  const [sortBy, setSortBy] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [modal, setModal] = useState(null)

  const handleStart = () => setPage('dashboard')
  const handleBack = () => setPage('landing')

  return page === 'landing' ? (
    <LandingPage onStart={handleStart} />
  ) : (
    <DashboardPage
      transactions={transactions}
      setTransactions={setTransactions}
      view={view}
      setView={setView}
      role={role}
      setRole={setRole}
      search={search}
      setSearch={setSearch}
      filterCat={filterCat}
      setFilterCat={setFilterCat}
      filterType={filterType}
      setFilterType={setFilterType}
      sortBy={sortBy}
      setSortBy={setSortBy}
      sortDir={sortDir}
      setSortDir={setSortDir}
      modal={modal}
      setModal={setModal}
      onBack={handleBack}
    />
  )
}
