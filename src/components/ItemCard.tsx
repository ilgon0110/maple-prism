import { SKILL_KEYS } from "@/constants/skills";
import { STARFORCE_LEVEL } from "@/constants/starForce";
import { IItemEquipment } from "@/types/characters/CharacterItemEquipment";
import { cls } from "@/utils/cls";
import { getItemPotentialRank } from "@/utils/getItemPotentialRank";
import Image from "next/image";
import uuid from "react-uuid";

type ItemCardProps = {
  itemData: IItemEquipment | null;
};

const ItemCard = ({ itemData }: ItemCardProps) => {
  const starForce = Number(itemData?.starforce);
  const itemLevel = itemData?.item_base_option.base_equipment_level;
  const maxiumStarForce =
    STARFORCE_LEVEL.find((el) => itemLevel && itemLevel <= el.level)?.value ||
    0;
  const starForceArr = Array.from({ length: maxiumStarForce }, (_, i) => i + 1);
  const isNotStarForceItem =
    itemData?.scroll_upgradeable_count === "0" &&
    itemData.scroll_upgrade === "0" &&
    itemData.starforce === "0";
  const getGrade = (rank: number) => {
    switch (rank) {
      case 0:
        return "";
      case 1:
        return "레어";
      case 2:
        return "에픽";
      case 3:
        return "유니크";
      case 4:
        return "레전드리";
    }
  };
  const itemGrade = getGrade(
    getItemPotentialRank(
      itemData?.potential_option_grade,
      itemData?.additional_potential_option_grade
    )
  );
  const convertToKoreanOption = (option: string) => {
    if (option === "attack_power") {
      return "공격력";
    }
    if (option === "magic_power") {
      return "마력";
    }
    if (option === "boss_damage") {
      return SKILL_KEYS.boss_damage;
    }
    if (option === "max_hp") {
      return "최대 HP";
    }
    if (option === "max_mp") {
      return "최대 MP";
    }
    if (option === "all_stat") {
      return "올스탯";
    }
    if (option === "armor") {
      return "방어력";
    }
    if (option === "speed") {
      return "이동속도";
    }
    if (option === "jump") {
      return "점프력";
    }
    if (option === "ignore_monster_armor") {
      return "몬스터 방어율 무시";
    }
    if (option === "damage") {
      return "데미지";
    }
    if (option === "equipment_level_decrease") {
      return "착용 레벨 감소";
    }
    if (option === "max_hp_rate") {
      return "최대 HP %";
    }
    if (option === "max_mp_rate") {
      return "최대 MP %";
    }
    return option;
  };

  const itemInfo = itemData
    ? Object.keys(itemData.item_total_option)
        .map((el) => {
          return {
            name: convertToKoreanOption(el),
            total:
              itemData.item_total_option[
                el as keyof typeof itemData.item_total_option
              ],
            base: itemData.item_base_option[
              el as keyof typeof itemData.item_base_option
            ],
            add: itemData.item_add_option[
              el as keyof typeof itemData.item_add_option
            ],
            etc: itemData.item_etc_option[
              el as keyof typeof itemData.item_etc_option
            ],
            starforce:
              itemData.item_starforce_option[
                el as keyof typeof itemData.item_starforce_option
              ],
          };
        })
        .filter((el) => Number(el.total) !== 0)
        .map((el) => (el.total === el.base ? { ...el, base: -99 } : el))
        .map((el) => {
          return { ...el, name: el.name.toUpperCase() };
        })
    : [];

  const convertValue = (value: number | string, index: string) => {
    if (value === undefined) return "";
    if (index === "total") {
      return `+ ${value}`;
    }
    if (index === "base" && +value === 0) return "0";
    if (index === "base" && +value === -99) return ``;
    if (index === "base" && +value !== 0) return `${value}`;
    if (index === "add" && +value === 0) return "";
    if (index === "etc" && +value === 0) return "";
    if (index === "starforce" && +value === 0) return "";
    return ` + ${value}`;
  };

  const isPercentValue = (value: string, name: string) => {
    return value !== "" &&
      (name === "올스탯" ||
        name === "몬스터 방어율 무시" ||
        name === "데미지" ||
        name === SKILL_KEYS.boss_damage ||
        name === "최대 HP %" ||
        name === "최대 MP %")
      ? "%"
      : "";
  };

  const isReinforceValue = (value: number | string) => {
    return +value !== -99;
  };

  const createPotentialMark = (potential: string | null) => {
    switch (potential) {
      case null:
        return "";
      case "레어":
        return "R";
      case "에픽":
        return "E";
      case "유니크":
        return "U";
      case "레전드리":
        return "L";
    }
  };

  const getPotentialColor = (grade: string | null, isText: boolean) => {
    if (!isText) {
      switch (grade) {
        case "레어":
          return "bg-[#509CA7]";
        case "에픽":
          return "bg-[#7479FF]";
        case "유니크":
          return "bg-[#FFC000]";
        case "레전드리":
          return "bg-[#35A239]";
        default:
          return "bg-[#FFFFFF]";
      }
    }
    if (isText) {
      switch (grade) {
        case "레어":
          return "text-[#509CA7]";
        case "에픽":
          return "text-[#7479FF]";
        case "유니크":
          return "text-[#FFC000]";
        case "레전드리":
          return "text-[#35A239]";
        default:
          return "text-[#FFFFFF]";
      }
    }
    return "";
  };

  const getRingColor = () => {
    switch (itemGrade) {
      case "레어":
        return "ring-2 ring-[#509CA7] ring-offset-2";
      case "에픽":
        return "ring-2 ring-[#7479FF] ring-offset-2";
      case "유니크":
        return "ring-2 ring-[#FFAE34] ring-offset-2";
      case "레전드리":
        return "ring-2 ring-[#35A239] ring-offset-2";
      default:
        return "ring-2 ring-[#FFFFFF] ring-offset-2";
    }
  };

  if (!itemData) return null;
  const isNotExceptionalReinforce = !!Object.entries(
    itemData?.item_exceptional_option
  ).every(([key, value]: [key: string, value: string]) => +value === 0);

  return (
    <div className="w-full px-10 py-5 rounded border-2 border-black text-white bg-slate-700">
      {isNotStarForceItem ? null : (
        <>
          <div className="flex flex-row items-center justify-center mb-1">
            {starForceArr.slice(0, 15).map((star, idx) => {
              return star <= starForce ? (
                <div
                  key={uuid()}
                  className={cls(
                    "w-3 h-3 relative",
                    idx % 5 === 4 ? "mr-2" : ""
                  )}
                >
                  <Image
                    src="/icons/star.png"
                    fill
                    alt="star"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div
                  key={uuid()}
                  className={cls(
                    "w-3 h-3 relative",
                    idx % 5 === 4 ? "mr-2" : ""
                  )}
                >
                  <Image
                    src="/icons/star_empty.png"
                    fill
                    alt="star"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-row items-center justify-center mb-1">
            {starForceArr.slice(15).map((star, idx) => {
              return star <= starForce ? (
                <div
                  key={uuid()}
                  className={cls(
                    "w-3 h-3 relative",
                    idx % 5 === 4 ? "mr-2" : ""
                  )}
                >
                  <Image
                    src="/icons/star.png"
                    fill
                    alt="star"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ) : (
                <div
                  key={uuid()}
                  className={cls(
                    "w-3 h-3 relative",
                    idx % 5 === 4 ? "mr-2" : ""
                  )}
                >
                  <Image
                    src="/icons/star_empty.png"
                    fill
                    alt="star"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      <h1 className="text-center font-bold text-base">
        {itemData.item_name}{" "}
        {itemData.scroll_upgrade !== "0"
          ? `(+${itemData.scroll_upgrade})`
          : null}
      </h1>
      <div className="text-center text-xs">
        {itemGrade !== "" ? itemGrade + " 아이템" : null}
      </div>
      {isNotExceptionalReinforce === false ? (
        <div className="text-xs text-center mt-1 text-red-500">
          익셉셔널 강화 적용
        </div>
      ) : null}
      <div className="flex flex-row items-end gap-3 mt-2">
        <div className={cls("w-14 h-14 relative rounded", getRingColor())}>
          <Image
            src={itemData.item_icon}
            fill
            style={{ objectFit: "contain" }}
            sizes="100%"
            alt="아이템이미지"
          />
        </div>
        <div className="text-xs text-yellow-500">
          <span className="text-[10px]">
            REQ LEV :{" "}
            {itemData.item_base_option.base_equipment_level -
              itemData.item_add_option.equipment_level_decrease}
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-300 my-3" />
      <div className="relative text-xs space-y-[2px]">
        <span className="text-sm">
          장비분류 : {itemData.item_equipment_part}
        </span>
        <div className=" space-y-[2px]">
          {itemInfo.map((item) => {
            return (
              <div key={uuid()}>
                <span
                  className={cls(
                    isReinforceValue(item.base) ? "text-blue-500" : ""
                  )}
                >
                  {item.name} :{" "}
                </span>
                <span
                  className={cls(
                    isReinforceValue(item.base) ? "text-blue-500" : ""
                  )}
                >
                  {convertValue(item.total, "total") +
                    isPercentValue(
                      convertValue(item.total, "total"),
                      item.name
                    )}{" "}
                </span>
                {item.base !== -99 ? "(" : null}
                {convertValue(item.base, "base") +
                  isPercentValue(convertValue(item.base, "base"), item.name)}
                <span
                  className={cls(
                    isReinforceValue(item.base) ? "text-amber-500" : ""
                  )}
                >
                  {convertValue(item.add, "add") +
                    isPercentValue(convertValue(item.add, "add"), item.name)}
                </span>
                <span
                  className={cls(
                    isReinforceValue(item.base) ? "text-purple-500" : ""
                  )}
                >
                  {convertValue(item.etc, "etc") +
                    isPercentValue(convertValue(item.etc, "etc"), item.name)}
                </span>
                <span
                  className={cls(
                    isReinforceValue(item.base) ? "text-orange-600" : ""
                  )}
                >
                  {convertValue(item.starforce, "starforce") +
                    isPercentValue(
                      convertValue(item.starforce, "starforce"),
                      item.name
                    )}
                </span>
                {item.base !== -99 ? ")" : null}
              </div>
            );
          })}
          <div className="text-[11px]">
            업그레이드 가능 횟수 : {itemData.scroll_upgradeable_count}
            <span className="text-amber-500">{` (복구 가능 횟수 : ${itemData.scroll_resilience_count})`}</span>
          </div>
          <div className="text-[11px]">
            {itemData.golden_hammer_flag === "적용"
              ? "황금망치 제련 적용"
              : null}
          </div>
        </div>
      </div>
      {itemData.potential_option_grade !== null ? (
        <>
          <div className="w-full h-[1px] bg-slate-300 my-3" />
          <div className="text-xs space-y-[2px]">
            <div className="flex flex-row gap-1">
              <div
                className={cls(
                  "w-4 h-4 flex justify-center text-xs items-center rounded font-bold border-2 border-white text-white ",
                  getPotentialColor(itemData.potential_option_grade, false)
                )}
              >
                {createPotentialMark(itemData.potential_option_grade)}
              </div>
              <span
                className={cls(
                  getPotentialColor(itemData.potential_option_grade, true)
                )}
              >
                잠재옵션
              </span>
            </div>
            <div>{itemData.potential_option_1}</div>
            <div>{itemData.potential_option_2}</div>
            <div>{itemData.potential_option_3}</div>
          </div>
        </>
      ) : null}
      {itemData.additional_potential_option_grade !== null ? (
        <div className="text-xs space-y-[2px]">
          <div className="w-full h-[1px] bg-slate-300 my-3" />
          <div className="flex flex-row gap-1">
            <div
              className={cls(
                "w-4 h-4 flex justify-center text-xs items-center rounded font-bold border-2 border-white text-white ",
                getPotentialColor(
                  itemData.additional_potential_option_grade,
                  false
                )
              )}
            >
              {createPotentialMark(itemData.additional_potential_option_grade)}
            </div>
            <span
              className={cls(
                getPotentialColor(
                  itemData.additional_potential_option_grade,
                  true
                )
              )}
            >
              에디셔널 잠재옵션
            </span>
          </div>
          <div>{itemData.additional_potential_option_1}</div>
          <div>{itemData.additional_potential_option_2}</div>
          <div>{itemData.additional_potential_option_3}</div>
        </div>
      ) : null}
      {isNotExceptionalReinforce === false ? (
        <div className="text-xs space-y-[2px]">
          <div className="w-full h-[1px] bg-slate-300 my-3" />
          <div className="flex flex-row gap-1 items-center">
            <div className="border-2 border-white px-1 rounded bg-red-500 text-white">
              EX
            </div>
            <span className="text-red-500 font-bold">익셉셔널</span>
          </div>
          <div>{"올스탯 : +" + itemData.item_exceptional_option.dex}</div>
          <div>
            {"최대 HP/MP : +" + itemData.item_exceptional_option.max_hp}
          </div>
          <div>
            {"공격력 / 마력 : +" +
              itemData.item_exceptional_option.attack_power}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ItemCard;
