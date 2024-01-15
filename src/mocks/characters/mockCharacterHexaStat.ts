import { ICharacterHexaStat } from "@/types/characters/CharacterHexaStat";

export const mockCharacterHexaStat: ICharacterHexaStat = {
  date: "2024-01-12T00:00+09:00",
  character_class: "아델",
  character_hexa_stat_core: [
    {
      slot_id: "1",
      main_stat_name: "크리티컬 데미지 증가",
      sub_stat_name_1: "공격력 증가",
      sub_stat_name_2: "보스 데미지 증가",
      main_stat_level: 9,
      sub_stat_level_1: 2,
      sub_stat_level_2: 9,
      stat_grade: 20,
    },
  ],
  preset_hexa_stat_core: [
    {
      slot_id: "0",
      main_stat_name: "크리티컬 데미지 증가",
      sub_stat_name_1: "공격력 증가",
      sub_stat_name_2: "보스 데미지 증가",
      main_stat_level: 8,
      sub_stat_level_1: 6,
      sub_stat_level_2: 5,
      stat_grade: 19,
    },
    {
      slot_id: "1",
      main_stat_name: "크리티컬 데미지 증가",
      sub_stat_name_1: "공격력 증가",
      sub_stat_name_2: "보스 데미지 증가",
      main_stat_level: 9,
      sub_stat_level_1: 2,
      sub_stat_level_2: 9,
      stat_grade: 20,
    },
  ],
};
