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
import { SET_EFFECTS, SET_ITEM_NAME } from "@/constants/setEffects";
import { CHARACTER_CLASS } from "@/constants/characterClass";
import useAddOptionInfoStore from "@/models/addOptionInfo";
import usePotentialOptionInfoStore from "@/models/potentialOptionInfo";
import { removeSpace } from "@/utils/removeSpace";

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
    setBlackHeart,
  } = useItemMakerInfoStore();
  const { itemEquipments, appendItemEquipment, appendSetEffect, setEffects } =
    useItemEquipmentInfoStore();
  const { resetSelectedOptions } = useAddOptionInfoStore();
  const {
    resetAddPotentialOptions,
    resetPotentialOptions,
    resetSelectedAddPotentialGrade,
    resetSelectedPotentialGrade,
  } = usePotentialOptionInfoStore();
  const baseItemList = getMakerItemList(itemSlot, characterJob);
  const pureItemEquipment = PURE_ITEM_EQUIPMENT;
  const resetAll = () => {
    resetSelectedOptions();
    resetAddPotentialOptions();
    resetPotentialOptions();
    resetSelectedAddPotentialGrade();
    resetSelectedPotentialGrade();
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
    if (value.name === "블랙 하트") {
      setBlackHeart();
      return;
    }
    setItemData(updateItemEquipmentToPure(value));
    setPureItemData(updateItemEquipmentToPure(value));
  };
  const [category, setCategory] = useState("---");
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
    const RUTABIS = SET_ITEM_NAME.Rutabis;
    const ABSOLUTE = SET_ITEM_NAME.Absolute;
    const Arcane_Shade = SET_ITEM_NAME.Arcane_Shade;
    const Eternel = SET_ITEM_NAME.Eternel;
    const BOSS = "BOSS";
    const DAWN = "DAWN";
    const BLACK = "BLACK";
    const bossAcc = Object.values(SET_ITEM_NAME.BOSS_ACC);
    const dawnAcc = Object.values(SET_ITEM_NAME.DAWN_BOSS_ACC);
    const blackAcc = Object.values(SET_ITEM_NAME.BLACK_BOSS_ACC);

    const genGenesisWeaponSetEffect = () => {
      const mapItems = map.entries();
      const mapItemsArr = Array.from(mapItems);
      mapItemsArr.forEach(([key, value]) => {
        if (
          value >= 3 &&
          (key === RUTABIS || key === ABSOLUTE || key === Arcane_Shade)
        ) {
          addingMap(map, key, 1);
        }
      });
    };

    //방어구 세트효과 계산
    itemEquipment.item_equipment.forEach((el) => {
      const itemName = el.item_name;
      if (el.item_equipment_slot === "보조무기") return;
      if (
        itemName.includes("하이네스") ||
        itemName.includes("이글아이") ||
        itemName.includes("트릭스터")
      ) {
        addingMap(map, RUTABIS, 1);
      } else if (el.item_name.includes(ABSOLUTE)) {
        addingMap(map, ABSOLUTE, 1);
      } else if (el.item_name.includes(Arcane_Shade)) {
        addingMap(map, Arcane_Shade, 1);
      } else if (el.item_name.includes(Eternel)) {
        addingMap(map, Eternel, 1);
      }
    });

    //장신구 세트효과 계산
    itemEquipment.item_equipment.forEach((el) => {
      const itemName = removeSpace(el.item_name);
      if (bossAcc.includes(itemName)) {
        addingMap(map, BOSS, 1);
      } else if (dawnAcc.includes(itemName)) {
        addingMap(map, DAWN, 1);
      } else if (blackAcc.includes(itemName)) {
        addingMap(map, BLACK, 1);
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

    const genSetName = (key: string, characterClass: string | null) => {
      let setName = "";
      let convertSetName = "";
      if (key === RUTABIS) {
        setName = `${RUTABIS} 세트(${characterClass})`;
        convertSetName = `${RUTABIS} 세트(${characterClass})`;
      } else if (key === ABSOLUTE) {
        setName = `${ABSOLUTE} 세트(${characterClass})`;
        convertSetName = `${ABSOLUTE} 세트`;
      } else if (key === Arcane_Shade) {
        setName = `${Arcane_Shade} 세트(${characterClass})`;
        convertSetName = `${Arcane_Shade} 세트`;
      } else if (key === Eternel) {
        setName = `${Eternel} 세트(${characterClass})`;
        convertSetName = `${Eternel} 세트`;
      } else if (key === BOSS) {
        setName = `보스 장신구 세트`;
        convertSetName = `보스 장신구 세트`;
      } else if (key === DAWN) {
        setName = "여명의 보스 세트";
        convertSetName = "여명의 보스 세트";
      } else if (key == BLACK) {
        setName = "칠흑의 보스 세트";
        convertSetName = "칠흑의 보스 세트";
      }
      return { setName, convertSetName };
    };

    const genSetEffect = () => {
      const characterClass =
        CHARACTER_CLASS.find((characterClass) => {
          return characterClass.jobs.includes(characterJob);
        })?.class ?? null;
      const mapItems = map.entries();
      const mapItemsArr = Array.from(mapItems);
      mapItemsArr.forEach(([key, value]) => {
        const { setName, convertSetName } = genSetName(key, characterClass);
        if (result.set_effect.find((el) => el.set_name === setName)) {
          result.set_effect = result.set_effect.filter(
            (el) => el.set_name !== setName
          );
        }
        result.set_effect.push({
          set_name: setName,
          total_set_count: value,
          set_effect_info: genSetEffectInfo(convertSetName, value),
          set_option_full: genSetEffectInfo(convertSetName, 30), //풀옵션은 30으로 계산
        });
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
