"use client";

import { mockCharacterBasicInfo } from "@/mocks/characters/mockCharacterBasicInfo";
import { mockCharacterItemEquipment } from "@/mocks/characters/mockCharacterItemEquipment";
import { useCharacterQueries } from "@/queries/useCharacterQueries";
import useGetOcidQuery from "@/queries/useGetOcidQuery";
import { convertToKoreanNumber } from "@/utils/converToKoreanNumber";
import { getPowerRate } from "@/utils/getPowerRate";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import BasicInfo from "@/components/BasicInfo";
import EquipmentInventory from "@/components/EquipmentInventory";
import ItemCard from "@/components/ItemCard";
import { cls } from "@/utils/cls";
import useItemMakerInfoStore from "@/models/itemMakerInfo";
import ItemMaker from "@/components/ItemMaker";
import {
  ICharacterItemEquipment,
  IItemEquipment,
} from "@/types/characters/CharacterItemEquipment";
import { mockCharacterSetEffect } from "@/mocks/characters/mockCharacterSetEffect";
import { mockCharacterUnionRaider } from "@/mocks/characters/mockCharacterUnionRaider";
import { mockCharacterCashItemEquipment } from "@/mocks/characters/mockCharacterCashItemEquipment";
import { mockCharacterPetEquipment } from "@/mocks/characters/mockCharacterPetEquipment";
import { mockCharacterStat } from "@/mocks/characters/mockCharacterStat";
import { mockCharacterHyperStat } from "@/mocks/characters/mockCharacterHyperStat";
import { mockCharacterSymbol } from "@/mocks/characters/mockCharacterSymbol";
import { mockCharacterAbility } from "@/mocks/characters/mockCharacterAbility";
import { mockCharacterZeroSkill } from "@/mocks/characters/skills/mockCharacterZeroSkill";
import { mockCharacterHexaStat } from "@/mocks/characters/mockCharacterHexaStat";
import { mockCharacterArtifact } from "@/mocks/characters/mockCharacterArtifact";
import useEventSKillInfoStore from "@/models/eventSkillInfo";
import useItemEquipmentInfoStore from "@/models/itemEquipmentInfo";
import { ICharacterSetEffect } from "@/types/characters/CharacterSetEffect";
import Link from "next/link";

