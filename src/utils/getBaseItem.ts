import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
const initialOption = {
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
};
export const getBaseItem = (
  part: string,
  slot: string,
  baseConstants: IBaseConstants
): IItemEquipment => {
  return {
    item_equipment_part: part,
    item_equipment_slot: slot,
    item_name: baseConstants.name,
    item_icon: baseConstants.icon,
    item_description: baseConstants.description,
    item_shape_name: baseConstants.name,
    item_shape_icon: baseConstants.icon,
    item_gender: null,
    item_total_option: {
      ...baseConstants.base_option,
      max_hp_rate: "0",
      max_mp_rate: "0",
      damage: "0",
      equipment_level_decrease: 0,
    },
    item_base_option: { ...baseConstants.base_option },
    item_add_option: { ...initialOption },
    item_etc_option: { ...initialOption },
    item_starforce_option: { ...initialOption },
    item_exceptional_option: {
      str: "0",
      dex: "0",
      int: "0",
      luk: "0",
      max_hp: "0",
      max_mp: "0",
      attack_power: "0",
      magic_power: "0",
    },
    potential_option_grade: null,
    potential_option_1: null,
    potential_option_2: null,
    potential_option_3: null,
    additional_potential_option_grade: null,
    additional_potential_option_1: null,
    additional_potential_option_2: null,
    additional_potential_option_3: null,
    equipment_level_increase: 0,
    growth_exp: 0,
    growth_level: 0,
    scroll_upgrade: "0",
    cuttable_count: "0",
    golden_hammer_flag: "미적용",
    scroll_resilience_count: "0",
    scroll_upgradeable_count: baseConstants.scroll_upgradeable_count,
    soul_name: null,
    soul_option: null,
    starforce: "0",
    starforce_scroll_flag: "미사용",
    special_ring_level: 0,
    date_expire: null,
  };
};

// {
//     item_equipment_part: "모자",
//     item_equipment_slot: "모자",
//     item_name: "하이네스 원더러햇",
//     item_icon:
//       "https://open.api.nexon.com/static/maplestory/ItemIcon/KEPCIPOA.png",
//     item_description: null,
//     item_shape_name: "봉인된 구미호 가면",
//     item_shape_icon:
//       "https://open.api.nexon.com/static/maplestory/ItemIcon/KEPCIOHI.png",
//     item_gender: null,
//     item_total_option: {
//       str: "341",
//       dex: "157",
//       int: "0",
//       luk: "16",
//       max_hp: "2655",
//       max_mp: "360",
//       attack_power: "88",
//       magic_power: "85",
//       armor: "1457",
//       speed: "0",
//       jump: "0",
//       boss_damage: "0",
//       ignore_monster_armor: "10",
//       all_stat: "5",
//       damage: "0",
//       equipment_level_decrease: 0,
//       max_hp_rate: "0",
//       max_mp_rate: "0",
//     },
//     item_base_option: {
//       str: "40",
//       dex: "40",
//       int: "0",
//       luk: "0",
//       max_hp: "360",
//       max_mp: "360",
//       attack_power: "2",
//       magic_power: "0",
//       armor: "300",
//       speed: "0",
//       jump: "0",
//       boss_damage: "0",
//       ignore_monster_armor: "10",
//       all_stat: "0",
//       max_hp_rate: "0",
//       max_mp_rate: "0",
//       base_equipment_level: 150,
//     },
//     potential_option_grade: "레전드리",
//     additional_potential_option_grade: "에픽",
//     potential_option_1:
//       "모든 스킬의 재사용 대기시간 : -2초(10초 이하는 10%감소, 5초 미만으로 감소 불가)",
//     potential_option_2: "STR : +9%",
//     potential_option_3: "올스탯 : +6%",
//     additional_potential_option_1: "공격력 : +11",
//     additional_potential_option_2: "DEX : +2%",
//     additional_potential_option_3: "공격력 : +10",
//     equipment_level_increase: 0,
//     item_exceptional_option: {
//       str: "0",
//       dex: "0",
//       int: "0",
//       luk: "0",
//       max_hp: "0",
//       max_mp: "0",
//       attack_power: "0",
//       magic_power: "0",
//     },
//     item_add_option: {
//       str: "64",
//       dex: "0",
//       int: "0",
//       luk: "16",
//       max_hp: "0",
//       max_mp: "0",
//       attack_power: "0",
//       magic_power: "0",
//       armor: "32",
//       speed: "0",
//       jump: "0",
//       boss_damage: "0",
//       damage: "0",
//       all_stat: "5",
//       equipment_level_decrease: 0,
//     },
//     growth_exp: 0,
//     growth_level: 0,
//     scroll_upgrade: "12",
//     cuttable_count: "1",
//     golden_hammer_flag: "적용",
//     scroll_resilience_count: "0",
//     scroll_upgradeable_count: "0",
//     soul_name: null,
//     soul_option: null,
//     item_etc_option: {
//       str: "120",
//       dex: "0",
//       int: "0",
//       luk: "0",
//       max_hp: "2040",
//       max_mp: "0",
//       attack_power: "1",
//       magic_power: "0",
//       armor: "180",
//       speed: "0",
//       jump: "0",
//     },
//     starforce: "22",
//     starforce_scroll_flag: "미사용",
//     item_starforce_option: {
//       str: "117",
//       dex: "117",
//       int: "0",
//       luk: "0",
//       max_hp: "255",
//       max_mp: "0",
//       attack_power: "85",
//       magic_power: "85",
//       armor: "945",
//       speed: "0",
//       jump: "0",
//     },
//     special_ring_level: 0,
//     date_expire: null,
//   }

interface IBaseConstants {
  name: string;
  description: string | null;
  icon: string;
  base_option: {
    str: string;
    dex: string;
    int: string;
    luk: string;
    max_hp: string;
    max_mp: string;
    attack_power: string;
    magic_power: string;
    armor: string;
    speed: string;
    jump: string;
    boss_damage: string;
    ignore_monster_armor: string;
    all_stat: string;
    max_hp_rate: string;
    max_mp_rate: string;
    base_equipment_level: number;
  };
  scroll_upgradeable_count: string;
}
