export const STATUSES = [
  { value: 'new_lead', label: 'New Lead', color: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  { value: 'contacted', label: 'Contacted', color: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  { value: 'meeting_scheduled', label: 'Meeting', color: 'bg-purple-50 text-purple-700', dot: 'bg-purple-500' },
  { value: 'proposal_sent', label: 'Proposal Sent', color: 'bg-orange-50 text-orange-700', dot: 'bg-orange-500' },
  { value: 'client_won', label: 'Client Won', color: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500' },
  { value: 'lost', label: 'Lost', color: 'bg-red-50 text-red-600', dot: 'bg-red-400' },
]

export const getStatusConfig = (status) =>
  STATUSES.find((s) => s.value === status) || STATUSES[0]

export const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'HiOutlineViewGrid' },
  { path: '/contacts', label: 'Contacts', icon: 'HiOutlineUsers' },
  { path: '/contacts/new', label: 'Add Contact', icon: 'HiOutlineUserAdd' },
  { path: '/activity', label: 'Activity', icon: 'HiOutlineClipboardList' },
]
