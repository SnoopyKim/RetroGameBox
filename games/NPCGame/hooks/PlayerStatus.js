import { useReducer, useState } from 'react';

const MIN_HP = 0;
const MIN_ATTACK = 10;
const MIN_DEFENCE = 0;
const MAX_SPEED = 30;
const MAX_CRITICAL = 100;
const MIN_CRITICAL = 0;

const setHP = (value) => (value >= MIN_HP ? value : MIN_HP);
const setAttack = (value) => (value >= MIN_ATTACK ? value : MIN_ATTACK);
const setDefence = (value) => (value >= MIN_DEFENCE ? value : MIN_DEFENCE);

const setSpeed = (value) => (value >= MAX_SPEED ? value : MAX_SPEED);

const setCritical = (value) =>
  value >= MIN_CRITICAL
    ? value <= MAX_CRITICAL
      ? value
      : MAX_CRITICAL
    : MIN_CRITICAL;

const initStats = {
  HP_MAX: 100,
  HP_CURRENT: 100,
  ATTACK_POWER: MIN_ATTACK,
  DEFENCE_POWER: MIN_DEFENCE,
  SPEED: 120,
  CRITICAL: MIN_CRITICAL,
  SPECIAL: [],
};

function playerReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return initStats;
    case 'DAMAGE':
      return {
        ...state,
        HP_CURRENT: setHP(state.HP_CURRENT - action.value),
      };
    case 'CHANGE':
      return {
        ...state,
        HP_MAX: action.hp ? setHP(state.HP_MAX + action.hp) : state.HP_MAX,
        HP_CURRENT: action.hp ? setHP(state.HP_MAX + action.hp) : state.HP_MAX,
        ATTACK_POWER: action.ap
          ? setAttack(state.ATTACK_POWER + action.ap)
          : state.ATTACK_POWER,
        DEFENCE_POWER: action.dp
          ? setDefence(state.DEFENCE_POWER + action.dp)
          : state.DEFENCE_POWER,
        SPEED: action.sp ? setSpeed(state.SPEED + action.sp) : state.SPEED,
        CRITICAL: action.ct
          ? setCritical(state.CRITICAL + action.ct)
          : state.CRITICAL,
      };
    default:
      return state;
  }
}

export function usePlayerStatus() {
  const [status, dispatch] = useReducer(playerReducer, initStats);
  return [status, dispatch];
}
