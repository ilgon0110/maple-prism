export interface ICharacterPetEquipment {
  date: string;
  pet_1_name: string | null;
  pet_1_nickname: string | null;
  pet_1_icon: string | null;
  pet_1_description: string | null;
  pet_1_equipment: IPetEquipment | null;
  pet_1_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  } | null;
  pet_1_pet_type: string | null;
  pet_1_skill: string[] | null;
  pet_1_date_expire: string | null;
  pet_1_appearance: string | null;
  pet_1_appearance_icon: string | null;
  pet_2_name: string | null;
  pet_2_nickname: string | null;
  pet_2_icon: string | null;
  pet_2_description: string | null;
  pet_2_equipment: IPetEquipment | null;
  pet_2_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  } | null;
  pet_2_pet_type: string | null;
  pet_2_skill: string[] | null;
  pet_2_date_expire: string | null;
  pet_2_appearance: string | null;
  pet_2_appearance_icon: string | null;
  pet_3_name: string | null;
  pet_3_nickname: string | null;
  pet_3_icon: string | null;
  pet_3_description: string | null;
  pet_3_equipment: IPetEquipment | null;
  pet_3_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  } | null;
  pet_3_pet_type: string | null;
  pet_3_skill: string[] | null;
  pet_3_date_expire: string | null;
  pet_3_appearance: string | null;
  pet_3_appearance_icon: string | null;
}

interface IPetEquipment {
  item_name: string;
  item_icon: string;
  item_description: string;
  item_option: {
    option_type: string;
    option_value: string;
  }[];
  scroll_upgrade: number;
  scroll_upgradable: number;
  item_shape: string;
  item_shape_icon: string;
}
