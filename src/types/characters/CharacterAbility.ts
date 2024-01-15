export interface ICharacterAbility {
  date: string;
  ability_grade: string;
  ability_info: {
    ability_no: string;
    ability_grade: string;
    ability_value: string;
  }[];
  remain_fame: number;
}
