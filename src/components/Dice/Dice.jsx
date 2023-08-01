import { useEffect, useState } from 'react';
import './style.css'

export function Dice({ callbackRollDice, diceQuantity, socket, isMySurvPlaying, indexOfCurrentItem }) {
  const [showRollDiceButton, setShowDiceButton] = useState(true)

  useEffect(() => {
    socket.on('RollDices', diceValues => {
      rollPredefinedDices(diceValues)
    })

    return () => {
      socket.off('RollDices')
    }
  }, [])

  function rollPredefinedDices(diceValues) {
    const dice = [...document.querySelectorAll(".die-list")];
    dice.forEach((die, index) => {
      toggleClasses(die);
      const randomNumber = diceValues[index]
      die.dataset.roll = randomNumber
    });
  }

  function rollDice() {
    setShowDiceButton(false)
    const dice = [...document.querySelectorAll(".die-list")];
    const diceValues = dice.map(die => {
      toggleClasses(die);
      const randomNumber = getRandomNumber(1, 6)
      // const randomNumber = 6
      die.dataset.roll = randomNumber
      return randomNumber
    });
    socket.emit('RollDices', diceValues, indexOfCurrentItem)
    callbackRollDice(diceValues)
  }

  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className='dice-container'>
      <div class="dice">
        {Array.from({ length: diceQuantity }, (_, i) => i).map(dice => {
          return (
            <ol class="die-list even-roll" data-roll="1" id="die-1">
              <li class="die-item" data-side="1">
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="2">
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="3">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="4">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="5">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
              <li class="die-item" data-side="6">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </li>
            </ol>
          )
        })}
      </div>
      {showRollDiceButton && isMySurvPlaying && <button onClick={rollDice} type="button" id="roll-button">Roll Dice</button>}
    </div>
  )
}