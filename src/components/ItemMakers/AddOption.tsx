import {
  ADD_OPTIONS_150_EQUIPMENT,
  ADD_OPTIONS_160_EQUIPMENT,
  ADD_OPTIONS_200_EQUIPMENT,
  ADD_OPTIONS_250_EQUIPMENT,
  ADD_OPTIONS_WEAPON,
} from "@/constants/addOptions";
import MySelect from "../common/MySelect";
import useItemMakerInfoStore from "@/models/itemMakerInfo";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { getAddAttackPower } from "@/utils/getAttackPowers/getAddAttackPower";
import useAddOptionInfoStore from "@/models/addOptionInfo";

const AddOption = ({ itemLevel }: { itemLevel: number | undefined }) => {
  const { itemData, setItemData, itemSlot } = useItemMakerInfoStore();
  const {
    addOptions,
    weaponAddOptions,
    otherAddOptions,
    rightOptions,
    selectedLeftOptions,
    selectedRightOptions,
    setRightOptions,
    setSelectedLeftOptions,
    setSelectedRightOptions,
  } = useAddOptionInfoStore();

  const genRightOptions = (
    itemLevel: number | undefined,
    leftOption: string
  ): string[] => {
    itemLevel = itemLevel === 250 ? 220 : itemLevel;
    const result: string[] = ["---"];
    const addSingleOptionStats = ["STR", "DEX", "INT", "LUK"];
    const addDoubleOptionStats = [
      "STR + DEX",
      "STR + INT",
      "STR + LUK",
      "DEX + INT",
      "DEX + LUK",
      "INT + LUK",
    ];
    const addSingleOptionStatsWithHPMP = ["최대 HP", "최대 MP"];
    const addSingleOptionStatsWithArmor = ["방어력"];
    const addSingleOptionStatsWithSpeedJump = ["이동속도", "점프력"];
    const addSingleOptionStatsWithAllStat = ["올스탯 %"];
    const addSingleOptionStatsWithEquipmentLevelDecrease = ["착용 레벨 감소"];
    const addSingleOptionStatsWithPower = ["공격력", "마력"];
    const addSingleOptionStatsWithBossDamage = ["보스 몬스터 공격 시 데미지 %"];
    const addSingleOptionStatsWithDamage = ["데미지 %"];
    if (itemLevel === undefined) return result;
    //방어구, 장신구
    if (addSingleOptionStats.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${(Math.floor(itemLevel / 20) + 1) * i} (${i}등급)`);
      }
    }
    if (addDoubleOptionStats.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${(Math.floor(itemLevel / 40) + 1) * i} (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithHPMP.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${itemLevel * 3 * i} (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithArmor.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${(Math.floor(itemLevel / 20) + 1) * i} (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithSpeedJump.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${i} (${i}등급)`);
      }
    }
    if (
      addSingleOptionStatsWithAllStat.includes(leftOption) &&
      itemLevel >= 70
    ) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${i}% (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithEquipmentLevelDecrease.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`-${5 * i} (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithPower.includes(leftOption)) {
      if (itemSlot !== "무기") {
        for (let i = 1; i <= 7; i++) {
          result.push(`+${i} (${i}등급)`);
        }
      } else {
        if (leftOption === "공격력") {
          const attackPowers = getAddAttackPower(
            itemData?.item_base_option.attack_power !== "0"
              ? Number(itemData?.item_base_option.attack_power)
              : Number(itemData?.item_base_option.magic_power),
            itemLevel
          );
          return attackPowers
            .sort((a, b) => a.value - b.value)
            .map((item, idx) => {
              return `+${item.value} (${idx + 3}등급)`;
            });
        }
        if (leftOption === "마력") {
          const magicPowers = getAddAttackPower(
            itemData?.item_base_option.magic_power !== "0"
              ? Number(itemData?.item_base_option.magic_power)
              : Number(itemData.item_base_option.attack_power),
            itemLevel
          );
          return magicPowers
            .sort((a, b) => a.value - b.value)
            .map((item, idx) => {
              return `+${item.value} (${idx + 3}등급)`;
            });
        }
      }
    }
    if (
      addSingleOptionStatsWithBossDamage.includes(leftOption) &&
      itemLevel >= 90
    ) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${i * 2}% (${i}등급)`);
      }
    }
    if (addSingleOptionStatsWithDamage.includes(leftOption)) {
      for (let i = 1; i <= 7; i++) {
        result.push(`+${i}% (${i}등급)`);
      }
    }
    return result;
  };

  const onChangeRightOption = (leftOption: string, index: number) => {
    const result = genRightOptions(itemLevel, leftOption);
    const copyRightOptions = rightOptions.map((item, idx) => {
      return idx === index ? result : item;
    });
    setRightOptions(copyRightOptions);
  };

  const onClickLeftList = (inputString: string, index: number) => {
    onChangeRightOption(inputString, index);

    const copySelectedLeftOptions = selectedLeftOptions.map((item, idx) => {
      return idx === index ? inputString : item;
    });
    setSelectedLeftOptions(copySelectedLeftOptions);

    const copySelectedRightOptions = selectedRightOptions.map((item, idx) => {
      return idx === index ? "---" : item;
    });
    setSelectedRightOptions(copySelectedRightOptions);
  };

  const onChangeSelectRightOption = (inputString: string, index: number) => {
    const copySelectedRightOptions = selectedRightOptions.map((item, idx) => {
      return idx === index ? inputString : item;
    });
    setSelectedRightOptions(copySelectedRightOptions);
    updateStatOptionTwo(inputString, index);
  };

  const convertOtherAddOption = (inputString: string) => {
    switch (inputString) {
      case "최대 HP":
        return ["max_hp"];
      case "최대 MP":
        return ["max_mp"];
      case "공격력":
        return ["attack_power"];
      case "마력":
        return ["magic_power"];
      case "방어력":
        return ["armor"];
      case "이동속도":
        return ["speed"];
      case "점프력":
        return ["jump"];
      case "보스 몬스터 공격 시 데미지 %":
        return ["boss_damage"];
      case "데미지 %":
        return ["damage"];
      case "올스탯 %":
        return ["all_stat"];
      case "착용 레벨 감소":
        return ["equipment_level_decrease"];
      default:
        return "";
    }
  };

  const extractNumber = (inputString: string) => {
    const result = inputString.match(/\d+/g);
    return result ? parseInt(result[0]) : 0;
  };

  const updateStatOptionTwo = (inputString: string, index: number) => {
    let originAddOptionTwo = {
      str: 0,
      dex: 0,
      int: 0,
      luk: 0,
      max_hp: 0,
      max_mp: 0,
      attack_power: 0,
      magic_power: 0,
      armor: 0,
      speed: 0,
      jump: 0,
      boss_damage: 0,
      damage: 0,
      all_stat: 0,
      equipment_level_decrease: 0,
    };
    let copyItemData = { ...itemData } as IItemEquipment;

    for (let i = 0; i < 4; i++) {
      const keys = otherAddOptions.includes(selectedLeftOptions[i])
        ? convertOtherAddOption(selectedLeftOptions[i])
        : selectedLeftOptions[i].split(" + ").map((stat) => stat.toLowerCase());
      if (keys.length === 0) return;
      const value =
        i !== index
          ? extractNumber(selectedRightOptions[i])
          : extractNumber(inputString);

      if (keys.length === 1 && keys[0] !== "---") {
        originAddOptionTwo[keys[0] as keyof typeof originAddOptionTwo] += value;
      } else {
        originAddOptionTwo[keys[0] as keyof typeof originAddOptionTwo] += value;
        originAddOptionTwo[keys[1] as keyof typeof originAddOptionTwo] += value;
      }

      const convertOriginAddOptionValueToString: IItemEquipment["item_add_option"] =
        Object.keys(originAddOptionTwo).reduce((acc, cur) => {
          return {
            ...acc,
            [cur]:
              cur === "equipment_level_decrease"
                ? originAddOptionTwo[cur]
                : String(
                    originAddOptionTwo[cur as keyof typeof originAddOptionTwo]
                  ),
          };
        }, {} as IItemEquipment["item_add_option"]);

      copyItemData = {
        ...copyItemData,
        item_add_option: {
          ...convertOriginAddOptionValueToString,
        },
      };
      setItemData({ ...copyItemData });
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center lg:justify-normal lg:items-start space-y-5 h-full py-10">
      {[0, 1, 2, 3].map((item) => {
        return (
          <div
            key={item}
            className="flex flex-row w-fit gap-5 justify-center items-center"
          >
            <MySelect
              option={itemSlot !== "무기" ? addOptions : weaponAddOptions}
              selectedOption={selectedLeftOptions[item]}
              onClickLeftList={(inputString: string) =>
                onClickLeftList(inputString, item)
              }
            />
            <MySelect
              option={rightOptions[item]}
              selectedOption={selectedRightOptions[item]}
              onChangeSelectRightOption={(inputString: string) =>
                onChangeSelectRightOption(inputString, item)
              }
            />
          </div>
        );
      })}
    </div>
  );
};

export default AddOption;
