import { ICharacterAbility } from "@/types/characters/\bCharacterAbility";

export const mockCharacterAbility: ICharacterAbility = {
  date: "2024-01-12T00:00+09:00",
  ability_grade: "레전드리",
  ability_info: [
    {
      ability_no: "1",
      ability_grade: "레전드리",
      ability_value: "보스 몬스터 공격 시 데미지 20% 증가",
    },
    {
      ability_no: "2",
      ability_grade: "유니크",
      ability_value: "스킬 사용 시 10% 확률로 재사용 대기시간이 미적용",
    },
    {
      ability_no: "3",
      ability_grade: "유니크",
      ability_value: "크리티컬 확률 18% 증가",
    },
  ],
  remain_fame: 9999999,
};
