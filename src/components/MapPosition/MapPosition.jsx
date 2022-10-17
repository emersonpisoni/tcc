import { DIRECTIONS, MAP_POSITION_SIZE, MAP_POSITION_TYPE } from "../../utils/constants";
import streetImage from '../../images/street.jpg'
import buildingImage from '../../images/building.jpg'
import { Door } from "../Door/Door";
import './style.css'

export function MapPosition({ type, mapPosition, canMoveTo, freeMoveTo }) {
  return <div className="map-position" style={{
    // backgroundColor: type === MAP_POSITION_TYPE.STREET ? '#d3d3d3' : '#00ff00',
    backgroundImage: type === MAP_POSITION_TYPE.STREET ? `url(${streetImage})` : `url(${buildingImage})`,
    gridRow: mapPosition.x,
    gridColumn: mapPosition.y,
    width: MAP_POSITION_SIZE,
    height: MAP_POSITION_SIZE,
  }}>
    {Object.keys(DIRECTIONS).map((direction, index) => {
      return type === MAP_POSITION_TYPE.ROOM && !freeMoveTo.includes(direction) && <Door key={`door-${index}`} move={direction} canMoveTo={canMoveTo} />
    })}
    {/* {canMoveTo.map((move, index) => type === MAP_POSITION_TYPE.ROOM && <Door key={`door-${index}`} move={move} />)} */}
  </div>
}


