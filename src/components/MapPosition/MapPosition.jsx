import { DIRECTIONS, MAP_POSITION_SIZE, MAP_POSITION_TYPE } from "../../utils/constants";
import './style.css'

export function MapPosition({ type, mapPosition, canMoveTo }) {
  return <div className="map-position" style={{
    backgroundColor: type === MAP_POSITION_TYPE.STREET ? '#d3d3d3' : '#00ff00',
    gridColumn: mapPosition[1],
    gridRow: mapPosition[0],
    width: MAP_POSITION_SIZE,
    height: MAP_POSITION_SIZE,
  }}>
    {canMoveTo.map((move) => <Door move={move} />)}
  </div>
}


function Door({ move }) {
  return <div className="door" style={{
    left: move === DIRECTIONS.LEFT && 0,
    right: move === DIRECTIONS.RIGHT && 0,
    top: move === DIRECTIONS.UP && 0,
    bottom: move === DIRECTIONS.DOWN && 0,
    width: [DIRECTIONS.DOWN, DIRECTIONS.UP].includes(move) && 30,
    height: [DIRECTIONS.LEFT, DIRECTIONS.RIGHT].includes(move) && 30,
  }}
  />
}

