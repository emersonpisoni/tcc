import { DIRECTIONS, MAP_POSITION_SIZE, MAP_POSITION_TYPE } from "../../utils/constants";
import streetImage from '../../images/street.jpg'
import buildingImage from '../../images/building.jpg'
import { Door } from "../Door/Door";
import './style.css'

export function MapPosition({ position: { type, mapPosition, canMoveTo, freeMoveTo, hasGoal, hasGunBox, evacuatePosition, zombieSpawnByRound } }) {
  return <div className="map-position" style={{
    backgroundImage: type === MAP_POSITION_TYPE.STREET ? `url(${streetImage})` : `url(${buildingImage})`,
    gridRow: mapPosition.x,
    gridColumn: mapPosition.y,
    width: MAP_POSITION_SIZE,
    height: MAP_POSITION_SIZE,
  }}>
    {Object.keys(DIRECTIONS).map((direction, index) => {
      return type === MAP_POSITION_TYPE.ROOM && !freeMoveTo.includes(direction) && <Door key={`door-${index}`} move={direction} canMoveTo={canMoveTo} />
    })}
    {hasGoal && <div className="map-position-goal">OBJETIVO</div>}
    {hasGunBox && <div className="map-position-gun-box">CAIXA DE ARMA TUNADA</div>}
    {evacuatePosition && <div className="map-position-evacuate">SAÍDA</div>}
    {zombieSpawnByRound && <div className="map-position-zombie_spawn">SPAWN ZUMBI</div>}
    {/* {canMoveTo.map((move, index) => type === MAP_POSITION_TYPE.ROOM && <Door key={`door-${index}`} move={move} />)} */}
  </div>
}


