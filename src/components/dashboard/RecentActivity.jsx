import Card from '../ui/Card'
import { format } from 'date-fns'

export default function RecentActivity({ notes, contacts }) {
  const recentNotes = notes.slice(0, 5)

  const getContactName = (contactId) => {
    const contact = contacts.find((c) => c.id === contactId)
    return contact?.name || 'Unknown'
  }

  return (
    <Card>
      <div className="px-6 py-4 border-b border-gray-50">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Recent Activity</h2>
      </div>
      <div className="divide-y divide-gray-50">
        {recentNotes.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <p className="text-sm text-gray-400">No recent activity</p>
          </div>
        ) : (
          recentNotes.map((note) => (
            <div key={note.id} className="px-6 py-3.5">
              <div className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{note.content}</p>
                  <p className="mt-1.5 text-xs text-gray-400">
                    <span className="font-semibold text-gray-500">{getContactName(note.contactId)}</span>
                    {' · '}
                    {format(new Date(note.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
