const variants = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 shadow-sm shadow-primary-500/20 focus:ring-primary-300',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm focus:ring-primary-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 shadow-sm shadow-danger-500/20 focus:ring-danger-300',
  ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
