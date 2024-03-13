import { ICharacterArtifact } from "@/types/characters/CharacterArtifact";
import { addingMap } from "./addingMap";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import { SKILL_KEYS } from "@/constants/skills";

export const getArtifactValue = (
  characterBasicInfo: ICharacterBasicInfo,
  characterArtifact: ICharacterArtifact
) => {
  const characterJob = characterBasicInfo.character_class;
  const artifactStats = new Map<string, number>();
  const mainStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterJob);
    })?.mainStat.toUpperCase() ?? "";
  const subStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterJob);
    })?.subStat.toUpperCase() ?? "";
  characterArtifact.union_artifact_effect.forEach((effect) => {
    const value = extractNumbersFromString(effect.name);
    if (effect.name.includes("올스탯")) {
      addingMap(artifactStats, mainStat, value);
      addingMap(artifactStats, subStat, value);
    }
    if (effect.name.includes("공격력")) {
      addingMap(artifactStats, SKILL_KEYS.attack_power, value);
    }
    if (effect.name.includes("마력")) {
      addingMap(artifactStats, SKILL_KEYS.magic_power, value);
    }
    if (effect.name.includes("보스 몬스터")) {
      addingMap(artifactStats, SKILL_KEYS.boss_damage, value);
    } else if (effect.name.includes("크리티컬 데미지")) {
      addingMap(artifactStats, SKILL_KEYS.critical_damage, value);
    } else if (
      !effect.name.includes("보스 몬스터") &&
      effect.name.includes("데미지")
    ) {
      addingMap(artifactStats, SKILL_KEYS.damage, value);
    }
  });

  return { artifactStats };
};

const extractNumbersFromString = (str: string): number => {
  const regex: RegExp = /\d+(\.\d+)?/g;
  const matches: RegExpMatchArray | null = str.match(regex);
  if (!matches) {
    return 0;
  }
  const numbers: number[] = matches.map((match) => parseFloat(match));
  return numbers[0];
};