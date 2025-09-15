import { ICharacterAbility } from "@/types/characters/CharacterAbility";

export const mockCharacterAbility: ICharacterAbility = {
  date: null,
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
      ability_value: "상태 이상에 걸린 대상 공격 시 데미지 7% 증가",
    },
  ],
  remain_fame: 7418579,
  preset_no: 1,
  ability_preset_1: {
    ability_preset_grade: "레전드리",
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
        ability_value: "상태 이상에 걸린 대상 공격 시 데미지 7% 증가",
      },
    ],
  },
  ability_preset_2: {
    ability_preset_grade: "레전드리",
    ability_info: [
      {
        ability_no: "1",
        ability_grade: "레전드리",
        ability_value: "메소 획득량 20% 증가",
      },
      {
        ability_no: "2",
        ability_grade: "유니크",
        ability_value: "공격력 15 증가",
      },
      {
        ability_no: "3",
        ability_grade: "유니크",
        ability_value: "아이템 드롭률 15% 증가",
      },
    ],
  },
  ability_preset_3: {
    ability_preset_grade: "에픽",
    ability_info: [
      {
        ability_no: "1",
        ability_grade: "에픽",
        ability_value: "모든 능력치 15 증가",
      },
      {
        ability_no: "2",
        ability_grade: "레어",
        ability_value: "모든 능력치 5 증가",
      },
      {
        ability_no: "3",
        ability_grade: "레어",
        ability_value: "모든 능력치 5 증가",
      },
    ],
  },
};
