import { ICharacterBasicInfo } from "@/types/characters/CharacterBasicInfo";
import Image from "next/image";
import MySelect from "./common/MySelect";
import useEventSKillInfoStore from "@/models/eventSkillInfo";
import { convertToKoreanNumber } from "@/utils/converToKoreanNumber";
import { cls } from "@/utils/cls";
import { Tooltip } from "antd";
import { ICharacterAbility } from "@/types/characters/CharacterAbility";
import { ICharacterHyperStat } from "@/types/characters/CharacterHyperStat";
import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";
import uuid from "react-uuid";

type BasicInfoProps = {
  data: ICharacterBasicInfo;
  powerRate: number;
  originPowerRate: number;
  presets: { ability: number; hyperStat: number; union: number };
  onClickPreset: (name: string, presetNo: number) => void;
  abilityData: ICharacterAbility;
  hyperStatData: ICharacterHyperStat;
  unionRaiderData: ICharacterUnionRaider;
};

const BasicInfo = ({
  data,
  powerRate,
  originPowerRate,
  presets,
  onClickPreset,
  abilityData,
  hyperStatData,
  unionRaiderData,
}: BasicInfoProps) => {
  const {
    bossDamageOption,
    powerOption,
    statOption,
    selectedBossDamageOption,
    selectedPowerOption,
    selectedStatOption,
    setSelectedBossDamageOption,
    setSelectedPowerOption,
    setSelectedStatOption,
  } = useEventSKillInfoStore();

  const onChangeSelectOption = (option: string, type: string) => {
    switch (type) {
      case "bossDamage":
        setSelectedBossDamageOption(option);
        break;
      case "power":
        setSelectedPowerOption(option);
        break;
      case "stat":
        setSelectedStatOption(option);
        break;
    }
  };

  const isEventDuration = false;

  let width = 0;
  let height = 0;
  const diffPercent = Math.floor(
    ((powerRate - originPowerRate) / originPowerRate) * 100
  );

  const fillUnionBlocks = (
    unionBlock: ICharacterUnionRaider["union_block"] | undefined
  ): number[][] => {
    if (unionBlock === undefined || unionBlock.length === 0) return [[]];
    unionBlock.forEach((block) =>
      block.block_position.forEach((pos) => {
        width = Math.max(width, 11 + pos.x + 1);
        height = Math.max(height, 10 - pos.y + 1);
      })
    );

    const unionBlocks: Array<Array<number>> = Array.from(
      { length: height },
      () => Array.from({ length: width }).fill(0)
    ) as Array<Array<number>>;
    unionBlock.forEach((block) => {
      const blocks: [number, number][] = [];
      block.block_position.forEach((position) => {
        blocks.push([10 - position.y, 11 + position.x]);
      });
      blocks.forEach(([x, y]) => {
        if (x < 0 || y < 0 || x >= height || y >= width) {
          throw new Error("유니온 배치 오류");
        }
        unionBlocks[x][y] = 1;
      });
    });
    return unionBlocks;
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <div className="h-full">
          <Image
            src={data.character_image}
            width={120}
            height={120}
            alt="캐릭터이미지"
            style={{ objectFit: "contain" }}
            sizes="100%"
          />
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-sm font-normal mb-2 text-gray-900 block xs:flex flex-row gap-3 items-center">
            <span className="ml-1 xs:ml-0">{data.character_name}</span>
            <div className="flex flex-row gap-3 mt-1 xs:mt-0">
              <div className="bg-slate-100 w-fit py-[1px] px-4 text-gray-700 rounded-full text-xs">
                {data.character_class}
              </div>
              Lv. {data.character_level}
            </div>
          </dt>
          <dd className="items-center block xs:flex justify-between gap-4 xs:mt-0 mt-1">
            <div className="flex flex-col items-baseline text-lg font-semibold text-indigo-600">
              {convertToKoreanNumber(powerRate)}
              <span className="text-xs font-medium text-gray-500">
                from {convertToKoreanNumber(originPowerRate)}
              </span>
            </div>
            <div
              className={cls(
                "inline-flex rounded-full px-2.5 py-0.5 text-sm font-medium text-green-800 mt-2 xs:mt-0 items-center",
                diffPercent >= 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {diffPercent >= 0 ? (
                <svg
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <div className="text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20"
                    viewBox="0 -960 960 960"
                    width="20"
                    fill="currentColor"
                  >
                    <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
                  </svg>
                </div>
              )}
              <span className="sr-only">
                {diffPercent >= 0 ? "Increased by" : "Decreased by"}
              </span>
              {diffPercent}%
            </div>
          </dd>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="flex flex-col gap-2">
          <span>어빌리티</span>
          <span>하이퍼스탯</span>
          <span>유니온</span>
        </div>
        <div className="flex flex-col gap-2 ml-2">
          <span>:</span>
          <span>:</span>
          <span>:</span>
        </div>
        <div className="flex flex-col gap-2 ml-2">
          <div className="space-x-1 flex flex-row">
            {[1, 2, 3].map((v) => (
              <Tooltip
                key={v}
                title={() => (
                  <div className="w-full space-y-1">
                    {abilityData[
                      `ability_preset_${v}` as
                        | "ability_preset_1"
                        | "ability_preset_2"
                        | "ability_preset_3"
                    ].ability_info.map((info) => (
                      <div key={info.ability_no}>{info.ability_value}</div>
                    ))}
                  </div>
                )}
              >
                <button
                  className={cls(
                    "w-6 h-6 rounded border border-slate-400 text-white bg-slate-300 text-sm flex justify-center items-center pt-[1px] transform ease-in-out duration-200",
                    presets.ability === v
                      ? "shadow-inner bg-slate-500"
                      : "shadow border-slate-500"
                  )}
                  onClick={() => onClickPreset("ability", v)}
                >
                  {v}
                </button>
              </Tooltip>
            ))}
          </div>
          <div className="space-x-1 flex flex-row">
            {[1, 2, 3].map((v) => (
              <Tooltip
                key={v}
                title={() => (
                  <div className="w-full">
                    {hyperStatData[
                      `hyper_stat_preset_${v}` as
                        | "hyper_stat_preset_1"
                        | "hyper_stat_preset_2"
                        | "hyper_stat_preset_3"
                    ].map((hyperStat) => (
                      <div key={hyperStat.stat_type}>
                        {hyperStat.stat_increase !== null
                          ? hyperStat.stat_increase
                          : null}
                      </div>
                    ))}
                  </div>
                )}
              >
                <button
                  className={cls(
                    "w-6 h-6 rounded border border-slate-400 text-white bg-slate-300 text-sm flex justify-center items-center pt-[1px] transform ease-in-out duration-200",
                    presets.hyperStat === v
                      ? "shadow-inner bg-slate-500"
                      : "shadow border-slate-500"
                  )}
                  onClick={() => onClickPreset("hyperStat", v)}
                >
                  {v}
                </button>
              </Tooltip>
            ))}
          </div>
          <div className="space-x-1 flex flex-row">
            {[1, 2, 3, 4, 5].map((v) => (
              <Tooltip
                key={v}
                title={() => {
                  const unionBlocks = fillUnionBlocks(
                    unionRaiderData[
                      `union_raider_preset_${v}` as
                        | "union_raider_preset_1"
                        | "union_raider_preset_2"
                        | "union_raider_preset_3"
                        | "union_raider_preset_4"
                        | "union_raider_preset_5"
                    ]?.union_block
                  );
                  return (
                    <div className="w-full">
                      {unionBlocks.map((block) => {
                        return (
                          <div key={uuid()} className="flex flex-row">
                            {block.map((el) => (
                              <div
                                key={uuid()}
                                className={cls(
                                  "w-1 h-1 m-[0.5px]",
                                  el ? " bg-orange-200" : "bg-slate-100"
                                )}
                              />
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              >
                <button
                  className={cls(
                    "w-6 h-6 rounded border border-slate-400 text-white bg-slate-300 text-sm flex justify-center items-center pt-[1px] transform ease-in-out duration-200",
                    presets.union === v
                      ? "shadow-inner bg-slate-500"
                      : "shadow border-slate-500"
                  )}
                  onClick={() => onClickPreset("union", v)}
                >
                  {v}
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div
        className={cls(
          "w-full text-xs py-2 relative",
          isEventDuration ? "h-fit" : "h-16"
        )}
      >
        <div className="absolute w-full h-full inset-0 bg-black opacity-50 z-10 rounded-md" />
        <span>마약 스킬</span>
        {isEventDuration ? (
          <div className="w-full flex flex-col gap-4 px-4 justify-center text-white xs:flex-row xs:px-0 xs:gap-2">
            <div className="z-20 space-y-1">
              <span>보공</span>
              <MySelect
                option={bossDamageOption}
                selectedOption={selectedBossDamageOption}
                onChangeSelectOption={(inputString: string) =>
                  onChangeSelectOption(inputString, "bossDamage")
                }
              />
            </div>
            <div className="z-20 space-y-1">
              <span>공/마</span>
              <MySelect
                option={powerOption}
                selectedOption={selectedPowerOption}
                onChangeSelectOption={(inputString: string) =>
                  onChangeSelectOption(inputString, "power")
                }
              />
            </div>
            <div className="z-20 space-y-1">
              <span>올스탯</span>
              <MySelect
                option={statOption}
                selectedOption={selectedStatOption}
                onChangeSelectOption={(inputString: string) =>
                  onChangeSelectOption(inputString, "stat")
                }
              />
            </div>
          </div>
        ) : (
          <div className="text-white z-20 w-full text-center xs:text-base absolute">
            <span className="z-20">보약스킬 이벤트 기간이 아닙니다</span>
          </div>
        )}
        <div className="absolute inset-0 w-full h-full object-cover blur-[1px] rounded-md">
          <Image
            src={
              isEventDuration
                ? "/루시드드림페스타.png"
                : "/maplestory_noEvent.jpeg"
            }
            fill
            sizes="100%"
            alt="보약스킬"
            objectFit="cover"
            style={{ borderRadius: "0.375rem" }}
          />
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
