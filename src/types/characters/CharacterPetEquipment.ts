export interface ICharacterPetEquipment {
  date: string;
  pet_1_name: string;
  pet_1_nickname: string;
  pet_1_icon: string;
  pet_1_description: string;
  pet_1_equipment: {
    item_name: string;
    item_icon: string;
    item_description: string;
    item_option: {
      option_type: string;
      option_value: string;
    }[];
    scroll_upgrade: number;
    scroll_upgradable: number;
  };
  pet_1_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_1_pet_type: string;
  pet_1_skill: string[];
  pet_1_date_expire: string;
  pet_2_name: string;
  pet_2_nickname: string;
  pet_2_icon: string;
  pet_2_description: string;
  pet_2_equipment: {
    item_name: string;
    item_icon: string;
    item_description: string;
    item_option: {
      option_type: string;
      option_value: string;
    }[];
    scroll_upgrade: number;
    scroll_upgradable: number;
  };
  pet_2_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_2_pet_type: string;
  pet_2_skill: string[];
  pet_2_date_expire: string;
  pet_3_name: string;
  pet_3_nickname: string;
  pet_3_icon: string;
  pet_3_description: string;
  pet_3_equipment: {
    item_name: string;
    item_icon: string;
    item_description: string;
    item_option: {
      option_type: string;
      option_value: string;
    }[];
    scroll_upgrade: number;
    scroll_upgradable: number;
  };
  pet_3_auto_skill: {
    skill_1: string;
    skill_1_icon: string;
    skill_2: string;
    skill_2_icon: string;
  };
  pet_3_pet_type: string;
  pet_3_skill: string[];
  pet_3_date_expire: string;
}
