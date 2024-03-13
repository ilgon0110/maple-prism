import { LINK_SKILLS, SKILL_KEYS } from "@/constants/skills";
import { ICharacterLinkSkill } from "@/types/characters/CharacterLinkSkill";

export const getLinkSkillStat = (characterLinkSkill: ICharacterLinkSkill) => {
  const map = new Map();
  characterLinkSkill.character_link_skill.forEach((cur) => {
    const linkName = cur.skill_name.trim();
    const linkLevel = cur.skill_level;
    const links = LINK_SKILLS.find((el) => el.name === linkName);
    if (!!links) {
      const key = links.key;
      const keys = links.keys;
      const value = links.values.find((el) => el.level === linkLevel)?.value;
      if (key) {
        map.get(key) ? map.set(key, value + map.get(key)) : map.set(key, value);
      } else if (keys) {
        keys.forEach((el) => {
          map.get(el) ? map.set(el, value + map.get(el)) : map.set(el, value);
        });
      }
    }
  });
  return map;
};
