import { cls } from "@/utils/cls";

type PieceOfScrollPercentHeaderProps = {
  selectedScrollType: string;
  scrollPercent: number[] | undefined;
  selectedScrollPercent: number;
  onClickPieceOfScrollPercentButton: (percent: number) => void;
};

const PieceOfScrollPercentHeader = ({
  selectedScrollType,
  scrollPercent,
  selectedScrollPercent,
  onClickPieceOfScrollPercentButton,
}: PieceOfScrollPercentHeaderProps) => {
  return (
    selectedScrollType === "주문의 흔적" &&
    scrollPercent?.map((percent) => {
      return (
        <button
          className={cls(
            "w-full py-1 hover:bg-slate-100 transform duration-200 ease-in-out",
            percent === selectedScrollPercent ? "bg-slate-100" : ""
          )}
          key={percent}
          onClick={() => onClickPieceOfScrollPercentButton(percent)}
        >
          {percent}
        </button>
      );
    })
  );
};

export default PieceOfScrollPercentHeader;
