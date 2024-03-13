import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { create } from "zustand";
interface ItemCardInfoStore extends ItemCardInfoState, ItemCardInfoActions {}

interface ItemCardInfoState {
  modalOpen: boolean;
  itemData: IItemEquipment | null;
}

interface ItemCardInfoActions {
  setModalOpen: (modalOpen: boolean) => void;
  setItemData: (itemData: IItemEquipment) => void;
}

const initialState = {
  modalOpen: false,
  itemData: null,
};

const useItemCardInfoStore = create<ItemCardInfoStore>((set) => ({
  ...initialState,
  setModalOpen: (modalOpen) => set({ modalOpen }),
  setItemData: (itemData) => set({ itemData }),
}));

export default useItemCardInfoStore;
