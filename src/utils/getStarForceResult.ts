import { CHARACTER_CLASS } from "@/constants/characterClass";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { addingMap } from "./addingMap";

type ItemLevelType = 0 | 130 | 140 | 150 | 160 | 200 | 250;

interface IStarForceResult {
  up_stat: number;
  up_hp: number;
  up_speed: number;
  up_jump: number;
  up_armor: number;
  up_armor_attack_power: number;
  up_armor_magic_power: number;
  up_attack_power: number;
  up_magic_power: number;
  up_other_stat: number;
}

export const getStarForceResult = (
  itemInfo: IItemEquipment | null,
  targetNumber: number,
  isMagician: boolean
): Map<string, number> => {
  if (itemInfo === null) {
    throw new Error("StatForce itemInfo is null");
  }
  const result = new Map<string, number>([
    ["up_stat", 0],
    ["up_hp", 0],
    ["up_speed", 0],
    ["up_jump", 0],
    ["up_armor", 0],
    ["up_armor_attack_power", 0],
    ["up_armor_magic_power", 0],
    ["up_attack_power", 0],
    ["up_magic_power", 0],
    ["up_other_stat", 0],
  ]);
  const itemLevel = itemInfo.item_base_option.base_equipment_level;
  const isGlove = itemInfo.item_equipment_slot === "장갑";
  let initialStarForce = 1;
  const underStarForce15 = {
    stat: [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    hp: [0, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 25, 25],
    speedAndJump: [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    glove: [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  };
  const overStarForce15 = {
    130: {
      stat: [7, 7, 7, 7, 7],
      armorPower: [7, 8, 9, 10, 11],
      weaponPower: [6, 7, 7, 8, 9],
    },
    140: {
      stat: [9, 9, 9, 9, 9, 9, 9, 0, 0, 0],
      armorPower: [8, 9, 10, 11, 12, 13, 15, 17, 19, 21],
      weaponPower: [7, 8, 8, 9, 10, 11, 12, 30, 31, 32],
    },
    150: {
      stat: [11, 11, 11, 11, 11, 11, 11, 0, 0, 0],
      armorPower: [9, 10, 11, 12, 13, 14, 16, 18, 20, 22],
      weaponPower: [8, 9, 9, 10, 11, 12, 13, 31, 32, 33],
    },
    160: {
      stat: [13, 13, 13, 13, 13, 13, 13, 0, 0, 0],
      armorPower: [10, 11, 12, 13, 14, 15, 17, 19, 21, 23],
      weaponPower: [9, 9, 10, 11, 12, 13, 14, 32, 33, 34],
    },
    200: {
      stat: [15, 15, 15, 15, 15, 15, 15, 0, 0, 0],
      armorPower: [12, 13, 14, 15, 16, 17, 19, 21, 23, 25],
      weaponPower: [13, 13, 14, 14, 15, 16, 17, 34, 35, 36],
    },
    250: {
      stat: [17, 17, 17, 17, 17, 17, 17, 0, 0, 0],
      armorPower: [14, 15, 16, 17, 18, 19, 21, 23, 25, 27],
      weaponPower: [14, 15, 16, 17, 18, 19, 21, 23, 25, 27],
    },
  };

  const getArmorStat = () => {
    let nowArmorStat =
      Number(itemInfo.item_base_option.armor) +
      Number(itemInfo.item_etc_option.armor);
    let variableArmorStat = 0;
    for (let i = 0; i < targetNumber; i++) {
      variableArmorStat += Math.floor(nowArmorStat / 20 + 1);
      nowArmorStat += Math.floor(nowArmorStat / 20 + 1);
    }
    return variableArmorStat;
  };

  const getItemIndex = (itemLevel: number) => {
    if (itemLevel <= 130) return 130;
    if (130 < itemLevel && itemLevel <= 140) return 140;
    if (140 < itemLevel && itemLevel <= 150) return 150;
    if (150 < itemLevel && itemLevel <= 160) return 160;
    if (160 < itemLevel && itemLevel <= 200) return 200;
    if (200 < itemLevel && itemLevel <= 250) return 250;
    return 0;
  };

  const getWeaponPowerStat = () => {
    let initial = 0;
    let attackPower =
      Number(itemInfo.item_base_option.attack_power) +
      Number(itemInfo.item_etc_option.attack_power);
    let magicPower =
      Number(itemInfo.item_base_option.magic_power) +
      Number(itemInfo.item_etc_option.magic_power);
    let variableAttackPower = 0;
    let variableMagicPower = 0;
    while (initial < targetNumber && initial < 15) {
      if (attackPower !== 0) {
        variableAttackPower += Math.floor(attackPower / 50) + 1;
        attackPower += Math.floor(attackPower / 50) + 1;
      }
      if (magicPower !== 0) {
        variableMagicPower += Math.floor(magicPower / 50) + 1;
        magicPower += Math.floor(magicPower / 50) + 1;
      }
      initial++;
    }
    if (targetNumber <= 15) {
      return {
        up_attack_power: variableAttackPower,
        up_magic_power: variableMagicPower,
      };
    }

    //16성 이상
    const itemIndex = getItemIndex(itemLevel) as ItemLevelType;
    if (itemIndex === 0) return { up_attack_power: 0, up_magic_power: 0 };
    while (initial < targetNumber) {
      const starForceIndex = initial - 15;
      if (starForceIndex >= overStarForce15[itemIndex].weaponPower.length)
        break;
      if (attackPower !== 0) {
        variableAttackPower +=
          overStarForce15[itemIndex].weaponPower[starForceIndex];
      }
      if (magicPower !== 0) {
        variableMagicPower +=
          overStarForce15[itemIndex].weaponPower[starForceIndex];
      }
      initial++;
    }
    return {
      up_attack_power: variableAttackPower,
      up_magic_power: variableMagicPower,
    };
  };

  //15성 이하
  while (initialStarForce <= targetNumber && initialStarForce <= 15) {
    addingMap(result, "up_stat", underStarForce15.stat[initialStarForce]);
    addingMap(result, "up_hp", underStarForce15.hp[initialStarForce]);
    addingMap(
      result,
      "up_speed",
      underStarForce15.speedAndJump[initialStarForce]
    );
    addingMap(
      result,
      "up_jump",
      underStarForce15.speedAndJump[initialStarForce]
    );
    if (isGlove) {
      isMagician
        ? addingMap(
            result,
            "up_armor_magic_power",
            underStarForce15.glove[initialStarForce]
          )
        : addingMap(
            result,
            "up_armor_attack_power",
            underStarForce15.glove[initialStarForce]
          );
    }
    initialStarForce++;
  }
  if (targetNumber <= 15) return result;
  //16성 이상
  const itemIndex = getItemIndex(itemLevel) as ItemLevelType;
  if (itemIndex === 0) return result;
  while (initialStarForce <= targetNumber) {
    const starForceIndex = initialStarForce - 16;
    addingMap(
      result,
      "up_stat",
      overStarForce15[itemIndex].stat[starForceIndex]
    );
    addingMap(
      result,
      "up_other_stat",
      overStarForce15[itemIndex].stat[starForceIndex]
    );
    addingMap(
      result,
      "up_armor_attack_power",
      overStarForce15[itemIndex].armorPower[starForceIndex]
    );
    addingMap(
      result,
      "up_armor_magic_power",
      overStarForce15[itemIndex].armorPower[starForceIndex]
    );
    initialStarForce++;
  }
  const armorStat = getArmorStat();
  const { up_attack_power, up_magic_power } = getWeaponPowerStat();
  addingMap(result, "up_attack_power", up_attack_power);
  addingMap(result, "up_magic_power", up_magic_power);
  addingMap(result, "up_armor", armorStat);
  return result;
};
