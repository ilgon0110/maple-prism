import { PropsWithChildren } from "react";
import { cls } from "@/utils/cls";

interface BottomWhitePlainProps extends PropsWithChildren {
  isOpen?: boolean;
}

const BottomWhitePlain = ({
  isOpen = false,
  children,
}: BottomWhitePlainProps) => {
  return (
    <div
      className={cls(
        "w-full h-full bg-white relative rounded-tl-[32px] rounded-tr-[32px] pt-6 px-5 box-border shadow transform duration-500 ease-in-out",
        isOpen ? "-translate-y-80" : "translate-y-0"
      )}
    >
      <div className="h-[2px] mx-auto rounded-full w-1/3 bg-slate-400" />
      {children}
    </div>
  );
};

export default BottomWhitePlain;
