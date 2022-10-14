import { DIRECTIONS, MAP_POSITION_TYPE } from "../utils/constants";

export function getSurvivorsJson() {
  return [
    {
      name: 'survivor1',
      position: {
        x: 0,
        y: 0
      },
      color: 'white',
    },
    {
      name: 'survivor2',
      position: {
        x: 0,
        y: 0
      },
      color: 'black',
    },
    {
      name: 'survivor3',
      position: {
        x: 0,
        y: 0
      },
      color: 'green',
    },
    {
      name: 'survivor4',
      position: {
        x: 0,
        y: 0
      },
      color: 'purple',
    },
    {
      name: 'survivor5',
      position: {
        x: 0,
        y: 0
      },
      color: 'blue',
    },
    {
      name: 'survivor6',
      position: {
        x: 0,
        y: 0
      },
      color: 'red',
    },
    {
      name: 'survivor7',
      position: {
        x: 0,
        y: 0
      },
      color: 'yellow',
    },
  ]
}

export function getMapJson() {
  return {
    initialSurvivorsPosition: {
      x: 3,
      y: 1
    },
    positions: [
      {
        mapPosition: {
          x: 1,
          y: 1
        },
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
        mapPosition: {
          x: 1,
          y: 2
        },
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
        mapPosition: {
          x: 1,
          y: 3
        },
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
        mapPosition: {
          x: 1,
          y: 4
        },
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
        mapPosition: {
          x: 1,
          y: 5
        },
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
        mapPosition: {
          x: 2,
          y: 1
        },
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
        mapPosition: {
          x: 2,
          y: 2
        },
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
        mapPosition: {
          x: 2,
          y: 3
        },
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
        mapPosition: {
          x: 2,
          y: 4
        },
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
        mapPosition: {
          x: 2,
          y: 5
        },
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
        mapPosition: {
          x: 3,
          y: 1
        },
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
        mapPosition: {
          x: 3,
          y: 2
        },
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
        mapPosition: {
          x: 3,
          y: 3
        },
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
        mapPosition: {
          x: 3,
          y: 4
        },
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
        mapPosition: {
          x: 3,
          y: 5
        },
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

