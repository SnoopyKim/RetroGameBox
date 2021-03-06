import { useReducer, useState } from 'react';

const MIN_HP = 0;
const MIN_ATTACK = 10;
const MIN_DEFENCE = 0;
const MAX_SPEED = 30;
const MAX_CRITICAL = 100;
const MIN_CRITICAL = 10;

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
      const damage = action.value - state.DEFENCE_POWER;
      if (damage > 0) {
        return {
          ...state,
          HP_CURRENT: setHP(state.HP_CURRENT - damage),
        };
      } else {
        return state;
      }
    case 'CHANGE':
      const { hp, ap, dp, sp, ct } = action.value;
      return {
        ...state,
        HP_MAX: hp ? setHP(state.HP_MAX + hp) : state.HP_MAX,
        HP_CURRENT: hp ? setHP(state.HP_MAX + hp) : state.HP_MAX,
        ATTACK_POWER: ap
          ? setAttack(state.ATTACK_POWER + ap)
          : state.ATTACK_POWER,
        DEFENCE_POWER: dp
          ? setDefence(state.DEFENCE_POWER + dp)
          : state.DEFENCE_POWER,
        SPEED: sp ? setSpeed(state.SPEED + sp) : state.SPEED,
        CRITICAL: ct ? setCritical(state.CRITICAL + ct) : state.CRITICAL,
      };
    case 'RECOVER':
      return {
        ...state,
        HP_CURRENT: state.HP_MAX,
      };
    default:
      return state;
  }
}

export function usePlayerStatus() {
  const [status, dispatch] = useReducer(playerReducer, initStats);
  return [status, dispatch];
}
