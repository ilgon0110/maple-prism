export interface ICharacterUnionRaider {
  date: string | null;
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: {
    stat_field_id: string;
    stat_field_effect: string;
  }[];
  union_block: {
    block_type: string;
    block_class: string;
    block_level: string;
    block_control_point: {
      x: number;
      y: number;
    };
    block_position: {
      x: number;
      y: number;
    }[];
  }[];
  use_preset_no: number;
  union_raider_preset_1: IUnionRaider | null;
  union_raider_preset_2: IUnionRaider | null;
  union_raider_preset_3: IUnionRaider | null;
  union_raider_preset_4: IUnionRaider | null;
  union_raider_preset_5: IUnionRaider | null;
}

interface IUnionRaider {
  union_raider_stat: string[];
  union_occupied_stat: string[];
  union_inner_stat: {
    stat_field_id: string;
    stat_field_effect: string;
  }[];
  union_block: {
    block_type: string;
    block_class: string;
    block_level: string;
    block_control_point: {
      x: number;
      y: number;
    };
    block_position: {
      x: number;
      y: number;
    }[];
  }[];
}
