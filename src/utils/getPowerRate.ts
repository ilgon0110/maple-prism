import { getBaseEquipmentStat } from "./getStats/getBaseEquipmentStat";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import { transWeaponStat } from "./getAttackPowers/transWeaponStat";
import { getStatPercentByPotential } from "./getStats/getStatPercentByPotential";
import { getBaseTitleStat } from "./getStats/getBaseTitleStat";
import { getBaseUnionRaiderStat } from "./getStats/getBaseUnionRaiderStat";
import { getBasePureStat } from "./getStats/getBasePureStat";
import { getExceptHyperStat } from "./getStats/getExceptHyperStat";
import { getExceptSymbolStat } from "./getStats/getExceptSymbolStat";
import { getAbilityValue } from "./getAbilityValue";
import { getBaseSkillValue } from "./getBaseSkillValue";
import { getUnionValue } from "./getUnionValue";
import { getAttackPowerPercent } from "./getAttackPowers/getAttackPowerPercent";
import { getEquipmentValue } from "./getEquipmentValue";
import { getHyperValue } from "./getHyperValue";
import { getTitleValue } from "./getTitleValue";
import {
  PowerRateProps,
  getAttackValueRateProps,
  getBossDamageRateProps,
  getCriticalDamageRateProps,
  getStatPowerRateProps,
  isUserHasGenesisWeaponProps,
} from "@/types/powerRate";
import { getHexaValue } from "./getHexaValue";
import { getArtifactValue } from "./getArtifactValue";
import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import { ICharacterAbility } from "@/types/characters/CharacterAbility";
import { ICharacterHyperStat } from "@/types/characters/CharacterHyperStat";
import { POWER_RATE } from "@/constants/powerRate";
import { ERROR_MESSAGES } from "@/constants/error";

export const getPowerRate = ({
  characterBasicInfo,
  characterSetEffect,
  characterUnionRaider,
  characterCashItemEquipment,
  characterStat,
  characterItemEquipment,
  characterPetEquipment,
  characterHyperStat,
  characterSymbol,
  characterAbility,
  characterSkill,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
  presets,
}: PowerRateProps) => {
  const statValue = getStatPowerRate({
    characterBasicInfo,
    characterStat,
    characterItemEquipment,
    characterCashItemEquipment,
    characterSetEffect,
    characterUnionRaider,
    characterHyperStat,
    characterSymbol,
    characterAbility,
    characterSkill,
    characterHexaStat,
    characterArtifact,
    eventSkillInfo,
    presets,
  });
  const attackValue = getAttackValueRate({
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect,
    characterUnionRaider,
    characterHyperStat,
    characterAbility,
    characterSkill,
    characterStat,
    characterBasicInfo,
    characterHexaStat,
    characterArtifact,
    eventSkillInfo,
    presets,
  });
  const bossDamageValue = getBossDamageRate({
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect,
    characterUnionRaider,
    characterHyperStat,
    characterAbility,
    characterSkill,
    characterStat,
    characterBasicInfo,
    characterHexaStat,
    characterArtifact,
    eventSkillInfo,
    presets,
  });
  const criticalDamageValue = getCriticalDamageRate({
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect,
    characterUnionRaider,
    characterHyperStat,
    characterAbility,
    characterSkill,
    characterStat,
    characterBasicInfo,
    characterHexaStat,
    characterArtifact,
    presets,
  });
  const isGenesis = isUserHasGenesisWeapon({ characterItemEquipment });
  return Math.floor(
    statValue * attackValue * bossDamageValue * criticalDamageValue * isGenesis
  );
};

