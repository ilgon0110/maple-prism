import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { extractValue } from "../extractValue";

export const getStatPercentByPotential = (
  characterItemEquipment: ICharacterItemEquipment,
  targetStat: string | undefined
) => {
  const prefix = `${targetStat} : `;
  const suffix = "%";
  const allStatPrefix = "올스탯 : ";
  return characterItemEquipment?.item_equipment.reduce((acc, cur) => {
    const one = extractValue(
      cur.potential_option_1,
      prefix,
      suffix,
      allStatPrefix
    );
    const two = extractValue(
      cur.potential_option_2,
      prefix,
      suffix,
      allStatPrefix
    );
    const three = extractValue(
      cur.potential_option_3,
      prefix,
      suffix,
      allStatPrefix
    );
    const four = extractValue(
      cur.additional_potential_option_1,
      prefix,
      suffix,
      allStatPrefix
    );
    const five = extractValue(
      cur.additional_potential_option_2,
      prefix,
      suffix,
      allStatPrefix
    );
    const six = extractValue(
      cur.additional_potential_option_3,
      prefix,
      suffix,
      allStatPrefix
    );
    const soul = extractValue(cur.soul_option, prefix, suffix, allStatPrefix);
    const addOption = Number(cur.item_add_option.all_stat);
    const mainStatValue =
      one + two + three + four + five + six + soul + addOption;
    if (mainStatValue) {
      return acc + mainStatValue;
    }
    return acc;
  }, 0);
};

const extractStatValue = (
  targetStat: string | undefined,
  inputString: string | null
) => {
  const prefix = `${targetStat} : `;
  const allStatPrefix = "올스탯 : ";
  const suffix = "%";

  if (inputString === null) return 0;
  if (
    (inputString.startsWith(prefix) || inputString.startsWith(allStatPrefix)) &&
    inputString.endsWith(suffix)
  ) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return numericValue;
    }
  }
  return 0;
};
