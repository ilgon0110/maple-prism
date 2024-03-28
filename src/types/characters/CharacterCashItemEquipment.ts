export interface ICharacterCashItemEquipment {
  date: string | null;
  character_gender: string;
  character_class: string;
  preset_no: number | null;
  cash_item_equipment_base: ICharacterCashItemEquipmentPreset[] | [];
  cash_item_equipment_preset_1: ICharacterCashItemEquipmentPreset[] | [];
  cash_item_equipment_preset_2: ICharacterCashItemEquipmentPreset[] | [];
  cash_item_equipment_preset_3: ICharacterCashItemEquipmentPreset[] | [];
  additional_cash_item_equipment_base: ICharacterCashItemEquipmentPreset[] | [];
  additional_cash_item_equipment_preset_1:
    | ICharacterCashItemEquipmentPreset[]
    | [];
  additional_cash_item_equipment_preset_2:
    | ICharacterCashItemEquipmentPreset[]
    | [];
  additional_cash_item_equipment_preset_3:
    | ICharacterCashItemEquipmentPreset[]
    | [];
}

interface ICharacterCashItemEquipmentPreset {
  cash_item_equipment_part: string;
  cash_item_equipment_slot: string;
  cash_item_name: string;
  cash_item_icon: string;
  cash_item_description: string | null;
  cash_item_option: {
    option_type: string;
    option_value: string;
  }[];
  date_expire: string | null;
  date_option_expire: string | null;
  cash_item_label: string | null;
  cash_item_coloring_prism: null | {
    color_range: string;
    hue: number;
    saturation: number;
    value: number;
  };
  item_gender: string | null;
}
