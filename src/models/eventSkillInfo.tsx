import { create } from "zustand";

export interface eventSkillInfoStore
  extends eventSkillInfoState,
    eventSkillInfoActions {}

interface eventSkillInfoState {
  selectedBossDamageOption: string;
  selectedPowerOption: string;
  selectedStatOption: string;
  bossDamageOption: string[];
  powerOption: string[];
  statOption: string[];
}

interface eventSkillInfoActions {
  setSelectedBossDamageOption: (selectedBossDamageOption: string) => void;
  setSelectedPowerOption: (selectedPowerOption: string) => void;
  setSelectedStatOption: (selectedStatOption: string) => void;
}

const initialState = {
  selectedBossDamageOption: "0",
  selectedPowerOption: "0",
  selectedStatOption: "0",
  bossDamageOption: ["0", "5", "10", "20", "30", "35", "40"],
  powerOption: ["0", "5", "10", "15", "20", "25", "30"],
  statOption: ["0", "10", "20", "30", "40", "50", "60"],
};

const useEventSKillInfoStore = create<eventSkillInfoStore>((set) => ({
  ...initialState,
  setSelectedBossDamageOption: (selectedBossDamageOption) =>
    set({ selectedBossDamageOption }),
  setSelectedPowerOption: (selectedPowerOption) => set({ selectedPowerOption }),
  setSelectedStatOption: (selectedStatOption) => set({ selectedStatOption }),
}));

export default useEventSKillInfoStore;
