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
  baseEmblem,
  baseBelt,
  baseRing,
  basePendant,
  baseEarring,
  baseEyeAccessory,
  baseFaceAccessory,
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
    case "엠블렘":
      return baseEmblem.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "벨트":
      return baseBelt.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "반지1":
      return baseRing.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "반지2":
      return baseRing.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "반지3":
      return baseRing.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "반지4":
      return baseRing.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "귀고리":
      return baseEarring.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "펜던트":
      return basePendant.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "펜던트2":
      return basePendant.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "눈장식":
      return baseEyeAccessory.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    case "얼굴장식":
      return baseFaceAccessory.filter(
        (item) => item.job === characterJob || item.job?.includes(characterJob)
      );
    default:
      return [];
  }
};
