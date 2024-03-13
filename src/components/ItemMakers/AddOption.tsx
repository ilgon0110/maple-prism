import { useEffect, useState } from "react";
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
  // const addOptions = ADD_OPTIONS_150_EQUIPMENT.map((item) => item.kind).flat();
  // const weaponAddOptions = [
  //   ...ADD_OPTIONS_150_EQUIPMENT.map((item) => item.kind).flat(),
  //   ...ADD_OPTIONS_WEAPON.map((item) => item.kind).flat(),
  // ].filter((option) => option !== "이동속도" && option !== "점프력");
  // const otherAddOptions = [
  //   "최대 HP",
  //   "최대 MP",
  //   "공격력",
  //   "마력",
  //   "방어력",
  //   "이동속도",
  //   "점프력",
  //   "올스탯 %",
  //   "보스 몬스터 공격 시 데미지 %",
  //   "데미지 %",
  //   "착용 레벨 감소",
  // ];
  // const [rightOptions, setRightOptions] = useState([
  //   ["---"],
  //   ["---"],
  //   ["---"],
  //   ["---"],
  // ]);

  // const [selectedLeftOptions, setSelectedLeftOptions] = useState([
  //   "---",
  //   "---",
  //   "---",
  //   "---",
  // ]);
  // const [selectedRightOptions, setSelectedRightOptions] = useState([
  //   "---",
  //   "---",
  //   "---",
  //   "---",
  // ]);
  const genEquipmentRightOptionsByItemLevel = (
    itemLevel: number | undefined,
    leftOption: string
  ) => {
    let result: string[] = [];
    if (itemLevel === 150) {
      result =
        ADD_OPTIONS_150_EQUIPMENT.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    if (itemLevel === 160) {
      result =
        ADD_OPTIONS_160_EQUIPMENT.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    if (itemLevel === 200) {
      result =
        ADD_OPTIONS_200_EQUIPMENT.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    if (itemLevel === 250) {
      result =
        ADD_OPTIONS_250_EQUIPMENT.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    return result;
  };
  const attackPowers = getAddAttackPower(
    itemData?.item_base_option.attack_power !== "0"
      ? Number(itemData?.item_base_option.attack_power)
      : Number(itemData?.item_base_option.magic_power),
    itemLevel || null
  );
  const magicPowers = getAddAttackPower(
    itemData?.item_base_option.magic_power !== "0"
      ? Number(itemData?.item_base_option.magic_power)
      : Number(itemData.item_base_option.attack_power),
    itemLevel || null
  );
  const genWeaponRightOptionsByItemLevel = (
    itemLevel: number | undefined,
    leftOption: string
  ) => {
    let result = genEquipmentRightOptionsByItemLevel(itemLevel, leftOption);
    if (leftOption === "공격력") {
      result = attackPowers
        .sort((a, b) => a.value - b.value)
        .map((item, idx) => {
          return `+${item.value} (${idx + 3}등급)`;
        });
    }
    if (leftOption === "마력") {
      result = magicPowers
        .sort((a, b) => a.value - b.value)
        .map((item, idx) => {
          return `+${item.value} (${idx + 3}등급)`;
        });
    }
    if (leftOption === "보스 몬스터 공격 시 데미지 %") {
      result =
        ADD_OPTIONS_WEAPON.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    if (leftOption === "데미지 %") {
      result =
        ADD_OPTIONS_WEAPON.find((item) => item.kind.includes(leftOption))
          ?.value || [];
    }
    return result;
  };
  const onChangeRightOption = (leftOption: string, index: number) => {
    let result: string[];
    if (itemSlot !== "무기") {
      result = genEquipmentRightOptionsByItemLevel(itemLevel, leftOption);
    }
    if (itemSlot === "무기") {
      result = genWeaponRightOptionsByItemLevel(itemLevel, leftOption);
    }
    // setRightOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = result;
    //   return temp;
    // });
    const copyRightOptions = rightOptions.map((item, idx) => {
      return idx === index ? result : item;
    });
    setRightOptions(copyRightOptions);
  };
  const onClickLeftList = (inputString: string, index: number) => {
    onChangeRightOption(inputString, index);
    // setSelectedLeftOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = inputString;
    //   return temp;
    // });
    const copySelectedLeftOptions = selectedLeftOptions.map((item, idx) => {
      return idx === index ? inputString : item;
    });
    setSelectedLeftOptions(copySelectedLeftOptions);
    // setSelectedRightOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = "---";
    //   return temp;
    // });
    const copySelectedRightOptions = selectedRightOptions.map((item, idx) => {
      return idx === index ? "---" : item;
    });
    setSelectedRightOptions(copySelectedRightOptions);
  };

  const onChangeSelectRightOption = (inputString: string, index: number) => {
    // setSelectedRightOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = inputString;
    //   return temp;
    // });
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
