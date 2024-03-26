import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { extractValue } from "./extractValue";
import { SKILL_KEYS } from "@/constants/skills";
import { checkSameClassInUnion } from "./getCheckSameClassInUnion";
import { addingMap } from "./addingMap";

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

  selectedUnionRaider.union_occupied_stat.forEach((unionEffect) => {
    // str += extractValue(unionEffect, "STR ", " 증가");
    // dex += extractValue(unionEffect, "DEX ", " 증가");
    // int += extractValue(unionEffect, "INT ", " 증가");
    // luk += extractValue(unionEffect, "LUK ", " 증가");
    attackPower += extractValue(
      unionEffect,
      `${SKILL_KEYS.attack_power} `,
      " 증가"
    );
    magicPower += extractValue(
      unionEffect,
      `${SKILL_KEYS.magic_power} `,
      " 증가"
    );
    bossDamage += extractValue(
      unionEffect,
      `${SKILL_KEYS.boss_damage} `,
      "% 증가"
    );
    damage += extractValue(unionEffect, `${SKILL_KEYS.damage} `, "% 증가");
    criticalDamage += extractValue(
      unionEffect,
      `${SKILL_KEYS.critical_damage} `,
      "% 증가"
    );
  });
  console.log("selectedUnionRaider", selectedUnionRaider);
  console.log(selectedUnionRaider.union_occupied_stat);
  console.log("1", attackPower, magicPower, bossDamage, damage, criticalDamage);

  selectedUnionRaider.union_raider_stat.forEach((unionEffect) => {
    if (unionEffect.startsWith("공격력/마력 ")) {
      attackPower += extractValue(unionEffect, "공격력/마력 ", " 증가");
      magicPower += extractValue(unionEffect, "공격력/마력 ", " 증가");
    }
    str += extractStatBlockUnionValue(unionEffect, "STR");
    dex += extractStatBlockUnionValue(unionEffect, "DEX");
    int += extractValue(unionEffect, "INT ", " 증가");
    luk += extractStatBlockUnionValue(unionEffect, "LUK");
    attackPower += extractValue(
      unionEffect,
      `${SKILL_KEYS.attack_power} `,
      " 증가"
    );
    magicPower += extractValue(
      unionEffect,
      `${SKILL_KEYS.magic_power} `,
      " 증가"
    );
    bossDamage += extractValue(
      unionEffect,
      `${SKILL_KEYS.boss_damage} `,
      "% 증가"
    );
    damage += extractValue(unionEffect, `${SKILL_KEYS.damage} `, "% 증가");
    criticalDamage += extractValue(
      unionEffect,
      `${SKILL_KEYS.critical_damage} `,
      "% 증가"
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
  addingMap(unionStats, SKILL_KEYS.attack_power, attackPower);
  addingMap(unionStats, SKILL_KEYS.magic_power, magicPower);
  addingMap(unionStats, SKILL_KEYS.boss_damage, bossDamage);
  addingMap(unionStats, SKILL_KEYS.damage, damage);
  addingMap(unionStats, SKILL_KEYS.critical_damage, criticalDamage);
  console.log(unionStats, exceptUnionStats);
  return {
    unionStats,
    exceptUnionStats,
  };
};

const extractStatBlockUnionValue = (
  inputString: string,
  targetStat: string | null
) => {
  const prefix = `${targetStat?.toUpperCase()} `;
  const suffix = " 증가";
  const expectPrefix = "STR, DEX, LUK ";
  if (inputString.startsWith(expectPrefix)) {
    const valueString = inputString.substring(expectPrefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return extractValue(inputString, prefix, suffix);
};
