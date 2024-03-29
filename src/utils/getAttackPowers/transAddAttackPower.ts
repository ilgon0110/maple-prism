import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { getAddAttackPower } from "./getAddAttackPower";
import { WEAPON_INFO_BOW } from "@/constants/weaponInfo";
import { ERROR_MESSAGES } from "@/constants/error";

type weaponInfoType = ICharacterItemEquipment["item_equipment"][0];

//목적 : 내 무기 정보를 input하면 활 추옵으로 변환하여 그 값을 반환한다.
export const transAddAttackPower = (
  weaponInfo: weaponInfoType | undefined,
  isMagician: boolean
) => {
  if (weaponInfo === undefined) {
    return 0;
  }
  const myAddPower = isMagician
    ? weaponInfo?.item_add_option.magic_power
    : weaponInfo?.item_add_option.attack_power;
  const myOriginPower = isMagician
    ? Number(weaponInfo?.item_base_option.magic_power)
    : Number(weaponInfo?.item_base_option.attack_power);
  const prefix = "제네시스 ";
  const isGenesis = weaponInfo?.item_name.startsWith(prefix);
  const itemLevel = weaponInfo?.item_base_option.base_equipment_level;

  const myAddAttackPowerStep =
    getAddAttackPower(myOriginPower, itemLevel).find(
      (item) => item.value === Number(myAddPower)
    )?.step ?? 0;
  if (itemLevel === undefined) {
    throw new Error(ERROR_MESSAGES.weaponInfo.noItemLevel);
  }

  const bowOriginAttackPower = WEAPON_INFO_BOW.value.find(
    (item) => item.level === itemLevel && item.isGenesis === isGenesis
  )?.origin_attack_power;
  const bowAddAttackPower =
    getAddAttackPower(bowOriginAttackPower, itemLevel).find(
      (item) => item.step === myAddAttackPowerStep
    )?.value ?? 0;
  return bowAddAttackPower;
};
