import { NavLink } from 'react-router-dom'
import {
  HiOutlineViewGrid,
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineClipboardList,
  HiOutlineX,
} from 'react-icons/hi'

const navItems = [
  { path: '/', label: 'Dashboard', icon: HiOutlineViewGrid },
  { path: '/contacts', label: 'Contacts', icon: HiOutlineUsers },
  { path: '/contacts/new', label: 'Add Contact', icon: HiOutlineUserAdd },
  { path: '/activity', label: 'Activity', icon: HiOutlineClipboardList },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-sidebar text-white flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-sm">
              C
            </div>
            <span className="text-lg font-semibold">CoachCRM</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white cursor-pointer">
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary-400 rounded-full flex items-center justify-center text-sm font-semibold">
              NC
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">Nicolas Coach</p>
              <p className="text-xs text-gray-400 truncate">nicolas@coach.fr</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
