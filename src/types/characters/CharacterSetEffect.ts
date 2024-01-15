export interface ICharacterSetEffect {
  date: string;
  set_effect: {
    set_name: string;
    total_set_count: number;
    set_effect_info: {
      set_count: number;
      set_option: string;
    }[];
  }[];
}
