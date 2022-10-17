import { useState } from "react"
import { DIRECTIONS } from "../utils/constants"

export function useMoveSurvivor(board) {
  const [position, setPosition] = useState(board.initialSurvivorsPosition);

  function moveSurvivor(direction, survivorPosition) {
    const boardCurrentPosition = board.positions.find(position => position.mapPosition.x === survivorPosition.x && position.mapPosition.y === survivorPosition.y)
    console.log('fewfwefewf', boardCurrentPosition)

    switch (direction) {
      case DIRECTIONS.DOWN:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.DOWN)) {
          setPosition({
            x: survivorPosition.x + 1,
            y: survivorPosition.y
          })
        }
        break
      case DIRECTIONS.UP:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.UP)) {
          setPosition({
            x: survivorPosition.x - 1,
            y: survivorPosition.y
          })
        }
        break
      case DIRECTIONS.LEFT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.LEFT)) {
          setPosition({
            x: survivorPosition.x,
            y: survivorPosition.y - 1
          })
        }
        break
      case DIRECTIONS.RIGHT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.RIGHT)) {
          setPosition({
            x: survivorPosition.x,
            y: survivorPosition.y + 1
          })
        }
        break
      default:
        break;
    }
  }

  return [
    position,
    moveSurvivor,
  ]
}