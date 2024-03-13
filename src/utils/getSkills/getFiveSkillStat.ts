import { SKILL_KEYS } from "@/constants/skills";
import { ICharacterSkill } from "@/types/characters/CharacterSkill";

export const getSkillStat = (characterSkill: ICharacterSkill) => {
  const map = new Map();
  characterSkill.character_skill.forEach((el) => {
    const skillEffects = el.skill_effect?.split(/\r|\n/);
    const prefix = "[패시브 효과 : ";
    const suffix = " 증가]";
    skillEffects?.forEach((effect) => {
      if (effect.startsWith(prefix) && effect.endsWith(suffix)) {
        const skillKey = extractKey(effect);
        if (skillKey !== undefined) {
          const match = effect.match(/\b\d+\b/g);
          const value = match ? Number(match[0]) : null;
          if (value !== null) {
            map.get(skillKey)
              ? map.set(skillKey, value + map.get(skillKey))
              : map.set(skillKey, value);
          }
        }
      }
    });
  });
  return map;
};

const extractKey = (effect: string) => {
  const effects = effect.split(/ |,/).map((el) => el.trim());
  const keys = Object.values(SKILL_KEYS);
  return keys.find((el) => effects.includes(el));
};
