import { DIRECTIONS, MAP_POSITION_TYPE } from "../utils/constants";

export function getSurvivorsJson() {
  return [
    {
      name: 'survivor1',
      position: [0, 0],
      color: 'white',
    },
    {
      name: 'survivor2',
      position: [0, 0],
      color: 'black',
    },
    {
      name: 'survivor3',
      position: [0, 0],
      color: 'green',
    },
    {
      name: 'survivor4',
      position: [0, 0],
      color: 'purple',
    },
    {
      name: 'survivor5',
      position: [0, 0],
      color: 'blue',
    },
    {
      name: 'survivor6',
      position: [0, 0],
      color: 'red',
    },
  ]
}

export function getMapJson() {
  return {
    initialSurvivorsPosition: [1, 3],
    positions: [
      {
        mapPosition: [1, 1],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [1, 2],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT],
        freeMoveTo: DIRECTIONS.DOWN,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [1, 3],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: true,
        zombieSpawnInitial: 2,
      },
      {
        mapPosition: [1, 4],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [1, 5],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.LEFT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: true,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [2, 1],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT],
        freeMoveTo: null,
        hasGoal: true,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [2, 2],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        freeMoveTo: DIRECTIONS.UP,
        hasGoal: false,
        hasGunBox: true,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [2, 3],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.UP, DIRECTIONS.DOWN],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 1,
      },
      {
        mapPosition: [2, 4],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.UP],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [2, 5],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [3, 1],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: true,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [3, 2],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [3, 3],
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 1,
      },
      {
        mapPosition: [3, 4],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: [3, 5],
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: null,
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
    ]
  }

}

