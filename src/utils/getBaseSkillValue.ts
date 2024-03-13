import { SKILL_KEYS } from "@/constants/skills";
import { ICharacterSkill } from "@/types/characters/CharacterSkill";
import { addingMap } from "./addingMap";

export const getBaseSkillValue = (characterSkill: ICharacterSkill) => {
  const skillStats = new Map<string, number>();
  const atipactStats = new Map<string, number>();
  const skillkeys = Object.values(SKILL_KEYS);
  let blessingValue = 0;
  characterSkill.character_skill.forEach((skill) => {
    const match = skill.skill_effect?.match(/\b\d+\b/);
    if (
      skill.skill_name === "정령의 축복" ||
      skill.skill_name === "여제의 축복"
    ) {
      const n = match ? Number(match[0]) : 0;
      blessingValue = Math.max(blessingValue, n);
    }
    if (skill.skill_name.startsWith("유니온 아티팩트")) {
      const type = skill.skill_name.split(":").map((el) => el.trim())[1];
      const n = match ? Number(match[0]) : 0;
      if (type === "공격력/마력") {
        addingMap(atipactStats, SKILL_KEYS.attack_power, n);
        addingMap(atipactStats, SKILL_KEYS.magic_power, n);
      }
      if (skillkeys.includes(type)) {
        addingMap(atipactStats, type, n);
      }
      if (type === "올스탯") {
        const allTypes = ["STR", "DEX", "INT", "LUK"];
        allTypes.forEach((type) => {
          addingMap(atipactStats, type, n);
        });
      }
    }

    const petLabelRegex = /^공격력 (\d+), 마력 \1증가$/;
    if (skill.skill_effect && petLabelRegex.test(skill.skill_effect)) {
      const petMatch = skill.skill_effect.match(petLabelRegex);
      const n = petMatch ? Number(petMatch[1]) : 0;
      addingMap(skillStats, SKILL_KEYS.attack_power, n);
      addingMap(skillStats, SKILL_KEYS.magic_power, n);
    }
  });
  addingMap(skillStats, SKILL_KEYS.attack_power, blessingValue);
  addingMap(skillStats, SKILL_KEYS.magic_power, blessingValue);

  return {
    skillStats,
    atipactStats,
  };
};
