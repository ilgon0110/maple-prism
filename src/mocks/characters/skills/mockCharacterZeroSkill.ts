import { ICharacterSkill } from "@/types/characters/CharacterSkill";

export const mockCharacterZeroSkill: ICharacterSkill = {
  date: "2024-03-11T00:00+09:00",
  character_class: "은월",
  character_skill_grade: "0",
  character_skill: [
    {
      skill_name: "축지",
      skill_description:
        "[마스터 레벨 : 1]\r\n자신의 전방 범위 내에 있는 적 중 가장 멀리 있는 적에게 순간 이동하며, 적이 없을 시 일정 거리 만큼 전방으로 이동한다.\n자신의 스킬 사용 중에도 이동할 수 있다.",
      skill_level: 1,
      skill_effect:
        "MP 20 소비, 범위 내에 적이 없을 경우 전방 300 만큼 순간 이동",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCPDEE.png",
    },
    {
      skill_name: "정령 결속 1식",
      skill_description:
        "[마스터 레벨 : 1]\r\n정령과 결속으로 인해 정령을 강령시킨 공격 적중 시 HP가 회복되며, 영구적으로 스탠스 확률이 증가하며 받는 피해가 감소한다.",
      skill_level: 1,
      skill_effect:
        "자신이 직접 공격하는 스킬 적중 시 HP 1% 회복\n영구적으로 스탠스 확률 100% 증가, 받는 피해량 30% 감소",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCODEF.png",
    },
    {
      skill_name: "정령친화",
      skill_description:
        "[마스터 레벨 : 1]\r\n랑에게서 정령을 받아 아니마 특유의 친화력을 일부 가지게 되었다.",
      skill_level: 1,
      skill_effect: "소환수 지속시간 5% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCOBLE.png",
    },
    {
      skill_name: "장인의 혼",
      skill_description:
        "[마스터 레벨 : 1]\n장인의 혼을 빌려 착용할 수 없는 아이템에도 주문서를 사용할 수 있다.",
      skill_level: 1,
      skill_effect: null,
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCPBMD.png",
    },
    {
      skill_name: "정령의 축복",
      skill_description:
        "[마스터 레벨 : 20]\r\n다른 캐릭터를 레벨 10이상 육성하면 스킬포인트 1이 증가한다. 단, 정령의 축복과 여제의 축복중 좋은 효과로 발동된다.",
      skill_level: 20,
      skill_effect: "공격력 20, 마력 20 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCOBNC.png",
    },
    {
      skill_name: "플라잉",
      skill_description:
        "[마스터 레벨 : 1]\n용족의 신비한 힘을 사용해 하늘을 난다. 단, 추락시 받는 낙하 데미지가 매우 크다.\n발동할 때 MP 90 소비",
      skill_level: 1,
      skill_effect: null,
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCPBOG.png",
    },
    {
      skill_name: "여제의 축복",
      skill_description:
        "[마스터 레벨 : 30]\r\n다른 시그너스 캐릭터와 미하일 캐릭터를 레벨 5이상 육성하면 스킬포인트 1이 증가한다. 단, 정령의 축복과 여제의 축복중 높은 효과로 발동된다.\r\n다른 시그너스, 미하일 캐릭터의 고귀한 정신에 의해 마스터 레벨이 최대 30까지 확장될 수 있다.",
      skill_level: 30,
      skill_effect: "공격력 30, 마력 30 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCOBLD.png",
    },
    {
      skill_name: "연합의 의지",
      skill_description:
        "[마스터 레벨 : 1]\r\n연합의 의지에 따라 강한 힘을 발휘한다.",
      skill_level: 1,
      skill_effect:
        "영구적으로 힘 5, 민첩 5, 지능 5, 행운 5, 공격력 5, 마력 5 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCOAFA.png",
    },
    {
      skill_name: "링크 매니지먼트",
      skill_description:
        "[마스터 레벨 : 1]\r\n월드 내 다른 캐릭터의 링크 스킬을 전수 받거나 현재 전수 받고 있는 링크 스킬을 해제할 수 있다.",
      skill_level: 1,
      skill_effect: "자신의 링크 스킬 전수 상태를 관리",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCPDJB.png",
    },
    {
      skill_name: "쓸만한 하이퍼 바디",
      skill_description:
        "[아이템 잠재스킬]\n최대 HP와 최대 MP의 양이 증가한다.",
      skill_level: 1,
      skill_effect: "MP 80 소비하여 240초 동안 최대 HP, 최대 MP  40% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCGBMD.png",
    },
    {
      skill_name: "영웅의 메아리",
      skill_description:
        "[마스터 레벨 : 1]\n주변 모든 캐릭터의 공격력과 마력을 증가시킨다. \n재사용 대기시간 : 2시간",
      skill_level: 1,
      skill_effect: "MP 30 소비하여 40분 동안 공격력, 마력 4% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFNCLCPBMF.png",
    },
    {
      skill_name: "루나 드림 Lv.1",
      skill_description:
        "[마스터 레벨 : 1]\r\n달빛의 힘으로 자신의 공격력과 마력을 7씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 7, 마력 7증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOEJA.png",
    },
    {
      skill_name: "루나 드림 Lv.2",
      skill_description:
        "[마스터 레벨 : 1]\r\n달빛의 힘으로 자신의 공격력과 마력을 9씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 9, 마력 9증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOEJB.png",
    },
    {
      skill_name: "째깍째깍 동화 시간 Lv.1",
      skill_description:
        "[마스터 레벨 : 1]\r\n쁘띠 마스터 타임 펫의 동화 속 마법같은 힘으로 자신의 공격력과 마력을 8씩 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력 8, 마력 8증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHOGLD.png",
    },
    {
      skill_name: "파멸의 검",
      skill_description:
        "[마스터 레벨 : 2]\r\n데미안의 혼이 당신과 함께 한다. 타락한 세계수의 힘으로 각성한 모습이다. 소울웨폰의 힘으로 소환된 데미안이 일정 시간 동안 주변 몬스터들을 공격한다.",
      skill_level: 1,
      skill_effect:
        "250 소울을 소비하여 120초 동안 데미지 1800%의 각성 데미안 소환\n소울웨폰 소환수의 데미지는 캐릭터와 다르게 계산됨\n재사용 대기시간 180초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHPIEF.png",
    },
    {
      skill_name: "메이플 휘장",
      skill_description:
        "[마스터 레벨 : 1]\r\n메이플 업적에서 선택한 휘장을 실체화한다.\n실체화된 휘장은 일정 시간 동안 캐릭터 주위에 머무르다가 사라진다. 업적 등급 및 완료 업적에 따라 다양한 휘장을 선택하여 실체화시킬 수 있다.",
      skill_level: 1,
      skill_effect: "재사용 대기시간 5초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHMCOD.png",
    },
    {
      skill_name: "파괴의 얄다바오트",
      skill_description:
        "[마스터 레벨 : 1]\r\n검은 마법사가 초월자의 힘으로 만들어 낸 파괴의 얄다바오트가 깃들어 힘을 발휘한다.\n스킬 사용 시 효과가 활성화되고 재사용 시 비활성화되는 온오프 스킬",
      skill_level: 1,
      skill_effect:
        "영구적으로 최종 데미지 10% 증가\n스킬 사용 시 파괴의 얄다바오트 소환",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHMHPC.png",
    },
    {
      skill_name: "창조의 아이온",
      skill_description:
        "[마스터 레벨 : 1]\r\n검은 마법사가 초월자의 힘으로 만들어 낸 창조의 아이온을 소환하여 그 힘을 이용한다.\n재사용 대기시간 초기화 및 버프 지속시간 증가의 효과를 받지 않고 창세의 기운은 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 1,
      skill_effect:
        "창조의 힘을 발현하여 10초 동안 무적 상태\n스킬을 다시 사용하여 즉시 종료 가능, 즉시 종료하면 12명의 적을 1500%의 데미지로 7번 공격하는 창세의 기운 발동\n재사용 대기시간 120초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHMHPD.png",
    },
    {
      skill_name: "컨티뉴어스 링",
      skill_description:
        "[마스터 레벨 : 5]\r\n컨티뉴어스 링 착용 시 반지의 힘이 활성화되기까지 준비시간을 가진다. 준비를 마치면 주기적으로 보스 몬스터에게 공격 스킬 적중 시 일정 시간 동안 보스 몬스터 공격 시 데미지, 공격력, 마력이 증가한다. 컨티뉴어스 링은 재사용 대기시간 초기화, 재사용 대기시간 감소의 효과를 받지 않는다.",
      skill_level: 4,
      skill_effect:
        "컨티뉴어스 링 착용 시 120초 동안 준비, 준비를 마치면 보스 몬스터에게 공격 스킬 적중 시 8초 동안 보스 몬스터 공격 시 데미지 140%, 공격력 10%, 마력 10% 증가\n재발동 대기시간 12초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNCIB.png",
    },
    {
      skill_name: "드림 메신저",
      skill_description:
        "[마스터 레벨 : 1]\r\n예쁜 보석 상자 안에 설탕, 향신료, 그리고 온갖 근사하고 강력한 꿈들이 가득 들어 있다.",
      skill_level: 1,
      skill_effect: null,
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNEIB.png",
    },
    {
      skill_name: "보스 킬링 머신",
      skill_description:
        "[마스터 레벨 : 15]\r\n연습모드 전용\n\n보스 몬스터 공격 시 데미지가 증가한다.",
      skill_level: 15,
      skill_effect: "보스 몬스터 공격 시 데미지 30% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHMA.png",
    },
    {
      skill_name: "방어력은 숫자일 뿐",
      skill_description:
        "[마스터 레벨 : 15]\r\n연습모드 전용\n\n공격 시 적의 방어를 일정 비율 무시한다.",
      skill_level: 4,
      skill_effect: "공격 시 적의 방어 8% 무시",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHMB.png",
    },
    {
      skill_name: "길드의 이름으로",
      skill_description:
        "[마스터 레벨 : 15]\r\n연습모드 전용\n\n일정 시간 동안 데미지가 일정 비율 증가한다.",
      skill_level: 15,
      skill_effect: "데미지 30% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHMC.png",
    },
    {
      skill_name: "크게 한방",
      skill_description:
        "[마스터 레벨 : 15]\r\n연습모드 전용\n\n크리티컬 데미지가 일정 비율 증가한다.",
      skill_level: 15,
      skill_effect: "크리티컬 데미지 30% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHMD.png",
    },
    {
      skill_name: "헤븐즈 도어",
      skill_description:
        "[마스터 레벨 : 1]\r\n연습모드 전용\n\nHP가 0이 되는 것을 한 번 무시하는 버프를 획득한다.",
      skill_level: 1,
      skill_effect: null,
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHME.png",
    },
    {
      skill_name: "연습모드 전용 영웅의 메아리",
      skill_description:
        "연습모드 전용\n\n캐릭터의 공격력과 마력을 증가시킨다.",
      skill_level: 1,
      skill_effect: "공격력, 마력 4% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHMF.png",
    },
    {
      skill_name: "꿈속 과일 디저트",
      skill_description:
        "[마스터 레벨 : 1]\n레벨 범위 몬스터를 100마리 처치할 때마다 꿈속 과일 디저트가 준비되며, 3번 모두 준비되면 <달콤한 디저트>가 발동된다. 이어서 <상큼한 디저트>가 발동된다. \n\n일일 <꿈속 과일 디저트> 발동 횟수가 30회에 도달한 경우 종료된다.\n\n이벤트 기간이 종료된 후에는 사용할 수 없다. \n\n우클릭으로 온오프 가능",
      skill_level: 1,
      skill_effect:
        "\n\n<달콤한 디저트> 최대 15마리의 적을 1800% 데미지로 6번 공격하는 스킬이 6회 발동\n\n<상큼한 디저트> 최대 15마리의 적을 1800% 데미지로 5번 공격하는 스킬을 6회 발동하는 귀여운 접시 5명을 소환",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KFHCLHNHNC.png",
    },
  ],
};
