export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] ${className}`} {...props}>
      {children}
    </div>
  )
}
