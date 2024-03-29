import { ICharacterCashItemEquipment } from "@/types/characters/CharacterCashItemEquipment";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { extractValue } from "./extractValue";
import { ICharacterPetEquipment } from "@/types/characters/CharacterPetEquipment";
import { addingMap } from "./addingMap";
import { removeSpace } from "./removeSpace";
import { POWER_RATE } from "@/constants/powerRate";

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
    POWER_RATE.attack_power,
    mesoAttackPower + cashAttackPower + setAttackPower + petAttackPower
  );
  addingMap(
    equipmentValues,
    POWER_RATE.magic_power,
    mesoMagicPower + cashMagicPower + setMagicPower + petMagicPower
  );
  addingMap(
    equipmentValues,
    POWER_RATE.boss_damage,
    mesoBossDamage + setBossDamage
  );
  addingMap(equipmentValues, POWER_RATE.damage, mesoDamage + setDamage);
  addingMap(
    equipmentValues,
    POWER_RATE.critical_damage,
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
  const attackPrefix = `${POWER_RATE.attack_power}:`;
  const magicPrefix = `${POWER_RATE.magic_power}:`;
  const bossPrefix = `${POWER_RATE.boss_damage}:`;
  const damagePrefix = `${POWER_RATE.damage}:`;
  const criticalPrefix = `${POWER_RATE.critical_damage}:`;
  characterItemEquipment.item_equipment.forEach((item) => {
    attackPower +=
      +item.item_total_option.attack_power +
      getValueByPotentialOption(item, attackPrefix, "") +
      extractValue(removeSpace(item.soul_option), attackPrefix, "") +
      +item.item_exceptional_option.attack_power;
    magicPower +=
      +item.item_total_option.magic_power +
      getValueByPotentialOption(item, magicPrefix, "") +
      extractValue(removeSpace(item.soul_option), magicPrefix, "") +
      +item.item_exceptional_option.magic_power;
    bossDamage +=
      +item.item_total_option.boss_damage +
      getValueByPotentialOption(item, bossPrefix, "%") +
      extractValue(removeSpace(item.soul_option), bossPrefix, "%");
    damage +=
      +item.item_total_option.damage +
      getValueByPotentialOption(item, damagePrefix, "%") +
      extractValue(removeSpace(item.soul_option), damagePrefix, "%");
    criticalDamage +=
      getValueByPotentialOption(item, criticalPrefix, "%") +
      extractValue(removeSpace(item.soul_option), criticalPrefix, "%");

    //아이템 설명에 있는 값들을 더해준다.
    const descriptions = item.item_description?.split("\n");
    descriptions?.forEach((description) => {
      attackPower += extractValue(removeSpace(description), attackPrefix, "");
      magicPower += extractValue(removeSpace(description), magicPrefix, "");
      bossDamage += extractValue(removeSpace(description), bossPrefix, "%");
      damage += extractValue(removeSpace(description), damagePrefix, "%");
      criticalDamage += extractValue(
        removeSpace(description),
        criticalPrefix,
        "%"
      );
    });
  });

  //메카닉 장비도 더해준다.
  const mechanicEquipment = characterItemEquipment.mechanic_equipment;
  mechanicEquipment.forEach((item) => {
    attackPower +=
      +item.item_total_option.attack_power +
      getValueByPotentialOption(item, attackPrefix, "") +
      extractValue(removeSpace(item.soul_option), attackPrefix, "") +
      +item.item_exceptional_option.attack_power;
    magicPower +=
      +item.item_total_option.magic_power +
      getValueByPotentialOption(item, magicPrefix, "") +
      extractValue(removeSpace(item.soul_option), magicPrefix, "") +
      +item.item_exceptional_option.magic_power;
    bossDamage +=
      +item.item_total_option.boss_damage +
      getValueByPotentialOption(item, bossPrefix, "%") +
      extractValue(removeSpace(item.soul_option), bossPrefix, "%");
    damage +=
      +item.item_total_option.damage +
      getValueByPotentialOption(item, damagePrefix, "%") +
      extractValue(removeSpace(item.soul_option), damagePrefix, "%");
    criticalDamage +=
      getValueByPotentialOption(item, criticalPrefix, "%") +
      extractValue(removeSpace(item.soul_option), criticalPrefix, "%");

    //아이템 설명에 있는 값들을 더해준다.
    const descriptions = item.item_description?.split("\n");
    descriptions?.forEach((description) => {
      attackPower += extractValue(removeSpace(description), attackPrefix, "");
      magicPower += extractValue(removeSpace(description), magicPrefix, "");
      bossDamage += extractValue(removeSpace(description), bossPrefix, "%");
      damage += extractValue(removeSpace(description), damagePrefix, "%");
      criticalDamage += extractValue(
        removeSpace(description),
        criticalPrefix,
        "%"
      );
    });
  });

  //에반 장비도 더해준다.
  const evanEquipment = characterItemEquipment.dragon_equipment;
  evanEquipment.forEach((item) => {
    attackPower +=
      +item.item_total_option.attack_power +
      getValueByPotentialOption(item, attackPrefix, "") +
      extractValue(removeSpace(item.soul_option), attackPrefix, "") +
      +item.item_exceptional_option.attack_power;
    magicPower +=
      +item.item_total_option.magic_power +
      getValueByPotentialOption(item, magicPrefix, "") +
      extractValue(removeSpace(item.soul_option), magicPrefix, "") +
      +item.item_exceptional_option.magic_power;
    bossDamage +=
      +item.item_total_option.boss_damage +
      getValueByPotentialOption(item, bossPrefix, "%") +
      extractValue(removeSpace(item.soul_option), bossPrefix, "%");
    damage +=
      +item.item_total_option.damage +
      getValueByPotentialOption(item, damagePrefix, "%") +
      extractValue(removeSpace(item.soul_option), damagePrefix, "%");
    criticalDamage +=
      getValueByPotentialOption(item, criticalPrefix, "%") +
      extractValue(removeSpace(item.soul_option), criticalPrefix, "%");

    //아이템 설명에 있는 값들을 더해준다.
    const descriptions = item.item_description?.split("\n");
    descriptions?.forEach((description) => {
      attackPower += extractValue(removeSpace(description), attackPrefix, "");
      magicPower += extractValue(removeSpace(description), magicPrefix, "");
      bossDamage += extractValue(removeSpace(description), bossPrefix, "%");
      damage += extractValue(removeSpace(description), damagePrefix, "%");
      criticalDamage += extractValue(
        removeSpace(description),
        criticalPrefix,
        "%"
      );
    });
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
    extractValue(removeSpace(item.potential_option_1), prefix, suffix) +
    extractValue(removeSpace(item.potential_option_2), prefix, suffix) +
    extractValue(removeSpace(item.potential_option_3), prefix, suffix) +
    extractValue(
      removeSpace(item.additional_potential_option_1),
      prefix,
      suffix
    ) +
    extractValue(
      removeSpace(item.additional_potential_option_2),
      prefix,
      suffix
    ) +
    extractValue(
      removeSpace(item.additional_potential_option_3),
      prefix,
      suffix
    )
  );
};

const getCashEquipment = (
  characterCashItemEquipment: ICharacterCashItemEquipment
) => {
  let attackPower = 0;
  let magicPower = 0;
  // const targetPreset = characterCashItemEquipment.preset_no;
  // const cashItems = characterCashItemEquipment[
  //   `cash_item_equipment_preset_${targetPreset}` as keyof typeof characterCashItemEquipment
  // ] as ICharacterCashItemEquipment["cash_item_equipment_preset_1"];
  const cashItems = characterCashItemEquipment.cash_item_equipment_base;

  cashItems.forEach((item) => {
    item.cash_item_option.forEach((option) => {
      if (removeSpace(option.option_type) === POWER_RATE.attack_power) {
        attackPower += +option.option_value;
      }
      if (removeSpace(option.option_type) === POWER_RATE.magic_power) {
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
          removeSpace(effect),
          `${POWER_RATE.attack_power}:`,
          ""
        );
        magicPower += extractValue(
          removeSpace(effect),
          `${POWER_RATE.magic_power}:`,
          ""
        );
        bossDamage += extractValue(
          removeSpace(effect),
          `${POWER_RATE.boss_damage}:`,
          "%"
        );
        damage += extractValue(
          removeSpace(effect),
          `${POWER_RATE.damage}:`,
          "%"
        );
        criticalDamage += extractValue(
          removeSpace(effect),
          `${POWER_RATE.critical_damage}:`,
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
  characterPetEquipment.pet_1_equipment?.item_option.forEach((item) => {
    if (removeSpace(item.option_type) === POWER_RATE.attack_power) {
      attackPower += +item.option_value;
    }
    if (removeSpace(item.option_type) === POWER_RATE.magic_power) {
      magicPower += +item.option_value;
    }
  });
  characterPetEquipment.pet_2_equipment?.item_option.forEach((item) => {
    if (removeSpace(item.option_type) === POWER_RATE.attack_power) {
      attackPower += +item.option_value;
    }
    if (removeSpace(item.option_type) === POWER_RATE.magic_power) {
      magicPower += +item.option_value;
    }
  });
  characterPetEquipment.pet_3_equipment?.item_option.forEach((item) => {
    if (removeSpace(item.option_type) === POWER_RATE.attack_power) {
      attackPower += +item.option_value;
    }
    if (removeSpace(item.option_type) === POWER_RATE.magic_power) {
      magicPower += +item.option_value;
    }
  });
  return {
    petAttackPower: attackPower,
    petMagicPower: magicPower,
  };
};
