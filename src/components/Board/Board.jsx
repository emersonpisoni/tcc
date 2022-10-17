import './style.css'
import { useEffect, useState } from 'react'
import { getMapJson, getSurvivorsJson } from '../../api/api'
import { MapPosition } from '../../components/MapPosition/MapPosition'
import { Survivor } from '../Survivor/Survivor'
import { Joystick } from '../Joystick/Joystick'
import { SelectSurvivor } from '../SelectSurvivor/SelectSurvivor'
import { DIRECTIONS } from '../../utils/constants'
import { useSurvivor } from '../../hooks/useSurvivor'
import survivorImage from '../../images/survivor.png'
import socketClient from 'socket.io-client'


export function Board({ socket, survivors }) {
  const [board, setBoard] = useState([])
  const [currentSurvivor, setCurrentSurvivor] = useState('')
  const [survivor1, setSurvivor1, moveSurvivor1] = useSurvivor(getMapJson(), survivors[0])
  const [survivor2, setSurvivor2, moveSurvivor2] = useSurvivor(getMapJson(), survivors[1])
  const [survivor3, setSurvivor3, moveSurvivor3] = useSurvivor(getMapJson(), survivors[2])
  const [survivor4, setSurvivor4, moveSurvivor4] = useSurvivor(getMapJson(), survivors[3])
  const [survivor5, setSurvivor5, moveSurvivor5] = useSurvivor(getMapJson(), survivors[4])
  const [survivor6, setSurvivor6, moveSurvivor6] = useSurvivor(getMapJson(), survivors[5])
  const [canMove, setCanMove] = useState(false)

  useEffect(() => {
    console.log('survivor1', survivor1)
  }, [survivor1])

  useEffect(() => {
    if (hasSurvivors() && canMove) {
      console.log(getCurrentSurvivorByName(currentSurvivor).state);
      socket.emit('MoveSurvivor', getCurrentSurvivorByName(currentSurvivor).state)
      setCanMove(false)
    }

  }, [survivor1, survivor2, survivor3, survivor4, survivor5, survivor6])

  useEffect(() => {
    getBoard()

    socket.on('RefreshSurvivors', (newSurvivor, socketId) => {
      if (socketId !== socket.id && hasSurvivors()) {

        console.log('SURV', newSurvivor)
        const oldSurvivor = getCurrentSurvivorByName(newSurvivor.name)
        oldSurvivor.setState(newSurvivor)
        // setSurvivor1(newSurvivors[0])
        // setSurvivor2(newSurvivors[1])
        // setSurvivor3(newSurvivors[2])
        // setSurvivor4(newSurvivors[3])
        // setSurvivor5(newSurvivors[4])
        // setSurvivor6(newSurvivors[5])
      }
    })

    socket.on('SetCurrentSurvivor', (survName) => {
      setCurrentSurvivor(survName)
    })
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

      socket.emit('AddSurvivors', survivorsWithInitialPosition)
    } catch (error) {
      console.log(error)
    }
  }

  function hasSurvivors() {
    return getAllSurvivors().filter(survivor => survivor.state).length === 6
  }

  function selectCurrentSurvivorToPlay(survivorName) {
    setCurrentSurvivor(survivorName)
    socket.emit('SetCurrentSurvivor', survivorName)
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
              freeMoveTo={position.freeMoveTo}
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
      <Joystick onClick={(direction) => {
        if (currentSurvivor) {
          moveSurvivor(direction)
          setCanMove(true)
        }
      }} />
      <SelectSurvivor survivors={getAllSurvivors()} onclick={selectCurrentSurvivorToPlay} />
    </div>
  )
}

