import { removeSpace } from "./../removeSpace";
import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { extractValue } from "../extractValue";

export const getBaseUnionRaiderStat = (
  selectedUnionRaider: ICharacterUnionRaider["union_raider_preset_1"],
  targetStat: string
) => {
  if (targetStat === null) {
    throw new Error("targetStat is null");
  }

  return selectedUnionRaider.union_occupied_stat.reduce((acc, cur) => {
    return acc + extractUnionValue(removeSpace(cur), targetStat);
  }, 0);
};

const extractUnionValue = (inputString: string, targetStat: string | null) => {
  const prefix = `${targetStat?.toUpperCase()}`;
  const suffix = "증가";
  return extractValue(inputString, prefix, suffix);
};