const CharacterNamePage = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const { data, error } = useGetOcidQuery(name);
  const [
    basicInfo,
    stats,
    hyperStats,
    ability,
    itemEquipment,
    cashItemEquipment,
    symbol,
    setEffect,
    petEquipment,
    zeroSkill,
    hexaStat,
    unionRaider,
    artifact,
  ] = useCharacterQueries(data?.ocid);
  const allLoadingFalse =
    basicInfo.isLoading ||
    stats.isLoading ||
    hyperStats.isLoading ||
    ability.isLoading ||
    itemEquipment.isLoading ||
    cashItemEquipment.isLoading ||
    symbol.isLoading ||
    setEffect.isLoading ||
    petEquipment.isLoading ||
    zeroSkill.isLoading ||
    hexaStat.isLoading ||
    unionRaider.isLoading ||
    artifact.isLoading;
  const allSuccess =
    basicInfo.isSuccess &&
    stats.isSuccess &&
    hyperStats.isSuccess &&
    ability.isSuccess &&
    itemEquipment.isSuccess &&
    cashItemEquipment.isSuccess &&
    symbol.isSuccess &&
    setEffect.isSuccess &&
    petEquipment.isSuccess &&
    zeroSkill.isSuccess &&
    hexaStat.isSuccess &&
    unionRaider.isSuccess &&
    artifact.isSuccess;
  const { makerModalOpen, setMakerModalOpen, isCanMake } =
    useItemMakerInfoStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [itemData, setItemData] = useState<IItemEquipment | null>(null);
  // const basicInfo = { data: mockCharacterBasicInfo };
  // const itemEquipment = { data: mockCharacterItemEquipment };
  // const setEffect = { data: mockCharacterSetEffect };
  // const unionRaider = { data: mockCharacterUnionRaider };
  // const cashItemEquipment = { data: mockCharacterCashItemEquipment };
  // const petEquipment = { data: mockCharacterPetEquipment };
  // const stats = { data: mockCharacterStat };
  // const hyperStats = { data: mockCharacterHyperStat };
  // const symbol = { data: mockCharacterSymbol };
  // const ability = { data: mockCharacterAbility };
  // const zeroSkill = { data: mockCharacterZeroSkill };
  // const hexaStat = { data: mockCharacterHexaStat };
  // const artifact = { data: mockCharacterArtifact };
  const unValidJob = useMemo(
    () =>
      basicInfo?.data?.character_class === "제논" ||
      basicInfo?.data?.character_class === "제로" ||
      basicInfo?.data?.character_class === "데몬어벤져",
    [basicInfo?.data?.character_class]
  );

  const eventSkillInfo = useEventSKillInfoStore();
  const {
    setInitialItemEquipment,
    setInitialSetEffect,
    itemEquipments,
    setEffects,
    redoItemEquipment,
    undoItemEquipment,
    redoSetEffect,
    undoSetEffect,
    itemEquipmentCallStack,
    setEffectCallStack,
  } = useItemEquipmentInfoStore();

  useEffect(() => {
    if (itemEquipment.data && setEffect.data) {
      setInitialItemEquipment(itemEquipment.data);
      setInitialSetEffect(setEffect.data);
    }
  }, [itemEquipment.data, setEffect.data]);

  if (error) {
    return (
      <div className="w-full max-w-xl mx-auto shadow h-screen relative flex justify-center items-center px-6">
        <div className="mx-auto text-center flex justify-center flex-col items-center">
          <Image
            src="/라라티콘.png"
            width={100}
            height={100}
            alt="캐릭터정보를찾을수없습니다"
          />
          <span className="font-bold">{name}</span>캐릭터 정보를 찾을 수
          없습니다.
          <div className="w-full h-8 mt-2 border flex items-center justify-center px-3 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white hover:border-none transform ease-in-out duration-300">
            <Link href="/">검색화면으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  if (allLoadingFalse || !allSuccess) {
    return (
      //Skeleton UI
      <div className="text-2xl mx-auto text-center font-bold text-red-500">
        Loading...
      </div>
    );
  }

  if (unValidJob) {
    return (
      <div className="w-full max-w-xl mx-auto shadow h-screen relative flex justify-center items-center px-6">
        <div className="mx-auto text-center flex justify-center flex-col items-center space-y-1">
          <Image
            src="/우는라라티콘.jpeg"
            width={100}
            height={100}
            alt="캐릭터정보를찾을수없습니다"
          />
          <span className="font-bold text-lg">
            {basicInfo.data.character_class}
          </span>
          직업은 현재 전투력 공식이 달라 사용할 수 없습니다ㅠㅠ
          <div className="w-full h-8 mt-2 border flex items-center justify-center px-3 py-1 rounded-md text-sm hover:bg-orange-500 hover:text-white hover:border-none transform ease-in-out duration-300">
            <Link href="/">검색화면으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  const originPowerRate = getPowerRate({
    characterBasicInfo: basicInfo.data,
    characterSetEffect: setEffect.data,
    characterUnionRaider: unionRaider.data,
    characterCashItemEquipment: cashItemEquipment.data,
    characterPetEquipment: petEquipment.data,
    characterStat: stats.data,
    characterItemEquipment: itemEquipment.data,
    characterHyperStat: hyperStats.data,
    characterSymbol: symbol.data,
    characterAbility: ability.data,
    characterSkill: zeroSkill.data,
    characterHexaStat: hexaStat.data,
    characterArtifact: artifact.data,
    eventSkillInfo,
  });
  //true powerRate : 183542806(2024-03-11)

  // if (itemEquipments.length === 0 || setEffects.length === 0) {
  //   return <div>Loading...</div>;
  // }

  const powerRate = getPowerRate({
    characterBasicInfo: basicInfo.data,
    characterSetEffect: setEffects.at(-1),
    characterUnionRaider: unionRaider.data,
    characterCashItemEquipment: cashItemEquipment.data,
    characterPetEquipment: petEquipment.data,
    characterStat: stats.data,
    characterItemEquipment: itemEquipments.at(-1),
    characterHyperStat: hyperStats.data,
    characterSymbol: symbol.data,
    characterAbility: ability.data,
    characterSkill: zeroSkill.data,
    characterHexaStat: hexaStat.data,
    characterArtifact: artifact.data,
    eventSkillInfo,
  });
  const undoPowerRate = getPowerRate({
    characterBasicInfo: basicInfo.data,
    characterSetEffect: setEffects.at(-2),
    characterUnionRaider: unionRaider.data,
    characterCashItemEquipment: cashItemEquipment.data,
    characterPetEquipment: petEquipment.data,
    characterStat: stats.data,
    characterItemEquipment: itemEquipments.at(-2),
    characterHyperStat: hyperStats.data,
    characterSymbol: symbol.data,
    characterAbility: ability.data,
    characterSkill: zeroSkill.data,
    characterHexaStat: hexaStat.data,
    characterArtifact: artifact.data,
    eventSkillInfo,
  });
  const redoPowerRate = getPowerRate({
    characterBasicInfo: basicInfo.data,
    characterSetEffect: setEffectCallStack.at(-1),
    characterUnionRaider: unionRaider.data,
    characterCashItemEquipment: cashItemEquipment.data,
    characterPetEquipment: petEquipment.data,
    characterStat: stats.data,
    characterItemEquipment: itemEquipmentCallStack.at(-1),
    characterHyperStat: hyperStats.data,
    characterSymbol: symbol.data,
    characterAbility: ability.data,
    characterSkill: zeroSkill.data,
    characterHexaStat: hexaStat.data,
    characterArtifact: artifact.data,
    eventSkillInfo,
  });
  const isUnDoExist = itemEquipments.length > 1;
  const isReDoExist = itemEquipmentCallStack.length > 0;
  const characterJob = basicInfo.data.character_class;

  const onClickMakerModalOpen = () => {
    setMakerModalOpen(true);
  };
  const onClickItemModalOpen = (itemValue: IItemEquipment) => {
    setModalOpen(true);
    setItemData(itemValue);
  };
  const onClickEquipment = () => {
    setEquipmentOpen(!equipmentOpen);
  };
  const onClickModalClose = () => {
    setModalOpen(false);
  };
  const onClickUndo = () => {
    undoItemEquipment();
    undoSetEffect();
  };
  const onClickRedo = () => {
    redoItemEquipment();
    redoSetEffect();
  };

  console.log(
    "api PowerRate",
    convertToKoreanNumber(
      Number(
        stats.data.final_stat.find((el) => el.stat_name === "전투력")
          ?.stat_value
      )
    )
  );

  return (
    <div
      className={cls(
        "h-screen",
        makerModalOpen ? "overflow-hidden relative" : "mt-12"
      )}
    >
      <div
        className={cls(
          "flex flex-row justify-center items-center w-full pt-20",
          makerModalOpen ? "top-0 absolute" : "relative"
        )}
      >
        <div
          className={cls(
            "max-w-md w-full md:absolute top-1/2 z-10 h-fit shadow mx-auto md:mx-6 space-y-4 py-6 px-6 transform duration-200 ease-in-out",
            modalOpen ? "md:-translate-x-1/2" : ""
          )}
        >
          <BasicInfo
            data={basicInfo.data}
            powerRate={powerRate}
            originPowerRate={originPowerRate}
          />
          <button
            className="w-full h-8 border border-slate-200 rounded"
            onClick={onClickEquipment}
          >
            {`장비창 ${equipmentOpen ? "닫기" : "열기"}`}
          </button>
          <div className="flex flex-row justify-between items-center text-xs gap-3">
            <button
              className={cls(
                "w-full h-8 border border-slate-100 rounded flex items-center justify-center gap-1 transform duration-200 ease-in-out",
                powerRate - undoPowerRate < 0
                  ? "text-green-500 hover:border-green-500"
                  : powerRate - undoPowerRate >= 0 && isUnDoExist
                  ? "text-red-500 hover:border-red-500"
                  : ""
              )}
              onClick={onClickUndo}
              disabled={!isUnDoExist}
            >
              {isUnDoExist ? (
                <div
                  className={cls(
                    "flex flex-row items-center gap-1",
                    powerRate - undoPowerRate < 0
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill="currentColor"
                  >
                    <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
                  </svg>
                  <span
                    className={cls(
                      powerRate - undoPowerRate < 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {convertToKoreanNumber(Math.abs(powerRate - undoPowerRate))}
                  </span>
                </div>
              ) : null}
            </button>
            <button
              className={cls(
                "w-full h-8 border border-slate-100 rounded flex items-center justify-center gap-1 transform duration-200 ease-in-out",
                powerRate - redoPowerRate < 0
                  ? "text-green-500 hover:border-green-500"
                  : powerRate - redoPowerRate >= 0 && isReDoExist
                  ? "text-red-500 hover:border-red-500"
                  : ""
              )}
              onClick={onClickRedo}
              disabled={!isReDoExist}
            >
              {isReDoExist ? (
                <div
                  className={cls(
                    "flex flex-row items-center gap-1",
                    powerRate - redoPowerRate < 0
                      ? "text-green-500"
                      : "text-red-500"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
                  </svg>
                  <span
                    className={cls(
                      powerRate - redoPowerRate < 0
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {convertToKoreanNumber(Math.abs(powerRate - redoPowerRate))}
                  </span>
                </div>
              ) : null}
            </button>
          </div>
          <div
            className={cls(
              "transform duration-200",
              equipmentOpen ? "block" : "hidden"
            )}
          >
            <EquipmentInventory
              itemEquipment={itemEquipments.at(-1)}
              onClickItemModalOpen={onClickItemModalOpen}
              characterJob={characterJob}
            />
          </div>
        </div>
        <div
          className={cls(
            "absolute w-full max-w-md top-full mt-5 md:mt-0 md:top-1/2 flex flex-col justify-center items-center transform duration-200 md:ml-10 ease-in md:translate-x-1/2 opacity-0 delay-300 p-6 shadow",
            modalOpen ? "opacity-100" : ""
          )}
        >
          {isCanMake ? (
            <button
              className="w-80 h-10 rounded border border-slate-300 flex justify-center items-center mb-5"
              onClick={onClickMakerModalOpen}
            >
              장비제작
            </button>
          ) : null}
          <ItemCard itemData={itemData} />
        </div>
      </div>
      {makerModalOpen && (
        <div>
          <div className="w-full h-full bg-black opacity-60 top-0 z-40 absolute" />
          <ItemMaker onClickModalClose={onClickModalClose} />
        </div>
      )}
    </div>
  );
};

export default CharacterNamePage;
