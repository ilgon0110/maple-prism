import { cls } from "@/utils/cls";

type PieceOfScrollPercentHeaderProps = {
  scrollPercent: number[] | undefined;
  selectedScrollPercent: number;
  onClickPieceOfScrollPercentButton: (percent: number) => void;
};

const PieceOfScrollPercentHeader = ({
  scrollPercent,
  selectedScrollPercent,
  onClickPieceOfScrollPercentButton,
}: PieceOfScrollPercentHeaderProps) => {
  return (
    <div className="w-full flex flex-row justify-center items-center border border-slate-200 rounded">
      {scrollPercent?.map((percent) => {
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
      })}
    </div>
  );
};

export default PieceOfScrollPercentHeader;
