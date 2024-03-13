import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { cls } from "@/utils/cls";

const SelectBar = () => {
  const codeList = [
    "모자",
    "얼장",
    "눈장",
    "귀걸이",
    "반지",
    "상의",
    "하의",
    "신발",
    "장갑",
    "망토",
    "무기",
    "보조무기",
    "포켓",
    "벨트",
    "펜던트",
    "견장",
    "하트",
    "뱃지",
    "엠블럼",
  ] as const;
  const [selectedCategory, setSelectedCategory] = useState<string>("모자");

  const onClickCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSelectedCategory(e.currentTarget.innerText);
  };
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={6}
      style={{ marginTop: "24px" }}
      grabCursor={true}
    >
      <div className="absolute flex flex-row gap-1">
        {codeList.map((item) => {
          return (
            <SwiperSlide key={item} style={{ width: 54, height: 40 }}>
              <button
                className={cls(
                  "relative bg-white rounded-lg hover:cursor-pointer text-sm flex w-full flex-col space-y-1 justify-center items-center",
                  item === selectedCategory
                    ? "text-[#F68500]"
                    : "text-slate-300"
                )}
                onClick={(e) => onClickCategory(e)}
                value={item}
              >
                {item}
              </button>
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
};

export default SelectBar;
