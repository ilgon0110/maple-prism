import { ERROR_MESSAGES } from "@/constants/error";
import { removeSpace } from "./../removeSpace";
import { ICharacterStat } from "@/types/characters/CharacterStat";

export const getBasePureStat = (
  characterStat: ICharacterStat,
  targetStat: string
) => {
  const pureStat = characterStat.final_stat.find(
    (stat) => removeSpace(stat.stat_name) === `AP배분${targetStat}`
  )?.stat_value;

  if (pureStat === undefined) {
    throw new Error(ERROR_MESSAGES.statInfo);
  }

  return Number(pureStat);
};
