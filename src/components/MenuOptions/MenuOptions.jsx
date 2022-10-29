import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Button/Button'
import { Input } from '../Input/Input'
import { Spacer } from '../Spacer/Spacer'
import './style.css'

export function MenuOptions({ name, onChangeName, onNextStep }) {

  return <div className='options'>
    <Input value={name} onChange={onChangeName} />
    <Spacer height={20} />
    <Button disabled={!name} onClick={onNextStep}>Próximo...</Button>
  </div>
}