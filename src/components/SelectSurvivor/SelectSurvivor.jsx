import './style.css'

export function SelectSurvivor({ survivors, onclick }) {
  return (
    <div>
      {survivors.map(survivorName => <button onClick={() => onclick(survivorName)}>{survivorName}</button>)}
    </div>
  )
}