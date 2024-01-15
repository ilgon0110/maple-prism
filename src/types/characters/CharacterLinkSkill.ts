export interface ICharacterLinkSkill {
  date: string;
  character_class: string;
  character_link_skill: {
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string;
    skill_icon: string;
  }[];
  character_owned_link_skill: {
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string;
    skill_icon: string;
  };
}
