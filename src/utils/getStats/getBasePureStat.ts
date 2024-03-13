import { CHARACTER_CLASS } from "@/constants/characterClass";
import { ICharacterStat } from "@/types/characters/CharacterStat";

export const getBasePureStat = (
  characterStat: ICharacterStat,
  targetStat: string
) => {
  const pureStat = characterStat.final_stat.find(
    (stat) => stat.stat_name === `AP 배분 ${targetStat}`
  )?.stat_value;

  if (pureStat === undefined) {
    throw new Error("pureStat is undefined");
  }

  return Number(pureStat);
};
