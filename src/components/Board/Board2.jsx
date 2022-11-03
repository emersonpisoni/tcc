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
import { Zombie } from '../Zombie/Zombie'
import { Button } from '../Button/Button'


export function Board2({ socket }) {
  const [board, setBoard] = useState([])
  const [currentSurvivor, setCurrentSurvivor] = useState()
  const [players, setPlayers] = useState([])
  const [canSelectNextSurvivor, setCanSelectNextSurvivor] = useState(false)

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

      setCurrentSurvivor()
    })

    socket.on('UpdateGame', ({ players, currentSurvivor, board }) => {
      console.log(board);
      setBoard(board)
      setPlayers(players)
      setCurrentSurvivor(currentSurvivor)
    })

    socket.on('NextSurvivor', () => {
      setCanSelectNextSurvivor(true)
    })

    startZombiesRound()
  }, [])


  function getAllSurvivors() {
    return players.reduce((acc, cur) => [...acc, ...cur.survivors], [])
  }

  function selectCurrentSurvivorToPlay(surv) {
    socket.emit('SelectCurrentSurvivor', surv.name)
  }

  function moveSurvivor(direction) {
    const boardCurrentPosition = board.positions.find(position => position.mapPosition.x === currentSurvivor.position.x && position.mapPosition.y === currentSurvivor.position.y)

    switch (direction) {
      case DIRECTIONS.DOWN:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.DOWN) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.DOWN)) {
          const newPosition = {
            x: currentSurvivor.position.x + 1,
            y: currentSurvivor.position.y
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.DOWN))
        }
        break
      case DIRECTIONS.UP:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.UP) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.UP)) {
          const newPosition = {
            x: currentSurvivor.position.x - 1,
            y: currentSurvivor.position.y
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.UP))
        }
        break
      case DIRECTIONS.LEFT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.LEFT) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.LEFT)) {
          const newPosition = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y - 1
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.LEFT))
        }
        break
      case DIRECTIONS.RIGHT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.RIGHT) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.RIGHT)) {
          const newPosition = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y + 1
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.RIGHT))
        }
        break
      default:
        break;
    }

  }

  function startZombiesRound() {
    setCanSelectNextSurvivor(false)
    socket.emit('StartZombieRound')
  }

  function selectNextSurv() {
    setCanSelectNextSurvivor(false)
    const qtdMySurvs = getPlayerBySocketId().survivors.length
    const myCurrentSurvIndex = getPlayerBySocketId().survivors.findIndex(surv => surv.name === currentSurvivor.name)
    const isMyLastSurvToPlay = myCurrentSurvIndex === qtdMySurvs - 1
    const amILastPlayer = players.length - 1 === players.findIndex(player => player.socketId === socket.id)

    if (isMyLastSurvToPlay) {
      if (amILastPlayer) {
        console.log('ultom');
        startZombiesRound()
      }
      else {
        selectCurrentSurvivorToPlay(players[players.findIndex(player => player.socketId === socket.id) + 1].survivors[0])
      }
    } else {
      selectCurrentSurvivorToPlay(getPlayerBySocketId().survivors[myCurrentSurvIndex + 1])
    }
  }

  function getPlayerBySocketId() {
    return players.find(player => player.socketId === socket.id)
  }

  function isMySurvPlaying() {
    return getPlayerBySocketId()?.survivors?.some(surv => surv.name === currentSurvivor?.name)
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
        <div>Vez de {players.find(player => player.survivors.some(surv => surv.name === currentSurvivor?.name))?.name}</div>
        <div>{currentSurvivor?.name} Jogando... Restam {currentSurvivor?.actions} ações</div>
        <div>Nível atual do board: {getHighestLevel()} <div style={{ backgroundColor: getColorByLevel(), width: 20, height: 20 }}></div></div>
      </div>
      <div className="board">
        {board.positions?.length > 0 && board.positions?.map((position) => {
          return (
            <MapPosition
              key={`map-position-${position.mapPosition.x}${position.mapPosition.y}`}
              type={position.type}
              position={position}
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
        {board?.zombies?.map((zombie, index) => {
          return <Zombie position={zombie.position} index={index + 1} isCurrentZombie={board?.currentZombieIndex === index} />
        })}
      </div>
      {isMySurvPlaying() && <Joystick onClick={moveSurvivor} />}
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
              })}
              </div>
            </div>
          )
        })}
      </div>
      {canSelectNextSurvivor && isMySurvPlaying() && <Button onClick={selectNextSurv} className='next-surv'>Próximo Sobrevivente</Button>}
    </div >
  )
}

