import { IItemEquipment } from "./../../types/characters/CharacterItemEquipment";
import { transStarforceAttackPower } from "@/utils/getAttackPowers/transStarforceAttackPower";
import { transAddAttackPower } from "@/utils/getAttackPowers/transAddAttackPower";

export const transWeaponStat = (
  weaponInfo: IItemEquipment,
  isMagician: boolean
) => {
  const transAddAttackPowerValue = transAddAttackPower(weaponInfo, isMagician);
  const transStarforceAttackPowerValue = transStarforceAttackPower(
    weaponInfo,
    isMagician
  );
  if (transAddAttackPowerValue === undefined) {
    throw new Error("transAddAttackPowerValue is undefined");
  }
  return transAddAttackPowerValue + transStarforceAttackPowerValue;
};
