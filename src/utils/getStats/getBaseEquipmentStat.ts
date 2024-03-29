import { removeSpace } from "./../removeSpace";
import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { ICharacterCashItemEquipment } from "@/types/characters/CharacterCashItemEquipment";
import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import { ERROR_MESSAGES } from "@/constants/error";

export const getBaseEquipmentStat = (
  characterBasicInfo: ICharacterBasicInfo,
  characterItemEquipment: ICharacterItemEquipment,
  characterCashItemEquipment: ICharacterCashItemEquipment,
  characterSetEffect: ICharacterSetEffect,
  targetStat: string
) => {
  const characterLevel = characterBasicInfo.character_level;
  const capitalTargetStat = targetStat.toUpperCase();
  const suffix = "%";

  const equipmentStat = characterItemEquipment?.item_equipment.reduce(
    (acc, cur) => {
      const equipStat = Number(
        cur.item_total_option[
          targetStat.toLowerCase() as keyof typeof cur.item_total_option
        ]
      );
      const exceptionalStat = Number(
        cur.item_exceptional_option[
          targetStat.toLowerCase() as keyof typeof cur.item_exceptional_option
        ]
      );
      const potentialStat =
        extractEquipmentValue(
          removeSpace(cur.potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_3),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_3),
          capitalTargetStat,
          characterLevel
        );

      const soulStat = extractEquipmentValue(
        removeSpace(cur.soul_option),
        capitalTargetStat,
        characterLevel
      );

      return (
        acc +
        Math.floor(equipStat) +
        Math.floor(exceptionalStat) +
        Math.floor(potentialStat) +
        Math.floor(soulStat)
      );
    },
    0
  );
  const mechanicStat = characterItemEquipment.mechanic_equipment.reduce(
    (acc, cur) => {
      const equipStat = Number(
        cur.item_total_option[
          targetStat.toLowerCase() as keyof typeof cur.item_total_option
        ]
      );
      const exceptionalStat = Number(
        cur.item_exceptional_option[
          targetStat.toLowerCase() as keyof typeof cur.item_exceptional_option
        ]
      );
      const potentialStat =
        extractEquipmentValue(
          removeSpace(cur.potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_3),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_3),
          capitalTargetStat,
          characterLevel
        );

      const soulStat = extractEquipmentValue(
        removeSpace(cur.soul_option),
        capitalTargetStat,
        characterLevel
      );
      return (
        acc +
        Math.floor(equipStat) +
        Math.floor(exceptionalStat) +
        Math.floor(potentialStat) +
        Math.floor(soulStat)
      );
    },
    0
  );
  const evanStat = characterItemEquipment.dragon_equipment.reduce(
    (acc, cur) => {
      const equipStat = Number(
        cur.item_total_option[
          targetStat.toLowerCase() as keyof typeof cur.item_total_option
        ]
      );
      const exceptionalStat = Number(
        cur.item_exceptional_option[
          targetStat.toLowerCase() as keyof typeof cur.item_exceptional_option
        ]
      );
      const potentialStat =
        extractEquipmentValue(
          removeSpace(cur.potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.potential_option_3),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_1),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_2),
          capitalTargetStat,
          characterLevel
        ) +
        extractEquipmentValue(
          removeSpace(cur.additional_potential_option_3),
          capitalTargetStat,
          characterLevel
        );

      const soulStat = extractEquipmentValue(
        removeSpace(cur.soul_option),
        capitalTargetStat,
        characterLevel
      );
      return (
        acc +
        Math.floor(equipStat) +
        Math.floor(exceptionalStat) +
        Math.floor(potentialStat) +
        Math.floor(soulStat)
      );
    },
    0
  );

  const setEffectStatResult = characterSetEffect.set_effect.reduce(
    (acc, cur) => {
      const setEffectStat = cur.set_effect_info.reduce((acc, cur) => {
        const setOptions = cur.set_option.split(", ").reduce((acc, cur) => {
          return (
            acc +
            Math.floor(
              extractSetEffectValue(
                removeSpace(cur),
                `${targetStat.toUpperCase()}:`,
                suffix
              )
            )
          );
        }, 0);
        return acc + Math.floor(setOptions);
      }, 0);
      return acc + Math.floor(setEffectStat);
    },
    0
  );
  const cashItems = characterCashItemEquipment["cash_item_equipment_base"];
  const cashEquipmentStat = cashItems.reduce((acc, cur) => {
    const equipStat = cur.cash_item_option.reduce((acc, cur) => {
      const isSameType =
        cur.option_type === `${targetStat.toUpperCase()}` ||
        cur.option_type === "올스탯";
      if (isSameType) {
        return acc + Math.floor(Number(cur.option_value));
      }
      return acc;
    }, 0);
    return acc + Math.floor(equipStat);
  }, 0);

  return (
    Math.floor(equipmentStat) +
    Math.floor(mechanicStat) +
    Math.floor(evanStat) +
    Math.floor(cashEquipmentStat) +
    Math.floor(setEffectStatResult)
  );
};

const extractEquipmentValue = (
  inputString: string | null,
  targetStat: string | undefined,
  level: number | undefined
) => {
  const prefix = `${targetStat}:`;
  const suffix = "%";
  const allStatPrefix = "올스탯:";
  const statPerLevelPrefix = `캐릭터기준9레벨당${targetStat}:`;
  if (inputString === null) return 0;
  if (inputString.startsWith(statPerLevelPrefix)) {
    if (level === undefined) {
      throw new Error(ERROR_MESSAGES.weaponInfo.noItemLevel);
    }
    const valueString = inputString.substring(statPerLevelPrefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return Math.floor(numericValue * Math.floor(level / 9));
    }
    return 0;
  }
  if (
    (inputString.startsWith(prefix) || inputString.startsWith(allStatPrefix)) &&
    !inputString.endsWith(suffix)
  ) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return Math.floor(numericValue);
    }
  }
  return 0;
};

const extractSetEffectValue = (
  inputString: string,
  prefix: string,
  suffix: string
) => {
  const allStatPrefix = "올스탯:";
  if (inputString === null) return 0;
  if (
    (inputString.startsWith(prefix) || inputString.startsWith(allStatPrefix)) &&
    !inputString.endsWith(suffix)
  ) {
    const valueString = inputString.substring(prefix.length);
    const numericValue = parseFloat(valueString);

    if (!isNaN(numericValue)) {
      return Math.floor(numericValue);
    }
  }
  return 0;
};
