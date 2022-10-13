import { DIRECTIONS } from '../../utils/constants'
import './style.css'

export function Joystick({ onClick }) {
  return (
    <div className='joystick'>
      <button className='up' onClick={() => onClick(DIRECTIONS.UP)}>👆</button>
      <button className='left' onClick={() => onClick(DIRECTIONS.LEFT)}>👈</button>
      <button className='down' onClick={() => onClick(DIRECTIONS.DOWN)}>👇</button>
      <button className='right' onClick={() => onClick(DIRECTIONS.RIGHT)}>👉</button>
    </div>
  )
}