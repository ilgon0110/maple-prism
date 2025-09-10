import { removeSpace } from "./../removeSpace";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { extractValue } from "../extractValue";
import { POWER_RATE } from "@/constants/powerRate";

export const getAttackPowerPercent = (
  characterItemEquipment: ICharacterItemEquipment,
  isMagician: boolean
) => {
  const prefix = isMagician
    ? `${POWER_RATE.magic_power}`
    : `${POWER_RATE.attack_power}`;
  const suffix = "%";
  const options = [1, 2, 3];
  return characterItemEquipment?.item_equipment.reduce((acc, cur) => {
    let total = 0;
    options.forEach((option) => {
      const potentialAttackValue = extractValue(
        removeSpace(
          cur[
            `potential_option_${option}` as keyof IItemEquipment["potential_option_1"]
          ]
        ),
        prefix,
        suffix
      );
      const addPotentialAttackValue = extractValue(
        removeSpace(
          cur[
            `additional_potential_option_${option}` as keyof IItemEquipment["additional_potential_option_1"]
          ]
        ),
        prefix,
        suffix
      );
      total += potentialAttackValue + addPotentialAttackValue;
    });
    const soul = extractValue(removeSpace(cur.soul_option), prefix, suffix);
    total += soul;
    if (total) {
      return acc + total;
    }
    return acc;
  }, 0);
};
