import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { extractValue } from "../extractValue";

export const getExceptUnionRaider = (
  selectedUnionRaider: ICharacterUnionRaider["union_raider_preset_1"],
  targetStat: string
) => {
  //"STR, DEX, LUK 40 증가",

  return selectedUnionRaider.union_raider_stat.reduce((acc, cur) => {
    return acc + extractUnionValue(cur, targetStat);
  }, 0);
};

const extractUnionValue = (inputString: string, targetStat: string | null) => {
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
