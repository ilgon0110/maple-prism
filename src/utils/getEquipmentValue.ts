import { SKILL_KEYS } from "@/constants/skills";
import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import { ICharacterCashItemEquipment } from "@/types/characters/CharacterCashItemEquipment";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { useState } from "react";
import { extractValue } from "./extractValue";
import { ICharacterPetEquipment } from "@/types/characters/CharacterPetEquipment";
import { addingMap } from "./addingMap";

export const getEquipmentValue = (
  characterItemEquipment: ICharacterItemEquipment,
  characterCashItemEquipment: ICharacterCashItemEquipment,
  characterPetEquipment: ICharacterPetEquipment,
  characterSetEffect: ICharacterSetEffect
) => {
  const equipmentValues = new Map<string, number>();
  const {
    mesoAttackPower,
    mesoMagicPower,
    mesoBossDamage,
    mesoDamage,
    mesoCriticalDamage,
  } = getMesoEquipment(characterItemEquipment);
  const { cashAttackPower, cashMagicPower } = getCashEquipment(
    characterCashItemEquipment
  );
  const {
    setAttackPower,
    setMagicPower,
    setBossDamage,
    setDamage,
    setCriticalDamage,
  } = getSetEffect(characterSetEffect);
  const { petAttackPower, petMagicPower } = getPetEquipment(
    characterPetEquipment
  );

  addingMap(
    equipmentValues,
    SKILL_KEYS.attack_power,
    mesoAttackPower + cashAttackPower + setAttackPower + petAttackPower
  );
  addingMap(
    equipmentValues,
    SKILL_KEYS.magic_power,
    mesoMagicPower + cashMagicPower + setMagicPower + petMagicPower
  );
  addingMap(
    equipmentValues,
    SKILL_KEYS.boss_damage,
    mesoBossDamage + setBossDamage
  );
  addingMap(equipmentValues, SKILL_KEYS.damage, mesoDamage + setDamage);
  addingMap(
    equipmentValues,
    SKILL_KEYS.critical_damage,
    mesoCriticalDamage + setCriticalDamage
  );
  return { equipmentValues };
};

const getMesoEquipment = (characterItemEquipment: ICharacterItemEquipment) => {
  let attackPower = 0;
  let magicPower = 0;
  let bossDamage = 0;
  let damage = 0;
  let criticalDamage = 0;
  const attackPrefix = `${SKILL_KEYS.attack_power} : `;
  const magicPrefix = `${SKILL_KEYS.magic_power} : `;
  const bossPrefix = `${SKILL_KEYS.boss_damage} : `;
  const damagePrefix = `${SKILL_KEYS.damage} : `;
  const criticalPrefix = `${SKILL_KEYS.critical_damage} : `;
  characterItemEquipment.item_equipment.forEach((item) => {
    attackPower +=
      +item.item_total_option.attack_power +
      getValueByPotentialOption(item, attackPrefix, "");
    magicPower +=
      +item.item_total_option.magic_power +
      getValueByPotentialOption(item, magicPrefix, "");
    bossDamage +=
      +item.item_total_option.boss_damage +
      getValueByPotentialOption(item, bossPrefix, "%");
    damage +=
      +item.item_total_option.damage +
      getValueByPotentialOption(item, damagePrefix, "%");
    criticalDamage += getValueByPotentialOption(item, criticalPrefix, "%");
  });
  return {
    mesoAttackPower: attackPower,
    mesoMagicPower: magicPower,
    mesoBossDamage: bossDamage,
    mesoDamage: damage,
    mesoCriticalDamage: criticalDamage,
  };
};

const getValueByPotentialOption = (
  item: IItemEquipment,
  prefix: string,
  suffix: string
) => {
  return (
    extractValue(item.potential_option_1, prefix, suffix) +
    extractValue(item.potential_option_2, prefix, suffix) +
    extractValue(item.potential_option_3, prefix, suffix) +
    extractValue(item.additional_potential_option_1, prefix, suffix) +
    extractValue(item.additional_potential_option_2, prefix, suffix) +
    extractValue(item.additional_potential_option_3, prefix, suffix)
  );
};

const getCashEquipment = (
  characterCashItemEquipment: ICharacterCashItemEquipment
) => {
  let attackPower = 0;
  let magicPower = 0;
  const targetPreset = characterCashItemEquipment.preset_no;
  const cashItems = characterCashItemEquipment[
    `cash_item_equipment_preset_${targetPreset}` as keyof typeof characterCashItemEquipment
  ] as ICharacterCashItemEquipment["cash_item_equipment_preset_1"];
  cashItems.forEach((item) => {
    item.cash_item_option.forEach((option) => {
      if (option.option_type === SKILL_KEYS.attack_power) {
        attackPower += +option.option_value;
      }
      if (option.option_type === SKILL_KEYS.magic_power) {
        magicPower += +option.option_value;
      }
    });
  });
  return {
    cashAttackPower: attackPower,
    cashMagicPower: magicPower,
  };
};

const getSetEffect = (characterSetEffect: ICharacterSetEffect) => {
  let attackPower = 0;
  let magicPower = 0;
  let bossDamage = 0;
  let damage = 0;
  let criticalDamage = 0;
  characterSetEffect.set_effect.forEach((setEffect) => {
    setEffect.set_effect_info.forEach((setEffectInfo) => {
      const effects = setEffectInfo.set_option.split(", ");
      effects.forEach((effect) => {
        attackPower += extractValue(
          effect,
          `${SKILL_KEYS.attack_power} : `,
          ""
        );
        magicPower += extractValue(effect, `${SKILL_KEYS.magic_power} : `, "");
        bossDamage += extractValue(effect, `${SKILL_KEYS.boss_damage} : `, "%");
        damage += extractValue(effect, `${SKILL_KEYS.damage} : `, "%");
        criticalDamage += extractValue(
          effect,
          `${SKILL_KEYS.critical_damage} : `,
          "%"
        );
      });
    });
  });
  return {
    setAttackPower: attackPower,
    setMagicPower: magicPower,
    setBossDamage: bossDamage,
    setDamage: damage,
    setCriticalDamage: criticalDamage,
  };
};

const getPetEquipment = (characterPetEquipment: ICharacterPetEquipment) => {
  let attackPower = 0;
  let magicPower = 0;
  console.log("characterPetEquipment", characterPetEquipment);
  characterPetEquipment.pet_1_equipment?.item_option.forEach((item) => {
    if (item.option_type === SKILL_KEYS.attack_power) {
      attackPower += +item.option_value;
    }
    if (item.option_type === SKILL_KEYS.magic_power) {
      magicPower += +item.option_value;
    }
  });
  characterPetEquipment.pet_2_equipment?.item_option.forEach((item) => {
    if (item.option_type === SKILL_KEYS.attack_power) {
      attackPower += +item.option_value;
    }
    if (item.option_type === SKILL_KEYS.magic_power) {
      magicPower += +item.option_value;
    }
  });
  characterPetEquipment.pet_3_equipment?.item_option.forEach((item) => {
    if (item.option_type === SKILL_KEYS.attack_power) {
      attackPower += +item.option_value;
    }
    if (item.option_type === SKILL_KEYS.magic_power) {
      magicPower += +item.option_value;
    }
  });
  return {
    petAttackPower: attackPower,
    petMagicPower: magicPower,
  };
};
