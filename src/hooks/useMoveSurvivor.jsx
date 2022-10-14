import { useState } from "react"
import { DIRECTIONS } from "../utils/constants"

export function useMoveSurvivor(board) {
  const [position, setPosition] = useState(board.initialSurvivorsPosition);



  function moveSurvivor(direction, survivorPosition) {
    const boardCurrentPosition = board.positions.find(position => position.mapPosition.x === survivorPosition.x && position.mapPosition.y === survivorPosition.y)

    console.log(boardCurrentPosition)
    console.log(survivorPosition)
    switch (direction) {
      case DIRECTIONS.DOWN:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.DOWN)) {
          setPosition({
            x: position.x + 1,
            y: position.y
          })
        }
        break
      case DIRECTIONS.UP:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.UP)) {
          setPosition({
            x: position.x - 1,
            y: position.y
          })
        }
        break
      case DIRECTIONS.LEFT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.LEFT)) {
          setPosition({
            x: position.x,
            y: position.y - 1
          })
        }
        break
      case DIRECTIONS.RIGHT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.RIGHT)) {
          setPosition({
            x: position.x,
            y: position.y + 1
          })
        }
        break
      default:
        break;
    }
  }

  return [
    position,
    moveSurvivor
  ]
}