import { ICharacterHexaStat } from "@/types/characters/CharacterHexaStat";

export const mockCharacterHexaStat: ICharacterHexaStat = {
  date: "2024-03-11T00:00+09:00",
  character_class: "은월",
  character_hexa_stat_core: [
    {
      slot_id: "0",
      main_stat_name: "공격력 증가",
      sub_stat_name_1: "크리티컬 데미지 증가",
      sub_stat_name_2: "주력 스탯 증가",
      main_stat_level: 6,
      sub_stat_level_1: 10,
      sub_stat_level_2: 4,
      stat_grade: 20,
    },
  ],
  preset_hexa_stat_core: [
    {
      slot_id: "0",
      main_stat_name: "공격력 증가",
      sub_stat_name_1: "크리티컬 데미지 증가",
      sub_stat_name_2: "주력 스탯 증가",
      main_stat_level: 6,
      sub_stat_level_1: 10,
      sub_stat_level_2: 4,
      stat_grade: 20,
    },
    {
      slot_id: "1",
      main_stat_name: null,
      sub_stat_name_1: null,
      sub_stat_name_2: null,
      main_stat_level: 0,
      sub_stat_level_1: 0,
      sub_stat_level_2: 0,
      stat_grade: 0,
    },
  ],
};
