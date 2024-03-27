import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { extractValue } from "./extractValue";
import { SKILL_KEYS } from "@/constants/skills";
import { checkSameClassInUnion } from "./getCheckSameClassInUnion";
import { addingMap } from "./addingMap";
import { removeSpace } from "./removeSpace";
import { POWER_RATE } from "@/constants/powerRate";

export const getUnionValue = (
  selectedUnionRaider: ICharacterUnionRaider["union_raider_preset_1"]
) => {
  const unionStats = new Map<string, number>();
  const exceptUnionStats = new Map<string, number>();
  let str = 0;
  let dex = 0;
  let int = 0;
  let luk = 0;
  let attackPower = 0;
  let magicPower = 0;
  let bossDamage = 0;
  let damage = 0;
  let criticalDamage = 0;

  selectedUnionRaider.union_occupied_stat.forEach((effect) => {
    // str += extractValue(unionEffect, "STR ", " 증가");
    // dex += extractValue(unionEffect, "DEX ", " 증가");
    // int += extractValue(unionEffect, "INT ", " 증가");
    // luk += extractValue(unionEffect, "LUK ", " 증가");
    const unionEffect = removeSpace(effect);
    attackPower += extractValue(
      unionEffect,
      `${POWER_RATE.attack_power}`,
      "증가"
    );
    magicPower += extractValue(
      unionEffect,
      `${POWER_RATE.magic_power}`,
      "증가"
    );
    bossDamage += extractValue(
      unionEffect,
      `${POWER_RATE.boss_damage}`,
      "%증가"
    );
    damage += extractValue(unionEffect, `${POWER_RATE.damage}`, "%증가");
    criticalDamage += extractValue(
      unionEffect,
      `${POWER_RATE.critical_damage}`,
      "%증가"
    );
  });

  selectedUnionRaider.union_raider_stat.forEach((effect) => {
    const unionEffect = removeSpace(effect);
    if (unionEffect.startsWith("공격력/마력")) {
      attackPower += extractValue(unionEffect, "공격력/마력", "증가");
      magicPower += extractValue(unionEffect, "공격력/마력", "증가");
    }
    str += extractStatBlockUnionValue(unionEffect, "STR");
    dex += extractStatBlockUnionValue(unionEffect, "DEX");
    int += extractValue(unionEffect, "INT", "증가");
    luk += extractStatBlockUnionValue(unionEffect, "LUK");
    attackPower += extractValue(
      unionEffect,
      `${POWER_RATE.attack_power}`,
      "증가"
    );
    magicPower += extractValue(
      unionEffect,
      `${POWER_RATE.magic_power}`,
      "증가"
    );
    bossDamage += extractValue(
      unionEffect,
      `${POWER_RATE.boss_damage}`,
      "%증가"
    );
    damage += extractValue(unionEffect, `${POWER_RATE.damage}`, "%증가");
    criticalDamage += extractValue(
      unionEffect,
      `${POWER_RATE.critical_damage}`,
      "%증가"
    );
  });
  //API초기엔 중복 유니온 블럭 제거 로직이 없어서 직접 구현했으나 API버전업으로 인해 중복제거 로직이 추가되어 주석처리
  // const sameEffects = checkSameClassInUnion(characterUnionRaider);
  // sameEffects.forEach((effect) => {
  //   if (effect === undefined) return;
  //   if (effect.startsWith("공격력/마력 ")) {
  //     attackPower -= extractValue(effect, "공격력/마력 ", " 증가");
  //     magicPower -= extractValue(effect, "공격력/마력 ", " 증가");
  //   }
  //   str -= extractValue(effect, "STR ", " 증가");
  //   dex -= extractValue(effect, "DEX ", " 증가");
  //   int -= extractValue(effect, "INT ", " 증가");
  //   luk -= extractValue(effect, "LUK ", " 증가");
  //   attackPower -= extractValue(effect, "공격력 ", " 증가");
  //   magicPower -= extractValue(effect, "마력 ", " 증가");
  //   bossDamage -= extractValue(effect, "보스 몬스터 공격 시 데미지 ", "% 증가");
  //   damage -= extractValue(effect, "몬스터 공격 시 데미지 ", "% 증가");
  //   criticalDamage -= extractValue(effect, "크리티컬 데미지 ", "% 증가");
  // });

  addingMap(exceptUnionStats, "STR", str);
  addingMap(exceptUnionStats, "DEX", dex);
  addingMap(exceptUnionStats, "INT", int);
  addingMap(exceptUnionStats, "LUK", luk);
  addingMap(unionStats, POWER_RATE.attack_power, attackPower);
  addingMap(unionStats, POWER_RATE.magic_power, magicPower);
  addingMap(unionStats, POWER_RATE.boss_damage, bossDamage);
  addingMap(unionStats, POWER_RATE.damage, damage);
  addingMap(unionStats, POWER_RATE.critical_damage, criticalDamage);

  return {
    unionStats,
    exceptUnionStats,
  };
};

const extractStatBlockUnionValue = (
  inputString: string,
  targetStat: string | null
) => {
  const prefix = `${targetStat?.toUpperCase()}`;
  const suffix = "증가";
  const expectPrefix = "STR,DEX,LUK";
  if (inputString.startsWith(expectPrefix)) {
    const valueString = inputString.substring(expectPrefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return extractValue(inputString, prefix, suffix);
};
