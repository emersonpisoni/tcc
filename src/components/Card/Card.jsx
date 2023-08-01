import './style.css'

export function Card({ item }) {
  return (
    <div className="card">
      <div className="card-title">{item.name}</div>
      <div className="card-dice-infos">
        <div>Distância: {item.distanceToUse[0]} - {item.distanceToUse[1]} </div>
        <div>Quantidade de dados: {item.diceQuantity}</div>
        <div>Valor nos dados para hitar: {item.diceValueToHit}</div>
        <div>Dano: {item.damage}</div>
      </div>
    </div>
  )
}