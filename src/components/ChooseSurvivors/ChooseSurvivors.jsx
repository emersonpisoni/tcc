import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSurvivorsJson, getSurvivorsToChoose } from '../../api/api'
import { Button } from '../Button/Button'
import './style.css'

export function ChooseSurvivors({ socket }) {
  const navigate = useNavigate()

  const [players, setPlayers] = useState([])
  const [availableSurvivors, setAvailableSurvivors] = useState([])

  const disableStartGameButton = players.map(player => player.survivors.length)?.reduce((total, num) => total + num, 0) < 6

  useEffect(() => {
    socket.emit('GetAvailableSurvivors')

    socket.on('SendAvailableSurvivors', (survivors, players) => {
      setAvailableSurvivors(survivors)
      setPlayers(players)
    })

    socket.on('UpdateAddSurvivorsToPlay', (players) => {
      setPlayers(players)
    })

    socket.on('StartGame', () => {
      navigate('/board')
    })
  }, [])

  function onChooseSurvivor(availableSurvivor) {
    socket.emit('AddSurvivorToPlayer', availableSurvivor)
  }

  return (
    <>
      <div className='survivor-select'>
        {availableSurvivors.map(availableSurvivor => {
          const playerWithThisSurvivor = players.find(player => player.survivors.some(survivor => survivor.name === availableSurvivor.name))
          const isSelected = playerWithThisSurvivor?.socketId === socket.id ? 'selected-by-me' : 'selected-by-other'

          return (
            <button
              disabled={playerWithThisSurvivor && isSelected === 'selected-by-other'}
              className={`available-survivor ${playerWithThisSurvivor && isSelected}`}
              onClick={() => onChooseSurvivor((availableSurvivor))}
            >
              <div>Nome: {availableSurvivor.name}</div>
              <div>Vida: {availableSurvivor.life}</div>
              <div>{availableSurvivor.isChild && '(▀̿Ĺ̯▀̿ ̿)'}</div>
              {/* <div>{availableSurvivor.inventory}</div> */}
              {/* <div>{availableSurvivor.level}</div> */}
              {/* <div>{availableSurvivor.abilities.map(ability => {
              return (
                <div className='available-survivor-ability'>
                  {ability.name}
                  {ability.level}
                </div>
              )
            })}</div> */}
            </button>
          )
        })}
      </div>
      <div className='survivors-selected'>
        {players.map(player => {
          return (
            <div className='survivors-selected-by-player'>
              {player.name}
              {player.survivors.map(survivor => {
                return (
                  <div>
                    {survivor.name}
                    {survivor.life}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      {/* <Link className='start' to={`/board`}> */}
      <Button onClick={() => socket.emit('StartGame')} disabled={disableStartGameButton} className='survivor-select-button'>
        Iniciar Jogo
      </Button>
      {/* </Link> */}
    </>
  )
}