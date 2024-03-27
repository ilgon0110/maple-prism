import { removeSpace } from "./../removeSpace";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { extractValue } from "../extractValue";

export const getStatPercentByPotential = (
  characterItemEquipment: ICharacterItemEquipment,
  targetStat: string | undefined
) => {
  const prefix = `${targetStat}:`;
  const suffix = "%";
  const allStatPrefix = "올스탯:";
  return characterItemEquipment?.item_equipment.reduce((acc, cur) => {
    const one = extractValue(
      removeSpace(cur.potential_option_1),
      prefix,
      suffix,
      allStatPrefix
    );
    const two = extractValue(
      removeSpace(cur.potential_option_2),
      prefix,
      suffix,
      allStatPrefix
    );
    const three = extractValue(
      removeSpace(cur.potential_option_3),
      prefix,
      suffix,
      allStatPrefix
    );
    const four = extractValue(
      removeSpace(cur.additional_potential_option_1),
      prefix,
      suffix,
      allStatPrefix
    );
    const five = extractValue(
      removeSpace(cur.additional_potential_option_2),
      prefix,
      suffix,
      allStatPrefix
    );
    const six = extractValue(
      removeSpace(cur.additional_potential_option_3),
      prefix,
      suffix,
      allStatPrefix
    );
    const soul = extractValue(
      removeSpace(cur.soul_option),
      prefix,
      suffix,
      allStatPrefix
    );
    const addOption = Number(cur.item_add_option.all_stat);
    const mainStatValue =
      one + two + three + four + five + six + soul + addOption;
    if (mainStatValue) {
      return acc + mainStatValue;
    }
    return acc;
  }, 0);
};
