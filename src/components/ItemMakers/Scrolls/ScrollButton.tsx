import { cls } from "@/utils/cls";
import Image from "next/image";

type ScrollButtonProps = {
  percent: number;
  stat: string | undefined;
  powerType?: string | undefined;
  onClickScrollButton: (
    percent: number,
    stat: string | undefined,
    powerType: string | undefined
  ) => void;
  upgradableCount: string | undefined;
  isWeapon?: boolean;
};

const ScrollButton = ({
  percent,
  stat,
  powerType,
  onClickScrollButton,
  upgradableCount,
  isWeapon,
}: ScrollButtonProps) => {
  const covertToKorStat = (stat: string | undefined) => {
    if (stat === "STR") {
      return "(힘)";
    }
    if (stat === "DEX") {
      return "(민첩)";
    }
    if (stat === "INT") {
      return "(지능)";
    }
    if (stat === "LUK") {
      return "(운)";
    }
    if (stat === " ") {
      return "";
    }
    return "(올스탯)";
  };
  const getScrollImage = (percent: number) => {
    switch (percent) {
      case 100:
        return "/100_scroll.png";
      case 70:
        return "/70_scroll.png";
      case 30:
        return "/30_scroll.png";
      case 15:
        return "/15_scroll.png";
      default:
        return "/100_scroll.png";
    }
  };
  return (
    <button
      className={cls(
        "flex flex-row",
        upgradableCount === "0" ? "text-gray-300" : ""
      )}
      onClick={() => onClickScrollButton(percent, stat, powerType)}
      disabled={upgradableCount === "0"}
    >
      <Image
        src={getScrollImage(percent)}
        width={24}
        height={24}
        alt="이미지"
        className={cls(upgradableCount === "0" ? " opacity-20" : "")}
      />
      <span>
        {isWeapon
          ? `${percent}% ${powerType}${covertToKorStat(stat)} 주문서`
          : `${percent}% ${covertToKorStat(stat)} 주문서`}
      </span>
    </button>
  );
};

export default ScrollButton;
