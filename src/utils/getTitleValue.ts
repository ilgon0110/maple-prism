import { SKILL_KEYS } from "@/constants/skills";
import { extractValue } from "./extractValue";
import { addingMap } from "./addingMap";

interface Title {
  title_name: string;
  title_icon: string;
  title_description: string;
  date_expire: string | null;
  date_option_expire: string | null;
}

export const getTitleValue = (title: Title) => {
  const titleStats = new Map<string, number>();
  let attackPower = 0;
  let magicPower = 0;
  let bossDamage = 0;
  let damage = 0;
  let criticalDamage = 0;
  const { title_description } = title;
  const titleEffects = title_description.split(/\n|\r/);
  titleEffects.forEach((effect) => {
    const removeSpaceEffect = removeSpace(effect);

    if (removeSpaceEffect.startsWith(removeSpace(SKILL_KEYS.attack_power))) {
      attackPower += extractValue(
        removeSpaceEffect,
        `${removeSpace(SKILL_KEYS.attack_power)}+`,
        ""
      );
    }
    if (removeSpaceEffect.startsWith(removeSpace(SKILL_KEYS.magic_power))) {
      magicPower += extractValue(
        removeSpaceEffect,
        `${removeSpace(SKILL_KEYS.magic_power)}+`,
        ""
      );
    }
    if (removeSpaceEffect.startsWith("공격력/마력")) {
      attackPower += extractValue(
        removeSpaceEffect,
        `${removeSpace("공격력/마력")}+`,
        ""
      );
      magicPower += extractValue(
        removeSpaceEffect,
        `${removeSpace("공격력/마력")}+`,
        ""
      );
    }
    if (removeSpaceEffect.startsWith(removeSpace(SKILL_KEYS.boss_damage))) {
      bossDamage += extractValue(
        removeSpaceEffect,
        `${removeSpace(SKILL_KEYS.boss_damage)}+`,
        "%"
      );
    }
    if (removeSpaceEffect.startsWith(removeSpace(SKILL_KEYS.damage))) {
      damage += extractValue(
        removeSpaceEffect,
        `${removeSpace(SKILL_KEYS.damage)}+`,
        "%"
      );
    }
    if (removeSpaceEffect.startsWith(removeSpace(SKILL_KEYS.critical_damage))) {
      criticalDamage += extractValue(
        removeSpaceEffect,
        `${removeSpace(SKILL_KEYS.critical_damage)}+`,
        "%"
      );
    }
  });
  addingMap(titleStats, SKILL_KEYS.attack_power, attackPower);
  addingMap(titleStats, SKILL_KEYS.magic_power, magicPower);
  addingMap(titleStats, SKILL_KEYS.boss_damage, bossDamage);
  addingMap(titleStats, SKILL_KEYS.damage, damage);
  addingMap(titleStats, SKILL_KEYS.critical_damage, criticalDamage);
  return {
    titleStats,
  };
};

const removeSpace = (inputString: string) => {
  return inputString.replace(/\s/g, "");
};
