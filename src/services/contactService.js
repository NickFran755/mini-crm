const CONTACTS_KEY = 'crm_contacts'
const NOTES_KEY = 'crm_notes'

const generateId = () => crypto.randomUUID()

const getStoredData = (key) => {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

const setStoredData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

// --- Seed data for demo ---
const SEED_CONTACTS = [
  {
    id: '1',
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 6 12 34 56 78',
    company: 'Dubois Consulting',
    status: 'client_won',
    createdAt: '2025-12-15T10:00:00Z',
    updatedAt: '2026-02-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'Paul Lefevre',
    email: 'paul.lefevre@startup.io',
    phone: '+33 6 98 76 54 32',
    company: 'TechStart SAS',
    status: 'meeting_scheduled',
    createdAt: '2026-01-08T09:00:00Z',
    updatedAt: '2026-03-01T11:00:00Z',
  },
  {
    id: '3',
    name: 'Claire Martin',
    email: 'claire.martin@gmail.com',
    phone: '+33 6 55 44 33 22',
    company: '',
    status: 'contacted',
    createdAt: '2026-02-01T08:30:00Z',
    updatedAt: '2026-03-05T16:00:00Z',
  },
  {
    id: '4',
    name: 'Julie Bernard',
    email: 'julie.bernard@corp.fr',
    phone: '+33 6 11 22 33 44',
    company: 'Bernard & Associés',
    status: 'contacted',
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-03-07T09:00:00Z',
  },
  {
    id: '5',
    name: 'Alex Martin',
    email: 'alex.martin@design.co',
    phone: '+33 6 77 88 99 00',
    company: 'Studio Créatif',
    status: 'proposal_sent',
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-03-04T10:00:00Z',
  },
  {
    id: '6',
    name: 'Emma Durand',
    email: 'emma.durand@freelance.com',
    phone: '+33 6 33 22 11 00',
    company: '',
    status: 'new_lead',
    createdAt: '2026-03-01T07:00:00Z',
    updatedAt: '2026-03-01T07:00:00Z',
  },
  {
    id: '7',
    name: 'Thomas Roy',
    email: 'thomas.roy@enterprise.fr',
    phone: '+33 6 44 55 66 77',
    company: 'Roy Industries',
    status: 'client_won',
    createdAt: '2025-11-05T13:00:00Z',
    updatedAt: '2026-02-28T15:00:00Z',
  },
  {
    id: '8',
    name: 'Sophie Moreau',
    email: 'sophie.moreau@coach.fr',
    phone: '+33 6 22 33 44 55',
    company: '',
    status: 'lost',
    createdAt: '2025-12-20T10:00:00Z',
    updatedAt: '2026-01-15T09:00:00Z',
  },
]

const SEED_NOTES = [
  { id: '1', contactId: '1', content: 'Coaching session completed — very positive feedback. Next session scheduled for May.', createdAt: '2026-02-20T14:30:00Z' },
  { id: '2', contactId: '2', content: 'Business consultation meeting confirmed for May 25th at 11:00.', createdAt: '2026-03-01T11:00:00Z' },
  { id: '3', contactId: '3', content: 'Initial call went well. Claire is interested in the motivation program.', createdAt: '2026-03-05T16:00:00Z' },
  { id: '4', contactId: '4', content: 'Follow up with Julie tomorrow about the coaching package.', createdAt: '2026-03-07T09:00:00Z' },
  { id: '5', contactId: '5', content: 'Proposal sent for creative leadership workshop. Waiting for response.', createdAt: '2026-03-04T10:00:00Z' },
  { id: '6', contactId: '7', content: 'Quarterly review completed. Thomas renewed his contract for 6 months.', createdAt: '2026-02-28T15:00:00Z' },
]

const seedIfEmpty = () => {
  if (getStoredData(CONTACTS_KEY).length === 0) {
    setStoredData(CONTACTS_KEY, SEED_CONTACTS)
    setStoredData(NOTES_KEY, SEED_NOTES)
  }
}

// --- Contacts CRUD ---
export const getContacts = () => {
  seedIfEmpty()
  return getStoredData(CONTACTS_KEY)
}

export const getContactById = (id) => {
  const contacts = getContacts()
  return contacts.find((c) => c.id === id) || null
}

export const createContact = (contact) => {
  const contacts = getContacts()
  const now = new Date().toISOString()
  const newContact = {
    ...contact,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }
  contacts.unshift(newContact)
  setStoredData(CONTACTS_KEY, contacts)
  return newContact
}

export const updateContact = (id, updates) => {
  const contacts = getContacts()
  const index = contacts.findIndex((c) => c.id === id)
  if (index === -1) return null
  contacts[index] = {
    ...contacts[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  setStoredData(CONTACTS_KEY, contacts)
  return contacts[index]
}

export const deleteContact = (id) => {
  const contacts = getContacts().filter((c) => c.id !== id)
  setStoredData(CONTACTS_KEY, contacts)
  const notes = getStoredData(NOTES_KEY).filter((n) => n.contactId !== id)
  setStoredData(NOTES_KEY, notes)
}

// --- Notes CRUD ---
export const getNotesByContact = (contactId) => {
  seedIfEmpty()
  return getStoredData(NOTES_KEY)
    .filter((n) => n.contactId === contactId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export const getAllNotes = () => {
  seedIfEmpty()
  return getStoredData(NOTES_KEY).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )
}

export const addNote = (contactId, content) => {
  const notes = getStoredData(NOTES_KEY)
  const newNote = {
    id: generateId(),
    contactId,
    content,
    createdAt: new Date().toISOString(),
  }
  notes.unshift(newNote)
  setStoredData(NOTES_KEY, notes)
  return newNote
}

// --- Stats ---
export const getStats = () => {
  const contacts = getContacts()
  const total = contacts.length
  const prospects = contacts.filter((c) => c.status !== 'client_won' && c.status !== 'lost').length
  const clients = contacts.filter((c) => c.status === 'client_won').length
  const proposalsSent = contacts.filter((c) => c.status === 'proposal_sent').length
  const conversionRate = total > 0 ? Math.round((clients / total) * 100) : 0
  return { total, prospects, clients, proposalsSent, conversionRate }
}