const getStatPowerRate = ({
  characterBasicInfo,
  characterStat,
  characterItemEquipment,
  characterCashItemEquipment,
  characterSetEffect,
  characterUnionRaider,
  characterHyperStat,
  characterSymbol,
  characterAbility,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
  presets,
}: getStatPowerRateProps) => {
  const mainStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterBasicInfo.character_class);
    })?.mainStat.toUpperCase() ?? null;
  const subStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterBasicInfo.character_class);
    })?.subStat.toUpperCase() ?? null;

  if (mainStat === null || subStat === null) {
    throw new Error(ERROR_MESSAGES.statInfo);
  }
  if (
    characterItemEquipment === undefined ||
    characterSetEffect === undefined
  ) {
    return 0;
  }

  const selectedAbility = characterAbility[
    `ability_preset_${presets.ability}` as keyof ICharacterAbility
  ] as ICharacterAbility["ability_preset_1"];
  const selectedHyperStat = characterHyperStat[
    `hyper_stat_preset_${presets.hyperStat}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStat["hyper_stat_preset_1"];
  const selectedUnionRaider = characterUnionRaider[
    `union_raider_preset_${presets.union}` as keyof ICharacterUnionRaider
  ] as ICharacterUnionRaider["union_raider_preset_1"];
  const duKaSe =
    characterBasicInfo.character_class === "듀얼블레이더" ||
    characterBasicInfo.character_class === "카데나" ||
    characterBasicInfo.character_class === "섀도어";
  const { baseStats: baseAbilityStats, exceptStats: exceptAbilityStats } =
    getAbilityValue(selectedAbility, characterStat, characterBasicInfo);
  const { artifactStats } = getArtifactValue(characterArtifact);
  const { exceptUnionStats } = getUnionValue(selectedUnionRaider);
  const { hexaStats } = getHexaValue(characterHexaStat);
  // console.log("chacterItemEquipment", characterItemEquipment);
  // console.log("characterSetEffect", characterSetEffect);
  // console.log("baseAbilityStats", baseAbilityStats);
  // console.log("exceptAbilityStats", exceptAbilityStats);
  // console.log("artifactStats", artifactStats);
  // console.log("exceptUnionStats", exceptUnionStats);
  // console.log("hexaStats", hexaStats);
  //주스탯
  const baseAbilityMainStat = baseAbilityStats.get(mainStat) ?? 0;
  const hexaMainStat = hexaStats.get(mainStat) ?? 0;
  const exceptAbilityMainStat = exceptAbilityStats.get(mainStat) ?? 0;
  const baseArtifactMainStat = artifactStats.get(mainStat) ?? 0;
  const exceptUnionMainStat = exceptUnionStats.get(mainStat) ?? 0;
  const pureMainStat = getBasePureStat(characterStat, mainStat);
  const baseEquipmentMainStat = getBaseEquipmentStat(
    characterBasicInfo,
    characterItemEquipment,
    characterCashItemEquipment,
    characterSetEffect,
    mainStat
  );
  const baseTitleMainStat = getBaseTitleStat(characterItemEquipment, mainStat);
  const baseUnionRaiderMainStat = getBaseUnionRaiderStat(
    selectedUnionRaider,
    mainStat
  );
  const exceptHyperMainStat = getExceptHyperStat(selectedHyperStat, mainStat);
  const exceptSymbolMainStat = getExceptSymbolStat(characterSymbol, mainStat);
  const EVENT_STAT = +eventSkillInfo.selectedStatOption;

  //부스탯
  const baseAbilitySubStat = baseAbilityStats.get(subStat) ?? 0;
  const exceptAbilitySubStat = exceptAbilityStats.get(subStat) ?? 0;
  const baseArtifactSubStat = artifactStats.get(subStat) ?? 0;
  const exceptUnionSubStat = exceptUnionStats.get(subStat) ?? 0;
  const pureSubStat = getBasePureStat(characterStat, subStat);
  const baseEquipmentSubStat = getBaseEquipmentStat(
    characterBasicInfo,
    characterItemEquipment,
    characterCashItemEquipment,
    characterSetEffect,
    subStat
  );
  const baseTitleSubStat = getBaseTitleStat(characterItemEquipment, subStat);
  const baseUnionRaiderSubStat = getBaseUnionRaiderStat(
    selectedUnionRaider,
    subStat
  );
  const exceptHyperSubStat = getExceptHyperStat(selectedHyperStat, subStat);

  //듀카세일때 필요한 힘스탯
  const STR = "STR";
  const baseAbilityStrStat = baseAbilityStats.get(STR) ?? 0;
  const exceptAbilityStrStat = exceptAbilityStats.get(STR) ?? 0;
  const baseArtifactStrStat = artifactStats.get(STR) ?? 0;
  const exceptUnionStrStat = exceptUnionStats.get(STR) ?? 0;
  const pureStrStat = getBasePureStat(characterStat, STR);
  const baseEquipmentStrStat = getBaseEquipmentStat(
    characterBasicInfo,
    characterItemEquipment,
    characterCashItemEquipment,
    characterSetEffect,
    STR
  );
  const baseTitleStrStat = getBaseTitleStat(characterItemEquipment, STR);
  const baseUnionRaiderStrStat = getBaseUnionRaiderStat(
    selectedUnionRaider,
    STR
  );
  const exceptHyperStrStat = getExceptHyperStat(selectedHyperStat, STR);
  const strStatValue =
    pureStrStat +
    baseEquipmentStrStat +
    baseTitleStrStat +
    baseUnionRaiderStrStat +
    baseAbilityStrStat +
    baseArtifactStrStat +
    EVENT_STAT;

  const strStatPercent = getStatPercentByPotential(
    characterItemEquipment,
    "STR"
  );
  const strExceptStatValue =
    exceptUnionStrStat + exceptAbilityStrStat + exceptHyperStrStat;
  const finalStrSub =
    Math.floor(strStatValue * (strStatPercent + 100) * 0.01) +
    strExceptStatValue;
  // console.log("mainStat", mainStat, "subStat", subStat);
  // console.log("baseAbilityMainStat", baseAbilityMainStat);
  // console.log("baseAbilitySubStat", baseAbilitySubStat);
  // console.log("hexaMainStat", hexaMainStat);
  // console.log("exceptAbilityMainStat", exceptAbilityMainStat);
  // console.log("exceptAbilitySubStat", exceptAbilitySubStat);
  // console.log("baseArtifactMainStat", baseArtifactMainStat);
  // console.log("baseArtifactSubStat", baseArtifactSubStat);
  // console.log("exceptUnionMainStat", exceptUnionMainStat);
  // console.log("exceptUnionSubStat", exceptUnionSubStat);
  // console.log("EVENT_STAT", EVENT_STAT);
  // console.log("pureMainStat", pureMainStat);
  // console.log("pureSubStat", pureSubStat);
  // console.log("baseEquipmentMainStat", baseEquipmentMainStat);
  // console.log("baseEquipmentSubStat", baseEquipmentSubStat);
  // console.log("baseTitleMainStat", baseTitleMainStat);
  // console.log("baseTitleSubStat", baseTitleSubStat);
  // console.log("baseUnionRaiderMainStat", baseUnionRaiderMainStat);
  // console.log("baseUnionRaiderSubStat", baseUnionRaiderSubStat);

  // console.log("baseAbilityStrStat", baseAbilityStrStat);
  // console.log("exceptAbilityStrStat", exceptAbilityStrStat);
  // console.log("baseArtifactStrStat", baseArtifactStrStat);
  // console.log("exceptUnionStrStat", exceptUnionStrStat);
  // console.log("pureStrStat", pureStrStat);
  // console.log("baseEquipmentStrStat", baseEquipmentStrStat);
  // console.log("baseTitleStrStat", baseTitleStrStat);
  // console.log("baseUnionRaiderStrStat", baseUnionRaiderStrStat);
  // console.log("exceptHyperStrStat", exceptHyperStrStat);
  // console.log("strStatValue", strStatValue);
  // console.log("strStatPercent", strStatPercent);
  // console.log("strExceptStatValue", strExceptStatValue);
  // console.log("finalStrSub", finalStrSub);

  const mainStatValue =
    pureMainStat +
    baseEquipmentMainStat +
    baseTitleMainStat +
    baseUnionRaiderMainStat +
    baseAbilityMainStat +
    baseArtifactMainStat;
  EVENT_STAT;
  const mainStatPercent = getStatPercentByPotential(
    characterItemEquipment,
    mainStat
  );
  const mainExceptStatValue =
    hexaMainStat +
    exceptUnionMainStat +
    exceptAbilityMainStat +
    exceptHyperMainStat +
    exceptSymbolMainStat;

  const subStatValue =
    pureSubStat +
    baseEquipmentSubStat +
    baseTitleSubStat +
    baseUnionRaiderSubStat +
    baseAbilitySubStat +
    baseArtifactSubStat +
    EVENT_STAT;
  const subStatPercent = getStatPercentByPotential(
    characterItemEquipment,
    subStat
  );
  const subExceptStatValue =
    exceptUnionSubStat + exceptAbilitySubStat + exceptHyperSubStat;
  // console.log("mainStatValue", mainStatValue);
  // console.log("mainStatPercent", mainStatPercent);
  // console.log("mainExceptStatValue", mainExceptStatValue);
  // console.log("subStatValue", subStatValue);
  // console.log("subStatPercent", subStatPercent);
  // console.log("subExceptStatValue", subExceptStatValue);

  const finalMain =
    (Math.floor(mainStatValue * (mainStatPercent + 100) * 0.01) +
      mainExceptStatValue) *
    4;
  const finalSub = duKaSe
    ? finalStrSub +
      (Math.floor(subStatValue * (subStatPercent + 100) * 0.01) +
        subExceptStatValue)
    : Math.floor(subStatValue * (subStatPercent + 100) * 0.01) +
      subExceptStatValue;

  return (finalMain + finalSub) * 0.01;
};

const getAttackValueRate = ({
  characterItemEquipment,
  characterCashItemEquipment,
  characterPetEquipment,
  characterSetEffect,
  characterUnionRaider,
  characterHyperStat,
  characterAbility,
  characterSkill,
  characterStat,
  characterBasicInfo,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
  presets,
}: getAttackValueRateProps) => {
  if (
    characterItemEquipment === undefined ||
    characterSetEffect === undefined
  ) {
    return 0;
  }
  const weaponInfo = characterItemEquipment.item_equipment.find(
    (item) => item.item_equipment_slot === "무기"
  );
  const title = characterItemEquipment.title;
  if (weaponInfo === undefined) return 0;
  const mainStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterBasicInfo.character_class);
    })?.mainStat.toUpperCase() ?? null;
  const isMagician = mainStat === "INT";
  const attackPowerPercent = getAttackPowerPercent(
    characterItemEquipment,
    isMagician
  );
  const { equipmentValues } = getEquipmentValue(
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect
  );
  // console.log("attackPowerPercent", attackPowerPercent);
  // console.log("equipmentValues", equipmentValues);
  const selectedAbility = characterAbility[
    `ability_preset_${presets.ability}` as keyof ICharacterAbility
  ] as ICharacterAbility["ability_preset_1"];
  const selectedHyperStat = characterHyperStat[
    `hyper_stat_preset_${presets.hyperStat}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStat["hyper_stat_preset_1"];
  const selectedUnionRaider = characterUnionRaider[
    `union_raider_preset_${presets.union}` as keyof ICharacterUnionRaider
  ] as ICharacterUnionRaider["union_raider_preset_1"];

  const { unionStats } = getUnionValue(selectedUnionRaider);
  const { hyperStats } = getHyperValue(selectedHyperStat);
  const { skillStats } = getBaseSkillValue(characterSkill);
  const { artifactStats } = getArtifactValue(characterArtifact);
  const { titleStats } = getTitleValue(title);
  const { baseStats } = getAbilityValue(
    selectedAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  // console.log("unionStats", unionStats);
  // console.log("hyperStats", hyperStats);
  // console.log("skillStats", skillStats);
  // console.log("artifactStats", artifactStats);
  // console.log("titleStats", titleStats);
  // console.log("baseStats", baseStats);
  // console.log("hexaStats", hexaStats);
  const equipmentPower = isMagician
    ? equipmentValues.get(POWER_RATE.magic_power) ?? 0
    : equipmentValues.get(POWER_RATE.attack_power) ?? 0;
  const unionPower = isMagician
    ? unionStats.get(POWER_RATE.magic_power) ?? 0
    : unionStats.get(POWER_RATE.attack_power) ?? 0;
  const hyperPower = isMagician
    ? hyperStats.get(POWER_RATE.magic_power) ?? 0
    : hyperStats.get(POWER_RATE.attack_power) ?? 0;
  const artifactPower = isMagician
    ? artifactStats.get(POWER_RATE.magic_power) ?? 0
    : artifactStats.get(POWER_RATE.attack_power) ?? 0;
  const titlePower = isMagician
    ? titleStats.get(POWER_RATE.magic_power) ?? 0
    : titleStats.get(POWER_RATE.attack_power) ?? 0;
  const myWeaponPower = isMagician
    ? +weaponInfo.item_total_option.magic_power
    : +weaponInfo?.item_total_option.attack_power;
  const transWeaponPower = transWeaponStat(weaponInfo, isMagician);
  const abilityPower = isMagician
    ? baseStats.get(POWER_RATE.magic_power) ?? 0
    : baseStats.get(POWER_RATE.attack_power) ?? 0;
  const hexaAttackPower = hexaStats.get(POWER_RATE.attack_power) ?? 0;
  const hexaMagicPower = hexaStats.get(POWER_RATE.magic_power) ?? 0;
  const hexaPower = isMagician ? hexaMagicPower : hexaAttackPower;
  const totalPower =
    equipmentPower +
    unionPower +
    hyperPower +
    artifactPower +
    titlePower +
    abilityPower;
  const addSkillAttackPower = isMagician
    ? skillStats.get(POWER_RATE.magic_power) ?? 0
    : skillStats.get(POWER_RATE.attack_power) ?? 0;
  const EVENT_ATTACK_POWER = +eventSkillInfo.selectedPowerOption;

  // console.log("equipmentPower", equipmentPower);
  // console.log("unionPower", unionPower);
  // console.log("hyperPower", hyperPower);
  // console.log("artifactPower", artifactPower);
  // console.log("titlePower", titlePower);
  // console.log("myWeaponPower", myWeaponPower);
  // console.log("transWeaponPower", transWeaponPower);
  // console.log("abilityPower", abilityPower);
  // console.log("hexaAttackPower", hexaAttackPower);
  // console.log("hexaMagicPower", hexaMagicPower);
  // console.log("hexaPower", hexaPower);
  // console.log("totalPower", totalPower);
  // console.log("addSkillAttackPower", addSkillAttackPower);
  // console.log("EVENT_ATTACK_POWER", EVENT_ATTACK_POWER);

  return Math.floor(
    (hexaPower +
      totalPower -
      myWeaponPower +
      transWeaponPower +
      addSkillAttackPower +
      EVENT_ATTACK_POWER) *
      (100 + attackPowerPercent) *
      0.01
  );
};

const getBossDamageRate = ({
  characterItemEquipment,
  characterCashItemEquipment,
  characterPetEquipment,
  characterSetEffect,
  characterUnionRaider,
  characterHyperStat,
  characterAbility,
  characterStat,
  characterBasicInfo,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
  presets,
}: getBossDamageRateProps) => {
  if (
    characterItemEquipment === undefined ||
    characterSetEffect === undefined
  ) {
    return 0;
  }
  const title = characterItemEquipment.title;
  const { equipmentValues } = getEquipmentValue(
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect
  );
  const selectedAbility = characterAbility[
    `ability_preset_${presets.ability}` as keyof ICharacterAbility
  ] as ICharacterAbility["ability_preset_1"];
  const selectedHyperStat = characterHyperStat[
    `hyper_stat_preset_${presets.hyperStat}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStat["hyper_stat_preset_1"];
  const selectedUnionRaider = characterUnionRaider[
    `union_raider_preset_${presets.union}` as keyof ICharacterUnionRaider
  ] as ICharacterUnionRaider["union_raider_preset_1"];
  const { unionStats } = getUnionValue(selectedUnionRaider);
  const { hyperStats } = getHyperValue(selectedHyperStat);
  const { artifactStats } = getArtifactValue(characterArtifact);
  const { titleStats } = getTitleValue(title);
  const { baseStats } = getAbilityValue(
    selectedAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  const equipmentBossDamage = equipmentValues.get(POWER_RATE.boss_damage) ?? 0;
  const unionBossDamage = unionStats.get(POWER_RATE.boss_damage) ?? 0;
  const hyperBossDamage = hyperStats.get(POWER_RATE.boss_damage) ?? 0;
  const artifactBossDamage = artifactStats.get(POWER_RATE.boss_damage) ?? 0;
  const titleBossDamage = titleStats.get(POWER_RATE.boss_damage) ?? 0;
  const baseBossDamage = baseStats.get(POWER_RATE.boss_damage) ?? 0;
  const hexaBossDamage = hexaStats.get(POWER_RATE.boss_damage) ?? 0;
  const sumBossDamage =
    equipmentBossDamage +
    unionBossDamage +
    hyperBossDamage +
    artifactBossDamage +
    titleBossDamage +
    baseBossDamage +
    hexaBossDamage;
  const equipmentDamage = equipmentValues.get(POWER_RATE.damage) ?? 0;
  const unionDamage = unionStats.get(POWER_RATE.damage) ?? 0;
  const hyperDamage = hyperStats.get(POWER_RATE.damage) ?? 0;
  const artifactDamage = artifactStats.get(POWER_RATE.damage) ?? 0;
  const titleDamage = titleStats.get(POWER_RATE.damage) ?? 0;
  const baseDamage = baseStats.get(POWER_RATE.damage) ?? 0;
  const hexaDamage = hexaStats.get(POWER_RATE.damage) ?? 0;
  const sumDamage =
    equipmentDamage +
    unionDamage +
    hyperDamage +
    artifactDamage +
    titleDamage +
    baseDamage +
    hexaDamage;
  const EVENT_BOSS_DAMAGE = +eventSkillInfo.selectedBossDamageOption;
  // console.log("equipmentBossDamage", equipmentBossDamage);
  // console.log("unionBossDamage", unionBossDamage);
  // console.log("hyperBossDamage", hyperBossDamage);
  // console.log("artifactBossDamage", artifactBossDamage);
  // console.log("titleBossDamage", titleBossDamage);
  // console.log("baseBossDamage", baseBossDamage);
  // console.log("hexaBossDamage", hexaBossDamage);
  // console.log("sumBossDamage", sumBossDamage);
  // console.log("equipmentDamage", equipmentDamage);
  // console.log("unionDamage", unionDamage);
  // console.log("hyperDamage", hyperDamage);
  // console.log("artifactDamage", artifactDamage);
  // console.log("titleDamage", titleDamage);
  // console.log("baseDamage", baseDamage);
  // console.log("hexaDamage", hexaDamage);
  return (100 + sumBossDamage + EVENT_BOSS_DAMAGE + sumDamage) * 0.01;
};

const isUserHasGenesisWeapon = ({
  characterItemEquipment,
}: isUserHasGenesisWeaponProps) => {
  const prefix = "제네시스 ";
  const userHasGenesisWeapon = !!characterItemEquipment?.item_equipment.find(
    (item) =>
      item.item_equipment_slot === "무기" && item.item_name.startsWith(prefix)
  );

  return userHasGenesisWeapon ? 1.1 : 1;
};

const getCriticalDamageRate = ({
  characterStat,
  characterItemEquipment,
  characterCashItemEquipment,
  characterPetEquipment,
  characterSetEffect,
  characterUnionRaider,
  characterHyperStat,
  characterAbility,
  characterBasicInfo,
  characterHexaStat,
  characterArtifact,
  presets,
}: getCriticalDamageRateProps) => {
  if (
    characterItemEquipment === undefined ||
    characterSetEffect === undefined
  ) {
    return 0;
  }
  const title = characterItemEquipment.title;
  const { equipmentValues } = getEquipmentValue(
    characterItemEquipment,
    characterCashItemEquipment,
    characterPetEquipment,
    characterSetEffect
  );
  const selectedAbility = characterAbility[
    `ability_preset_${presets.ability}` as keyof ICharacterAbility
  ] as ICharacterAbility["ability_preset_1"];
  const selectedHyperStat = characterHyperStat[
    `hyper_stat_preset_${presets.hyperStat}` as keyof ICharacterHyperStat
  ] as ICharacterHyperStat["hyper_stat_preset_1"];
  const selectedUnionRaider = characterUnionRaider[
    `union_raider_preset_${presets.union}` as keyof ICharacterUnionRaider
  ] as ICharacterUnionRaider["union_raider_preset_1"];
  const { unionStats } = getUnionValue(selectedUnionRaider);
  const { hyperStats } = getHyperValue(selectedHyperStat);
  const { artifactStats } = getArtifactValue(characterArtifact);
  const { titleStats } = getTitleValue(title);
  const { baseStats } = getAbilityValue(
    selectedAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  const equipmentCriticalDamage =
    equipmentValues.get(POWER_RATE.critical_damage) ?? 0;
  const unionCriticalDamage = unionStats.get(POWER_RATE.critical_damage) ?? 0;
  const hyperCriticalDamage = hyperStats.get(POWER_RATE.critical_damage) ?? 0;
  const artifactCriticalDamage =
    artifactStats.get(POWER_RATE.critical_damage) ?? 0;
  const titleCriticalDamage = titleStats.get(POWER_RATE.critical_damage) ?? 0;
  const baseCriticalDamage = baseStats.get(POWER_RATE.critical_damage) ?? 0;
  const hexaCriticalDamage = hexaStats.get(POWER_RATE.critical_damage) ?? 0;
  const sumCriticalDamage =
    equipmentCriticalDamage +
    unionCriticalDamage +
    hyperCriticalDamage +
    artifactCriticalDamage +
    titleCriticalDamage +
    baseCriticalDamage +
    hexaCriticalDamage;
  return (135 + sumCriticalDamage) * 0.01;
};
