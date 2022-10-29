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
      console.log(players)
      setPlayers(players)
    })

    socket.on('PlayersRefresh', players => {
      setPlayers(players)
    })
  }, [])


  return <div className='choose-room'>
    <div className='room'>
      {players.map(player => <div key={player.socketId} className='room-player'>{player.name}</div>)}
    </div>
    {/* <Link className='start' to={`board`}> */}
    <Button onClick={onNext}>Start Game</Button>
    {/* </Link> */}
  </div>
}