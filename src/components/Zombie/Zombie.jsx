import './style.css'
import zombieImage from '../../images/survivor.png'

export function Zombie({ isOnFireline, zombie, position, index, color = 'black', isCurrentZombie }) {
  return (
    <>
      <div
        className={`zombie ${isOnFireline ? 'is-on-fireline' : ''}`}
        style={{
          gridRow: position.x,
          gridColumn: position.y,
          top: (index * 24) - 30 - (index % 2 === 0 ? 24 : 0),
          left: index % 2 === 0 ? 110 : 30,
          backgroundImage: `url(${zombieImage})`,
          animationDelay: `.${index}s`,
          backgroundRepeat: 'no-repeat',
          borderColor: color
        }}>
        <div className='zombie-info'>
          {zombie.name}
        </div>
      </div>
      <div
        className={`zombie-base  ${isCurrentZombie && 'isCurrentZombie'}`}
        style={{
          border: `1px solid ${color}`,
          gridRow: position.x,
          gridColumn: position.y,
          top: (index * 24) - 30 - (index % 2 === 0 ? + 24 : 0),
          left: index % 2 === 0 ? 110 : 30,
          transform: 'rotateX(0) translateY(6px)',
          filter: !isCurrentZombie ? 'opacity(.3)' : '',
          backgroundColor: color
        }}></div>
    </>
  )
}