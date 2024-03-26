import {
  ICharacterHyperStat,
  ICharacterHyperStatPreset,
} from "@/types/characters/CharacterHyperStat";

export const getExceptHyperStat = (
  selectedHyperStat: ICharacterHyperStat["hyper_stat_preset_1"],
  targetStat: string
) => {
  return selectedHyperStat.reduce((acc, cur) => {
    if (cur.stat_type === targetStat) {
      const match = cur.stat_increase?.match(/\b\d+\b/);
      const extractNumber = match ? Number(match[0]) : 0;
      return acc + extractNumber;
    }
    return acc;
  }, 0);
};
