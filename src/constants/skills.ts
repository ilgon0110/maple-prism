export const SKILL_KEYS = {
  attack_power: "공격력",
  magic_power: "마력",
  damage: "데미지",
  boss_damage: "보스 몬스터 공격 시 데미지",
  critical_damage: "크리티컬 데미지",
};

export const LINK_SKILLS = [
  {
    name: "와일드 레이지",
    key: SKILL_KEYS.damage,
    values: [
      { level: 1, value: 5 },
      { level: 2, value: 10 },
    ],
  },
  {
    name: "데몬스 퓨리",
    key: SKILL_KEYS.boss_damage,
    values: [
      { level: 1, value: 10 },
      { level: 2, value: 15 },
    ],
  },
  {
    name: "판단",
    key: SKILL_KEYS.critical_damage,
    values: [
      { level: 1, value: 2 },
      { level: 2, value: 4 },
    ],
  },
  {
    name: "자연의 벗",
    key: SKILL_KEYS.damage,
    values: [
      { level: 1, value: 3 },
      { level: 2, value: 5 },
    ],
  },
  {
    name: "이네이트 기프트",
    key: SKILL_KEYS.damage,
    values: [
      { level: 1, value: 5 },
      { level: 2, value: 5 },
    ],
  },
  {
    name: "시그너스 블레스",
    keys: [SKILL_KEYS.attack_power, SKILL_KEYS.magic_power],
    values: [
      { level: 1, value: 7 },
      { level: 2, value: 9 },
      { level: 3, value: 11 },
      { level: 4, value: 13 },
      { level: 5, value: 15 },
      { level: 6, value: 17 },
      { level: 7, value: 19 },
      { level: 8, value: 21 },
      { level: 9, value: 23 },
      { level: 10, value: 25 },
    ],
  },
];

const getUpStats = (stat: string, isMain: boolean) => {
  if (stat === SKILL_KEYS.critical_damage) {
    if (!isMain) return [0.35, 0.35, 0.35, 0.35];
    return [0.35, 0.7, 1.05, 1.4];
  } else if (stat === SKILL_KEYS.boss_damage) {
    if (!isMain) return [1, 1, 1, 1];
    return [1, 2, 3, 4];
  } else if (stat === SKILL_KEYS.damage) {
    if (!isMain) return [0.75, 0.75, 0.75, 0.75];
    return [0.75, 1.5, 2.25, 3];
  } else if (
    stat === SKILL_KEYS.attack_power ||
    stat === SKILL_KEYS.magic_power
  ) {
    if (!isMain) return [5, 5, 5, 5];
    return [5, 10, 15, 20];
  } else if (
    stat === "STR" ||
    stat === "DEX" ||
    stat === "INT" ||
    stat === "LUK"
  ) {
    if (!isMain) return [100, 100, 100, 100];
    return [100, 200, 300, 400];
  }
};

const createHexaStat = (
  nowLevel: number,
  value: number,
  stat: string,
  isMain: boolean
) => {
  const upStats = getUpStats(stat, isMain);
  if (upStats === undefined) return 0;
  if (nowLevel >= 2 && nowLevel <= 4) {
    return +(value + upStats[0]).toFixed(2);
  } else if (nowLevel >= 5 && nowLevel <= 7) {
    return +(value + upStats[1]).toFixed(2);
  } else if (nowLevel >= 8 && nowLevel <= 9) {
    return +(value + upStats[2]).toFixed(2);
  }
  return +(value + upStats[3]).toFixed(2);
};

export const HEXA_STATS_MAIN = [
  {
    type: "main",
    level: 1,
    stats: [
      {
        statName: SKILL_KEYS.critical_damage,
        value: 0.35,
      },
      {
        statName: SKILL_KEYS.boss_damage,
        value: 1,
      },
      {
        statName: SKILL_KEYS.damage,
        value: 0.75,
      },
      {
        statName: SKILL_KEYS.attack_power,
        value: 5,
      },
      {
        statName: SKILL_KEYS.magic_power,
        value: 5,
      },
      {
        statName: "STR",
        value: 100,
      },
      {
        statName: "DEX",
        value: 100,
      },
      {
        statName: "INT",
        value: 100,
      },
      {
        statName: "LUK",
        value: 100,
      },
    ],
  },
];

export const HEXA_STATS_SUB = [
  {
    type: "sub",
    level: 1,
    stats: [
      {
        statName: SKILL_KEYS.critical_damage,
        value: 0.35,
      },
      {
        statName: SKILL_KEYS.boss_damage,
        value: 1,
      },
      {
        statName: SKILL_KEYS.damage,
        value: 0.75,
      },
      {
        statName: SKILL_KEYS.attack_power,
        value: 5,
      },
      {
        statName: SKILL_KEYS.magic_power,
        value: 5,
      },
      {
        statName: "STR",
        value: 100,
      },
      {
        statName: "DEX",
        value: 100,
      },
      {
        statName: "INT",
        value: 100,
      },
      {
        statName: "LUK",
        value: 100,
      },
    ],
  },
];

for (let i = 1; i <= 9; i++) {
  const nowLevel = i + 1;
  HEXA_STATS_MAIN.push({
    type: "main",
    level: i + 1,
    stats: [
      {
        statName: SKILL_KEYS.critical_damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[0].value,
          SKILL_KEYS.critical_damage,
          true
        ),
      },
      {
        statName: SKILL_KEYS.boss_damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[1].value,
          SKILL_KEYS.boss_damage,
          true
        ),
      },
      {
        statName: SKILL_KEYS.damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[2].value,
          SKILL_KEYS.damage,
          true
        ),
      },
      {
        statName: SKILL_KEYS.attack_power,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[3].value,
          SKILL_KEYS.attack_power,
          true
        ),
      },
      {
        statName: SKILL_KEYS.magic_power,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[4].value,
          SKILL_KEYS.magic_power,
          true
        ),
      },
      {
        statName: "STR",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[5].value,
          "STR",
          true
        ),
      },
      {
        statName: "DEX",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[6].value,
          "DEX",
          true
        ),
      },
      {
        statName: "INT",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[7].value,
          "INT",
          true
        ),
      },
      {
        statName: "LUK",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_MAIN[i - 1].stats[8].value,
          "LUK",
          true
        ),
      },
    ],
  });
  HEXA_STATS_SUB.push({
    type: "sub",
    level: i + 1,
    stats: [
      {
        statName: SKILL_KEYS.critical_damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[0].value,
          SKILL_KEYS.critical_damage,
          false
        ),
      },
      {
        statName: SKILL_KEYS.boss_damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[1].value,
          SKILL_KEYS.boss_damage,
          false
        ),
      },
      {
        statName: SKILL_KEYS.damage,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[2].value,
          SKILL_KEYS.damage,
          false
        ),
      },
      {
        statName: SKILL_KEYS.attack_power,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[3].value,
          SKILL_KEYS.attack_power,
          false
        ),
      },
      {
        statName: SKILL_KEYS.magic_power,
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[4].value,
          SKILL_KEYS.magic_power,
          false
        ),
      },
      {
        statName: "STR",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[5].value,
          "STR",
          false
        ),
      },
      {
        statName: "DEX",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[6].value,
          "DEX",
          false
        ),
      },
      {
        statName: "INT",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[7].value,
          "INT",
          false
        ),
      },
      {
        statName: "LUK",
        value: createHexaStat(
          nowLevel,
          HEXA_STATS_SUB[i - 1].stats[8].value,
          "LUK",
          false
        ),
      },
    ],
  });
}
