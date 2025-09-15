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
  setBlackHeart: () => void;
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

const blackHeart: IItemEquipment = {
  item_equipment_part: "기계 심장",
  item_equipment_slot: "기계 심장",
  item_name: "블랙 하트",
  item_icon:
    "https://open.api.nexon.com/static/maplestory/ItemIcon/KEJFJHJH.png",
  item_description: null,
  item_shape_name: "블랙 하트",
  item_shape_icon:
    "https://open.api.nexon.com/static/maplestory/ItemIcon/KEJFJHJH.png",
  item_gender: null,
  potential_option_flag: "0",
  additional_potential_option_flag: "0",
  item_total_option: {
    str: "50",
    dex: "50",
    int: "50",
    luk: "50",
    max_hp: "100",
    max_mp: "0",
    attack_power: "77",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
    boss_damage: "0",
    ignore_monster_armor: "0",
    all_stat: "0",
    damage: "0",
    equipment_level_decrease: 0,
    max_hp_rate: "0",
    max_mp_rate: "0",
  },
  item_base_option: {
    str: "10",
    dex: "10",
    int: "10",
    luk: "10",
    max_hp: "100",
    max_mp: "0",
    attack_power: "0",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
    boss_damage: "0",
    ignore_monster_armor: "0",
    all_stat: "0",
    max_hp_rate: "0",
    max_mp_rate: "0",
    base_equipment_level: 120,
  },
  potential_option_grade: "에픽",
  additional_potential_option_grade: null,
  potential_option_1: "보스 몬스터 공격 시 데미지  +30%",
  potential_option_2: "몬스터 방어율 무시  +30%",
  potential_option_3: null,
  additional_potential_option_1: null,
  additional_potential_option_2: null,
  additional_potential_option_3: null,
  equipment_level_increase: 0,
  item_exceptional_option: {
    str: "0",
    dex: "0",
    int: "0",
    luk: "0",
    max_hp: "0",
    max_mp: "0",
    attack_power: "0",
    magic_power: "0",
    exceptional_upgrade: 0,
  },
  item_add_option: {
    str: "0",
    dex: "0",
    int: "0",
    luk: "0",
    max_hp: "0",
    max_mp: "0",
    attack_power: "0",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
    boss_damage: "0",
    damage: "0",
    all_stat: "0",
    equipment_level_decrease: 0,
  },
  growth_exp: 0,
  growth_level: 0,
  scroll_upgrade: "11",
  cuttable_count: "255",
  golden_hammer_flag: "미적용",
  scroll_resilience_count: "0",
  scroll_upgradeable_count: "0",
  soul_name: null,
  soul_option: null,
  item_etc_option: {
    str: "0",
    dex: "0",
    int: "0",
    luk: "0",
    max_hp: "0",
    max_mp: "0",
    attack_power: "77",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
  },
  starforce: "15",
  starforce_scroll_flag: "미사용",
  item_starforce_option: {
    str: "40",
    dex: "40",
    int: "40",
    luk: "40",
    max_hp: "0",
    max_mp: "0",
    attack_power: "0",
    magic_power: "0",
    armor: "0",
    speed: "0",
    jump: "0",
  },
  special_ring_level: 0,
  date_expire: "2024-04-22T23:34+09:00",
  freestyle_flag: null,
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
  setBlackHeart: () => set({ itemData: blackHeart }),
}));

export default useItemMakerInfoStore;
