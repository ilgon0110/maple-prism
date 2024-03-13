import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { extractValue } from "../extractValue";

export const getAttackPowerPercent = (
  characterItemEquipment: ICharacterItemEquipment,
  isMagician: boolean
) => {
  const prefix = isMagician ? "마력 : " : "공격력 : ";
  const suffix = "%";
  return characterItemEquipment?.item_equipment.reduce((acc, cur) => {
    const one = extractValue(cur.potential_option_1, prefix, suffix);
    const two = extractValue(cur.potential_option_2, prefix, suffix);
    const three = extractValue(cur.potential_option_3, prefix, suffix);
    const four = extractValue(
      cur.additional_potential_option_1,
      prefix,
      suffix
    );
    const five = extractValue(
      cur.additional_potential_option_2,
      prefix,
      suffix
    );
    const six = extractValue(cur.additional_potential_option_3, prefix, suffix);
    const soul = extractValue(cur.soul_option, prefix, suffix);
    const attackValue = one + two + three + four + five + six + soul;
    if (attackValue) {
      return acc + attackValue;
    }
    return acc;
  }, 0);
};
