import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { HiOutlinePencil, HiOutlineTrash, HiOutlineMail, HiOutlinePhone, HiOutlineOfficeBuilding, HiOutlineCalendar, HiOutlineAnnotation } from 'react-icons/hi'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Select from '../components/ui/Select'
import { getContactById, getNotesByContact, addNote, updateContact, deleteContact } from '../services/contactService'
import { STATUSES } from '../utils/constants'
import { format } from 'date-fns'

export default function ContactDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contact, setContact] = useState(() => getContactById(id))
  const [notes, setNotes] = useState(() => getNotesByContact(id))
  const [newNote, setNewNote] = useState('')
  const [showDelete, setShowDelete] = useState(false)
  const [editingStatus, setEditingStatus] = useState(false)

  if (!contact) {
    return (
      <div className="text-center py-16">
        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <p className="text-sm font-medium text-gray-500">Contact not found</p>
        <p className="text-xs text-gray-400 mt-1">This contact may have been deleted</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/contacts')}>
          Back to Contacts
        </Button>
      </div>
    )
  }

  const handleAddNote = (e) => {
    e.preventDefault()
    if (!newNote.trim()) return
    addNote(id, newNote.trim())
    setNotes(getNotesByContact(id))
    setNewNote('')
  }

  const handleStatusChange = (e) => {
    updateContact(id, { status: e.target.value })
    setContact(getContactById(id))
    setEditingStatus(false)
  }

  const handleDelete = () => {
    deleteContact(id)
    navigate('/contacts')
  }

  const initials = contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button onClick={() => navigate('/contacts')} className="text-sm text-primary-500 hover:text-primary-600 font-semibold cursor-pointer inline-flex items-center gap-1 mb-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Contacts
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Contact Details</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate(`/contacts/${id}/edit`)}>
            <HiOutlinePencil className="w-4 h-4" /> Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
            <HiOutlineTrash className="w-4 h-4" /> Delete
          </Button>
        </div>
      </div>

      <Card className="p-6 sm:p-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-lg shadow-primary-500/20">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-bold text-gray-900">{contact.name}</h2>
              {editingStatus ? (
                <Select
                  options={STATUSES}
                  value={contact.status}
                  onChange={handleStatusChange}
                  className="w-48"
                />
              ) : (
                <button onClick={() => setEditingStatus(true)} className="cursor-pointer hover:opacity-80 transition-opacity" title="Click to change status">
                  <Badge status={contact.status} />
                </button>
              )}
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: HiOutlineMail, label: 'Email', value: contact.email },
                { icon: HiOutlinePhone, label: 'Phone', value: contact.phone },
                ...(contact.company ? [{ icon: HiOutlineOfficeBuilding, label: 'Company', value: contact.company }] : []),
                { icon: HiOutlineCalendar, label: 'Added', value: format(new Date(contact.createdAt), 'MMM d, yyyy') },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50/60">
                  <item.icon className="w-4.5 h-4.5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-gray-700 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Notes</h3>
          <span className="text-xs text-gray-400">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
        </div>

        <form onSubmit={handleAddNote} className="px-6 py-4 border-b border-gray-50">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Write a note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400 hover:border-gray-300 transition-all duration-150"
            />
            <Button type="submit" size="sm" disabled={!newNote.trim()}>
              Add
            </Button>
          </div>
        </form>

        <div className="divide-y divide-gray-50">
          {notes.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                <HiOutlineAnnotation className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-sm text-gray-400">No notes yet</p>
              <p className="text-xs text-gray-300 mt-1">Add your first note above</p>
            </div>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="px-6 py-4">
                <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {format(new Date(note.createdAt), 'MMM d, yyyy · HH:mm')}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>

      <Modal isOpen={showDelete} onClose={() => setShowDelete(false)} title="Delete Contact">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 bg-danger-50 rounded-full flex-shrink-0">
            <HiOutlineTrash className="w-5 h-5 text-danger-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{contact.name}</strong>?
            </p>
            <p className="text-xs text-gray-400 mt-1">All associated notes will be removed. This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Contact</Button>
        </div>
      </Modal>
    </div>
  )
}
