import {
  ADD_OPTIONS_150_EQUIPMENT,
  ADD_OPTIONS_WEAPON,
} from "@/constants/addOptions";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { create } from "zustand";
interface addOptionInfoStore extends addOptionInfoState, addOptionInfoActions {}

interface addOptionInfoState {
  rightOptions: string[][];
  selectedLeftOptions: string[];
  selectedRightOptions: string[];
  addOptions: string[];
  weaponAddOptions: string[];
  otherAddOptions: string[];
}

interface addOptionInfoActions {
  setRightOptions: (rightOptions: string[][]) => void;
  setSelectedLeftOptions: (selectedLeftOptions: string[]) => void;
  setSelectedRightOptions: (selectedRightOptions: string[]) => void;
  resetSelectedOptions: () => void;
}

const initialState = {
  rightOptions: [["---"], ["---"], ["---"], ["---"]],
  selectedLeftOptions: ["---", "---", "---", "---"],
  selectedRightOptions: ["---", "---", "---", "---"],
  addOptions: ADD_OPTIONS_150_EQUIPMENT.map((item) => item.kind).flat(),
  weaponAddOptions: [
    ...ADD_OPTIONS_150_EQUIPMENT.map((item) => item.kind).flat(),
    ...ADD_OPTIONS_WEAPON.map((item) => item.kind).flat(),
  ].filter((option) => option !== "이동속도" && option !== "점프력"),
  otherAddOptions: [
    "최대 HP",
    "최대 MP",
    "공격력",
    "마력",
    "방어력",
    "이동속도",
    "점프력",
    "올스탯 %",
    "보스 몬스터 공격 시 데미지 %",
    "데미지 %",
    "착용 레벨 감소",
  ],
};

const useAddOptionInfoStore = create<addOptionInfoStore>((set) => ({
  ...initialState,
  setRightOptions: (rightOptions) => set({ rightOptions }),
  setSelectedLeftOptions: (selectedLeftOptions) => set({ selectedLeftOptions }),
  setSelectedRightOptions: (selectedRightOptions) =>
    set({ selectedRightOptions }),
  resetSelectedOptions: () => set({ ...initialState }),
}));

export default useAddOptionInfoStore;
