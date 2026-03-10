import Card from '../ui/Card'

export default function StatCard({ title, value, icon: Icon, color, iconBg, subtitle }) {
  return (
    <Card className="p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${iconBg || color + '/10'}`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
          <p className="mt-0.5 text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      {subtitle && (
        <p className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400">{subtitle}</p>
      )}
    </Card>
  )
}
