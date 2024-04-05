import { CHARACTER_CLASS } from "@/constants/characterClass";
import { STARFORCE_LEVEL } from "@/constants/starForce";
import useItemMakerInfoStore from "@/models/itemMakerInfo";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { getStarForceResult } from "@/utils/getStarForceResult";
import { useRef, useState } from "react";

type StarforceOptionProps = {
  itemLevel: number | undefined;
};

const StarforceOption = ({ itemLevel }: StarforceOptionProps) => {
  const { itemData, setItemData, characterJob } = useItemMakerInfoStore();
  const starForce = itemData ? Number(itemData.starforce) : 0;
  const maxiumStarForce =
    STARFORCE_LEVEL.find((el) => itemLevel && itemLevel <= el.level)?.value ||
    0;
  const mainStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterJob);
    })?.mainStat.toLowerCase() ?? null;
  const subStat =
    CHARACTER_CLASS.find((characterClass) => {
      return characterClass.jobs.includes(characterJob);
    })?.subStat.toLowerCase() ?? null;
  const otherStats = ["str", "dex", "int", "luk"].filter(
    (stat) => stat !== mainStat && stat !== subStat
  );
  const getIsItemHasOtherStat = () => {
    otherStats.forEach((stat) => {
      if (
        itemData?.item_etc_option[
          stat as keyof typeof itemData.item_etc_option
        ] !== "0"
      ) {
        return true;
      }
    });
    return false;
  };

  const isItemHasOtherStat = getIsItemHasOtherStat();
  const isGlove = itemData?.item_equipment_slot === "장갑";
  const isWeapon = itemData?.item_equipment_slot === "무기";
  const isShoes = itemData?.item_equipment_slot === "신발";
  const isHeart = itemData?.item_equipment_slot === "기계 심장";
  const isMagician = mainStat === "int";

  const updateStarForceOption = (value: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    const starForceResult = getStarForceResult(copyItemData, value, isMagician);
    const upStat = starForceResult.get("up_stat")?.toString() ?? "0";
    const upOtherStat = starForceResult.get("up_other_stat")?.toString() ?? "0";
    const upAttackPower =
      (isWeapon
        ? starForceResult.get("up_attack_power")?.toString()
        : starForceResult.get("up_armor_attack_power")?.toString()) ?? "0";
    const upMagicPower =
      (isWeapon
        ? starForceResult.get("up_magic_power")?.toString()
        : starForceResult.get("up_armor_magic_power")?.toString()) ?? "0";
    const upArmor =
      (isWeapon ? "0" : starForceResult.get("up_armor")?.toString()) ?? "0";
    const upHp =
      (isGlove || isShoes || isHeart
        ? "0"
        : starForceResult.get("up_hp")?.toString()) ?? "0";
    const upMp =
      (isWeapon ? starForceResult.get("up_hp")?.toString() : "0") ?? "0";
    const upJump =
      (isShoes ? starForceResult.get("up_jump")?.toString() : "0") ?? "0";
    const upSpeed =
      (isShoes ? starForceResult.get("up_speed")?.toString() : "0") ?? "0";
    copyItemData = {
      ...copyItemData,
      starforce: value.toString(),
      item_starforce_option: {
        ...copyItemData.item_starforce_option,
        [mainStat as keyof typeof copyItemData.item_starforce_option]: upStat,
        [subStat as keyof typeof copyItemData.item_starforce_option]: upStat,
        [otherStats[0] as keyof typeof copyItemData.item_starforce_option]:
          isItemHasOtherStat ? upOtherStat : "0",
        [otherStats[1] as keyof typeof copyItemData.item_starforce_option]:
          isItemHasOtherStat ? upOtherStat : "0",
        attack_power: upAttackPower,
        magic_power: upMagicPower,
        armor: upArmor,
        max_hp: upHp,
        max_mp: upMp,
        jump: upJump,
        speed: upSpeed,
      },
    };
    setItemData({ ...copyItemData });
  };
  const onClickStarForceUp = () => {
    if (itemData === null) return;
    if (starForce < maxiumStarForce) {
      updateStarForceOption(starForce + 1);
    }
  };
  const onClickStarForceUp10 = () => {
    if (itemData === null) return;
    if (starForce <= maxiumStarForce - 10) {
      updateStarForceOption(starForce + 10);
    }
  };
  const onClickStarForceDown10 = () => {
    if (itemData === null) return;
    if (starForce >= 10) {
      updateStarForceOption(starForce - 10);
    } else {
      updateStarForceOption(0);
    }
  };
  const onClickStarForceDown = () => {
    if (itemData === null) return;
    if (starForce > 0) {
      updateStarForceOption(starForce - 1);
    }
  };
  const onClickFixedStarForce = (number: number) => {
    if (itemData === null) return;
    if (number > maxiumStarForce) {
      updateStarForceOption(maxiumStarForce);
    } else {
      updateStarForceOption(number);
    }
  };

  return (
    <div className="w-full py-10">
      <div className="flex flex-row justify-center items-center gap-1 max-w-lg mx-auto lg:mx-0 sm:gap-5 w-full text-sm sm:text-base">
        <button
          className="w-full h-8 border border-slate-200 rounded hover:bg-red-300 hover:border-red-300 hover:text-white transform ease-in-out duration-200"
          onClick={onClickStarForceDown10}
        >
          -10
        </button>
        <button
          className="w-full h-8 border border-slate-200 rounded hover:bg-red-300 hover:border-red-300 hover:text-white transform ease-in-out duration-200"
          onClick={onClickStarForceDown}
        >
          -1
        </button>
        <button
          className="w-full h-8 border border-slate-200 rounded hover:bg-indigo-300 hover:border-indigo-300 hover:text-white transform ease-in-out duration-200"
          onClick={onClickStarForceUp}
        >
          +1
        </button>
        <button
          className="w-full h-8 border border-slate-200 rounded hover:bg-indigo-300 hover:border-indigo-300 hover:text-white transform ease-in-out duration-200"
          onClick={onClickStarForceUp10}
        >
          +10
        </button>
      </div>
      <div className="w-full flex flex-col justify-center items-center lg:justify-normal lg:items-start mt-5 space-y-1">
        <div>일괄 강화</div>
        <div className="flex flex-row justify-center items-center gap-1 max-w-lg mx-auto lg:mx-0 sm:gap-5 w-full text-sm sm:text-base">
          <button
            className="w-full h-8 border border-slate-200 rounded hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transform ease-in-out duration-200"
            onClick={() => onClickFixedStarForce(17)}
          >
            17성
          </button>
          <button
            className="w-full h-8 border border-slate-200 rounded hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transform ease-in-out duration-200"
            onClick={() => onClickFixedStarForce(22)}
          >
            22성
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarforceOption;
