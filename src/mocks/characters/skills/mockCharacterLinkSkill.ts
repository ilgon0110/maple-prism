import { ICharacterLinkSkill } from "@/types/characters/CharacterLinkSkill";

export const mockCharacterLinkSkill: ICharacterLinkSkill = {
  date: "2024-01-12T00:00+09:00",
  character_class: "은월",
  character_link_skill: [
    {
      skill_name: "데몬스 퓨리",
      skill_description:
        "[마스터 레벨 : 2]\r\n대상이 보스일 경우, 내면에 잠재된 분노를 이끌어 내 더욱 강력한 데미지를 입힌다.",
      skill_level: 2,
      skill_effect: "보스 몬스터 공격 시 데미지 15% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOBMB.png",
    },
    {
      skill_name: "퍼미에이트",
      skill_description:
        "[마스터 레벨 : 2]\r\n무엇으로 가려도 스며드는 빛의 힘으로 적의 방어를 일정 부분 무시한다.",
      skill_level: 2,
      skill_effect: "적 공격 시 방어율 무시 15% 적용",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOBMF.png",
    },
    {
      skill_name: "소울 컨트랙트",
      skill_description:
        "[마스터 레벨 : 2]\r\n에스카다와의 계약을 통해 순간적으로 데미지를 극대화한다.",
      skill_level: 2,
      skill_effect: "10초 동안 데미지 45% 증가\n재사용 대기시간 60초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHPAJF.png",
    },
    {
      skill_name: "와일드 레이지",
      skill_description: "[마스터 레벨 : 2]\r\n분노로 인해 데미지가 증가한다.",
      skill_level: 2,
      skill_effect: "데미지 10% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOBJA.png",
    },
    {
      skill_name: "시그너스 블레스",
      skill_description:
        "[마스터 레벨 : 10]\r\n각성한 여제의 가호가 몸에 깃들어 적의 위협으로부터 벗어난다.",
      skill_level: 10,
      skill_effect:
        "공격력과 마력 25, 상태 이상 내성 15, 모든 속성 내성 15% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOBJF.png",
    },
    {
      skill_name: "스피릿 오브 프리덤",
      skill_description:
        "[마스터 레벨 : 8]\r\n자유를 염원하는 레지스탕스가 가진 혼의 힘으로 부활 시 일정 시간 동안 피해를 받지 않는다.",
      skill_level: 8,
      skill_effect: "부활 시 8초 동안 피해를 받지 않음, 맵 이동 시 해제",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOCOJ.png",
    },
    {
      skill_name: "판단",
      skill_description:
        "[마스터 레벨 : 2]\r\n타고난 판단력으로 적에게 가능한 최고의 치명상을 입힌다.",
      skill_level: 2,
      skill_effect: " 크리티컬 데미지 4% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOAEI.png",
    },
    {
      skill_name: "인텐시브 인썰트",
      skill_description:
        "[마스터 레벨 : 2]\r\n자신보다 약한 적에겐 더 효과적인 공격을 가한다.",
      skill_level: 2,
      skill_effect:
        "캐릭터보다 레벨이 낮은 몬스터 공격 시 데미지 6% 증가, 상태 이상에 걸린 몬스터 공격 시 데미지 6% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHODKB.png",
    },
    {
      skill_name: "전투의 흐름",
      skill_description:
        "[마스터 레벨 : 2]\r\n전투의 흐름이 끊기지 않게 유지한다.\n일정 시간 내에 특정 거리를 이동 할 때 마다 데미지가 증가한다.",
      skill_level: 2,
      skill_effect:
        "일정 거리 이동 시 발동되며 최대 6회 중첩가능, 지속시간 5초\n각 중첩당 데미지 2% 증가  ",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHODKI.png",
    },
    {
      skill_name: "무아",
      skill_description:
        "[마스터 레벨 : 2]\r\n자신을 잊어버릴 정도로 전투에 집중한다.\n일정 시간 동안 전투 상태가 지속되면 데미지가 증가한다.",
      skill_level: 2,
      skill_effect:
        "전투 상태가 5초 지속되면 발동되며 최대 5회 중첩가능, 지속시간 5초\n발동 시 데미지 1% 증가, 중첩당 데미지 2% 추가 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOENE.png",
    },
    {
      skill_name: "임피리컬 널리지",
      skill_description:
        "[마스터 레벨 : 6]\r\n실전적인 탐구를 통해 약점을 파악하여 해당 적에 대한 데미지와 방어율 무시를 점차 증가시킨다.",
      skill_level: 6,
      skill_effect:
        "공격한 적 중 최대 HP가 가장 높은 적에 대한 약점을 25% 확률로 파악, 파악한 약점은 10초 동안 지속되며 최대 3회까지 중첩\n중첩 당 데미지 3%, 방어율 무시 3% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHMGKC.png",
    },
    {
      skill_name: "시프 커닝",
      skill_description:
        "[마스터 레벨 : 6]\r\n도적 특유의 교활함을 발휘해 적을 약화시키면 데미지가 증가한다.\n재사용 대기시간 초기화, 버프 지속시간 증가의 효과를 받지 않는다.",
      skill_level: 6,
      skill_effect:
        "적에게 상태 이상을 적용시키면 10초 동안 데미지 18% 증가\n재발동 대기시간 20초 ",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHMGLA.png",
    },
  ],
  character_owned_link_skill: {
    skill_name: "구사 일생",
    skill_description:
      "[마스터 레벨 : 2]\r\n사망에 이르는 공격을 당했을 시, 일정 확률로 죽지 않는다.",
    skill_level: 2,
    skill_effect: "사망에 이르는 공격을 당할 시, 10% 확률로 생존",
    skill_icon:
      "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCODEG.png",
  },
};
