import { ICharacterSkill } from "@/types/characters/CharacterSkill";

export const mockCharacterZeroSkill: ICharacterSkill = {
  date: null,
  character_class: "은월",
  character_skill_grade: "0",
  character_skill: [
    {
      skill_name: "축지",
      skill_description:
        "[마스터 레벨 : 1]\r\n자신의 전방 범위 내에 있는 적 중 가장 멀리 있는 적에게 순간 이동한다. 범위 내에 적이 없을 경우 전방으로 일정 거리만큼 순간 이동한다.\n자신의 스킬 사용 중에도 이동할 수 있다.",
      skill_level: 1,
      skill_effect:
        "MP 20 소비, 범위 내에 가장 멀리 있는 적에게 순간 이동\n범위 내에 적이 없을 경우 전방으로 300만큼 순간 이동",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCPDEE",
      skill_effect_next: null,
    },
    {
      skill_name: "정령 결속 1식",
      skill_description:
        "[마스터 레벨 : 1]\r\n정령과 결속으로 인해 공격 적중 시 HP가 회복된다.\n영구적으로 스탠스 확률이 증가하며 받는 피해가 감소한다.",
      skill_level: 1,
      skill_effect:
        "자신이 직접 공격하는 스킬 적중 시 HP 1% 회복\n스탠스 확률 100% 증가, 받는 피해량 30% 감소",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCODEF",
      skill_effect_next: null,
    },
    {
      skill_name: "정령친화",
      skill_description:
        "[마스터 레벨 : 1]\r\n여우신의 가호로 정령 친화력을 일부 가지게 된다.",
      skill_level: 1,
      skill_effect: "소환수 지속시간 5% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCOBLE",
      skill_effect_next: null,
    },
    {
      skill_name: "그리운 마음",
      skill_description:
        "[마스터 레벨 : 1]\r\n여우신의 배려로 수호령을 소환한다. 수호령은 정말 그리운 이의 모습을 하고 있을까?\n스킬 사용 시 수호령이 활성화되고 재사용 시 비활성화되는\n온오프 스킬",
      skill_level: 1,
      skill_effect: "MP 10 소비, 은월의 수호령 소환\n재사용 대기시간 5초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCPDEI",
      skill_effect_next: null,
    },
    {
      skill_name: "정령의 축복",
      skill_description:
        "[마스터 레벨 : 20]\r\n다른 캐릭터를 레벨 10이상 육성하면 스킬포인트 1이 증가한다. 단, 정령의 축복과 여제의 축복중 좋은 효과로 발동된다.",
      skill_level: 20,
      skill_effect: "공격력 20, 마력 20 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCOBNC",
      skill_effect_next: null,
    },
    {
      skill_name: "플라잉",
      skill_description:
        "[마스터 레벨 : 1]\n용족의 신비한 힘을 사용해 하늘을 난다. 단, 추락시 받는 낙하 데미지가 매우 크다.\n발동할 때 MP 90 소비",
      skill_level: 1,
      skill_effect: null,
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCPBOG",
      skill_effect_next: null,
    },
    {
      skill_name: "여제의 축복",
      skill_description:
        "[마스터 레벨 : 30]\r\n다른 시그너스 캐릭터와 미하일 캐릭터를 레벨 5이상 육성하면 스킬포인트 1이 증가한다. 단, 정령의 축복과 여제의 축복중 높은 효과로 발동된다.\r\n다른 시그너스, 미하일 캐릭터의 고귀한 정신에 의해 마스터 레벨이 최대 30까지 확장될 수 있다.",
      skill_level: 30,
      skill_effect: "공격력 30, 마력 30 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCOBLD",
      skill_effect_next: null,
    },
    {
      skill_name: "연합의 의지",
      skill_description:
        "[마스터 레벨 : 1]\r\n연합의 의지에 따라 강한 힘을 발휘한다.",
      skill_level: 1,
      skill_effect:
        "영구적으로 힘 5, 민첩 5, 지능 5, 행운 5, 공격력 5, 마력 5 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCOAFA",
      skill_effect_next: null,
    },
    {
      skill_name: "링크 매니지먼트",
      skill_description:
        "[마스터 레벨 : 1]\r\n월드 내 다른 캐릭터의 링크 스킬을 전수 받거나 현재 전수 받고 있는 링크 스킬을 해제할 수 있다.",
      skill_level: 1,
      skill_effect: "자신의 링크 스킬 전수 상태를 관리",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCPDJB",
      skill_effect_next: null,
    },
    {
      skill_name: "쓸만한 하이퍼 바디",
      skill_description:
        "[아이템 잠재스킬]\n최대 HP와 최대 MP의 양이 증가한다.",
      skill_level: 1,
      skill_effect: "MP 80 소비하여 240초 동안 최대 HP, 최대 MP  40% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCGBMD",
      skill_effect_next: null,
    },
    {
      skill_name: "영웅의 메아리",
      skill_description:
        "[마스터 레벨 : 1]\n주변 모든 캐릭터의 공격력과 마력을 증가시킨다.",
      skill_level: 1,
      skill_effect:
        "MP 30 소비하여 2400초 동안 공격력, 마력 4% 증가\n재사용 대기시간 300초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFNCLCPBMF",
      skill_effect_next: null,
    },
    {
      skill_name: "루나 드림 Lv.1",
      skill_description:
        "[마스터 레벨 : 1]\r\n달빛의 힘으로 자신의 공격력과 마력을 7씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 7, 마력 7증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHOEJA",
      skill_effect_next: null,
    },
    {
      skill_name: "루나 드림 Lv.2",
      skill_description:
        "[마스터 레벨 : 1]\r\n달빛의 힘으로 자신의 공격력과 마력을 9씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 9, 마력 9증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHOEJB",
      skill_effect_next: null,
    },
    {
      skill_name: "째깍째깍 동화 시간 Lv.1",
      skill_description:
        "[마스터 레벨 : 1]\r\n쁘띠 마스터 타임 펫의 동화 속 마법같은 힘으로 자신의 공격력과 마력을 8씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 8, 마력 8증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHOGLD",
      skill_effect_next: null,
    },
    {
      skill_name: "파멸의 검",
      skill_description:
        "[마스터 레벨 : 2]\r\n데미안의 혼이 당신과 함께 한다. 타락한 세계수의 힘으로 각성한 모습이다. 소울웨폰의 힘으로 소환된 데미안이 일정 시간 동안 주변 몬스터들을 공격한다.",
      skill_level: 1,
      skill_effect:
        "250 소울을 소비하여 120초 동안 데미지 1800%의 각성 데미안 소환\n소울웨폰 소환수의 데미지는 캐릭터와 다르게 계산됨\n재사용 대기시간 180초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHPIEF",
      skill_effect_next:
        "250 소울을 소비하여 120초 동안 데미지 2200%의 각성 데미안 소환\n소울웨폰 소환수의 데미지는 캐릭터와 다르게 계산됨\n재사용 대기시간 180초",
    },
    {
      skill_name: "메이플 휘장",
      skill_description:
        "[마스터 레벨 : 1]\r\n메이플 업적에서 선택한 휘장을 실체화한다.\n실체화된 휘장은 일정 시간 동안 캐릭터 주위에 머무르다가 사라진다. 업적 등급 및 완료 업적에 따라 다양한 휘장을 선택하여 실체화시킬 수 있다.",
      skill_level: 1,
      skill_effect: "재사용 대기시간 5초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHMCOD",
      skill_effect_next: null,
    },
    {
      skill_name: "파괴의 얄다바오트",
      skill_description:
        "[마스터 레벨 : 1]\r\n검은 마법사가 초월자의 힘으로 만들어 낸 파괴의 얄다바오트가 깃들어 힘을 발휘한다.\n스킬 사용 시 효과가 활성화되고 재사용 시 비활성화되는 온오프 스킬",
      skill_level: 1,
      skill_effect:
        "영구적으로 최종 데미지 10% 증가\n스킬 사용 시 파괴의 얄다바오트 소환",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHMHPC",
      skill_effect_next: null,
    },
    {
      skill_name: "창조의 아이온",
      skill_description:
        "[마스터 레벨 : 1]\r\n검은 마법사가 초월자의 힘으로 만들어 낸 창조의 아이온을 소환하여 그 힘을 이용한다.\n재사용 대기시간 초기화 및 버프 지속시간 증가의 효과를 받지 않고 창세의 기운은 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 1,
      skill_effect:
        "창조의 힘을 발현하여 10초 동안 무적 상태\n스킬을 다시 사용하여 즉시 종료 가능, 즉시 종료하면 12명의 적을 1500%의 데미지로 7번 공격하는 창세의 기운 발동\n재사용 대기시간 120초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHMHPD",
      skill_effect_next: null,
    },
    {
      skill_name: "링 액티베이션",
      skill_description:
        "[마스터 레벨 : 1]\n현재 착용 중인 특수 스킬 반지의 액티브 스킬을 사용한다.\n일부 특수 스킬 반지의 경우 패시브 스킬이 자동으로 발동된다.",
      skill_level: 1,
      skill_effect: "사용 시 현재 장착한 특수 스킬 반지의 액티브 스킬 발동",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNBPE",
      skill_effect_next: null,
    },
    {
      skill_name: "컨티뉴어스 링",
      skill_description:
        "[마스터 레벨 : 6]\r\n컨티뉴어스 링 착용 시 반지의 힘이 활성화되기까지 준비시간을 가진다. 준비를 마치면 주기적으로 보스 몬스터에게 공격 스킬 적중 시 일정 시간 동안 보스 몬스터 공격 시 데미지, 공격력, 마력이 증가한다. 컨티뉴어스 링은 재사용 대기시간 초기화, 재사용 대기시간 감소의 효과를 받지 않는다.",
      skill_level: 4,
      skill_effect:
        "컨티뉴어스 링 착용 시 120초 동안 준비, 준비를 마치면 보스 몬스터에게 공격 스킬 적중 시 8초 동안 보스 몬스터 공격 시 데미지 140%, 공격력 10%, 마력 10% 증가\n재발동 대기시간 12초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNCIB",
      skill_effect_next:
        "컨티뉴어스 링 착용 시 120초 동안 준비, 준비를 마치면 보스 몬스터에게 공격 스킬 적중 시 8초 동안 보스 몬스터 공격 시 데미지 160%, 공격력 12%, 마력 12% 증가\n재발동 대기시간 12초",
    },
    {
      skill_name: "챔피언의 가호",
      skill_description:
        "[마스터 레벨 : 1]\r\n챔피언의 유대를 통해 챔피언 코인을 소모하고 일정 시간 동안 능력치를 증가시키는 챔피언의 가호 버프를 획득한다.\r\n선택한 능력치 레벨이 높아질수록 소모되는 챔피언 코인 개수가 증가한다. 버프 지속시간 증가의 효과를 받지 않는다. 보스 전투 맵과 챔피언 레이드에서 사용할 수 없다.",
      skill_level: 1,
      skill_effect: "챔피언 코인을 소모하여 30분 동안 능력치 강화",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNJIA",
      skill_effect_next: null,
    },
    {
      skill_name: "오아시스 발견",
      skill_description:
        "[마스터 레벨 : 1]\n레벨 범위 몬스터를 처치할 때마다 게이지가 충전되며,\n게이지가 모두 충전되면 <즐거운 오아시스>가 발동된다. \n\n일일 <오아시스 발견> 발동 횟수가 30회에 도달한 경우\n종료된다.\n\n이벤트 기간이 종료된 후에는 사용할 수 없다. \n\n - 온오프 변경\n   초보자 스킬창의 <오아시스 발견> 스킬 우클릭 \n - 자동/수동 변경\n   UI의 <즐거운 오아시스> 스킬 우클릭\n",
      skill_level: 1,
      skill_effect:
        "\n\n<즐거운 오아시스> 최대 15마리의 적을 3000% 데미지로 1번 공격하는\n폭발이 6회 발동하는 스킬이 6회 발동",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNIOB",
      skill_effect_next: null,
    },
    {
      skill_name: "시간의 힘",
      skill_description:
        "[마스터 레벨 : 1]\r\n시간의 모래시계가 채워지며 점점 강해지는 힘이다.",
      skill_level: 1,
      skill_effect: "(Unknown)",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNIOE",
      skill_effect_next: null,
    },
    {
      skill_name: "약초 바구니",
      skill_description:
        "[마스터 레벨 : 1]\r\n피어나가 지니고 있는 약초 바구니이다.",
      skill_level: 1,
      skill_effect:
        "몬스터파크 퇴장 시 획득하는 경험치 10% 증가\r\n전야제의 열기 경험치 100% 증가\r\n보스 몬스터 처치 시 획득하는 솔 에르다의 기운 40% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/skill/icon/KFHCLHNIOF",
      skill_effect_next: null,
    },
  ],
};
