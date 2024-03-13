import { IItemEquipment } from "./../../types/characters/CharacterItemEquipment";
import { transStarforceAttackPower } from "@/utils/getAttackPowers/transStarforceAttackPower";
import { transAddAttackPower } from "@/utils/getAttackPowers/transAddAttackPower";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { getAttackPowerPercent } from "./getAttackPowerPercent";
import { ICharacterStat } from "@/types/characters/CharacterStat";

export const transWeaponStat = (
  weaponInfo: IItemEquipment,
  isMagician: boolean
) => {
  const myPower = isMagician
    ? +weaponInfo.item_total_option.magic_power
    : +weaponInfo?.item_total_option.attack_power;
  const transAddAttackPowerValue = transAddAttackPower(weaponInfo, isMagician);
  const transStarforceAttackPowerValue = transStarforceAttackPower(
    weaponInfo,
    isMagician
  );
  if (transAddAttackPowerValue === undefined) {
    throw new Error("transAddAttackPowerValue is undefined");
  }
  // const myTotalAttackPower = Number(
  //   characterStat.final_stat.find((stat) => stat.stat_name === "공격력")
  //     ?.stat_value
  // );
  // const baseAttackPower = Math.ceil(
  //   myTotalAttackPower / ((100 + attackPowerPercent) * 0.01)
  // );
  const transAttackPower =
    transAddAttackPowerValue + transStarforceAttackPowerValue;

  return transAttackPower;
};
// 계산식
// Math.floor(
//   (baseAttackPower -
//     188 +
//     30 +
//     24 -
//     Number(myAttackPower) +
//     transAttackPower) *
//     (100 + attackPowerPercent) *
//     0.01
// );
