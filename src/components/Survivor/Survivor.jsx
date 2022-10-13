import './style.css'

export function Survivor({ position, index, color, isCurrentSurvivor }) {
  return (
    <div className={`survivor ${isCurrentSurvivor && 'isCurrentSurvivor'}`} style={{
      gridColumn: position[0],
      gridRow: position[1],
      top: index * 25,
      left: index * 25,
      backgroundColor: color,
      gridArea: `.${index}`
    }}></div>
  )
}