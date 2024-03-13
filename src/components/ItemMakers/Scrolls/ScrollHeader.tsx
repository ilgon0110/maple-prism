import useItemMakerInfoStore from "@/models/itemMakerInfo";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { cls } from "@/utils/cls";
import Image from "next/image";

const ScrollHeader = () => {
  const { itemData, setItemData, pureItemData } = useItemMakerInfoStore();
  const originEtcOption = {
    str: "0",
    dex: "0",
    int: "0",
    luk: "0",
    max_hp: "0",
    max_mp: "0",
    attack_power: "0",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
  };
  const isCanUseInnocentScroll =
    itemData?.scroll_upgrade !== "0" ||
    itemData.starforce !== "0" ||
    itemData.golden_hammer_flag === "적용";
  const isCanUseArkInnocentScroll =
    itemData?.scroll_upgrade !== "0" || itemData.golden_hammer_flag === "적용";
  const isCanUseGoldHammer = itemData?.golden_hammer_flag !== "적용";
  const isCanUsePureScroll = itemData?.scroll_resilience_count !== "0";
  const onClickInnocentButton = () => {
    if (pureItemData === null) return;
    if (!isCanUseInnocentScroll) return;
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      item_etc_option: {
        ...originEtcOption,
      },
      scroll_upgradeable_count: pureItemData.scroll_upgradeable_count,
      scroll_upgrade: pureItemData.scroll_upgrade,
      starforce: pureItemData.starforce,
      golden_hammer_flag: pureItemData.golden_hammer_flag,
    };
    setItemData({ ...copyItemData });
  };

  const onClickArkInnocentButton = () => {
    if (pureItemData === null) return;
    if (!isCanUseArkInnocentScroll) return;
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      item_etc_option: {
        ...originEtcOption,
      },
      scroll_upgradeable_count: pureItemData.scroll_upgradeable_count,
      scroll_upgrade: pureItemData.scroll_upgrade,
      golden_hammer_flag: pureItemData.golden_hammer_flag,
    };
    setItemData({ ...copyItemData });
  };

  const onClickGoldHammerButton = () => {
    if (!isCanUseGoldHammer) return;
    let copyItemData = { ...itemData } as IItemEquipment;
    const scrollUpgradableCount =
      Number(copyItemData.scroll_upgradeable_count) + 1;
    copyItemData = {
      ...copyItemData,
      golden_hammer_flag: "적용",
      scroll_upgradeable_count: scrollUpgradableCount.toString(),
    };
    setItemData({ ...copyItemData });
  };

  const onClickPureScrollButton = () => {
    let copyItemData = { ...itemData } as IItemEquipment;
    if (!isCanUsePureScroll) return;
    const scrollUpgradableCount =
      Number(copyItemData.scroll_upgradeable_count) + 1;
    const scrollResilienceCount =
      Number(copyItemData.scroll_resilience_count) - 1;
    copyItemData = {
      ...copyItemData,
      scroll_upgradeable_count: scrollUpgradableCount.toString(),
      scroll_resilience_count: scrollResilienceCount.toString(),
    };
    setItemData({ ...copyItemData });
  };

  return (
    <>
      <button
        className={cls(
          "w-full flex justify-center items-center hover:bg-slate-300 transform duration-200 ease-in-out",
          isCanUseGoldHammer ? "" : "opacity-20"
        )}
        onClick={onClickGoldHammerButton}
        disabled={!isCanUseGoldHammer}
      >
        <Image
          src="/gold_hammer.png"
          width={32}
          height={32}
          alt="황금망치"
          sizes="100%"
        />
      </button>
      <button
        className={cls(
          "w-full p-2 hover:bg-slate-300 transform duration-200 ease-in-out flex justify-center items-center",
          isCanUsePureScroll ? "" : "opacity-20"
        )}
        onClick={onClickPureScrollButton}
        disabled={!isCanUsePureScroll}
      >
        <Image
          src="/pure_scroll.png"
          width={32}
          height={32}
          alt="순백의 주문서"
          sizes="100%"
        />
      </button>
      <button
        className={cls(
          "w-full p-2 hover:bg-slate-300 transform duration-200 ease-in-out flex justify-center items-center",
          isCanUseInnocentScroll ? "" : "opacity-20"
        )}
        onClick={onClickInnocentButton}
        disabled={!isCanUseInnocentScroll}
      >
        <Image
          src="/innocent.png"
          width={32}
          height={32}
          alt="이노센트 주문서"
          sizes="100%"
        />
      </button>
      <button
        className={cls(
          "w-full p-2 hover:bg-slate-300 transform duration-200 ease-in-out flex justify-center items-center",
          isCanUseArkInnocentScroll ? "" : "opacity-20"
        )}
        onClick={onClickArkInnocentButton}
        disabled={!isCanUseArkInnocentScroll}
      >
        <Image
          src="/ark_innocent.png"
          width={32}
          height={32}
          alt="아크 이노센트 주문서"
          sizes="100%"
        />
      </button>
    </>
  );
};

export default ScrollHeader;
