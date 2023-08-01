import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSurvivorsJson, getSurvivorsToChoose } from '../../api/api'
import { Button } from '../Button/Button'
import { Spacer } from '../Spacer/Spacer'
import './style.css'

export function ChooseSurvivors({ socket }) {
  const navigate = useNavigate()

  const [players, setPlayers] = useState([])
  const [allSelecteds, setAllSelecteds] = useState(false)
  const [availableSurvivors, setAvailableSurvivors] = useState([])

  const disableStartGameButton = players.map(player => player.survivors.length)?.reduce((total, num) => total + num, 0) < 6

  useEffect(() => {
    socket.emit('GetAvailableSurvivors')

    socket.on('SendAvailableSurvivors', (survivors, players) => {
      setAvailableSurvivors(survivors)
      setPlayers(players)
    })

    socket.on('UpdateAddSurvivorsToPlay', (players, hasSixSurvs) => {
      setAllSelecteds(hasSixSurvs)
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
              disabled={(playerWithThisSurvivor && isSelected === 'selected-by-other') || (!playerWithThisSurvivor && allSelecteds)}
              className={`available-survivor ${(playerWithThisSurvivor && isSelected) || (!playerWithThisSurvivor && allSelecteds && 'selected-by-other')}`}
              onClick={() => onChooseSurvivor((availableSurvivor))}
            >
              <div className='available-survivor-left'>
                <div className='available-survivor-name'>
                  {availableSurvivor.name}
                </div>
                <div className='available-survivor-abilities'>
                  {availableSurvivor.abilities.map(ability => {
                    return (
                      <div className='available-survivor-ability'>
                        <div style={{ width: 20, height: 20, backgroundColor: ability.level, borderRadius: 20 }} />
                        <Spacer width={10} />
                        <div>{ability.name}</div>
                      </div>
                    )
                  })}</div>
              </div>
              <Spacer width={30} />
              <div className='available-survivor-right'>
                <div>{availableSurvivor.isChild && '(▀̿Ĺ̯▀̿ ̿)'}</div>
                <div className='available-survivor-life'>
                  {Array.from({ length: availableSurvivor.life + 1 }, (_, i) => i).map((value) => {
                    return <div style={{ backgroundColor: value === 0 ? 'black' : '' }}>{value}</div>
                  })}</div>
              </div>
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