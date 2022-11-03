import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
import './style.css'

export function ChooseRoom({ socket, name, onNext }) {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    socket.emit('AddPlayer', name)

    socket.on('PlayersConnected', (players) => {
      setPlayers(players)
    })

    socket.on('UpdatePlayers', players => {
      setPlayers(players)
    })
  }, [])


  return <div className='choose-room'>
    <div className='room'>
      <span className='room-name'>Sala</span>
      {players.map((player, i) => <div key={player.socketId} className='room-player'>{`Jogador ${i + 1}: ${player.name}`}</div>)}
    </div>
    {/* <Link className='start' to={`board`}> */}
    <Button onClick={onNext}>Start Game</Button>
    {/* </Link> */}
  </div>
}