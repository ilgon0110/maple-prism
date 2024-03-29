import { IItemEquipment } from "./../../types/characters/CharacterItemEquipment";
import { transStarforceAttackPower } from "@/utils/getAttackPowers/transStarforceAttackPower";
import { transAddAttackPower } from "@/utils/getAttackPowers/transAddAttackPower";
import { ERROR_MESSAGES } from "@/constants/error";

export const transWeaponStat = (
  weaponInfo: IItemEquipment,
  isMagician: boolean
) => {
  const transAddAttackPowerValue = transAddAttackPower(weaponInfo, isMagician);
  const transStarforceAttackPowerValue = transStarforceAttackPower(
    weaponInfo,
    isMagician
  );
  console.log("transAddAttackPowerValue", transAddAttackPowerValue);
  console.log("transStarforceAttackPowerValue", transStarforceAttackPowerValue);
  if (transAddAttackPowerValue === undefined) {
    throw new Error(ERROR_MESSAGES.weaponInfo.invalidWeaponToBow);
  }
  return transAddAttackPowerValue + transStarforceAttackPowerValue;
};
