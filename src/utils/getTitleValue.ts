import { extractValue } from "./extractValue";
import { addingMap } from "./addingMap";
import { removeSpace } from "./removeSpace";
import { POWER_RATE } from "@/constants/powerRate";

interface Title {
  title_name: string;
  title_icon: string;
  title_description: string;
  date_expire: string | null;
  date_option_expire: string | null;
}

export const getTitleValue = (title: Title | null) => {
  const titleStats = new Map<string, number>();
  let attackPower = 0;
  let magicPower = 0;
  let bossDamage = 0;
  let damage = 0;
  let criticalDamage = 0;
  console.log("title", title);
  if (title === null) {
    return { titleStats };
  }
  const { title_description, date_option_expire } = title;
  console.log("title_description", title_description);
  const titleEffects = title_description.split(/\n|\r|,/);
  console.log("titleEffects", titleEffects);
  if (date_option_expire === "expired") {
    return { titleStats };
  }
  titleEffects.forEach((effect) => {
    const removeSpaceEffect = removeSpace(effect);
    if (removeSpaceEffect.startsWith(POWER_RATE.attack_power)) {
      attackPower += extractValue(
        removeSpaceEffect,
        `${POWER_RATE.attack_power}+`,
        ""
      );
    }
    if (removeSpaceEffect.startsWith(POWER_RATE.magic_power)) {
      magicPower += extractValue(
        removeSpaceEffect,
        `${POWER_RATE.magic_power}+`,
        ""
      );
    }
    if (removeSpaceEffect.startsWith("공격력/마력")) {
      attackPower += extractValue(removeSpaceEffect, `${"공격력/마력"}+`, "");
      magicPower += extractValue(removeSpaceEffect, `${"공격력/마력"}+`, "");
    }
    if (removeSpaceEffect.startsWith(POWER_RATE.boss_damage)) {
      bossDamage += extractValue(
        removeSpaceEffect,
        `${POWER_RATE.boss_damage}+`,
        "%"
      );
    }
    if (removeSpaceEffect.startsWith(POWER_RATE.damage)) {
      damage += extractValue(removeSpaceEffect, `${POWER_RATE.damage}+`, "%");
    }
    if (removeSpaceEffect.startsWith(POWER_RATE.critical_damage)) {
      criticalDamage += extractValue(
        removeSpaceEffect,
        `${POWER_RATE.critical_damage}+`,
        "%"
      );
    }
  });
  addingMap(titleStats, POWER_RATE.attack_power, attackPower);
  addingMap(titleStats, POWER_RATE.magic_power, magicPower);
  addingMap(titleStats, POWER_RATE.boss_damage, bossDamage);
  addingMap(titleStats, POWER_RATE.damage, damage);
  addingMap(titleStats, POWER_RATE.critical_damage, criticalDamage);
  return {
    titleStats,
  };
};
