import useItemMakerInfoStore from "@/models/itemMakerInfo";
import Image from "next/image";
import { getMakerItemList } from "@/utils/getMakerItemList";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import ItemCard from "./ItemCard";
import Scrollbars from "react-custom-scrollbars-2";
import { IBaseConstants, PURE_ITEM_EQUIPMENT } from "@/constants/items";
import { useState } from "react";
import ItemMakerCategory from "./ItemMakerCategory";
import ItemMakerHeader from "./ItemMakerHeader";
import useItemEquipmentInfoStore from "@/models/itemEquipmentInfo";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { addingMap } from "@/utils/addingMap";
import { SET_EFFECTS } from "@/constants/setEffects";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import useAddOptionInfoStore from "@/models/addOptionInfo";
import usePotentialOptionInfoStore from "@/models/potentialOptionInfo";

type ItemMakerProps = {
  onClickModalClose: () => void;
};

const ItemMaker = ({ onClickModalClose }: ItemMakerProps) => {
  const {
    itemData,
    itemPart,
    itemSlot,
    characterJob,
    setItemData,
    setPureItemData,
    setMakerModalOpen,
  } = useItemMakerInfoStore();
  const { itemEquipments, appendItemEquipment, appendSetEffect, setEffects } =
    useItemEquipmentInfoStore();
  const { resetSelectedOptions } = useAddOptionInfoStore();
  const { resetAddPotentialOptions, resetPotentialOptions } =
    usePotentialOptionInfoStore();
  const baseItemList = getMakerItemList(itemSlot, characterJob);
  const pureItemEquipment = PURE_ITEM_EQUIPMENT;
  const resetAll = () => {
    resetSelectedOptions();
    resetAddPotentialOptions();
    resetPotentialOptions();
  };
  const updateItemEquipmentToPure = (value: IBaseConstants): IItemEquipment => {
    const filterTotalOption: Omit<
      IBaseConstants["base_option"],
      "base_equipment_level"
    > = Object.fromEntries(
      Object.entries(value.base_option).filter(
        ([key, value]) => key !== "base_equipment_level"
      )
    );
    return {
      ...pureItemEquipment,
      item_equipment_part: itemPart,
      item_equipment_slot: itemSlot,
      item_name: value.name,
      item_description: value.description,
      item_icon: value.icon,
      item_base_option: value.base_option,
      item_total_option: {
        ...filterTotalOption,
        damage: pureItemEquipment.item_total_option.damage,
        equipment_level_decrease:
          pureItemEquipment.item_total_option.equipment_level_decrease,
      },
      scroll_upgradeable_count: value.scroll_upgradeable_count,
    };
  };

  const onClickItem = (value: IBaseConstants) => {
    setItemData(updateItemEquipmentToPure(value));
    setPureItemData(updateItemEquipmentToPure(value));
  };
  const [category, setCategory] = useState("추가옵션");
  const itemLevel = itemData?.item_base_option.base_equipment_level;
  const onClickCategory = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setCategory(e.currentTarget.innerText);
  };
  const onClickClose = () => {
    setItemData(null);
    setMakerModalOpen(false);
    resetAll();
  };

  const updateSetEffect = (
    itemEquipment: ICharacterItemEquipment
  ): ICharacterSetEffect => {
    if (setEffects.length === 0) {
      throw new Error("setEffects is empty");
    }
    const copyLatestSetEffects = JSON.parse(
      JSON.stringify(setEffects.at(-1))
    ) as ICharacterSetEffect;
    let result: ICharacterSetEffect = {
      ...copyLatestSetEffects,
    };
    const map = new Map<string, number>();
    const RUTABIS = "루타비스";
    const ABSOLUTE = "앱솔랩스";
    const Arcane_Shade = "아케인셰이드";
    const Eternel = "에테르넬";

    const genGenesisWeaponSetEffect = () => {
      const mapItems = map.entries();
      const mapItemsArr = Array.from(mapItems);
      mapItemsArr.forEach(([key, value]) => {
        if (value >= 3 && key !== Eternel) {
          addingMap(map, key, 1);
        }
      });
    };

    const genSetEffect = () => {
      const characterClass =
        CHARACTER_CLASS.find((characterClass) => {
          return characterClass.jobs.includes(characterJob);
        })?.class ?? null;
      const mapItems = map.entries();
      const mapItemsArr = Array.from(mapItems);
      mapItemsArr.forEach(([key, value]) => {
        if (key === RUTABIS) {
          const setName = `${RUTABIS} 세트(${characterClass})`;
          if (result.set_effect.find((el) => el.set_name === setName)) {
            result.set_effect = result.set_effect.filter(
              (el) => el.set_name !== setName
            );
          }
          result.set_effect.push({
            set_name: setName,
            total_set_count: value,
            set_effect_info: genSetEffectInfo(setName, value),
          });
        } else if (key === ABSOLUTE) {
          const setName = `${ABSOLUTE} 세트(${characterClass})`;
          if (result.set_effect.find((el) => el.set_name === setName)) {
            result.set_effect = result.set_effect.filter(
              (el) => el.set_name !== setName
            );
          }
          result.set_effect.push({
            set_name: setName,
            total_set_count: value,
            set_effect_info: genSetEffectInfo(`${ABSOLUTE} 세트`, value),
          });
        } else if (key === Arcane_Shade) {
          const setName = `${Arcane_Shade} 세트(${characterClass})`;
          if (result.set_effect.find((el) => el.set_name === setName)) {
            result.set_effect = result.set_effect.filter(
              (el) => el.set_name !== setName
            );
          }
          result.set_effect.push({
            set_name: setName,
            total_set_count: value,
            set_effect_info: genSetEffectInfo(`${Arcane_Shade} 세트`, value),
          });
        } else if (key === Eternel) {
          const setName = `${Eternel} 세트(${characterClass})`;
          if (result.set_effect.find((el) => el.set_name === setName)) {
            result.set_effect = result.set_effect.filter(
              (el) => el.set_name !== setName
            );
          }
          result.set_effect.push({
            set_name: setName,
            total_set_count: value,
            set_effect_info: genSetEffectInfo(`${Eternel} 세트`, value),
          });
        }
      });
    };

    const genSetEffectInfo = (
      setName: string,
      value: number
    ):
      | {
          set_count: number;
          set_option: string;
        }[] => {
      return (
        SET_EFFECTS.find(
          (el) => el.set_name === setName
        )?.set_effect_info.filter((el) => el.set_count <= value) ?? []
      );
    };

    //방어구 세트효과 계산
    itemEquipment.item_equipment.forEach((el) => {
      if (el.item_equipment_slot === "모자") {
        if (el.item_name.includes("하이네스")) {
          addingMap(map, RUTABIS, 1);
        } else if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      }
      if (
        el.item_equipment_slot === "상의" ||
        el.item_equipment_slot === "한벌옷"
      ) {
        if (el.item_name.includes("이글아이")) {
          addingMap(map, RUTABIS, 1);
        } else if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      } else if (el.item_equipment_slot === "하의") {
        if (el.item_name.includes("트릭스터")) {
          addingMap(map, RUTABIS, 1);
        } else if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      } else if (el.item_equipment_slot === "신발") {
        if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      } else if (el.item_equipment_slot === "어깨장식") {
        if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      } else if (el.item_equipment_slot === "장갑") {
        if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      } else if (el.item_equipment_slot === "망토") {
        if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes(Eternel)) {
          addingMap(map, Eternel, 1);
        }
      }
    });

    //무기 세트효과 계산(해방무기 럭키세트 때문에 한번 더 돌림)
    itemEquipment.item_equipment.forEach((el) => {
      if (el.item_equipment_slot === "무기") {
        if (el.item_name.includes("파프니르")) {
          addingMap(map, RUTABIS, 1);
        } else if (el.item_name.includes(ABSOLUTE)) {
          addingMap(map, ABSOLUTE, 1);
        } else if (el.item_name.includes(Arcane_Shade)) {
          addingMap(map, Arcane_Shade, 1);
        } else if (el.item_name.includes("제네시스")) {
          addingMap(map, Eternel, 1);
          genGenesisWeaponSetEffect();
        }
      }
    });

    //map을 가지고 세트효과 계산
    genSetEffect();

    return result;
  };

  const onSubmit = () => {
    if (itemData === null) return;
    let copyItemEquipment = JSON.parse(
      JSON.stringify(itemEquipments.at(-1))
    ) as ICharacterItemEquipment;
    const result = copyItemEquipment.item_equipment.map((item) => {
      return item.item_equipment_slot === itemSlot
        ? (itemData as IItemEquipment)
        : item;
    });
    copyItemEquipment = {
      ...copyItemEquipment,
      item_equipment: [...result],
    };
    appendItemEquipment(copyItemEquipment);
    appendSetEffect(updateSetEffect(copyItemEquipment));
    onClickClose();
    onClickModalClose();
  };

  return (
    <div className="w-full h-full z-50 md:px-20 px-5 top-0 flex justify-center absolute items-center py-[5%] lg:py-[10%]">
      <div className="bg-white w-full h-full rounded shadow relative">
        <button
          onClick={onClickClose}
          className="w-6 h-6 p-3 rounded-full border border-slate-100 absolute flex justify-center items-center top-4 right-4 text-xs hover:border-slate-500 transform duration-300 ease-in-out"
        >
          X
        </button>
        {itemData === null ? (
          <div className="h-full pb-20 pt-10">
            <div className="flex justify-center items-center mb-10">
              <div className="text-lg font-bold text-slate-500">
                {itemPart} 제작
              </div>
            </div>
            <Scrollbars height="100%">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-20 gap-5">
                {baseItemList.map((item) => {
                  return (
                    <button
                      key={item.name}
                      onClick={() => onClickItem(item)}
                      className="text-slate-500 border border-slate-300 rounded h-16 flex items-center flex-row gap-3 px-4 text-xs group hover:border-white hover:bg-orange-500 hover:text-white hover:cursor-pointer transition duration-300"
                    >
                      <Image
                        src={item.icon}
                        width={32}
                        height={32}
                        style={{ objectFit: "contain" }}
                        alt="아이템이미지"
                        sizes="100%"
                      />
                      <div>{item.name}</div>
                    </button>
                  );
                })}
              </div>
            </Scrollbars>
          </div>
        ) : (
          <Scrollbars autoHide>
            <div className="flex flex-col lg:flex-row w-full px-3 h-fit py-5 bg-white rounded">
              <div className="h-full w-1/2 lg:w-1/3 min-w-64 mx-auto">
                <ItemCard itemData={itemData} />
                <button
                  className="w-full h-8 border border-gray-300 rounded-md mt-3 text-sm hover:border-orange-500 hover:bg-orange-500 hover:text-white transform duration-300 ease-in-out"
                  onClick={onSubmit}
                >
                  장착하기
                </button>
                <button
                  onClick={onClickClose}
                  className="w-6 h-6 p-3 rounded-full border border-slate-100 absolute flex justify-center items-center top-4 right-4 text-xs hover:border-slate-500 transform duration-300 ease-in-out"
                >
                  X
                </button>
              </div>
              <div className="w-full h-full lg:ml-5">
                <ItemMakerHeader
                  category={category}
                  onClickCategory={onClickCategory}
                />
                <ItemMakerCategory category={category} itemLevel={itemLevel} />
              </div>
            </div>
          </Scrollbars>
        )}
      </div>
    </div>
  );
};

export default ItemMaker;
