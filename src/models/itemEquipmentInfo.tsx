import { ICharacterItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import { create } from "zustand";
interface ItemEquipmentInfoStore
  extends ItemEquipmentInfoState,
    ItemEquipmentInfoActions {}

interface ItemEquipmentInfoState {
  itemEquipments: ICharacterItemEquipment[];
  setEffects: ICharacterSetEffect[];
  itemEquipmentCallStack: ICharacterItemEquipment[];
  setEffectCallStack: ICharacterSetEffect[];
}

interface ItemEquipmentInfoActions {
  appendItemEquipment: (itemEquipment: ICharacterItemEquipment) => void;
  undoItemEquipment: () => void;
  redoItemEquipment: () => void;
  setInitialItemEquipment: (itemEquipment: ICharacterItemEquipment) => void;
  appendSetEffect: (setEffect: ICharacterSetEffect) => void;
  undoSetEffect: () => void;
  redoSetEffect: () => void;
  setInitialSetEffect: (setEffect: ICharacterSetEffect) => void;
  resetItemEquipment: () => void;
}

const initialState = {
  itemEquipments: [],
  setEffects: [],
  itemEquipmentCallStack: [],
  setEffectCallStack: [],
};

const useItemEquipmentInfoStore = create<ItemEquipmentInfoStore>((set) => ({
  ...initialState,
  appendItemEquipment: (itemEquipment) => {
    set((state) => ({
      itemEquipments: [...state.itemEquipments, itemEquipment],
    }));
  },
  undoItemEquipment: () => {
    set((state) => {
      if (state.itemEquipments.length > 1) {
        const lastItemEquipment = state.itemEquipments.pop();
        if (lastItemEquipment !== undefined) {
          return {
            itemEquipmentCallStack: [
              ...state.itemEquipmentCallStack,
              lastItemEquipment,
            ],
          };
        }
      }
      return state;
    });
  },
  redoItemEquipment: () => {
    set((state) => {
      if (state.itemEquipmentCallStack.length > 0) {
        const lastItemEquipment = state.itemEquipmentCallStack.pop();
        if (lastItemEquipment !== undefined) {
          return {
            itemEquipments: [...state.itemEquipments, lastItemEquipment],
          };
        }
      }
      return state;
    });
  },
  setInitialItemEquipment: (itemEquipment) => {
    set((state) => {
      if (state.itemEquipments.length > 1) {
        state.itemEquipments.shift();
        return {
          itemEquipments: [itemEquipment, ...state.itemEquipments],
        };
      } else {
        return {
          itemEquipments: [itemEquipment],
        };
      }
    });
  },
  appendSetEffect: (setEffect) => {
    set((state) => ({
      setEffects: [...state.setEffects, setEffect],
    }));
  },
  undoSetEffect: () => {
    set((state) => {
      if (state.setEffects.length > 1) {
        const lastSetEffect = state.setEffects.pop();
        if (lastSetEffect !== undefined) {
          return {
            setEffectCallStack: [...state.setEffectCallStack, lastSetEffect],
          };
        }
      }
      return state;
    });
  },
  redoSetEffect: () => {
    set((state) => {
      if (state.setEffectCallStack.length > 0) {
        const lastSetEffect = state.setEffectCallStack.pop();
        if (lastSetEffect !== undefined) {
          return {
            setEffects: [...state.setEffects, lastSetEffect],
          };
        }
      }
      return state;
    });
  },
  setInitialSetEffect: (setEffect) => {
    set((state) => {
      if (state.setEffects.length > 1) {
        state.setEffects.shift();
        return {
          setEffects: [setEffect, ...state.setEffects],
        };
      } else {
        return {
          setEffects: [setEffect],
        };
      }
    });
  },
  resetItemEquipment: () => {
    set((state) => ({
      //index0(API에서 받아온 거)을 제외하고 다 삭제
      itemEquipments: [state.itemEquipments[0]],
      setEffects: [state.setEffects[0]],
      itemEquipmentCallStack: [],
      setEffectCallStack: [],
    }));
  },
}));

export default useItemEquipmentInfoStore;
