import useItemMakerInfoStore from "@/models/itemMakerInfo";
import MySelect from "../common/MySelect";
import {
  HAT_POTENTIAL_OPTIONS,
  CLOTHE_POTENTIAL_OPTIONS,
  CAPE_POTENTIAL_OPTIONS,
  PANT_POTENTIAL_OPTIONS,
  SHOES_POTENTIAL_OPTIONS,
  SHOULDER_POTENTIAL_OPTIONS,
  SUB_WEAPON_POTENTIAL_OPTIONS,
  WEAPON_POTENTIAL_OPTIONS,
  GLOVE_POTENTIAL_OPTIONS,
  EMBLEM_POTENTIAL_OPTIONS,
  EYEACC_POTENTIAL_OPTIONS,
  FACEACC_POTENTIAL_OPTIONS,
  EARRING_POTENTIAL_OPTIONS,
  PENDANT_POTENTIAL_OPTIONS,
  BELT_POTENTIAL_OPTIONS,
  RING_POTENTIAL_OPTIONS,
  MACHINE_HEART_POTENTIAL_OPTIONS,
} from "@/constants/potentialOptions";
import { useState } from "react";
import { cls } from "@/utils/cls";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import usePotentialOptionInfoStore from "@/models/potentialOptionInfo";

type PotentialOptionProps = {
  itemLevel: number | undefined;
};

