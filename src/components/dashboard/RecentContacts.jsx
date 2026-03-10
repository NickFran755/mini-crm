import { Link } from 'react-router-dom'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { format } from 'date-fns'

export default function RecentContacts({ contacts }) {
  const recent = contacts.slice(0, 5)

  return (
    <Card>
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Recent Contacts</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {recent.map((contact) => (
          <Link
            key={contact.id}
            to={`/contacts/${contact.id}`}
            className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50/60 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                <p className="text-xs text-gray-400 truncate">{contact.email}</p>
              </div>
            </div>
            <Badge status={contact.status} />
          </Link>
        ))}
      </div>
      <div className="px-6 py-3.5 border-t border-gray-50">
        <Link to="/contacts" className="text-sm text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center gap-1 group">
          View all contacts
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </Link>
      </div>
    </Card>
  )
}
