import { useNavigate } from 'react-router-dom'
import { HiOutlineMenu, HiOutlinePlus, HiOutlineBell } from 'react-icons/hi'
import Button from '../ui/Button'

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate()

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
          <HiOutlineBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
        </button>
        <Button onClick={() => navigate('/contacts/new')} size="sm">
          <HiOutlinePlus className="w-4 h-4" />
          <span className="hidden sm:inline">New Contact</span>
        </Button>
      </div>
    </header>
  )
}
