import {
  ICharacterHyperStat,
  ICharacterHyperStatPreset,
} from "@/types/characters/CharacterHyperStat";
import { extractValue } from "./extractValue";
import { SKILL_KEYS } from "@/constants/skills";

export const getHyperValue = (characterHyperStat: ICharacterHyperStat) => {
  const values = new Map<string, number>();
  const meaningStats = [
    "STR",
    "DEX",
    "INT",
    "LUK",
    "공격력/마력",
    SKILL_KEYS.magic_power,
    SKILL_KEYS.boss_damage,
    SKILL_KEYS.damage,
    SKILL_KEYS.critical_damage,
  ];
  const usePreset = characterHyperStat.use_preset_no;
  const myHypers = characterHyperStat[
    `hyper_stat_preset_${usePreset}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStatPreset[];

  myHypers.forEach((hyper) => {
    const { type, value } = extractHyperValue(
      hyper.stat_increase,
      hyper.stat_type
    );
    const editedType = type.replace("증가", "").trim();
    if (editedType === "공격력/마력") {
      values.set(SKILL_KEYS.attack_power, value);
      values.set(SKILL_KEYS.magic_power, value);
    } else if (meaningStats.includes(editedType)) {
      values.set(editedType, value);
    }
  });

  return { hyperStats: values };
};

const extractHyperValue = (inputString: string | null, type: string) => {
  const match = inputString?.match(/\b\d+\b/);
  const extractNumber = match ? Number(match[0]) : 0;
  return {
    type,
    value: extractNumber,
  };
};
