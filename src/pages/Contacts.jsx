import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineSearch, HiOutlineEye, HiOutlinePencil, HiOutlineTrash, HiOutlineUserAdd } from 'react-icons/hi'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { getContacts, deleteContact } from '../services/contactService'
import { STATUSES } from '../utils/constants'
import { format } from 'date-fns'

export default function Contacts() {
  const [contacts, setContacts] = useState(() => getContacts())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deleteId, setDeleteId] = useState(null)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    return contacts.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
      const matchStatus = statusFilter === 'all' || c.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [contacts, search, statusFilter])

  const handleDelete = () => {
    if (deleteId) {
      deleteContact(deleteId)
      setContacts(getContacts())
      setDeleteId(null)
    }
  }

  const contactToDelete = contacts.find((c) => c.id === deleteId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-500 mt-1">{contacts.length} total contacts</p>
        </div>
        <Button onClick={() => navigate('/contacts/new')}>
          <HiOutlineUserAdd className="w-4 h-4" />
          Add Contact
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400 hover:border-gray-300 transition-all duration-150"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400 hover:border-gray-300 transition-all duration-150 sm:w-48"
          >
            <option value="all">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <HiOutlineSearch className="w-7 h-7 text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">No contacts found</p>
              <p className="text-xs text-gray-400 mt-1">
                {search || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter'
                  : 'Get started by adding your first contact'}
              </p>
              {!search && statusFilter === 'all' && (
                <Button size="sm" className="mt-4" onClick={() => navigate('/contacts/new')}>
                  <HiOutlineUserAdd className="w-4 h-4" />
                  Add Contact
                </Button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact, i) => (
                  <tr
                    key={contact.id}
                    className={`group hover:bg-primary-50/30 transition-colors ${i < filtered.length - 1 ? 'border-b border-gray-50' : ''}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {contact.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{contact.name}</p>
                          {contact.company && (
                            <p className="text-xs text-gray-400 truncate">{contact.company}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{contact.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 hidden lg:table-cell">{contact.phone}</td>
                    <td className="px-6 py-4"><Badge status={contact.status} /></td>
                    <td className="px-6 py-4 text-sm text-gray-400 hidden md:table-cell">
                      {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/contacts/${contact.id}`}
                          className="p-2 text-gray-400 hover:text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
                          title="View"
                        >
                          <HiOutlineEye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/contacts/${contact.id}/edit`}
                          className="p-2 text-gray-400 hover:text-primary-500 rounded-lg hover:bg-primary-50 transition-colors"
                          title="Edit"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(contact.id)}
                          className="p-2 text-gray-400 hover:text-danger-500 rounded-lg hover:bg-danger-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>

      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Contact">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-2.5 bg-danger-50 rounded-full flex-shrink-0">
            <HiOutlineTrash className="w-5 h-5 text-danger-500" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete <strong className="text-gray-900">{contactToDelete?.name}</strong>?
            </p>
            <p className="text-xs text-gray-400 mt-1">This action cannot be undone. All associated notes will also be removed.</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete Contact</Button>
        </div>
      </Modal>
    </div>
  )
}
