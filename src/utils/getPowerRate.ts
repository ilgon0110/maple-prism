import { getBaseEquipmentStat } from "./getStats/getBaseEquipmentStat";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import { transWeaponStat } from "./getAttackPowers/transWeaponStat";
import { getStatPercentByPotential } from "./getStats/getStatPercentByPotential";
import { getBaseTitleStat } from "./getStats/getBaseTitleStat";
import { getBaseUnionRaiderStat } from "./getStats/getBaseUnionRaiderStat";
import { getBasePureStat } from "./getStats/getBasePureStat";
import { getExceptUnionRaider } from "./getStats/getExceptUnionRaider";
import { getExceptHyperStat } from "./getStats/getExceptHyperStat";
import { getExceptSymbolStat } from "./getStats/getExceptSymbolStat";
import { getAbilityValue } from "./getAbilityValue";
import { getBaseSkillValue } from "./getBaseSkillValue";
import { getUnionValue } from "./getUnionValue";
import { getAttackPowerPercent } from "./getAttackPowers/getAttackPowerPercent";
import { getEquipmentValue } from "./getEquipmentValue";
import { SKILL_KEYS } from "@/constants/skills";
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
import useEventSKillInfoStore from "@/models/eventSkillInfo";

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
  characterSkill,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
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
    throw new Error("mainStat or subStat is null");
  }
  if (
    characterItemEquipment === undefined ||
    characterSetEffect === undefined
  ) {
    return 0;
  }
  const { baseStats: baseAbilityStats, exceptStats: exceptAbilityStats } =
    getAbilityValue(characterAbility, characterStat, characterBasicInfo);
  const { artifactStats } = getArtifactValue(
    characterBasicInfo,
    characterArtifact
  );
  const { exceptUnionStats } = getUnionValue(characterUnionRaider);
  const { hexaStats } = getHexaValue(characterHexaStat);
  const baseAbilityMainStat = baseAbilityStats.get(mainStat) ?? 0;
  const baseAbilitySubStat = baseAbilityStats.get(subStat) ?? 0;
  const hexaMainStat = hexaStats.get(mainStat) ?? 0;
  const exceptAbilityMainStat = exceptAbilityStats.get(mainStat) ?? 0;
  const exceptAbilitySubStat = exceptAbilityStats.get(subStat) ?? 0;
  const baseArtifactMainStat = artifactStats.get(mainStat) ?? 0;
  const baseArtifactSubStat = artifactStats.get(subStat) ?? 0;
  const exceptUnionMainStat = exceptUnionStats.get(mainStat) ?? 0;
  const exceptUnionSubStat = exceptUnionStats.get(subStat) ?? 0;
  const EVENT_STAT = +eventSkillInfo.selectedStatOption;
  const mainStatValue =
    getBasePureStat(characterStat, mainStat) +
    getBaseEquipmentStat(
      characterBasicInfo,
      characterItemEquipment,
      characterCashItemEquipment,
      characterSetEffect,
      mainStat
    ) +
    getBaseTitleStat(characterItemEquipment, mainStat) +
    getBaseUnionRaiderStat(characterUnionRaider, mainStat) +
    baseAbilityMainStat +
    baseArtifactMainStat +
    EVENT_STAT;

  const mainStatPercent = getStatPercentByPotential(
    characterItemEquipment,
    mainStat
  );
  const mainExceptStatValue =
    hexaMainStat +
    exceptUnionMainStat +
    exceptAbilityMainStat +
    getExceptHyperStat(characterHyperStat, mainStat) +
    getExceptSymbolStat(characterSymbol, mainStat);

  const subStatValue =
    getBasePureStat(characterStat, subStat) +
    getBaseEquipmentStat(
      characterBasicInfo,
      characterItemEquipment,
      characterCashItemEquipment,
      characterSetEffect,
      subStat
    ) +
    getBaseTitleStat(characterItemEquipment, subStat) +
    getBaseUnionRaiderStat(characterUnionRaider, subStat) +
    baseAbilitySubStat +
    baseArtifactSubStat +
    EVENT_STAT;
  const subStatPercent = getStatPercentByPotential(
    characterItemEquipment,
    subStat
  );
  const subExceptStatValue =
    exceptUnionSubStat +
    exceptAbilitySubStat +
    getExceptHyperStat(characterHyperStat, subStat);

  const finalMain =
    (Math.floor(mainStatValue * (mainStatPercent + 100) * 0.01) +
      mainExceptStatValue) *
    4;
  const finalSub =
    Math.floor(subStatValue * (subStatPercent + 100) * 0.01) +
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
  const { unionStats } = getUnionValue(characterUnionRaider);
  const { hyperStats } = getHyperValue(characterHyperStat);
  const { skillStats } = getBaseSkillValue(characterSkill);
  const { artifactStats } = getArtifactValue(
    characterBasicInfo,
    characterArtifact
  );
  const { titleStats } = getTitleValue(title);
  const { baseStats, exceptStats } = getAbilityValue(
    characterAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  const equipmentPower = isMagician
    ? equipmentValues.get(SKILL_KEYS.magic_power) ?? 0
    : equipmentValues.get(SKILL_KEYS.attack_power) ?? 0;
  const unionPower = isMagician
    ? unionStats.get(SKILL_KEYS.magic_power) ?? 0
    : unionStats.get(SKILL_KEYS.attack_power) ?? 0;
  const hyperPower = isMagician
    ? hyperStats.get(SKILL_KEYS.magic_power) ?? 0
    : hyperStats.get(SKILL_KEYS.attack_power) ?? 0;
  const artifactPower = isMagician
    ? artifactStats.get(SKILL_KEYS.magic_power) ?? 0
    : artifactStats.get(SKILL_KEYS.attack_power) ?? 0;
  const titlePower = isMagician
    ? titleStats.get(SKILL_KEYS.magic_power) ?? 0
    : titleStats.get(SKILL_KEYS.attack_power) ?? 0;
  const myWeaponPower = isMagician
    ? +weaponInfo.item_total_option.magic_power
    : +weaponInfo?.item_total_option.attack_power;
  const transWeaponPower = transWeaponStat(weaponInfo, isMagician);
  const abilityPower = isMagician
    ? baseStats.get(SKILL_KEYS.magic_power) ?? 0
    : baseStats.get(SKILL_KEYS.attack_power) ?? 0;
  const hexaAttackPower = hexaStats.get(SKILL_KEYS.attack_power) ?? 0;
  const hexaMagicPower = hexaStats.get(SKILL_KEYS.magic_power) ?? 0;
  const hexaPower = isMagician ? hexaMagicPower : hexaAttackPower;
  const baseAttackPower =
    equipmentPower +
    unionPower +
    hyperPower +
    artifactPower +
    titlePower +
    abilityPower;
  const addBaseAttackPower = isMagician
    ? skillStats.get(SKILL_KEYS.magic_power) ?? 0
    : skillStats.get(SKILL_KEYS.attack_power) ?? 0;
  const EVENT_ATTACK_POWER = +eventSkillInfo.selectedPowerOption;

  return Math.floor(
    (hexaPower +
      baseAttackPower -
      myWeaponPower +
      transWeaponPower +
      addBaseAttackPower +
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
  characterSkill,
  characterHyperStat,
  characterAbility,
  characterStat,
  characterBasicInfo,
  characterHexaStat,
  characterArtifact,
  eventSkillInfo,
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
  const { unionStats } = getUnionValue(characterUnionRaider);
  const { hyperStats } = getHyperValue(characterHyperStat);
  const { artifactStats } = getArtifactValue(
    characterBasicInfo,
    characterArtifact
  );
  const { titleStats } = getTitleValue(title);
  const { baseStats } = getAbilityValue(
    characterAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  const equipmentBossDamage = equipmentValues.get(SKILL_KEYS.boss_damage) ?? 0;
  const unionBossDamage = unionStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const hyperBossDamage = hyperStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const artifactBossDamage = artifactStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const titleBossDamage = titleStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const baseBossDamage = baseStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const hexaBossDamage = hexaStats.get(SKILL_KEYS.boss_damage) ?? 0;
  const sumBossDamage =
    equipmentBossDamage +
    unionBossDamage +
    hyperBossDamage +
    artifactBossDamage +
    titleBossDamage +
    baseBossDamage +
    hexaBossDamage;
  const equipmentDamage = equipmentValues.get(SKILL_KEYS.damage) ?? 0;
  const unionDamage = unionStats.get(SKILL_KEYS.damage) ?? 0;
  const hyperDamage = hyperStats.get(SKILL_KEYS.damage) ?? 0;
  const artifactDamage = artifactStats.get(SKILL_KEYS.damage) ?? 0;
  const titleDamage = titleStats.get(SKILL_KEYS.damage) ?? 0;
  const baseDamage = baseStats.get(SKILL_KEYS.damage) ?? 0;
  const hexaDamage = hexaStats.get(SKILL_KEYS.damage) ?? 0;

  const sumDamage =
    equipmentDamage +
    unionDamage +
    hyperDamage +
    artifactDamage +
    titleDamage +
    baseDamage +
    hexaDamage;
  const EVENT_BOSS_DAMAGE = +eventSkillInfo.selectedBossDamageOption;
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
  characterSkill,
  characterBasicInfo,
  characterHexaStat,
  characterArtifact,
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
  const { unionStats } = getUnionValue(characterUnionRaider);
  const { hyperStats } = getHyperValue(characterHyperStat);
  const { artifactStats } = getArtifactValue(
    characterBasicInfo,
    characterArtifact
  );
  const { titleStats } = getTitleValue(title);
  const { baseStats } = getAbilityValue(
    characterAbility,
    characterStat,
    characterBasicInfo
  );
  const { hexaStats } = getHexaValue(characterHexaStat);
  const equipmentCriticalDamage =
    equipmentValues.get(SKILL_KEYS.critical_damage) ?? 0;
  const unionCriticalDamage = unionStats.get(SKILL_KEYS.critical_damage) ?? 0;
  const hyperCriticalDamage = hyperStats.get(SKILL_KEYS.critical_damage) ?? 0;
  const artifactCriticalDamage =
    artifactStats.get(SKILL_KEYS.critical_damage) ?? 0;
  const titleCriticalDamage = titleStats.get(SKILL_KEYS.critical_damage) ?? 0;
  const baseCriticalDamage = baseStats.get(SKILL_KEYS.critical_damage) ?? 0;
  const hexaCriticalDamage = hexaStats.get(SKILL_KEYS.critical_damage) ?? 0;
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
