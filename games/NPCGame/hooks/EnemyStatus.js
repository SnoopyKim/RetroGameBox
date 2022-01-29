import { useReducer, useState } from 'react';

const MIN_HP = 0;
const MIN_ATTACK = 10;
const MIN_DEFENCE = 0;
const MAX_SPEED = 30;

const setHP = (value) => (value >= MIN_HP ? value : MIN_HP);
const setSpeed = (value) => (value >= MAX_SPEED ? value : MAX_SPEED);

const setLevel = (prev, value) => {
  const hp = Math.round(Math.random() * 50);
  let atk = 0,
    def = 0,
    sp = 0;
  switch (value % 3) {
    case 0:
      sp = 10;
      break;
    case 1:
      atk = Math.round(Math.random() * 3);
      break;
    case 2:
      def = Math.round(Math.random() * 3);
      break;
  }
  return {
    HP_MAX: prev.HP_MAX + hp,
    HP_CURRENT: prev.HP_MAX + hp,
    ATTACK_POWER: prev.ATTACK_POWER + atk,
    DEFENCE_POWER: prev.DEFENCE_POWER + def,
    SPEED: setSpeed(prev.SPEED - sp),
  };
};

const initStats = {
  HP_MAX: 100,
  HP_CURRENT: 100,
  ATTACK_POWER: MIN_ATTACK,
  DEFENCE_POWER: MIN_DEFENCE,
  SPEED: 120,
};

function enemyReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return initStats;
    case 'DAMAGE':
      return {
        ...state,
        HP_CURRENT: setHP(state.HP_CURRENT - action.value),
      };
    case 'LEVEL':
      return setLevel(state, action.value);
    default:
      return state;
  }
}

export function useEnemyStatus() {
  const [status, dispatch] = useReducer(enemyReducer, initStats);
  return [status, dispatch];
}
