import './style.css'
import survivorImage from '../../images/survivor.png'

export function Survivor({ position, index, color, isCurrentSurvivor }) {
  return (
    <div
      className={`survivor ${isCurrentSurvivor && 'isCurrentSurvivor'}`}
      style={{
        gridRow: position.x,
        gridColumn: position.y,
        top: (index * 32) - 32 - (index % 2 === 0 ? + 32 : 0),
        left: index % 2 === 0 ? 110 : 30,
        backgroundImage: `url(${survivorImage})`,
        animationDelay: `.${index}s`,
        backgroundRepeat: 'no-repeat',
        borderColor: color
      }}>
    </div>
  )
}