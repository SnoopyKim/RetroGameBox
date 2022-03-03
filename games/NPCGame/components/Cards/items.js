const NORMAL_CARDS = [
  {
    title: '금주',
    content: '체력 50 증가',
    value: {
      hp: 50,
    },
  },
  {
    title: '전완근 단련',
    content: '공격력 3 증가',
    value: {
      ap: 3,
    },
  },

  {
    title: '핫식스 중독',
    content: '딜레이 10 감소',
    value: {
      sp: -10,
    },
  },
  {
    title: '안 아프게 맞는 법!',
    content: '방어력 3 증가',
    value: {
      dp: 3,
    },
  },
  {
    title: '삼시세끼 챙겨먹기',
    content: '체력 20 증가\n공격력 1 증가\n방어력 1 증가',
    value: {
      hp: 20,
      ap: 1,
      dp: 1,
    },
  },
];
export const drawNormalCard = (except = []) => {
  let card;
  do {
    const rand = Math.floor(Math.random() * NORMAL_CARDS.length);
    card = NORMAL_CARDS[rand];
  } while (except.findIndex((v) => v.title === card.title) !== -1);
  return { CLASS: 'N', ...card };
};

const RARE_CARDS = [
  {
    title: '금연',
    content: '체력 100 증가',
    value: {
      hp: 100,
    },
  },
  {
    title: '대흉근 단련',
    content: '공격력 5 증가',
    value: {
      ap: 5,
    },
  },
  {
    title: '코어근육 강화',
    content: '공격력 2 증가\n딜레이 10 감소',
    value: {
      ap: 2,
      sp: -10,
    },
  },
  {
    title: '급소 노리기',
    content: '치명타율 10 증가',
    value: {
      ct: 10,
    },
  },
  {
    title: '무장색',
    content: '방어력 5 증가',
    value: {
      dp: 5,
    },
  },
];
export const drawRareCard = (except = []) => {
  let card;
  do {
    const rand = Math.floor(Math.random() * RARE_CARDS.length);
    card = RARE_CARDS[rand];
  } while (except.findIndex((v) => v.title === card.title) !== -1);
  return { CLASS: 'R', ...card };
};

const EPIC_CARDS = [
  {
    title: '스테로이드 투여',
    content: '체력 100 증가\n방어력 3 증가',
    value: {
      hp: 100,
      dp: 3,
    },
  },
  {
    title: '백안',
    content: '치명타율 20 증가',
    value: {
      ct: 20,
    },
  },
  {
    title: '사륜안',
    content: '공격력 5 증가\n치명타율 10 증가',
    value: {
      ap: 5,
      ct: 10,
    },
  },
];
export const drawEpicCard = (except = []) => {
  let card;
  do {
    const rand = Math.floor(Math.random() * EPIC_CARDS.length);
    card = EPIC_CARDS[rand];
  } while (except.findIndex((v) => v.title === card.title) !== -1);
  return { CLASS: 'E', ...card };
};

export const drawRandomCards = (count) => {
  let results = [];
  for (let i = 0; i < count; i++) {
    const rate = Math.random() * 100;
    let card;
    if (rate > 90) {
      card = drawEpicCard(results);
    } else if (rate > 60) {
      card = drawRareCard(results);
    } else {
      card = drawNormalCard(results);
    }
    results.push(card);
  }
  return results;
};
