import { DIRECTIONS, MAP_POSITION_TYPE } from "../utils/constants";

export function items() {
  return [
    {
      name: 'PISTOLA',
      canBeDouble: true,
      distanceToUse: [0, 1],
      diceQuantity: 1,
      diceValueToHit: 3,
      damage: 1,
      makeNoiseOnDoors: false,
      makeNoiseOnZombies: true,
      munitionType: 'BULLETS',
      canBrokeDoors: false,
    },
    {
      name: 'MACHADO',
      canBeDouble: false,
      distanceToUse: [0, 0],
      diceQuantity: 1,
      diceValueToHit: 4,
      damage: 2,
      makeNoiseOnDoors: true,
      makeNoiseOnZombies: false,
      munitionType: null,
      canBrokeDoors: false,
    },
    {
      name: 'MOTOSERRA',
      canBeDouble: false,
      distanceToUse: [0, 0],
      diceQuantity: 5,
      diceValueToHit: 5,
      damage: 2,
      makeNoiseOnDoors: true,
      makeNoiseOnZombies: true,
      munitionType: null,
      canBrokeDoors: true,
    },
  ]
}

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
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
        walls: [DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
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
        walls: [DIRECTIONS.RIGHT],
        freeMoveTo: [DIRECTIONS.DOWN],
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
        walls: [DIRECTIONS.LEFT],
        freeMoveTo: [],
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
        walls: [],
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [DIRECTIONS.UP],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
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
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
    ]
  }

}

