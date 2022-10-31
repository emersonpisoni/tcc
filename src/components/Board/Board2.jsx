import './style.css'
import { useEffect, useState } from 'react'
import { getMapJson, getSurvivorsJson } from '../../api/api'
import { MapPosition } from '../MapPosition/MapPosition'
import { Survivor } from '../Survivor/Survivor'
import { Joystick } from '../Joystick/Joystick'
import { SelectSurvivor } from '../SelectSurvivor/SelectSurvivor'
import { DIRECTIONS } from '../../utils/constants'
import { useSurvivor } from '../../hooks/useSurvivor'
import survivorImage from '../../images/survivor.png'
import socketClient from 'socket.io-client'


export function Board2({ socket }) {
  const [board, setBoard] = useState([])
  const [currentSurvivor, setCurrentSurvivor] = useState()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    socket.emit('GetBoard')
    socket.once('SendBoard', (board, initialPlayers) => {
      setBoard(board)
      setPlayers(initialPlayers)
      selectCurrentSurvivorToPlay(initialPlayers[0].survivors[0])
    })

    socket.on('CurrentSurvivorSelected', surv => {
      setCurrentSurvivor(surv)
    })

    socket.on('UpdatePlayers', players => {
      setPlayers(players)
    })
  }, [])


  function getAllSurvivors() {
    return players.reduce((acc, cur) => [...acc, ...cur.survivors], [])
  }

  function selectCurrentSurvivorToPlay(surv) {
    setCurrentSurvivor(surv)

    socket.emit('SelectCurrentSurvivor', surv.name)
  }

  function moveSurvivor(direction) {
    const boardCurrentPosition = board.positions.find(position => position.mapPosition.x === currentSurvivor.position.x && position.mapPosition.y === currentSurvivor.position.y)

    switch (direction) {
      case DIRECTIONS.DOWN:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.DOWN)) {
          currentSurvivor.position = {
            x: currentSurvivor.position.x + 1,
            y: currentSurvivor.position.y
          }
        }
        break
      case DIRECTIONS.UP:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.UP)) {
          currentSurvivor.position = {
            x: currentSurvivor.position.x - 1,
            y: currentSurvivor.position.y
          }
        }
        break
      case DIRECTIONS.LEFT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.LEFT)) {
          currentSurvivor.position = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y - 1
          }
        }
        break
      case DIRECTIONS.RIGHT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.RIGHT)) {
          currentSurvivor.position = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y + 1
          }
        }
        break
      default:
        break;
    }

    socket.emit('MoveSurvivor', currentSurvivor)
  }

  function getPlayerBySocketId() {
    return players.find(player => player.socketId === socket.id)
  }

  function getHighestLevel() {
    return getAllSurvivors().reduce((acc, cur) => {
      return cur.level > acc.level ? cur : acc
    }, getAllSurvivors()[0])?.level
  }

  function getColorByLevel() {
    if (getHighestLevel() < 7) return 'blue'
    if (getHighestLevel() < 19) return 'yellow'
    if (getHighestLevel() < 43) return 'orange'
    else return 'blue'
  }

  return (
    <div className='game'>
      <div className='game-status'>
        <div>{currentSurvivor?.name} Jogando...</div>
        <div>Nível atual do board: {getHighestLevel()} <div style={{ backgroundColor: getColorByLevel(), width: 20, height: 20 }}></div></div>
      </div>
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
            isCurrentSurvivor={currentSurvivor?.name === survivor.name}
            position={survivor.position}
            index={index + 1}
            color={survivor.color} />
        })}
      </div>
      <Joystick onClick={moveSurvivor} />
      {/* <SelectSurvivor survivors={getPlayerBySocketId()?.survivors} onclick={selectCurrentSurvivorToPlay} /> */}
      <div className='my-survivors'>
        {getPlayerBySocketId()?.survivors.map(surv => {
          return (
            <div className='my-survivors-surv'>
              <div>Nome: {surv.name}</div>
              <div>Vidas restantes: {surv.life}</div>
              <div className='my-survivors-surv-abilities'>Habilidades: {surv.abilities.map(({ name, level }) => {
                return (
                  <div className='my-survivors-surv-ability' style={{ backgroundColor: level }}>{name}</div>
                )
              })}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

