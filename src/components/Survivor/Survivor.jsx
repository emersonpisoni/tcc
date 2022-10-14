import './style.css'

export function Survivor({ position, index, color, isCurrentSurvivor }) {
  return (
    <div className={`survivor ${isCurrentSurvivor && 'isCurrentSurvivor'}`} style={{
      gridRow: position.x,
      gridColumn: position.y,
      top: index * 25,
      left: index * 25,
      backgroundColor: color,
    }}></div>
  )
}