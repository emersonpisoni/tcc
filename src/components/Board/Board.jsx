import './style.css'
import { useEffect, useState } from 'react'
import { getMapJson, getSurvivorsJson } from '../../api/api'
import { MapPosition } from '../../components/MapPosition/MapPosition'
import { Survivor } from '../Survivor/Survivor'
import { Joystick } from '../Joystick/Joystick'
import { SelectSurvivor } from '../SelectSurvivor/SelectSurvivor'
import { DIRECTIONS } from '../../utils/constants'

export function Board() {
  const [board, setBoard] = useState([])
  const [survivors, setSurvivors] = useState([])
  const [currentSurvivor, setCurrentSurvivor] = useState({})
  // const [game, setGame] = useState([])

  useEffect(() => {
    getBoard()
  }, [])

  useEffect(() => {
    board.positions?.length > 0 && survivors.length === 0 && getSurvivors()
  }, [board, survivors])

  // useEffect(() => {
  //   survivors.length > 0 && startGame()
  // }, [survivors])

  async function getBoard() {
    try {
      const response = getMapJson()

      setBoard(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function getSurvivors() {
    try {
      const response = getSurvivorsJson()
      const survivorsWithInitialPosition = response.map(survivor => ({ ...survivor, position: board.initialSurvivorsPosition }))

      setSurvivors(survivorsWithInitialPosition)
    } catch (error) {
      console.log(error)
    }
  }

  // function startGame() {
  //   const gameInfos = {
  //     survivors: survivors,
  //   }
  // }

  function selectCurrentSurvivorToPlay(survivorName) {
    console.log(survivorName)
    const getSurvivor = survivors.find(survivor => survivor.name === survivorName)

    setCurrentSurvivor(getSurvivor)
  }

  function moveSurvivor(direction) {
    const currentSurvivorIndex = survivors.findIndex(survivor => survivor.name === currentSurvivor.name)
    const newSurvivors = [...survivors]
    let newPosition
    if (direction === DIRECTIONS.DOWN) newPosition = [newSurvivors[currentSurvivorIndex].position[0], newSurvivors[currentSurvivorIndex].position[1] + 1]
    if (direction === DIRECTIONS.UP) newPosition = [newSurvivors[currentSurvivorIndex].position[0], newSurvivors[currentSurvivorIndex].position[1] - 1]
    if (direction === DIRECTIONS.LEFT) newPosition = [newSurvivors[currentSurvivorIndex].position[0] - 1, newSurvivors[currentSurvivorIndex].position[1]]
    if (direction === DIRECTIONS.RIGHT) newPosition = [newSurvivors[currentSurvivorIndex].position[0] + 1, newSurvivors[currentSurvivorIndex].position[1]]

    newSurvivors[currentSurvivorIndex] = { ...newSurvivors[currentSurvivorIndex], position: newPosition }
    console.log(newSurvivors)
    setSurvivors(newSurvivors)
  }

  return (
    <div className='game'>
      <div className="board">
        {board.positions?.length > 0 && board.positions?.map((position) => {
          return (
            <MapPosition
              key={`map-position-${position.mapPosition[0]}${position.mapPosition[1]}`}
              type={position.type}
              mapPosition={position.mapPosition}
              canMoveTo={position.canMoveTo}
            />
          )
        })}
        {survivors.map((survivor, index) => {
          return <Survivor
            isCurrentSurvivor={currentSurvivor.name === survivor.name}
            position={survivor.position}
            index={index + 1}
            color={survivor.color} />
        })}

      </div>
      <Joystick onClick={moveSurvivor} />
      <SelectSurvivor survivors={survivors.map(survivor => survivor.name)} onclick={selectCurrentSurvivorToPlay} />
    </div>
  )
}

