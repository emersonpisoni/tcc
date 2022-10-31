import { Button } from '../Button/Button'
import './style.css'

export function SelectSurvivor({ survivors, onclick }) {
  return (
    <div className='select-surv'>
      {survivors.map((survivor, index) =>
        <Button
          className='select-surv-button'
          key={`select-survivor-button${index}`}
          onClick={() => onclick(survivor)}
        >
          {survivor.name}
        </Button>)}
    </div>
  )
}