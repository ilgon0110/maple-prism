import { eventSkillInfoStore } from "@/models/eventSkillInfo";
import { ICharacterAbility } from "./characters/CharacterAbility";
import { ICharacterArtifact } from "./characters/CharacterArtifact";
import { ICharacterBasicInfo } from "./characters/CharacterBasicInfo";
import { ICharacterCashItemEquipment } from "./characters/CharacterCashItemEquipment";
import { ICharacterHexaStat } from "./characters/CharacterHexaStat";
import { ICharacterHyperStat } from "./characters/CharacterHyperStat";
import { ICharacterItemEquipment } from "./characters/CharacterItemEquipment";
import { ICharacterPetEquipment } from "./characters/CharacterPetEquipment";
import { ICharacterSetEffect } from "./characters/CharacterSetEffect";
import { ICharacterSkill } from "./characters/CharacterSkill";
import { ICharacterStat } from "./characters/CharacterStat";
import { ICharacterSymbol } from "./characters/CharacterSymbol";
import { ICharacterUnionRaider } from "./characters/CharacterUnionRaider";

export type PowerRateProps = {
  characterBasicInfo: ICharacterBasicInfo;
  characterSetEffect: ICharacterSetEffect | undefined;
  characterUnionRaider: ICharacterUnionRaider;
  characterCashItemEquipment: ICharacterCashItemEquipment;
  characterStat: ICharacterStat;
  characterItemEquipment: ICharacterItemEquipment | undefined;
  characterPetEquipment: ICharacterPetEquipment;
  characterHyperStat: ICharacterHyperStat;
  characterSymbol: ICharacterSymbol;
  characterAbility: ICharacterAbility;
  characterSkill: ICharacterSkill;
  characterHexaStat: ICharacterHexaStat;
  characterArtifact: ICharacterArtifact;
  eventSkillInfo: eventSkillInfoStore;
};

export type getStatPowerRateProps = {
  characterBasicInfo: ICharacterBasicInfo;
  characterStat: ICharacterStat;
  characterItemEquipment: ICharacterItemEquipment | undefined;
  characterCashItemEquipment: ICharacterCashItemEquipment;
  characterSetEffect: ICharacterSetEffect | undefined;
  characterUnionRaider: ICharacterUnionRaider;
  characterHyperStat: ICharacterHyperStat;
  characterSymbol: ICharacterSymbol;
  characterAbility: ICharacterAbility;
  characterSkill: ICharacterSkill;
  characterHexaStat: ICharacterHexaStat;
  characterArtifact: ICharacterArtifact;
  eventSkillInfo: eventSkillInfoStore;
};

export type getAttackValueRateProps = {
  characterItemEquipment: ICharacterItemEquipment | undefined;
  characterCashItemEquipment: ICharacterCashItemEquipment;
  characterPetEquipment: ICharacterPetEquipment;
  characterSetEffect: ICharacterSetEffect | undefined;
  characterUnionRaider: ICharacterUnionRaider;
  characterHyperStat: ICharacterHyperStat;
  characterAbility: ICharacterAbility;
  characterSkill: ICharacterSkill;
  characterStat: ICharacterStat;
  characterBasicInfo: ICharacterBasicInfo;
  characterHexaStat: ICharacterHexaStat;
  characterArtifact: ICharacterArtifact;
  eventSkillInfo: eventSkillInfoStore;
};

export type getBossDamageRateProps = {
  characterItemEquipment: ICharacterItemEquipment | undefined;
  characterCashItemEquipment: ICharacterCashItemEquipment;
  characterPetEquipment: ICharacterPetEquipment;
  characterSetEffect: ICharacterSetEffect | undefined;
  characterUnionRaider: ICharacterUnionRaider;
  characterHyperStat: ICharacterHyperStat;
  characterAbility: ICharacterAbility;
  characterSkill: ICharacterSkill;
  characterStat: ICharacterStat;
  characterBasicInfo: ICharacterBasicInfo;
  characterHexaStat: ICharacterHexaStat;
  characterArtifact: ICharacterArtifact;
  eventSkillInfo: eventSkillInfoStore;
};

export type isUserHasGenesisWeaponProps = {
  characterItemEquipment: ICharacterItemEquipment | undefined;
};

export type getCriticalDamageRateProps = {
  characterItemEquipment: ICharacterItemEquipment | undefined;
  characterCashItemEquipment: ICharacterCashItemEquipment;
  characterPetEquipment: ICharacterPetEquipment;
  characterSetEffect: ICharacterSetEffect | undefined;
  characterUnionRaider: ICharacterUnionRaider;
  characterHyperStat: ICharacterHyperStat;
  characterAbility: ICharacterAbility;
  characterSkill: ICharacterSkill;
  characterStat: ICharacterStat;
  characterBasicInfo: ICharacterBasicInfo;
  characterHexaStat: ICharacterHexaStat;
  characterArtifact: ICharacterArtifact;
};
