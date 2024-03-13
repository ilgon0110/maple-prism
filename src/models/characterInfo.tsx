import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CharacterInfoStore extends CharacterInfoState, CharacterInfoActions {}

interface CharacterInfoState {
  attackPower: number;
  magicPower: number;
  bossDamage: number;
  damage: number;
  criticalDamage: number;
}

interface CharacterInfoActions {
  setAttackPower: (attackPower: number) => void;
  setMagicPower: (magicPower: number) => void;
  setBossDamage: (bossDamage: number) => void;
  setDamage: (damage: number) => void;
  setCriticalDamage: (criticalDamage: number) => void;
}

const initialState = {
  attackPower: 0,
  magicPower: 0,
  bossDamage: 0,
  damage: 0,
  criticalDamage: 0,
};

const useCharacterInfoStore = create(
  persist<CharacterInfoStore>(
    (set) => ({
      ...initialState,
      setAttackPower: (attackPower) => set({ attackPower }),
      setMagicPower: (magicPower) => set({ magicPower }),
      setBossDamage: (bossDamage) => set({ bossDamage }),
      setDamage: (damage) => set({ damage }),
      setCriticalDamage: (criticalDamage) => set({ criticalDamage }),
    }),
    {
      name: "characterInfo",
    }
  )
);

export default useCharacterInfoStore;
