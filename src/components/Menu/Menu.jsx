import './style.css'

import logo from '../../images/logo2.png'
import { useState } from 'react';
import { MenuOptions } from '../MenuOptions/MenuOptions';
import { ChooseRoom } from '../ChooseRoom/ChooseRoom';
import { ChooseSurvivors } from '../ChooseSurvivors/ChooseSurvivors';
import { useEffect } from 'react';

const MENU_STATE = {
  CHOOSE_NAME: 'CHOOSE_NAME',
  CHOOSE_ROOM: 'CHOOSE_ROOM',
  CHOOSE_SURVIVORS: 'CHOOSE_SURVIVORS',
}

export function Menu({ socket }) {
  const [stage, setStage] = useState(MENU_STATE.CHOOSE_NAME)
  const [name, setName] = useState('')

  useEffect(() => {
    socket.on('GoToChooseSurvivors', () => {
      setStage(MENU_STATE.CHOOSE_SURVIVORS)
    })
  }, [])

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onNextStep() {
    setStage(MENU_STATE.CHOOSE_ROOM)
  }

  function onGoToChooseSurvivors() {
    socket.emit('GoToChooseSurvivors')
  }

  return <div className='menu'>
    <div className='bg' />
    <img className='logo' src={logo} alt='logo' />
    {stage === MENU_STATE.CHOOSE_NAME && <MenuOptions name={name} onChangeName={onChangeName} onNextStep={onNextStep} />}
    {stage === MENU_STATE.CHOOSE_ROOM && <ChooseRoom socket={socket} name={name} onNext={onGoToChooseSurvivors} />}
    {stage === MENU_STATE.CHOOSE_SURVIVORS && <ChooseSurvivors socket={socket} name={name} />}
  </div>
}