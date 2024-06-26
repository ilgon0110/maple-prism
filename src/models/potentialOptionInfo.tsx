import { create } from "zustand";

interface potentialOptionInfoStore
  extends potentialOptionInfoState,
    potentialOptionInfoActions {}

interface potentialOptionInfoState {
  grades: string[];
  selectedPotentialGrade: string;
  selectedAddPotentialGrade: string;
  selectedPotentialOptions: string[];
  selectedAddPotentialOptions: string[];
}

interface potentialOptionInfoActions {
  setSelectedPotentialGrade: (selectedPotentialGrade: string) => void;
  setSelectedAddPotentialGrade: (selectedAddPotentialGrade: string) => void;
  setSelectedPotentialOptions: (selectedPotentialOptions: string[]) => void;
  setSelectedAddPotentialOptions: (
    selectedAddPotentialOptions: string[]
  ) => void;
  resetPotentialOptions: () => void;
  resetAddPotentialOptions: () => void;
}

const initialState = {
  grades: ["---", "레어", "에픽", "유니크", "레전드리"],
  selectedPotentialGrade: "---",
  selectedAddPotentialGrade: "---",
  selectedPotentialOptions: ["---", "---", "---"],
  selectedAddPotentialOptions: ["---", "---", "---"],
};

const usePotentialOptionInfoStore = create<potentialOptionInfoStore>((set) => ({
  ...initialState,
  setSelectedPotentialGrade: (selectedPotentialGrade) =>
    set({ selectedPotentialGrade }),
  setSelectedAddPotentialGrade: (selectedAddPotentialGrade) =>
    set({ selectedAddPotentialGrade }),
  setSelectedPotentialOptions: (selectedPotentialOptions) =>
    set({ selectedPotentialOptions }),
  setSelectedAddPotentialOptions: (selectedAddPotentialOptions) =>
    set({ selectedAddPotentialOptions }),
  resetPotentialOptions: () =>
    set({
      selectedPotentialGrade: "---",
      selectedPotentialOptions: ["---", "---", "---"],
    }),
  resetAddPotentialOptions: () =>
    set({
      selectedAddPotentialGrade: "---",
      selectedAddPotentialOptions: ["---", "---", "---"],
    }),
}));

export default usePotentialOptionInfoStore;
