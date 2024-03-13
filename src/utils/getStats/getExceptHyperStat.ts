import {
  ICharacterHyperStat,
  ICharacterHyperStatPreset,
} from "@/types/characters/CharacterHyperStat";

export const getExceptHyperStat = (
  characterHyperStat: ICharacterHyperStat,
  targetStat: string
) => {
  const useHyperStat = characterHyperStat[
    `hyper_stat_preset_${characterHyperStat.use_preset_no}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStatPreset[];

  return useHyperStat.reduce((acc, cur) => {
    if (cur.stat_type === targetStat) {
      const match = cur.stat_increase?.match(/\b\d+\b/);
      const extractNumber = match ? Number(match[0]) : 0;
      return acc + extractNumber;
    }
    return acc;
  }, 0);
};
