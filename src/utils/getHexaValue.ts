import { removeSpace } from "./removeSpace";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import {
  HEXA_STATS_MAIN,
  HEXA_STATS_SUB,
  SKILL_KEYS,
} from "@/constants/skills";
import { ICharacterHexaStat } from "@/types/characters/CharacterHexaStat";
import { addingMap } from "./addingMap";

//skills 상수와 연결되어서 POWER_RATE상수 사용하지 않음, map은 POWER_RATE상수와 동일하게 removeSpace함수로 공백제거
export const getHexaValue = (characterHexaStat: ICharacterHexaStat) => {
  const hexaStats = new Map<string, number>();
  if (characterHexaStat.character_class === null) {
    return { hexaStats };
  }
  const job = characterHexaStat.character_class;
  const mainStat = CHARACTER_CLASS.find((characterClass) =>
    characterClass.jobs.includes(job)
  )?.mainStat.toUpperCase();
  if (mainStat === undefined) {
    throw new Error("HexaStat mainStat is undefined");
  }

  const userHexaStats =
    characterHexaStat.character_hexa_stat_core !== null
      ? characterHexaStat.character_hexa_stat_core[0]
      : null;
  if (userHexaStats === null || userHexaStats === undefined) {
    return { hexaStats };
  }
  const mainStats = HEXA_STATS_MAIN.find(
    (hexaStat) => hexaStat.level === userHexaStats.main_stat_level
  )?.stats.find(
    (stat) =>
      replaceText(userHexaStats.main_stat_name, mainStat) === stat.statName
  );
  const subStatOne = HEXA_STATS_SUB.find(
    (hexaStat) => hexaStat.level === userHexaStats.sub_stat_level_1
  )?.stats.find(
    (stat) =>
      replaceText(userHexaStats.sub_stat_name_1, mainStat) === stat.statName
  );
  const subStatTwo = HEXA_STATS_SUB.find(
    (hexaStat) => hexaStat.level === userHexaStats.sub_stat_level_2
  )?.stats.find(
    (stat) =>
      replaceText(userHexaStats.sub_stat_name_2, mainStat) === stat.statName
  );
  //메인만 있고 서브는 없는 경우 있는지 검증 필요
  if (mainStats !== undefined) {
    addingMap(hexaStats, removeSpace(mainStats?.statName), mainStats?.value);
  }
  if (subStatOne !== undefined) {
    addingMap(hexaStats, removeSpace(subStatOne?.statName), subStatOne?.value);
  }
  if (subStatTwo !== undefined) {
    addingMap(hexaStats, removeSpace(subStatTwo?.statName), subStatTwo?.value);
  }
  return { hexaStats };
};

const replaceText = (inputString: string | null, mainStat: string) => {
  if (inputString === null) return null;
  inputString = inputString.replace(/\s/g, "").replace("증가", "");
  if (inputString === "보스데미지") {
    return SKILL_KEYS.boss_damage;
  }
  if (inputString === "크리티컬데미지") {
    return SKILL_KEYS.critical_damage;
  }
  if (inputString === "공격력") {
    return SKILL_KEYS.attack_power;
  }
  if (inputString === "마력") {
    return SKILL_KEYS.magic_power;
  }
  if (inputString === "데미지") {
    return SKILL_KEYS.damage;
  }
  if (inputString === "주력스탯") {
    return mainStat;
  }
};
