import { CHARACTER_CLASS } from "@/constants/characterClass";
import {
  baseHats,
  baseCape,
  baseClothes,
  baseGlove,
  basePants,
  baseShoes,
  baseShoulder,
  baseWeapon,
} from "@/constants/items";

export const getMakerItemList = (slot: string, characterJob: string) => {
  const myClass = CHARACTER_CLASS.find((item) =>
    item.jobs.includes(characterJob)
  )?.class;
  switch (slot) {
    case "모자":
      return baseHats.filter((item) => item.class === myClass);
    case "망토":
      return baseCape.filter((item) => item.class === myClass);
    case "상의":
      return baseClothes.filter((item) => item.class === myClass);
    case "장갑":
      return baseGlove.filter((item) => item.class === myClass);
    case "하의":
      return basePants.filter((item) => item.class === myClass);
    case "신발":
      return baseShoes.filter((item) => item.class === myClass);
    case "어깨장식":
      return baseShoulder.filter((item) => item.class === myClass);
    case "무기":
      return baseWeapon.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    default:
      return baseWeapon.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
  }
};
