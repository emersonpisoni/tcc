import './style.css'

export function SelectSurvivor({ survivors, onclick }) {
  return (
    <div>
      {survivors.map((survivor, index) =>
        <button
          key={`select-survivor-button${index}`}
          onClick={() => onclick(survivor.state.name)}
        >
          {survivor.state.name}
        </button>)}
    </div>
  )
}