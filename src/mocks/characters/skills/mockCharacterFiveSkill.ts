import { ICharacterSkill } from "@/types/characters/CharacterSkill";

export const mockCharacterFiveSkill: ICharacterSkill = {
  date: "2024-01-12T00:00+09:00",
  character_class: "은월",
  character_skill_grade: "5",
  character_skill: [
    {
      skill_name: "로프 커넥트",
      skill_description:
        "[마스터 레벨 : 25]\r\n하늘 높이 로프를 던져 빠르게 이동한다.",
      skill_level: 15,
      skill_effect:
        "올라가는 도중에 스킬키를 다시 누르면 캔슬가능\n재사용 대기시간 3초\n[패시브 효과 : 올스탯 15 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMA.png",
    },
    {
      skill_name: "쓸만한 샤프 아이즈",
      skill_description:
        "[마스터 레벨 : 25]\r\n적의 약점을 찾아 치명상을 입힐 수 있는 능력을 자신에게 부여한다. 샤프 아이즈와 중복 사용되지 않는다.",
      skill_level: 6,
      skill_effect:
        "최대 HP의 5% 소비, 198초 동안 크리티컬 확률 10%, 크리티컬 데미지 8% 증가\n재사용 대기시간 180초\n[패시브 효과 : 올스탯 2 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMC.png",
    },
    {
      skill_name: "쓸만한 하이퍼 바디",
      skill_description:
        "[마스터 레벨 : 25]\r\n최대 HP와 최대 MP의 양이 증가한다. 하이퍼 바디와 중복 사용되지 않는다.",
      skill_level: 1,
      skill_effect:
        "최대 HP의 5% 소비, 183초 동안 최대 HP 40%, 최대 MP 40% 증가\n재사용 대기시간 180초\n[패시브 효과 : 올스탯 1 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMD.png",
    },
    {
      skill_name: "쓸만한 컴뱃 오더스",
      skill_description:
        "[마스터 레벨 : 25]\r\n일정 시간 동안 자신의 모든 스킬 레벨을 증가시켜준다. 4차 스킬에 한해 마스터 레벨 이상으로 증가시킬 수 있으며 그 외 스킬은 마스터 레벨까지만 올려줄 수 있다.\n예외적으로 일부 특별한 스킬과 초보자 스킬, 컴뱃 오더스, 쓸만한 컴뱃 오더스, 하이퍼 스킬, 5차 스킬, 6차 스킬의 스킬 레벨은 올려줄 수 없다.\n컴뱃 오더스와 중복 사용되지 않는다.",
      skill_level: 6,
      skill_effect:
        "최대 HP의 5% 소비, 198초 동안 모든 스킬 레벨 1 증가\n재사용 대기시간 180초\n[패시브 효과 : 상태 이상 내성 2 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBME.png",
    },
    {
      skill_name: "쓸만한 어드밴스드 블레스",
      skill_description:
        "[마스터 레벨 : 25]\r\n일정 시간 동안 자신의 공격력, 마력, 방어력, 최대 HP, 최대 MP를 크게 높여준다. 블레스, 어드밴스드 블레스를 제외한 다른 모든 버프 스킬과 중복으로 사용할 수 있다.",
      skill_level: 6,
      skill_effect:
        "최대 HP의 5% 소비, 198초 동안 공격력 20, 마력 20, 방어력 425, 최대 HP 475, 최대 MP 475 증가\n재사용 대기시간 180초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMF.png",
    },
    {
      skill_name: "블링크",
      skill_description:
        "[마스터 레벨 : 25]\r\n맵 상의 랜덤한 위치로 순간이동한다. 공중에서 키다운으로 사용하면 순간이동 대신 일정시간 부유하며 느린 속도로 이동할 수 있다.",
      skill_level: 29,
      skill_effect:
        "최대 HP의 3% 소비\n맵 상의 랜덤한 위치로 순간이동\n공중에서 키다운 시 최대 4.9초 동안 부유\n재사용 대기시간 20초\n[패시브 효과 : 공격력, 마력 29 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMH.png",
    },
    {
      skill_name: "에르다의 의지",
      skill_description:
        "[마스터 레벨 : 25]\r\n정신을 집중하여 상태 이상으로부터 벗어난다. 사용 후 3초 동안 상태 이상 면역. 단, 일부 상태 이상 효과에는 적용되지 않는다.",
      skill_level: 10,
      skill_effect: "최대 HP의 5% 소비, 재사용 대기시간 430초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBMJ.png",
    },
    {
      skill_name: "쓸만한 홀리 심볼",
      skill_description:
        "[마스터 레벨 : 25]\r\n일정 시간 동안 몬스터를 사냥할 때 더 많은 경험치와 아이템을 획득할 수 있다. 홀리 심볼과 중복 사용되지 않는다.",
      skill_level: 30,
      skill_effect:
        "HP 3400 소비, 270초 동안 획득 경험치 35%, 드롭률 24% 증가\n재사용 대기시간 180초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBOA.png",
    },
    {
      skill_name: "에르다 샤워",
      skill_description:
        "[마스터 레벨 : 25]\r\n응축되어 있는 에르다를 뿜어내어 주변 적을 공격한다.\n아래 방향키와 함께 스킬 사용 시 순수한 에르다가 고여있는 오브제인 에르다 파운틴을 소환할 수 있다.\n커스텀 커맨드를 사용하면 방향키 입력 없이 스킬 키만으로 에르다 파운틴을 소환할 수 있다.\n커스텀 커맨드 온오프 : 마우스 우클릭",
      skill_level: 1,
      skill_effect:
        "HP 3000 소비\n에르다 샤워\n최대 15명의 적을 465%의 데미지로 6번 공격, 공격 후 에르다를 흡수하여 공격한 적마다 에르다 샤워의 재사용 대기시간 2초 감소\n재사용 대기시간 40초\n에르다 파운틴\n60초 동안 오브제 소환, 오브제가 소환된 맵에서 적을 처치할 때마다 적에서 방출된 에르다가 오브제 주위로 응집\n12명 이상 처치 시 모인 에르다가 방출되어 최대 10명의 적을 465%의 데미지로 4번 공격\n재사용 대기시간 60초\n에르다 샤워와 에르다 파운틴은 재사용 대기시간을 공유",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBPG.png",
    },
    {
      skill_name: "프리드의 가호",
      skill_description:
        "[마스터 레벨 : 25]\r\n영웅 프리드가 친구들을 위해 남긴 힘을 얻는다.",
      skill_level: 30,
      skill_effect:
        "MP 250 소비, 사용 시 30초 동안 지속되고 최대 6번 중첩 가능한 버프를 걸며 중첩마다 이전 중첩 효과 및 새로운 효과를 얻음\n1중첩 : 재사용 대기시간 초기화의 효과를 받지 않는 스킬을 제외한 스킬의 재사용 대기시간이 10% 더 빠르게 감소\n2중첩 : 상태 이상 내성 25 증가\n3중첩 : 올스탯 55 증가\n4중첩 : 공격력/마력 25 증가\n5중첩 : 보스 몬스터 공격 시 데미지 25% 증가\n6중첩 : 지속시간 동안 무적\n재사용 대기시간 25초, 중첩을 갱신하지 못하고 캐릭터 사망을 포함해 지속시간이 끝나거나 최대 중첩이 되면 재사용 대기시간 240초로 적용",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBOE.png",
    },
    {
      skill_name: "스파이더 인 미러",
      skill_description:
        "[마스터 레벨 : 25]\r\n윌의 에르다로 공간을 붕괴시켜 거울 세계와 현실을 연결한 후 거울 속의 거미를 일정 시간 현실에 구현한다. 거울 속의 거미는 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 6,
      skill_effect:
        "최대 HP의 15% 소비\n공간 붕괴 : 최대 15명의 적에게 558%의 데미지로 15번 공격한 후 거울 속의 거미를 소환\n거울 속의 거미 : 50초 동안 지속되며 일정 시간마다 공격 상태에 돌입, 공격 상태 동안 217%의 데미지로 8번 공격하는 거미 다리를 10회 사용, 거미 다리가 한명의 적을 5번 연속 공격할 경우 공격 상태 즉시 종료, 공격 상태 종료 후 재돌입 대기시간 3초\n재사용 대기시간 : 250초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBPJ.png",
    },
    {
      skill_name: "메이플월드 여신의 축복",
      skill_description:
        "[마스터 레벨 : 25]\r\n메이플월드 여신의 축복이 깃들어 모든 스탯과 데미지가 증가된다. 메이플 용사, 시그너스 나이츠, 노바의 용사, 레프의 용사, 이계의 용사, 아니마의 용사, 륀느의 가호 중 1개의 스킬이 적용된 상태에서만 사용가능하다. 재사용 대기시간 감소 효과를 받는다.",
      skill_level: 30,
      skill_effect:
        "MP 500 소비, 60초 동안 메이플 용사류 스킬로 증가하는 모든 능력치의 400% 추가 증가, 데미지 20% 증가\n메이플월드 여신의 축복은 180초마다 준비되며 최대 2번까지 축복 가능",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBIC.png",
    },
    {
      skill_name: "크레스트 오브 더 솔라",
      skill_description:
        "[마스터 레벨 : 25]\r\n미트라의 힘으로 태양의 열기를 방출한 후 불꽃의 분노를 현실에 구현한다. 불꽃의 문양은 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 6,
      skill_effect:
        "최대 HP의 15% 소비\n미트라의 불꽃 : 최대 15명의 적에게 930%의 데미지로 12번 공격한 후 불꽃의 문양을 소환\n불꽃의 문양 : 51초 동안 유지되며 2.1초 마다 최대 2명의 적을 248%로 6번 공격, 1명을 공격할 경우 341%로 공격\n재사용 대기시간 : 250초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHPBJJ.png",
    },
    {
      skill_name: "파쇄철조-하 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n파쇄철조-하를 강화한다.\n\n20레벨 : 최대 공격 가능 대상 1 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 30,
      skill_effect: "파쇄철조-하의 최종 데미지 150% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNA.png",
    },
    {
      skill_name: "여우령 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n여우령/불여우령을 강화한다.\n\n20레벨 : 크리티컬 확률 5% 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 60,
      skill_effect: "여우령/불여우령의 최종 데미지 120% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNC.png",
    },
    {
      skill_name: "파쇄철조-회 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n파쇄철조-회를 강화한다.\n\n20레벨 : 최대 공격 가능 대상 1 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 30,
      skill_effect: "파쇄철조-회의 최종 데미지 90% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNE.png",
    },
    {
      skill_name: "소혼 장막 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n소혼 장막을 강화한다.\n\n20레벨 : 최대 공격 가능 대상 1 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 60,
      skill_effect: "소혼 장막의 최종 데미지 180% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNF.png",
    },
    {
      skill_name: "폭류권 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n폭류권을 강화한다.\n\n20레벨 : 최대 공격 가능 대상 1 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 60,
      skill_effect: "폭류권의 최종 데미지 120% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNI.png",
    },
    {
      skill_name: "귀참 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n귀참과 진 귀참을 강화한다.\n\n20레벨 : 최대 공격 가능 대상 1 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 60,
      skill_effect: "귀참과 진 귀참의 최종 데미지 120% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCNJ.png",
    },
    {
      skill_name: "정령의 화신 강화",
      skill_description:
        "[마스터 레벨 : 50]\r\n정령의 화신을 강화한다.\n\n20레벨 : 크리티컬 확률 5% 증가\n40레벨 : 몬스터 방어율 무시 20% 증가",
      skill_level: 60,
      skill_effect: "정령의 화신의 최종 데미지 120% 증가",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLHKCOC.png",
    },
    {
      skill_name: "로디드 다이스",
      skill_description:
        "[마스터 레벨 : 25]\r\n럭키 다이스로 주사위를 굴릴 때 주사위를 1개 더 던지고 주사위의 눈을 원하는 것으로 고정시킨다. 스킬 사용 후 숫자키로 주사위의 눈을 선택할 수 있다. 럭키 다이스가 없는 직업은 럭키 다이스 스킬을 사용할 수 있게 되며 자신이 정한 눈이 나오는 주사위 1개를 던진다.",
      skill_level: 30,
      skill_effect:
        "HP 1000 소비, 주사위 1개의 눈을 정할 수 있음\n더블 럭키 다이스가 있는 직업이 주사위 2개의 눈이 같을 경우 마지막 주사위가 같은 눈이 나올 확률이 50% 감소\n재사용 대기시간 : 10초\n[패시브 효과 : 공격력 40 증가]",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBMA.png",
    },
    {
      skill_name: "럭키 다이스",
      skill_description:
        "[마스터 레벨 : 25]\r\n주사위를 던져 자신의 행운을 시험한다. 주사위의 결과에 따라 일정 시간 동안 랜덤 버프를 획득할 수 있지만, 1이 나올 경우에는 버프를 획득할 수 없고 럭키 다이스의 재사용 대기시간이 50% 감소한다.",
      skill_level: 30,
      skill_effect:
        "HP 300 소비, 주사위 버프 지속시간 180초\n재사용 대기시간 180초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBMB.png",
    },
    {
      skill_name: "오버 드라이브",
      skill_description:
        "[마스터 레벨 : 25]\r\n무기를 혹사시켜 일정 시간 공격력을 더 이끌어낸다. 스킬이 종료된 후 혹사된 무기는 일정 시간 성능이 감소하며 오버 드라이브의 재사용 대기시간 동안 무기를 교체할 수 없다.",
      skill_level: 30,
      skill_effect:
        "HP 1700 소비, 28초 동안 무기 순수 공격력의 80%만큼 공격력 증가, 지속시간이 끝난 후 남은 재사용 대기시간 동안 무기 순수 공격력의 15%만큼 공격력 감소\n재사용 대기시간 60초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBPD.png",
    },
    {
      skill_name: "정령 집속",
      skill_description:
        "[마스터 레벨 : 25]\r\n모든 정령을 몸 속으로 받아들여 하나가 된다. 자동 발동된 공격은 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 30,
      skill_effect:
        "MP 1000 소비, 재사용 대기시간 초기화, 60초 동안 최종 데미지 20% 증가\n지속 시간 중 5차 스킬을 제외한 공격 시 몸에 깃든 정령이 공격 스킬 1회 자동 발동, 키다운 스킬은 3초 동안 지속\n정령 공격 재발동 대기시간 2초\n정령 집속 중 1회에 한해 수호정령이 깃들어 은월이 직접 시전하는 소혼 장막의 최종 데미지 550% 증가\n재사용 대기시간 : 120초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBNA.png",
    },
    {
      skill_name: "귀문진",
      skill_description:
        "[마스터 레벨 : 25]\r\n정령이 소환되는 영역을 생성한다. 정령은 공격 반사 상태의 적을 공격해도 피해를 입지 않는다.",
      skill_level: 30,
      skill_effect:
        "MP 1000 소비, 30초 동안 일정 주기마다 8초 동안 존재하는 정령 2마리를 소환하는 영역 생성, 정령은 최대 10마리까지 존재 가능\n정령은 영역 주위의 적을 찾아 495%의 데미지로 6번 공격한 후 적에게 달라붙어 소멸하면서 8초 동안 디버프 부여\n디버프에 걸린 적을 공격할 때 크리티컬 확률 16%, 크리티컬 데미지 2% 증가\n디버프는 최대 5번까지 중첩 가능\n재사용 대기시간 60초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBOC.png",
    },
    {
      skill_name: "진 귀참",
      skill_description:
        "[마스터 레벨 : 25]\r\n정령과의 결속을 중첩시켜 더욱 강력한 귀참으로 공격한다. 사용 후 재강화되는데는 시간이 필요하다.\n필요 스킬 : 귀참 30레벨 이상",
      skill_level: 30,
      skill_effect:
        "MP 80 소비, 최대 10명의 적을 720% 데미지로 12번 공격, 몬스터 방어율 50% 추가 무시\n귀참 사용 시 발동\n재강화 대기시간 6초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBID.png",
    },
    {
      skill_name: "파쇄 연권",
      skill_description:
        "[마스터 레벨 : 25]\r\n강령시킨 땅의 정령에 여우신의 힘을 더해 파괴적인 연타를 날린다.\n필요 스킬 : 불여우령 숙련 20레벨 이상",
      skill_level: 30,
      skill_effect:
        "공격당 MP 60 소비, 키다운 동안 최대 10명의 적을 550%의 데미지로 5번 연속 공격, 최대 키다운 시간 1.3초\n키다운 종료 시 최대 10명의 적을 1375%의 데미지로 15번 공격하는 충격이 3번 발생하는 마무리 공격 발동, 마무리 공격 적중 시 여우령 15마리 추가 소환\n파쇄 연권 사용 중 최대 HP의 일정 비율로 피해를 입히는 공격을 포함한 피격 데미지 50% 감소, 공격 적중 시 여우령 100% 확률로 소환\n재사용 대기시간 : 60초",
      skill_icon:
        "https://open.api.nexon.com/static/maplestory/SkillIcon/KBPCLCPBLI.png",
    },
  ],
};
