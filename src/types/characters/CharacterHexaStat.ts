export interface ICharacterHexaStat {
  date: string | null;
  character_class: string;
  character_hexa_stat_core: ICharacterHexaStatPreset[] | null;
  preset_hexa_stat_core: ICharacterHexaStatPreset[];
}

interface ICharacterHexaStatPreset {
  slot_id: string;
  main_stat_name: string | null;
  sub_stat_name_1: string | null;
  sub_stat_name_2: string | null;
  main_stat_level: number;
  sub_stat_level_1: number;
  sub_stat_level_2: number;
  stat_grade: number;
}
