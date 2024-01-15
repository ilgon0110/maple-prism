export interface ICharacterUnionRaider {
  date: string;
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
