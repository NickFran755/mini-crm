import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineClipboardList } from 'react-icons/hi'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getAllNotes, getContacts } from '../services/contactService'
import { format } from 'date-fns'

export default function Activity() {
  const notes = useMemo(() => getAllNotes(), [])
  const contacts = useMemo(() => getContacts(), [])

  const getContact = (contactId) => contacts.find((c) => c.id === contactId)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Activity</h1>
        <p className="text-sm text-gray-500 mt-1">All notes and recent activity</p>
      </div>

      <Card>
        <div className="divide-y divide-gray-50">
          {notes.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <HiOutlineClipboardList className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">No activity yet</p>
              <p className="text-xs text-gray-400 mt-1">Notes and actions will appear here as you interact with your contacts</p>
              <Link to="/contacts">
                <Button variant="secondary" size="sm" className="mt-4">
                  View Contacts
                </Button>
              </Link>
            </div>
          ) : (
            notes.map((note, i) => {
              const contact = getContact(note.contactId)
              return (
                <div key={note.id} className="px-6 py-4 hover:bg-gray-50/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-400 flex-shrink-0 ring-4 ring-primary-50" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        {contact && (
                          <Link
                            to={`/contacts/${contact.id}`}
                            className="font-semibold text-primary-500 hover:text-primary-600"
                          >
                            {contact.name}
                          </Link>
                        )}
                        <span>·</span>
                        <span>{format(new Date(note.createdAt), 'MMM d, yyyy · HH:mm')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </Card>
    </div>
  )
}
