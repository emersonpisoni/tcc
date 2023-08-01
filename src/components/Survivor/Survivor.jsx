import './style.css'
import survivorImage from '../../images/survivor.png'

export function Survivor({ survivor, position, index, color = 'black', isCurrentSurvivor }) {
  return (
    <>
      <div
        className={`survivor`}
        style={{
          gridRow: position.x,
          gridColumn: position.y,
          top: (index * 32) - 32 - (index % 2 === 0 ? + 32 : 0),
          left: index % 2 === 0 ? 110 : 30,
          backgroundImage: `url(${survivorImage})`,
          animationDelay: `.${index}s`,
          backgroundRepeat: 'no-repeat',
          borderColor: color,
        }}>
        <div className='survivor-info'>
          {survivor.name}
        </div>
      </div>
      <div
        className={`survivor-base  ${isCurrentSurvivor && 'isCurrentSurvivor'}`}
        style={{
          border: `1px solid ${color}`,
          gridRow: position.x,
          gridColumn: position.y,
          top: (index * 32) - 32 - (index % 2 === 0 ? + 32 : 0),
          left: index % 2 === 0 ? 110 : 30,
          transform: 'rotateX(0) translateY(6px)',
          filter: !isCurrentSurvivor ? 'opacity(.3)' : '',
          backgroundColor: color
        }}></div>
    </>
  )
}