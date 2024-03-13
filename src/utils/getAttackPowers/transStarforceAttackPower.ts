import {
  WEAPON_INFO_BOW,
  WEAPON_STARFORCE_150,
  WEAPON_STARFORCE_160,
  WEAPON_STARFORCE_200,
} from "@/constants/weaponInfo";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { getWeaponItemLevel } from "./getWeaponItemLevel";
import { getAddAttackPower } from "./getAddAttackPower";

type weaponInfoType = ICharacterItemEquipment["item_equipment"][0];

//목적 : 내 무기 정보를 input하면 활 스타포스 등급에 맞는 추가 공격력 수치를 반환한다.
export const transStarforceAttackPower = (
  weaponInfo: weaponInfoType | undefined,
  isMagician: boolean
) => {
  let initialLevel = 0;
  const itemLevel = getWeaponItemLevel(weaponInfo?.item_name);
  const targetLevel = Number(weaponInfo?.starforce);
  const prefix = "제네시스 ";
  const isGenesis = weaponInfo?.item_name.startsWith(prefix);
  const bowOriginAttackPower = WEAPON_INFO_BOW.value.find(
    (item) => item.level === itemLevel && isGenesis === item.isGenesis
  )?.origin_attack_power;

  if (bowOriginAttackPower === undefined) {
    throw new Error("bowOriginAttackPower is undefined");
  }
  if (itemLevel === null) {
    throw new Error("itemLevel is null");
  }
  let attackPower = isMagician
    ? bowOriginAttackPower + Number(weaponInfo?.item_etc_option.magic_power)
    : bowOriginAttackPower + Number(weaponInfo?.item_etc_option.attack_power);
  while (initialLevel < 15) {
    let variationValue = Math.floor(attackPower / 50) + 1;
    attackPower += variationValue;
    initialLevel++;
  }
  if (targetLevel <= 15) return attackPower;
  while (initialLevel < targetLevel) {
    if (itemLevel === 150) {
      attackPower += WEAPON_STARFORCE_150[initialLevel];
    }
    if (itemLevel === 160) {
      attackPower += WEAPON_STARFORCE_160[initialLevel];
    }
    if (itemLevel === 200) {
      attackPower += WEAPON_STARFORCE_200[initialLevel];
    }
    initialLevel++;
  }
  return attackPower;
};