const PotentialOption = ({ itemLevel }: PotentialOptionProps) => {
  const { itemData, setItemData, itemPart } = useItemMakerInfoStore();
  const {
    grades,
    selectedPotentialGrade,
    selectedAddPotentialGrade,
    selectedAddPotentialOptions,
    selectedPotentialOptions,
    setSelectedAddPotentialGrade,
    setSelectedAddPotentialOptions,
    setSelectedPotentialGrade,
    setSelectedPotentialOptions,
    resetPotentialOptions,
    resetAddPotentialOptions,
  } = usePotentialOptionInfoStore();

  const getItemPotentialOption = () => {
    switch (itemPart) {
      case "모자":
        return filterPotentialOption(HAT_POTENTIAL_OPTIONS);
      case "상의":
        return filterPotentialOption(CLOTHE_POTENTIAL_OPTIONS);
      case "망토":
        return filterPotentialOption(CAPE_POTENTIAL_OPTIONS);
      case "하의":
        return filterPotentialOption(PANT_POTENTIAL_OPTIONS);
      case "신발":
        return filterPotentialOption(SHOES_POTENTIAL_OPTIONS);
      case "어깨장식":
        return filterPotentialOption(SHOULDER_POTENTIAL_OPTIONS);
      case "보조무기":
        return filterPotentialOption(SUB_WEAPON_POTENTIAL_OPTIONS);
      case "무기":
        return filterPotentialOption(WEAPON_POTENTIAL_OPTIONS);
      case "장갑":
        return filterPotentialOption(GLOVE_POTENTIAL_OPTIONS);
      case "엠블렘":
        return filterPotentialOption(EMBLEM_POTENTIAL_OPTIONS);
      case "눈장식":
        return filterPotentialOption(EYEACC_POTENTIAL_OPTIONS);
      case "얼굴장식":
        return filterPotentialOption(FACEACC_POTENTIAL_OPTIONS);
      case "펜던트":
        return filterPotentialOption(PENDANT_POTENTIAL_OPTIONS);
      case "귀고리":
        return filterPotentialOption(EARRING_POTENTIAL_OPTIONS);
      case "벨트":
        return filterPotentialOption(BELT_POTENTIAL_OPTIONS);
      case "반지":
        return filterPotentialOption(RING_POTENTIAL_OPTIONS);
      case "기계 심장":
        return filterPotentialOption(MACHINE_HEART_POTENTIAL_OPTIONS);
      default:
        return { upside: [], downside: [] };
    }
  };

  const filterPotentialOption = (
    options: {
      level: number;
      grade: string;
      options: string[];
      additionalOptions: string[];
    }[]
  ) => {
    const getGradeRange = (grade: string) => {
      switch (grade) {
        case "레어":
          return ["레어"];
        case "에픽":
          return ["레어", "에픽"];
        case "유니크":
          return ["에픽", "유니크"];
        case "레전드리":
          return ["유니크", "레전드리"];
        default:
          return [];
      }
    };
    const tmp = options.filter((option) => {
      return (
        Number(itemLevel) <= option.level &&
        getGradeRange(selectedPotentialGrade).includes(option.grade)
      );
    });
    const upside =
      selectedPotentialGrade === "레어"
        ? tmp
            .slice(0, 1)
            .map((item) => item.options)
            .reverse()
            .flat()
        : tmp
            .slice(0, 2)
            .map((item) => item.options)
            .reverse()
            .flat();
    const down_tmp = options.filter((option) => {
      return (
        Number(itemLevel) <= option.level &&
        getGradeRange(selectedAddPotentialGrade).includes(option.grade)
      );
    });
    const downside =
      selectedAddPotentialGrade === "레어"
        ? down_tmp
            .slice(0, 1)
            .map((item) => item.additionalOptions)
            .reverse()
            .flat()
        : down_tmp
            .slice(0, 2)
            .map((item) => item.additionalOptions)
            .reverse()
            .flat();
    return { upside, downside };
  };

  const { upside, downside } = getItemPotentialOption();
  const onChangePotentialGrade = (grade: string) => {
    setSelectedPotentialGrade(grade);
    updatePotentialGrade(grade);
    resetPotentialOptions();
  };
  const onChangeAddPotentialGrade = (grade: string) => {
    setSelectedAddPotentialGrade(grade);
    updateAdditionalPotentialGrade(grade);
    resetAddPotentialOptions();
  };
  const onChangePotentialOption = (option: string, index: number) => {
    // setSelectedUpSidOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = option;
    //   return temp;
    // });
    const copySelectedPotentialOptions = selectedPotentialOptions.map(
      (item, idx) => {
        return idx === index ? option : item;
      }
    );
    setSelectedPotentialOptions(copySelectedPotentialOptions);
    updatePotentialOption(option, index);
  };
  const updatePotentialOption = (option: string, index: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      potential_option_1:
        selectedPotentialOptions[0] === "---"
          ? null
          : selectedPotentialOptions[0],
      potential_option_2:
        selectedPotentialOptions[1] === "---"
          ? null
          : selectedPotentialOptions[1],
      potential_option_3:
        selectedPotentialOptions[2] === "---"
          ? null
          : selectedPotentialOptions[2],
      [cls(`potential_option_${index + 1}`)]: option === "---" ? null : option,
    };
    setItemData({ ...copyItemData });
  };
  const onChangeAddPotentialOption = (option: string, index: number) => {
    // setSelectedDownSidOptions((prev) => {
    //   const temp = [...prev];
    //   temp[index] = option;
    //   return temp;
    // });
    const copySelectedAddPotentialOptions = selectedAddPotentialOptions.map(
      (item, idx) => {
        return idx === index ? option : item;
      }
    );
    setSelectedAddPotentialOptions(copySelectedAddPotentialOptions);
    updateAdditionalPotentialOption(option, index);
  };
  const updateAdditionalPotentialOption = (option: string, index: number) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      additional_potential_option_1:
        selectedAddPotentialOptions[0] === "---"
          ? null
          : selectedAddPotentialOptions[0],
      additional_potential_option_2:
        selectedAddPotentialOptions[1] === "---"
          ? null
          : selectedAddPotentialOptions[1],
      additional_potential_option_3:
        selectedAddPotentialOptions[2] === "---"
          ? null
          : selectedAddPotentialOptions[2],
      [cls(`additional_potential_option_${index + 1}`)]:
        option === "---" ? null : option,
    };
    setItemData({ ...copyItemData });
  };
  const updatePotentialGrade = (grade: string) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      potential_option_grade: grade,
    };
    setItemData({ ...copyItemData });
  };

  const updateAdditionalPotentialGrade = (grade: string) => {
    let copyItemData = { ...itemData } as IItemEquipment;
    copyItemData = {
      ...copyItemData,
      additional_potential_option_grade: grade,
    };
    setItemData({ ...copyItemData });
  };

  return (
    <div className="w-full py-10">
      <div className="space-y-1">
        <div>잠재옵션</div>
        <span className="text-gray-500 text-sm">등급</span>
        <MySelect
          option={grades}
          selectedOption={selectedPotentialGrade}
          onChangeSelectOption={onChangePotentialGrade}
        />
        <div className="mt-4 space-y-1">
          <span className="text-gray-500 text-sm">옵션</span>
          {[0, 1, 2].map((item) => {
            return (
              <MySelect
                key={item}
                option={upside}
                selectedOption={selectedPotentialOptions[item]}
                onChangeSelectOption={(option: string) => {
                  onChangePotentialOption(option, item);
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="space-y-1 mt-5">
        <div>에디셔널 잠재옵션</div>
        <span className="text-gray-500 text-sm">등급</span>
        <MySelect
          option={grades}
          selectedOption={selectedAddPotentialGrade}
          onChangeSelectOption={onChangeAddPotentialGrade}
        />
        <div className="mt-4 space-y-1">
          <span className="text-gray-500 text-sm">옵션</span>
          {[0, 1, 2].map((item) => {
            return (
              <MySelect
                key={item}
                option={downside}
                selectedOption={selectedAddPotentialOptions[item]}
                onChangeSelectOption={(option: string) => {
                  onChangeAddPotentialOption(option, item);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PotentialOption;
