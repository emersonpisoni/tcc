import { DIRECTIONS } from '../../utils/constants'
import { Button } from '../Button/Button'
import './style.css'

export function Joystick({ onClick }) {
  return (
    <div className='joystick'>
      <Button className='up' onClick={() => onClick(DIRECTIONS.UP)}>👆</Button>
      <Button className='left' onClick={() => onClick(DIRECTIONS.LEFT)}>👈</Button>
      <Button className='down' onClick={() => onClick(DIRECTIONS.DOWN)}>👇</Button>
      <Button className='right' onClick={() => onClick(DIRECTIONS.RIGHT)}>👉</Button>
    </div>
  )
}