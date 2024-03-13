import { ICharacterAbility } from "@/types/characters/CharacterAbility";
import { extractValue } from "./extractValue";
import { ICharacterStat } from "@/types/characters/CharacterStat";
import { SKILL_KEYS } from "@/constants/skills";
import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import { addingMap } from "./addingMap";

export const getAbilityValue = (
  characterAbility: ICharacterAbility,
  characterStat: ICharacterStat,
  characterBasicInfo: ICharacterBasicInfo
) => {
  const baseStats = new Map<string, number>();
  const exceptStats = new Map<string, number>();
  characterAbility.ability_info.forEach((ability) => {
    const effects = ability.ability_value
      .split(/\n|\r|,/)
      .map((v) => removeSpace(v).trim());
    effects.forEach((effect) => {
      if (effect.startsWith("STR" || "DEX" || "INT" || "LUK")) {
        const type = effect.split("+")[0];
        const match = effect.match(/\b\d+\b/);
        const n = match ? Number(match[0]) : 0;
        addingMap(exceptStats, type, n);
      }
      if (effect.startsWith("모든능력치")) {
        const match = effect.match(/\b\d+\b/);
        const n = match ? Number(match[0]) : 0;
        const allTypes = ["STR", "DEX", "INT", "LUK"];
        allTypes.forEach((type) => {
          addingMap(exceptStats, type, n);
        });
      }
      if (effect.startsWith("AP를직접투자한")) {
        const investAP = effect.substring(8).substring(0, 3);
        const increasedAP = effect.split("만큼")[1].substring(0, 3);
        const match = effect.match(/\b\d+\b/);
        const n = match ? Number(match[0]) : 0;
        const increaseValue = characterStat.final_stat.find(
          (el) => el.stat_name === `AP 배분 ${investAP}`
        )?.stat_value;
        if (increaseValue === undefined) {
          throw new Error(`AP 배분 ${investAP} not found`);
        }
        const increased = Number(increaseValue) * n * 0.01;
        addingMap(baseStats, increasedAP, increased);
      }
      if (effect.startsWith(SKILL_KEYS.attack_power)) {
        const type = SKILL_KEYS.attack_power;
        const n = extractValue(effect, `${type}`, "증가");
        addingMap(baseStats, type, n);
      }
      if (effect.startsWith(SKILL_KEYS.magic_power)) {
        const type = SKILL_KEYS.magic_power;
        const n = extractValue(effect, `${type}`, "증가");
        addingMap(baseStats, type, n);
      }
      if (effect.startsWith(removeSpace(SKILL_KEYS.boss_damage))) {
        const type = SKILL_KEYS.boss_damage;
        const match = effect.match(/\b\d+\b/);
        const n = match ? Number(match[0]) : 0;
        addingMap(baseStats, type, n);
      }
      if (effect.includes("레벨마다공격력1증가")) {
        const match = effect.match(/\b\d+\b/);
        const level = match ? Number(match[0]) : 0;
        const type = SKILL_KEYS.attack_power;
        const value = Math.floor(characterBasicInfo.character_level / level);
        addingMap(exceptStats, type, value);
      }
      if (effect.includes("레벨마다마력1증가")) {
        const match = effect.match(/\b\d+\b/);
        const level = match ? Number(match[0]) : 0;
        const type = SKILL_KEYS.magic_power;
        const value = Math.floor(characterBasicInfo.character_level / level);
        addingMap(exceptStats, type, value);
      }
    });
  });
  return { baseStats, exceptStats };
};

const removeSpace = (inputString: string) => {
  return inputString.replace(/\s/g, "");
};
