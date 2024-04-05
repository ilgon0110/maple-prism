import useItemCardInfoStore from "@/models/itemCardInfo";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { cls } from "@/utils/cls";
import { getItemPotentialRank } from "@/utils/getItemPotentialRank";
import Image from "next/image";
import uuid from "react-uuid";
import useItemMakerInfoStore from "@/models/itemMakerInfo";

type EquipmentInventoryProps = {
  itemEquipment: ICharacterItemEquipment | undefined;
  characterJob: string;
  onClickItemModalOpen: (value: IItemEquipment) => void;
};

const EquipmentInventory = ({
  itemEquipment,
  characterJob,
  onClickItemModalOpen,
}: EquipmentInventoryProps) => {
  if (!itemEquipment) return null;
  const itemArr = [
    [1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1],
  ].map((row) =>
    row.map((col) => {
      return { slot: col, values: {}, isCanMake: false };
    })
  );

  const itemLists = itemArr.map((_, row) => {
    return _.map((el, col) => {
      if (row === 0 && col === 0) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "반지4"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 1 && col === 0) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "반지3"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 2 && col === 0) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "반지2"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 3 && col === 0) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "반지1"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 4 && col === 0) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "포켓 아이템"
        );
        return { ...el, values: item };
      }
      if (row === 0 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "모자"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 1 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "얼굴장식"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 2 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "눈장식"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 3 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "상의"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 4 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "하의"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 5 && col === 2) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "신발"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 1 && col === 1) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "펜던트2"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 2 && col === 1) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "펜던트"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 3 && col === 1) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "무기"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 4 && col === 1) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "벨트"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 2 && col === 3) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "귀고리"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 3 && col === 3) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "어깨장식"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 4 && col === 3) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "장갑"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 5 && col === 3) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "안드로이드"
        );
        return { ...el, values: item };
      }
      if (row === 0 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "엠블렘"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 1 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "뱃지"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 2 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "훈장"
        );
        return { ...el, values: item };
      }
      if (row === 3 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "보조무기"
        );
        return { ...el, values: item };
      }
      if (row === 4 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "망토"
        );
        return { ...el, values: item, isCanMake: true };
      }
      if (row === 5 && col === 4) {
        const item = itemEquipment.item_equipment.find(
          (v) => v.item_equipment_slot === "기계 심장"
        );
        return { ...el, values: item, isCanMake: true };
      }
    });
  });

  return (
    <div className="w-full h-auto bg-slate-100 border-4 border-black rounded-lg grid grid-cols-5 gap-3 mt-6 pt-10 pb-6 relative shadow">
      <div className="w-full h-6 bg-black absolute text-xs text-orange-500 font-bold text-center align-middle flex justify-center items-center">
        EQUIPMENT INVENTORY
      </div>
      {itemLists.map((row, idx) => {
        return row.map((col) => {
          return col?.slot === 1 ? (
            <ItemBox
              key={uuid()}
              itemData={col.values}
              characterJob={characterJob}
              onClickItemModalOpen={onClickItemModalOpen}
              isCanMake={col.isCanMake}
            />
          ) : (
            <div
              key={uuid()}
              className="w-[70%] pt-[70%] items-center rounded bg-transparent"
            ></div>
          );
        });
      })}
    </div>
  );
};

type ItemBoxProps = {
  itemData: IItemEquipment | undefined;
  characterJob: string;
  onClickItemModalOpen: (value: IItemEquipment) => void;
  isCanMake: boolean;
};

const ItemBox = ({
  itemData,
  characterJob,
  onClickItemModalOpen,
  isCanMake,
}: ItemBoxProps) => {
  const getRingColor = (
    potential: string | null | undefined,
    addPotential: string | null | undefined
  ) => {
    const rank = getItemPotentialRank(potential, addPotential);
    switch (rank) {
      case 0:
        return "ring-2 ring-[#a2a2a2] ring-offset-2";
      case 1:
        return "ring-2 ring-[#509CA7] ring-offset-2";
      case 2:
        return "ring-2 ring-[#7479FF] ring-offset-2";
      case 3:
        return "ring-2 ring-[#FFAE34] ring-offset-2";
      case 4:
        return "ring-2 ring-[#35A239] ring-offset-2";
      default:
        return "ring-2 ring-[#FFFFFF] ring-offset-2";
    }
  };

  const { setItemData } = useItemCardInfoStore();
  const { setItemPart, setCharacterJob, setItemSlot, setIsCanMake } =
    useItemMakerInfoStore();

  const onClickItem = () => {
    if (itemData) {
      setItemPart(itemData.item_equipment_part);
      setItemSlot(itemData.item_equipment_slot);
      setCharacterJob(characterJob);
      setItemData(itemData);
      onClickItemModalOpen(itemData);
      setIsCanMake(isCanMake);
    }
  };
  return (
    <div
      className={cls(
        "w-[70%] relative group box-border pt-[70%] rounded-sm  mx-auto hover:cursor-pointer",
        getRingColor(
          itemData?.potential_option_grade,
          itemData?.additional_potential_option_grade
        ),
        isCanMake
          ? "hover:bg-slate-200 shadow-md border"
          : "opacity-50 bg-transparent"
      )}
    >
      <button
        className="absolute w-[80%] h-[80%] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        onClick={onClickItem}
      >
        <Image
          src={itemData?.item_icon ?? "/라라티콘.png"}
          style={{
            objectFit: "contain",
          }}
          fill
          sizes="100%"
          alt="아이템 이미지"
        />
      </button>
    </div>
  );
};

export default EquipmentInventory;
