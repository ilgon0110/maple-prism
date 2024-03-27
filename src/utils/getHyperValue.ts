import { removeSpace } from "./removeSpace";
import { ICharacterHyperStat } from "@/types/characters/CharacterHyperStat";
import { POWER_RATE } from "@/constants/powerRate";

export const getHyperValue = (
  selectedHyperStat: ICharacterHyperStat["hyper_stat_preset_1"]
) => {
  const values = new Map<string, number>();
  const meaningStats = [
    "STR",
    "DEX",
    "INT",
    "LUK",
    "공격력/마력",
    POWER_RATE.magic_power,
    POWER_RATE.boss_damage,
    POWER_RATE.damage,
    POWER_RATE.critical_damage,
  ];
  selectedHyperStat.forEach((hyper) => {
    const { type, value } = extractHyperValue(
      hyper.stat_increase,
      hyper.stat_type
    );
    const editedType = removeSpace(type.replace("증가", "").trim());
    if (editedType === "공격력/마력") {
      values.set(POWER_RATE.attack_power, value);
      values.set(POWER_RATE.magic_power, value);
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
