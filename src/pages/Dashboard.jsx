import { useMemo } from 'react'
import { HiOutlineUsers, HiOutlineCalendar, HiOutlineHeart, HiOutlineDocumentText } from 'react-icons/hi'
import StatCard from '../components/dashboard/StatCard'
import RecentContacts from '../components/dashboard/RecentContacts'
import RecentActivity from '../components/dashboard/RecentActivity'
import { getContacts, getStats, getAllNotes } from '../services/contactService'

export default function Dashboard() {
  const contacts = useMemo(() => getContacts(), [])
  const stats = useMemo(() => getStats(), [])
  const notes = useMemo(() => getAllNotes(), [])

  const statCards = [
    { title: 'Total Prospects', value: stats.prospects, icon: HiOutlineUsers, color: 'bg-primary-500', iconBg: 'bg-primary-50', subtitle: 'Active leads in pipeline' },
    { title: 'Clients Won', value: stats.clients, icon: HiOutlineHeart, color: 'bg-success-500', iconBg: 'bg-emerald-50', subtitle: `${stats.conversionRate}% conversion rate` },
    { title: 'Proposals Sent', value: stats.proposalsSent, icon: HiOutlineDocumentText, color: 'bg-warning-500', iconBg: 'bg-amber-50', subtitle: 'Awaiting response' },
    { title: 'Total Contacts', value: stats.total, icon: HiOutlineCalendar, color: 'bg-purple-500', iconBg: 'bg-purple-50', subtitle: 'All time contacts' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Nicolas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentContacts contacts={contacts} />
        <RecentActivity notes={notes} contacts={contacts} />
      </div>
    </div>
  )
}
