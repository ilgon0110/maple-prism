import { removeSpace } from "./../removeSpace";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";

export const getBaseTitleStat = (
  characterItemEquipment: ICharacterItemEquipment,
  targetStat: string
) => {
  console.log("characterItemEquipment", characterItemEquipment);
  const title = characterItemEquipment.title;
  if (title === null) return 0;
  if (title.date_option_expire === "expired") return 0;
  return title.title_description.split(/, |\n/).reduce((acc, cur) => {
    return acc + extractTitleValue(removeSpace(cur), `${targetStat}`, "%");
  }, 0);
};

const extractTitleValue = (
  inputString: string,
  prefix: string,
  suffix: string
) => {
  const allStatPrefix = "올스탯";
  if (inputString === null) return 0;
  if (
    (inputString.startsWith(prefix) || inputString.startsWith(allStatPrefix)) &&
    !inputString.endsWith(suffix)
  ) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return 0;
};
