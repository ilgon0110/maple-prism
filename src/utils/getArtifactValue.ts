import { removeSpace } from "./removeSpace";
import { ICharacterArtifact } from "@/types/characters/CharacterArtifact";
import { addingMap } from "./addingMap";
import { POWER_RATE } from "@/constants/powerRate";

export const getArtifactValue = (characterArtifact: ICharacterArtifact) => {
  const artifactStats = new Map<string, number>();
  characterArtifact.union_artifact_effect.forEach((effect) => {
    const value = extractNumbersFromString(effect.name);
    const effectName = removeSpace(effect.name);
    console.log("effectName : ", effectName);
    console.log("value : ", value);
    if (effectName.includes("올스탯")) {
      addingMap(artifactStats, "STR", value);
      addingMap(artifactStats, "DEX", value);
      addingMap(artifactStats, "INT", value);
      addingMap(artifactStats, "LUK", value);
    }
    if (effectName.includes("공격력")) {
      addingMap(artifactStats, POWER_RATE.attack_power, value);
    }
    if (effectName.includes("마력")) {
      addingMap(artifactStats, POWER_RATE.magic_power, value);
    }
    if (effectName.startsWith("보스몬스터공격시")) {
      addingMap(artifactStats, POWER_RATE.boss_damage, value);
    }
    if (effectName.startsWith("크리티컬데미지")) {
      addingMap(artifactStats, POWER_RATE.critical_damage, value);
    }
    if (effectName.startsWith("데미지")) {
      addingMap(artifactStats, POWER_RATE.damage, value);
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
