import './style.css'
import { useEffect, useState } from 'react'
import { MapPosition } from '../MapPosition/MapPosition'
import { Survivor } from '../Survivor/Survivor'
import { Joystick } from '../Joystick/Joystick'
import { DIRECTIONS, MAP_POSITION_TYPE } from '../../utils/constants'

import { Zombie } from '../Zombie/Zombie'
import { Button } from '../Button/Button'
import { Card } from '../Card/Card'
import { Dice } from '../Dice/Dice'
import Carousel from 'react-material-ui-carousel'

export function Board2({ socket }) {
  const [board, setBoard] = useState()
  const [currentSurvivor, setCurrentSurvivor] = useState()
  const [players, setPlayers] = useState([])
  const [nextSurvButtonText, setNextSurvButtonText] = useState('')
  const [canSelectNextSurvivor, setCanSelectNextSurvivor] = useState(true)
  const [zombiesICanHit, setZombiesICanHit] = useState([])
  const [showZombiesICanHit, setShowZombiesICanHit] = useState(false)
  const [showDices, setShowDices] = useState(false)
  const [selectedZombie, setSelectedZombie] = useState()
  const [survIsInBuilding, setSurvIsInBuilding] = useState(false)
  const [hasAlreadySearchItem, setHasAlreadySearchItem] = useState(false)
  const [survIsOnTunnedGunBox, setSurvIsOnTunnedGunBox] = useState(false)
  const [hasAlreadyCollectGoal, setHasAlreadyCollectGoal] = useState(false)
  const [survIsOnGoal, setSurvIsOnGoal] = useState(false)
  const [indexOfCurrentItem, setIndexOfCurrentItem] = useState(0)
  const [showEndGame, setShowEndGame] = useState(false)

  useEffect(() => {
    socket.emit('GetBoard')
    socket.once('SendBoard', (board, players) => {
      const buttonText = players[0].survivors.length === 1 ? 'Próximo Jogador' : 'Próximo Sobrevivente'
      setNextSurvButtonText(buttonText)
      setBoard(board)
      setPlayers(players)
      selectCurrentSurvivorToPlay(players[0].survivors[0])
      setSurvIsInBuilding(isCurrentSurvOnBuilding(board, players[0].survivors[0]))
      isCurrentSurvOnTunnedGunBox(board, players[0].survivors[0])
      isCurrentSurvOnGoal(board, players[0].survivors[0])
    })

    socket.on('CurrentSurvivorSelected', ({ currentSurvivor, players, board }) => {
      setButtonText(currentSurvivor.name, players)
      setCurrentSurvivor(currentSurvivor)
      setSurvIsInBuilding(isCurrentSurvOnBuilding(board, currentSurvivor))
      isCurrentSurvOnTunnedGunBox(board, currentSurvivor)
      isCurrentSurvOnGoal(board, currentSurvivor)
      setHasAlreadySearchItem(false)
    })

    socket.on('VerifyWhoICanHit', possibleZombiesToHit => {
      setZombiesICanHit(possibleZombiesToHit)
    })

    socket.on('UpdateGame', ({ players, currentSurvivor, board }) => {
      setBoard(board)
      setPlayers(players)
      setCurrentSurvivor(currentSurvivor)
      setSurvIsInBuilding(isCurrentSurvOnBuilding(board, currentSurvivor))
      isCurrentSurvOnTunnedGunBox(board, currentSurvivor)
      isCurrentSurvOnGoal(board, currentSurvivor)
      setHasAlreadyCollectGoal(board.goalCollected)
    })

    socket.on('StartSurvivorRound', ({ players, board, currentSurvivor }) => {
      selectCurrentSurvivorToPlay(players[0].survivors[0])
      setCanSelectNextSurvivor(true)
      setHasAlreadySearchItem(false)
      // setSurvIsInBuilding(isCurrentSurvOnBuilding(board, currentSurvivor))
      // isCurrentSurvOnTunnedGunBox(board, currentSurvivor)
    })

    socket.once('EndGame', typeOfEndGame => {
      setShowEndGame(typeOfEndGame)
    })

    socket.on('ShowRollDices', showDices => {
      setShowDices(showDices)
    })

    return () => {
      socket.off('EndGame')
      socket.off('RollDices')
    }
  }, [])

  function getAllSurvivors() {
    return players.reduce((acc, cur) => [...acc, ...cur.survivors], [])
  }

  function selectCurrentSurvivorToPlay(surv) {
    socket.emit('SelectCurrentSurvivor', surv?.name)
  }

  function isCurrentSurvOnBuilding(board, currentSurvivor) {
    if (!board || !currentSurvivor) return false
    const mapPosition = board?.positions?.find(position => position?.mapPosition?.x === currentSurvivor?.position?.x && position?.mapPosition?.y === currentSurvivor?.position?.y)
    return mapPosition?.type === MAP_POSITION_TYPE.ROOM
  }

  function isCurrentSurvOnTunnedGunBox(board, currentSurv) {
    const boardCurrentPosition = board?.positions?.find(position => position?.mapPosition?.x === currentSurv?.position?.x && position?.mapPosition?.y === currentSurv?.position?.y)

    setSurvIsOnTunnedGunBox(boardCurrentPosition?.hasGunBox)
  }

  function isCurrentSurvOnGoal(board, currentSurv) {
    const boardCurrentPosition = board?.positions?.find(position => position?.mapPosition?.x === currentSurv?.position?.x && position?.mapPosition?.y === currentSurv?.position?.y)

    setSurvIsOnGoal(boardCurrentPosition?.hasGoal)
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
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.DOWN), indexOfCurrentItem)
        }
        break
      case DIRECTIONS.UP:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.UP) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.UP)) {
          const newPosition = {
            x: currentSurvivor.position.x - 1,
            y: currentSurvivor.position.y
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.UP), indexOfCurrentItem)
        }
        break
      case DIRECTIONS.LEFT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.LEFT) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.LEFT)) {
          const newPosition = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y - 1
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.LEFT), indexOfCurrentItem)
        }
        break
      case DIRECTIONS.RIGHT:
        if (boardCurrentPosition.canMoveTo.includes(DIRECTIONS.RIGHT) || boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.RIGHT)) {
          const newPosition = {
            x: currentSurvivor.position.x,
            y: currentSurvivor.position.y + 1
          }
          socket.emit('MoveSurvivor', { ...currentSurvivor, position: newPosition }, boardCurrentPosition.freeMoveTo.includes(DIRECTIONS.RIGHT), indexOfCurrentItem)
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

  function setButtonText(survName, players) {
    const getPlayerBySocketId = players.find(player => player.socketId === socket.id)
    const qtdMySurvs = getPlayerBySocketId.survivors.length
    const myCurrentSurvIndex = getPlayerBySocketId.survivors.findIndex(surv => surv.name === survName)
    const isMyLastSurvToPlay = myCurrentSurvIndex === qtdMySurvs - 1
    const amILastPlayer = players.length - 1 === players.findIndex(player => player.socketId === socket.id)

    if (amILastPlayer) {
      if (isMyLastSurvToPlay) {
        setNextSurvButtonText('Começar Rodada dos Zumbis')
      } else {
        setNextSurvButtonText('Próximo Sobrevivente')
      }
    } else {
      if (isMyLastSurvToPlay) {
        setNextSurvButtonText('Próximo Jogador')
      } else {
        setNextSurvButtonText('Próximo Sobrevivente')
      }
    }
  }

  function selectNextSurv() {
    setIndexOfCurrentItem(0)
    const qtdMySurvs = getPlayerBySocketId().survivors.length
    const myCurrentSurvIndex = getPlayerBySocketId().survivors.findIndex(surv => surv.name === currentSurvivor.name)
    const isMyLastSurvToPlay = myCurrentSurvIndex === qtdMySurvs - 1
    const amILastPlayer = players.length - 1 === players.findIndex(player => player.socketId === socket.id)

    if (amILastPlayer) {
      if (isMyLastSurvToPlay) {
        selectCurrentSurvivorToPlay()
        startZombiesRound()
      } else {
        selectCurrentSurvivorToPlay(getPlayerBySocketId().survivors[myCurrentSurvIndex + 1])
      }
    } else {
      if (isMyLastSurvToPlay) {
        selectCurrentSurvivorToPlay(players[players.findIndex(player => player.socketId === socket.id) + 1].survivors[0])
      } else {
        selectCurrentSurvivorToPlay(getPlayerBySocketId().survivors[myCurrentSurvIndex + 1])
      }
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
    else if (getHighestLevel() < 19) return 'yellow'
    else if (getHighestLevel() < 43) return 'orange'
    else return 'blue'
  }

  function attackZombie(zombieICanHit) {
    setSelectedZombie(zombieICanHit)
    setShowZombiesICanHit(false)
    socket.emit('ShowRollDices', true)
  }

  function callbackRollDice(diceValues) {
    setTimeout(() => {
      socket.emit('ShowRollDices', false)

      const canHit = diceValues.some(diceValue => {
        return diceValue >= currentSurvivor.inventory[indexOfCurrentItem].diceValueToHit
      })

      if (canHit && currentSurvivor.inventory[indexOfCurrentItem].damage >= selectedZombie.life) {
        socket.emit('KillZombie', selectedZombie)
        setShowZombiesICanHit(false)
      }
      socket.emit('VerifyWhoICanHit', indexOfCurrentItem)
    }, 2000);
  }

  function searchItem() {
    setHasAlreadySearchItem(true)

    socket.emit('SearchItem')
  }

  function openBox() {
    setSurvIsOnTunnedGunBox(false)

    socket.emit('OpenBox')
  }

  function collectGoal() {
    setSurvIsOnGoal(false)

    socket.emit('CollectGoal')
  }

  function onCarouselChange(currentIndex) {
    console.log(currentIndex);
    setIndexOfCurrentItem(currentIndex)

    socket.emit('VerifyWhoICanHit', currentIndex)
  }

  return (
    <div className='game'>
      <div className='game-status'>
        <div>Vez de {players.find(player => player.survivors.some(surv => surv.name === currentSurvivor?.name))?.name}</div>
        <div>{currentSurvivor?.name} Jogando... Restam {currentSurvivor?.actions} ações</div>
        <div>Nível atual do board: {getHighestLevel()} <div style={{ backgroundColor: getColorByLevel(), width: 20, height: 20 }}></div></div>
        {hasAlreadyCollectGoal && <div>Objetivo Coletado, FUJA!:</div>}
      </div>
      <div className='inventory'>
        <Carousel sx={{ width: '100%' }} index={indexOfCurrentItem} onChange={onCarouselChange} navButtonsAlwaysVisible={isMySurvPlaying()} animation="slide" autoPlay={false}>
          {currentSurvivor?.inventory?.map(item => <Card item={item} />)}
        </Carousel>
      </div>
      <div className="board">
        {board?.positions?.length > 0 && board?.positions?.map((position) => {
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
            color={survivor.color}
            survivor={survivor}
          />
        })}
        {board?.zombies?.map((zombie, index) => {
          const isOnFireline = zombiesICanHit.some(zombieICanHit => {
            return zombieICanHit.position.x === zombie.position.x && zombieICanHit.position.y === zombie.position.y && zombieICanHit.name === zombie.name
          })
          return <Zombie
            zombie={zombie}
            position={zombie.position}
            index={index + 1}
            isCurrentZombie={board?.currentZombieIndex === index}
            isOnFireline={isOnFireline}
          />
        })}
      </div>
      {isMySurvPlaying() && <Joystick onClick={moveSurvivor} />}
      <div className='my-survivors'>
        {getPlayerBySocketId()?.survivors?.map(surv => {
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
      {showZombiesICanHit &&
        <div className='zombies-i-can-hit'>
          {zombiesICanHit.map(zombieICanHit => {
            return (
              <Button onClick={() => attackZombie(zombieICanHit)} className='zombies-i-can-hit-zombie'>
                <div>{zombieICanHit.name}</div>
                <div>Vida: {zombieICanHit.life}</div>
                <div>Posição: x - {zombieICanHit.position.x} y - {zombieICanHit.position.y}</div>
              </Button>
            )
          })}
        </div>}
      {showDices &&
        <Dice
          isMySurvPlaying={isMySurvPlaying()}
          callbackRollDice={callbackRollDice}
          diceQuantity={currentSurvivor.inventory[indexOfCurrentItem].diceQuantity}
          socket={socket}
          indexOfCurrentItem={indexOfCurrentItem}
        />}
      {showEndGame &&
        <div className='endgame'>
          <div>
            {showEndGame}
          </div>
        </div>}
      <div className='action-buttons'>
        {canSelectNextSurvivor &&
          isMySurvPlaying() &&
          <Button
            onClick={selectNextSurv}
            className='next-surv'>
            {nextSurvButtonText}
          </Button>}
        {currentSurvivor?.actions > 0 &&
          isMySurvPlaying() &&
          zombiesICanHit.length > 0 &&
          <Button
            onClick={() => setShowZombiesICanHit(!showZombiesICanHit)}
            className='attack'>
            Atacar
          </Button>}

        {currentSurvivor?.actions > 0 &&
          survIsInBuilding &&
          !hasAlreadySearchItem &&
          isMySurvPlaying() &&
          <Button onClick={searchItem} className='search-item-button'>
            Procurar Item
          </Button>}
        {currentSurvivor?.actions > 0 &&
          survIsOnTunnedGunBox &&
          isMySurvPlaying() &&
          <Button onClick={openBox} className='open-box-button'>
            Abrir Caixa
          </Button>}
        {currentSurvivor?.actions > 0 &&
          survIsOnGoal &&
          isMySurvPlaying() &&
          <Button onClick={collectGoal} className='collect-goal-button'>
            Coletar Objetivo
          </Button>}
      </div>
    </div >
  )
}

