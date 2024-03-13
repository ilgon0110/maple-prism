import useItemMakerInfoStore from "@/models/itemMakerInfo";
import ScrollButton from "../ScrollButton";
import uuid from "react-uuid";
import { PIECE_OF_SCROLL } from "@/constants/reinforcement";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";

type PieceOfScrollBodyProps = {
  selectedScrollType: string;
  myItemSlot: string;
  itemLevel: number | undefined;
  scrollPercent: number[] | undefined;
  selectedScrollPercent: number;
};

const PieceOfScrollBody = ({
  selectedScrollType,
  myItemSlot,
  itemLevel,
  scrollPercent,
  selectedScrollPercent,
}: PieceOfScrollBodyProps) => {
  const STATS = ["STR", "DEX", "INT", "LUK"];
  const POWERS = ["공격력", "마력"];
  const { itemData, setItemData } = useItemMakerInfoStore();
  const isWeapon = myItemSlot === "weapon" || myItemSlot === "glove";

  const upgradeByStatInArmor = (stat: string, value: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    const addStat =
      Number(
        copyItemData.item_etc_option[
          stat as keyof typeof copyItemData.item_etc_option
        ]
      ) + value;
    const discount = Number(copyItemData.scroll_upgradeable_count) - 1;
    const upScrollCount = Number(copyItemData.scroll_upgrade) + 1;
    copyItemData = {
      ...copyItemData,
      item_etc_option: {
        ...copyItemData.item_etc_option,
        [stat]: addStat,
      },
      scroll_upgradeable_count: discount.toString(),
      scroll_upgrade: upScrollCount.toString(),
    };

    setItemData({ ...copyItemData });
  };

  const upgradeByAllStatInArmor = (value: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    STATS.forEach((stat) => {
      const addStat =
        Number(
          copyItemData.item_etc_option[
            stat.toLowerCase() as keyof typeof copyItemData.item_etc_option
          ]
        ) + value;
      copyItemData = {
        ...copyItemData,
        item_etc_option: {
          ...copyItemData.item_etc_option,
          [stat]: addStat,
        },
      };
    });
    const discount = Number(copyItemData.scroll_upgradeable_count) - 1;
    const upScrollCount = Number(copyItemData.scroll_upgrade) + 1;
    copyItemData = {
      ...copyItemData,
      scroll_upgradeable_count: discount.toString(),
      scroll_upgrade: upScrollCount.toString(),
    };
    setItemData({ ...copyItemData });
  };

  const upgradeByStatInWeapon = ({
    stat,
    powerType,
    statValue,
    powerValue,
  }: {
    stat: string;
    powerType: string | undefined;
    statValue: number;
    powerValue: number;
  }) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    const addStat =
      Number(
        copyItemData.item_etc_option[
          stat as keyof typeof copyItemData.item_etc_option
        ]
      ) + statValue;
    const addPower =
      powerType === "공격력"
        ? Number(copyItemData.item_etc_option.attack_power) + powerValue
        : Number(copyItemData.item_etc_option.magic_power) + powerValue;
    const discount = Number(copyItemData.scroll_upgradeable_count) - 1;
    const upScrollCount = Number(copyItemData.scroll_upgrade) + 1;
    copyItemData = {
      ...copyItemData,
      item_etc_option: {
        ...copyItemData.item_etc_option,
        [stat]: addStat,
        [powerType === "공격력" ? "attack_power" : "magic_power"]: addPower,
      },
      scroll_upgradeable_count: discount.toString(),
      scroll_upgrade: upScrollCount.toString(),
    };
    setItemData({ ...copyItemData });
  };

  const upgradeGlove = (powerType: string, value: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    const addPower =
      powerType === "공격력"
        ? Number(copyItemData.item_etc_option.attack_power) + value
        : Number(copyItemData.item_etc_option.magic_power) + value;
    const discount = Number(copyItemData.scroll_upgradeable_count) - 1;
    const upScrollCount = Number(copyItemData.scroll_upgrade) + 1;
    copyItemData = {
      ...copyItemData,
      item_etc_option: {
        ...copyItemData.item_etc_option,
        [powerType === "공격력" ? "attack_power" : "magic_power"]: addPower,
      },
      scroll_upgradeable_count: discount.toString(),
      scroll_upgrade: upScrollCount.toString(),
    };
    setItemData({ ...copyItemData });
  };

  const onClickScrollButton = (
    percent: number,
    stat: string | undefined,
    powerType: string | undefined
  ) => {
    const selectScrollStats = PIECE_OF_SCROLL.find(
      (el) => el.type === myItemSlot
    )
      ?.values.find((v) => itemLevel && itemLevel <= v.level)
      ?.reinforce_stat.find((el) => el.percent === percent);
    if (selectScrollStats === undefined) return;
    if (itemData?.scroll_upgradeable_count === "0") return;
    if (
      stat &&
      STATS.includes(stat) &&
      myItemSlot == "armor" &&
      "up_stat" in selectScrollStats
    ) {
      upgradeByStatInArmor(stat.toLowerCase(), selectScrollStats.up_stat);
    }
    if (
      stat === "올스탯" &&
      myItemSlot === "armor" &&
      "up_all_stat" in selectScrollStats
    ) {
      upgradeByAllStatInArmor(selectScrollStats.up_all_stat);
    }
    if (stat && myItemSlot === "weapon" && "up_stat" in selectScrollStats) {
      upgradeByStatInWeapon({
        stat: stat.toLowerCase(),
        powerType,
        statValue: selectScrollStats.up_stat,
        powerValue:
          powerType === "공격력"
            ? selectScrollStats.up_attack_power
            : selectScrollStats.up_magic_power,
      });
    }
    if (myItemSlot === "glove" && powerType) {
      upgradeGlove(
        powerType,
        powerType === "공격력"
          ? selectScrollStats.up_attack_power
          : selectScrollStats.up_magic_power
      );
    }
  };
  return (
    <>
      {selectedScrollType === "주문의 흔적" &&
        myItemSlot === "armor" &&
        scrollPercent
          ?.filter((percent) => percent === selectedScrollPercent)
          .map((percent) => {
            return STATS.map((stat) => {
              return (
                <ScrollButton
                  key={uuid()}
                  percent={percent}
                  stat={stat}
                  onClickScrollButton={onClickScrollButton}
                  upgradableCount={itemData?.scroll_upgradeable_count}
                />
              );
            });
          })}
      {selectedScrollType === "주문의 흔적" &&
        myItemSlot === "armor" &&
        scrollPercent
          ?.filter(
            (percent) => percent <= 30 && percent === selectedScrollPercent
          )
          .map((percent) => {
            return (
              <ScrollButton
                key={uuid()}
                percent={percent}
                stat="올스탯"
                onClickScrollButton={onClickScrollButton}
                upgradableCount={itemData?.scroll_upgradeable_count}
              />
            );
          })}
      {selectedScrollType === "주문의 흔적" &&
        myItemSlot === "weapon" &&
        scrollPercent
          ?.filter((percent) => percent === selectedScrollPercent)
          .map((percent) => {
            return STATS.map((stat) => {
              return POWERS.map((power) => {
                return (
                  <ScrollButton
                    key={uuid()}
                    percent={percent}
                    stat={stat}
                    onClickScrollButton={onClickScrollButton}
                    upgradableCount={itemData?.scroll_upgradeable_count}
                    isWeapon={isWeapon}
                    powerType={power}
                  />
                );
              });
            });
          })}
      {selectedScrollType === "주문의 흔적" &&
        myItemSlot === "glove" &&
        scrollPercent
          ?.filter((percent) => percent === selectedScrollPercent)
          .map((percent) => {
            return STATS.map((stat) => {
              return POWERS.map((power) => {
                return (
                  <ScrollButton
                    key={uuid()}
                    percent={percent}
                    stat={stat}
                    onClickScrollButton={onClickScrollButton}
                    upgradableCount={itemData?.scroll_upgradeable_count}
                    isWeapon={isWeapon}
                    powerType={power}
                  />
                );
              });
            });
          })}
    </>
  );
};

export default PieceOfScrollBody;
