import './style.css'

export function Button({ children, onClick, disabled, className }) {
  return <button onClick={onClick} className={`${className} button`} disabled={disabled}>
    {children}
  </button>
}