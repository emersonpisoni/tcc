import { DIRECTIONS } from "../../utils/constants"
import wallImage from '../../images/wall.jpg'
import wallPortaImage from '../../images/wall-porta.png'
import './style.css'

export function Door({ move, canMoveTo }) {
  const rotate = {
    [DIRECTIONS.DOWN]: 'rotatez(0deg)',
    [DIRECTIONS.LEFT]: 'rotatez(90deg)',
    [DIRECTIONS.UP]: 'rotatez(180deg)',
    [DIRECTIONS.RIGHT]: 'rotatez(270deg)',
  }

  return <div className="door" style={{
    transform: ` ${rotate[move]} translatey(100px) rotateX(90deg) translatey(10px) rotate(180deg) `,
    width: [DIRECTIONS.DOWN, DIRECTIONS.UP].includes(move) && '100%',
    height: [DIRECTIONS.LEFT, DIRECTIONS.RIGHT].includes(move) && '100px',
    backgroundImage: `${canMoveTo.includes(move) ? `url(${wallPortaImage})` : `url(${wallImage})`} `
  }}
  />
}
