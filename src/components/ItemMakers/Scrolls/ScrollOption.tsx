import { useEffect, useState } from "react";

import { PIECE_OF_SCROLL } from "@/constants/reinforcement";
import useItemMakerInfoStore from "@/models/itemMakerInfo";
import { cls } from "@/utils/cls";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import uuid from "react-uuid";
import Scrollbars from "react-custom-scrollbars-2";
import MySelect from "../../common/MySelect";
import ScrollButton from "./ScrollButton";
import ChaosInput from "./ChaosInput";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import ScrollHeader from "./ScrollHeader";
import PieceOfScrollPercentHeader from "./PieceOfScroll/PieceOfScrollPercentHeader";
import PieceOfScrollBody from "./PieceOfScroll/PieceOfScrollBody";

type ScrollOptionProps = {
  itemLevel: number | undefined;
};

const ScrollOption = ({ itemLevel }: ScrollOptionProps) => {
  const [chaosScrollStats, setChaosScrollStats] = useState<
    { stat: string; value: number | null }[]
  >([
    { stat: "STR", value: null },
    { stat: "DEX", value: null },
    { stat: "INT", value: null },
    { stat: "LUK", value: null },
    { stat: "최대HP", value: null },
    { stat: "최대MP", value: null },
    { stat: "공격력", value: null },
    { stat: "마력", value: null },
    { stat: "방어력", value: null },
    { stat: "이동속도", value: null },
    { stat: "점프력", value: null },
  ]);
  //무기랑 장갑 주문서 리스트 배열 만들어야함
  const { itemData, setItemData, itemSlot } = useItemMakerInfoStore();
  // const allPartName = mockCharacterItemEquipment.item_equipment.map(
  //   (item) => item.item_equipment_slot
  // );

  const weaponSlotName = ["무기", "보조무기", "기계 심장"];
  const armorSlotName = ["모자", "상의", "하의", "신발", "망토"];
  const accessorySlotName = [
    "벨트",
    "어깨장식",
    "펜던트",
    "반지",
    "귀고리",
    "눈장식",
    "얼굴장식",
  ];

  const scrollType = ["주문의 흔적", "공격력/마력 주문서", "혼돈의 주문서"];
  const myItemSlot = weaponSlotName.includes(itemSlot)
    ? "weapon"
    : armorSlotName.includes(itemSlot)
    ? "armor"
    : itemSlot === "장갑"
    ? "glove"
    : "accessory";
  const [selectedScrollType, setSelectedScrollType] = useState(scrollType[0]);
  const scrollPercent = PIECE_OF_SCROLL.find(
    (el) => el.type === myItemSlot
  )?.values.map((v) => v.reinforce_stat.map((el) => el.percent))[0];
  const STATS = ["STR", "DEX", "INT", "LUK"];
  const POWERS = ["공격력", "마력"];
  const isCanSubmitChaosScrollButton = chaosScrollStats.every(
    (el) => el.value !== null
  );
  const onAddChaosScrollStat = (stat: string) => {
    setChaosScrollStats((prev) => {
      const index = prev.findIndex((el) => el.stat === stat);
      if (prev[index].value === 6) {
        return prev;
      }
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          value:
            prev[index].value === null
              ? (prev[index].value = 1)
              : prev[index].value! + 1,
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  const onDescendChaosScrollStat = (stat: string) => {
    setChaosScrollStats((prev) => {
      const index = prev.findIndex((el) => el.stat === stat);
      if (prev[index].value === -6) {
        return prev;
      }
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          value: prev[index].value === null ? -1 : prev[index].value! - 1,
        },
        ...prev.slice(index + 1),
      ];
    });
  };
  const chaosScrollStatInputString = chaosScrollStats
    .filter((el) => el.value !== null)
    .map((el) => el.stat + el.value)
    .join(" ");

  const [isRandomChaosScroll, setIsRandomChaosScroll] = useState(false);
  const onClickRandomChaosScrollToTrue = () => {
    setIsRandomChaosScroll(true);
    setChaosScrollStats((prev) => {
      return prev.map((el) => {
        if (el.value === null) {
          return { ...el, value: Math.floor(Math.random() * 7) };
        }
        return el;
      });
    });
  };
  const onClickRandomChaosScrollToFalse = () => {
    setIsRandomChaosScroll(false);
    setChaosScrollStats((prev) => {
      return prev.map((el) => {
        if (el.value !== null) {
          return { ...el, value: null };
        }
        return el;
      });
    });
  };
  const [selectedScrollPercent, setSelectedScrollPercent] = useState(100);

  const onChangeSelectScrollType = (inputString: string) => {
    setSelectedScrollType(inputString);
  };
  const powerOption = ["1", "2", "3", "4", "5"];
  const [selectedAttackPower, setSelectedAttackPower] = useState("1");
  const [selectedMagicPower, setSelectedMagicPower] = useState("1");
  const onChangeSelectAttackPower = (inputString: string) => {
    setSelectedAttackPower(inputString);
  };
  const onChangeSelectMagicPower = (inputString: string) => {
    setSelectedMagicPower(inputString);
  };

  const onClickPieceOfScrollPercentButton = (percent: number) => {
    setSelectedScrollPercent(percent);
  };

  const onClickPowerScrollButton = () => {
    if (itemData?.scroll_upgradeable_count === "0") return;
    let copyItemData = { ...itemData } as IItemEquipment;
    const scrollUpgradeableCount =
      Number(copyItemData.scroll_upgradeable_count) - 1;
    const scrollUpgrade = Number(copyItemData.scroll_upgrade) + 1;
    const etcAttackPower =
      Number(copyItemData.item_etc_option.attack_power) +
      Number(selectedAttackPower);
    const etcMagicPower =
      Number(copyItemData.item_etc_option.magic_power) +
      Number(selectedMagicPower);
    copyItemData = {
      ...copyItemData,
      scroll_upgradeable_count: scrollUpgradeableCount.toString(),
      scroll_upgrade: scrollUpgrade.toString(),
      item_etc_option: {
        ...copyItemData.item_etc_option,
        attack_power: etcAttackPower.toString(),
        magic_power: etcMagicPower.toString(),
      },
    };
    setItemData({ ...copyItemData });
  };

  const convertStatToEtcOption = (stat: string) => {
    switch (stat) {
      case "STR":
        return "str";
      case "DEX":
        return "dex";
      case "INT":
        return "int";
      case "LUK":
        return "luk";
      case "최대HP":
        return "max_hp";
      case "최대MP":
        return "max_mp";
      case "공격력":
        return "attack_power";
      case "마력":
        return "magic_power";
      case "방어력":
        return "armor";
      case "이동속도":
        return "speed";
      case "점프력":
        return "jump";
      default:
        return "";
    }
  };

  const onClickChaosScrollButton = () => {
    if (itemData?.scroll_upgradeable_count === "0") return;
    let copyItemData = { ...itemData } as IItemEquipment;
    const scrollUpgradeableCount =
      Number(copyItemData.scroll_upgradeable_count) - 1;
    const scrollUpgrade = Number(copyItemData.scroll_upgrade) + 1;
    chaosScrollStats.forEach((el) => {
      const stat = convertStatToEtcOption(el.stat);
      if (stat === "") return;
      const etcStat = Number(copyItemData.item_etc_option[stat]) + el.value!;
      copyItemData = {
        ...copyItemData,
        item_etc_option: {
          ...copyItemData.item_etc_option,
          [stat]: etcStat.toString(),
        },
      };
    });
    copyItemData = {
      ...copyItemData,
      scroll_upgradeable_count: scrollUpgradeableCount.toString(),
      scroll_upgrade: scrollUpgrade.toString(),
    };
    setItemData({ ...copyItemData });
  };

  return (
    <div className="w-full flex flex-col pt-6 h-full px-5">
      <div className="w-full flex flex-row bg-slate-200 rounded-t-full rounded-b-full px-4">
        <ScrollHeader />
      </div>
      <div className="w-full sm:px-10 flex flex-col gap-1 mt-4">
        <MySelect
          option={scrollType}
          selectedOption={selectedScrollType}
          onChangeSelectOption={onChangeSelectScrollType}
        />
        <div className="w-full flex flex-row justify-center items-center border border-slate-200 rounded">
          <PieceOfScrollPercentHeader
            selectedScrollPercent={selectedScrollPercent}
            selectedScrollType={selectedScrollType}
            scrollPercent={scrollPercent}
            onClickPieceOfScrollPercentButton={
              onClickPieceOfScrollPercentButton
            }
          />
          {selectedScrollType === "공격력/마력 주문서" && (
            <div className=" mt-5 w-full">
              <div className="flex flex-row gap-1 justify-between sm:px-10 w-full item-center">
                <div className="w-full">
                  <span>공격력</span>
                  <MySelect
                    option={powerOption}
                    selectedOption={selectedAttackPower}
                    onChangeSelectOption={onChangeSelectAttackPower}
                  />
                </div>
                <div className="w-full">
                  <span>마력</span>
                  <MySelect
                    option={powerOption}
                    selectedOption={selectedMagicPower}
                    onChangeSelectOption={onChangeSelectMagicPower}
                  />
                </div>
              </div>
              <div className="w-full sm:px-10">
                <button
                  className="w-full h-8 mt-5 border border-slate-200 rounded text-sm hover:border-slate-400 duration-300 transform ease-in-out"
                  onClick={onClickPowerScrollButton}
                >
                  적용
                </button>
              </div>
            </div>
          )}
        </div>
        <Scrollbars autoHide autoHeight>
          <div className="flex flex-col gap-4">
            <PieceOfScrollBody
              selectedScrollType={selectedScrollType}
              itemLevel={itemLevel}
              myItemSlot={myItemSlot}
              scrollPercent={scrollPercent}
              selectedScrollPercent={selectedScrollPercent}
            />
            {selectedScrollType === "혼돈의 주문서" && (
              <div>
                {chaosScrollStats.map((el) => {
                  return (
                    <ChaosInput
                      key={el.stat}
                      stat={el.stat}
                      value={el.value}
                      onAddValue={onAddChaosScrollStat}
                      onDescendValue={onDescendChaosScrollStat}
                    />
                  );
                })}
                <div className="flex items-center">
                  {/* <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" --> */}
                  <button
                    type="button"
                    className={cls(
                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2",
                      isRandomChaosScroll ? "bg-indigo-600" : "bg-gray-200"
                    )}
                    role="switch"
                    aria-checked="false"
                    aria-labelledby="annual-billing-label"
                    onClick={
                      isRandomChaosScroll
                        ? onClickRandomChaosScrollToFalse
                        : onClickRandomChaosScrollToTrue
                    }
                  >
                    {/* <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" --> */}
                    <span
                      aria-hidden="true"
                      className={cls(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isRandomChaosScroll ? "translate-x-5" : "translate-x-0"
                      )}
                    ></span>
                  </button>
                  <span
                    className="ml-3 text-xs sm:text-sm"
                    id="annual-billing-label"
                  >
                    <span className="font-medium text-gray-900">
                      빈 스탯을 임의의 놀긍혼 수치로 설정
                    </span>
                  </span>
                </div>
                <div className="text-sm text-amber-500 text-center">
                  {chaosScrollStatInputString}
                </div>
                <button
                  className={cls(
                    "w-full h-8 border border-slate-200 rounded text-sm",
                    isCanSubmitChaosScrollButton
                      ? "hover:border-slate-400"
                      : "text-gray-300"
                  )}
                  onClick={onClickChaosScrollButton}
                  disabled={!isCanSubmitChaosScrollButton}
                >
                  적용
                </button>
              </div>
            )}
          </div>
        </Scrollbars>
      </div>
    </div>
  );
};

export default ScrollOption;
