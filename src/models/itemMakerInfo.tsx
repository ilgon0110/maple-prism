import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { addingMap } from "@/utils/addingMap";
import { create } from "zustand";
interface ItemCardInfoStore extends ItemCardInfoState, ItemCardInfoActions {}

interface ItemCardInfoState {
  makerModalOpen: boolean;
  isCanMake: boolean;
  itemData: IItemEquipment | null;
  pureItemData: IItemEquipment | null;
  itemPart: string;
  itemSlot: string;
  characterJob: string;
}

interface ItemCardInfoActions {
  setMakerModalOpen: (makerModalOpen: boolean) => void;
  setIsCanMake: (isCanMake: boolean) => void;
  setItemData: (itemData: IItemEquipment | null) => void;
  setPureItemData: (pureItemData: IItemEquipment | null) => void;
  setItemPart: (itemPart: string) => void;
  setItemSlot: (itemSlot: string) => void;
  setCharacterJob: (characterJob: string) => void;
}

const initialState = {
  makerModalOpen: false,
  isCanMake: false,
  itemData: null,
  pureItemData: null,
  itemPart: "",
  itemSlot: "",
  characterJob: "",
};

const useItemMakerInfoStore = create<ItemCardInfoStore>((set) => ({
  ...initialState,
  setMakerModalOpen: (makerModalOpen) => set({ makerModalOpen }),
  setIsCanMake: (isCanMake) => set({ isCanMake }),
  setItemData: (itemData) => {
    const updateItemTotalOption = (itemData: IItemEquipment | null) => {
      if (!itemData) return itemData;
      const result = new Map<string, number>();
      const baseOption = Object.entries(itemData.item_base_option);
      const addOption = Object.entries(itemData.item_add_option);
      const etcOption = Object.entries(itemData.item_etc_option);
      const starforceOption = Object.entries(itemData.item_starforce_option);
      baseOption.forEach(([key, value]) => {
        if (key === "base_equipment_level") return;
        result.set(key, Number(value));
      });
      addOption.forEach(([key, value]) => {
        const valueNumber = value === "NaN" ? 0 : Number(value);
        addingMap(result, key, valueNumber);
      });
      etcOption.forEach(([key, value]) => {
        const valueNumber = value === "NaN" ? 0 : Number(value);
        addingMap(result, key, valueNumber);
      });
      starforceOption.forEach(([key, value]) => {
        const valueNumber = value === "NaN" ? 0 : Number(value);
        addingMap(result, key, valueNumber);
      });
      const totalOption = Object.fromEntries(
        Array.from(result, ([key, value]) => {
          if (key === "equipment_level_decrease") {
            return [key, value];
          }
          return [key, String(value)];
        })
      ) as IItemEquipment["item_total_option"];

      itemData = {
        ...itemData,
        item_total_option: totalOption,
      };
      return itemData;
    };
    if (itemData) {
      itemData = updateItemTotalOption(itemData);
    }
    set({ itemData });
  },
  setPureItemData: (pureItemData) => set({ pureItemData }),
  setItemPart: (itemPart) => set({ itemPart }),
  setItemSlot: (itemSlot) => set({ itemSlot }),
  setCharacterJob: (characterJob) => set({ characterJob }),
}));

export default useItemMakerInfoStore;
