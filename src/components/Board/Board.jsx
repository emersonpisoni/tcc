import './style.css'
import { useEffect, useState } from 'react'
import { getMapJson, getSurvivorsJson } from '../../api/api'
import { MapPosition } from '../../components/MapPosition/MapPosition'
import { Survivor } from '../Survivor/Survivor'
import { Joystick } from '../Joystick/Joystick'
import { SelectSurvivor } from '../SelectSurvivor/SelectSurvivor'
import { DIRECTIONS } from '../../utils/constants'
import { useSurvivor } from '../../hooks/useSurvivor'

export function Board() {
  const [board, setBoard] = useState([])
  const [currentSurvivor, setCurrentSurvivor] = useState('')
  const [survivor1, setSurvivor1, moveSurvivor1] = useSurvivor(getMapJson())
  const [survivor2, setSurvivor2, moveSurvivor2] = useSurvivor(getMapJson())
  const [survivor3, setSurvivor3, moveSurvivor3] = useSurvivor(getMapJson())
  const [survivor4, setSurvivor4, moveSurvivor4] = useSurvivor(getMapJson())
  const [survivor5, setSurvivor5, moveSurvivor5] = useSurvivor(getMapJson())
  const [survivor6, setSurvivor6, moveSurvivor6] = useSurvivor(getMapJson())
  const [survivor7, setSurvivor7, moveSurvivor7] = useSurvivor(getMapJson())

  useEffect(() => {
    getBoard()
  }, [])

  useEffect(() => {
    board.positions?.length > 0 && !survivor1.name && getSurvivors()
  }, [board, survivor1])

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
      setSurvivor1(survivorsWithInitialPosition[0])
      setSurvivor2(survivorsWithInitialPosition[1])
      setSurvivor3(survivorsWithInitialPosition[2])
      setSurvivor4(survivorsWithInitialPosition[3])
      setSurvivor5(survivorsWithInitialPosition[4])
      setSurvivor6(survivorsWithInitialPosition[5])
      setSurvivor7(survivorsWithInitialPosition[6])
    } catch (error) {
      console.log(error)
    }
  }

  function selectCurrentSurvivorToPlay(survivorName) {
    setCurrentSurvivor(survivorName)
  }

  function getCurrentSurvivorByName(survivorName) {
    return getAllSurvivors().find(survivor => survivor.state.name === survivorName)
  }

  function getAllSurvivors() {
    return [
      { state: survivor1, setState: setSurvivor1, moveSurvivor: moveSurvivor1 },
      { state: survivor2, setState: setSurvivor2, moveSurvivor: moveSurvivor2 },
      { state: survivor3, setState: setSurvivor3, moveSurvivor: moveSurvivor3 },
      { state: survivor4, setState: setSurvivor4, moveSurvivor: moveSurvivor4 },
      { state: survivor5, setState: setSurvivor5, moveSurvivor: moveSurvivor5 },
      { state: survivor6, setState: setSurvivor6, moveSurvivor: moveSurvivor6 },
      { state: survivor7, setState: setSurvivor7, moveSurvivor: moveSurvivor7 },
    ]
  }

  function moveSurvivor(direction) {
    const survivor = getCurrentSurvivorByName(currentSurvivor)
    survivor?.moveSurvivor(direction, survivor.state.position)
  }

  return (
    !!survivor1 && <div className='game'>
      <div className="board">
        {board.positions?.length > 0 && board.positions?.map((position) => {
          return (
            <MapPosition
              key={`map-position-${position.mapPosition.x}${position.mapPosition.y}`}
              type={position.type}
              mapPosition={position.mapPosition}
              canMoveTo={position.canMoveTo}
            />
          )
        })}
        {getAllSurvivors().map((survivor, index) => {
          return <Survivor
            key={`survivor-${index + 1}`}
            isCurrentSurvivor={currentSurvivor === survivor.state.name}
            position={survivor.state.position}
            index={index + 1}
            color={survivor.state.color} />
        })}
      </div>
      <Joystick onClick={moveSurvivor} />
      <SelectSurvivor survivors={getAllSurvivors()} onclick={selectCurrentSurvivorToPlay} />
    </div>
  )
}

