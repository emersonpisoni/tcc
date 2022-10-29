import './style.css'

export function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} className='input' type="text" id="fname" name="firstname" placeholder="Seu nome.." />
}