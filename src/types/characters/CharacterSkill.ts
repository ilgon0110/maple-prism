export interface ICharacterSkill {
  date: string | null;
  character_class: string;
  character_skill_grade: string;
  character_skill: {
    skill_name: string;
    skill_description: string;
    skill_level: number;
    skill_effect: string | null;
    skill_icon: string;
    skill_effect_next: string | null;
  }[];
}
