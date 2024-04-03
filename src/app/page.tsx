import MyFooter from "@/components/MyFooter";
import NameSearchBox from "@/components/NameSearchBox";
import SlotMachine from "@/components/SlotMachine";
import Image from "next/image";
import React from "react";

export default function Home() {
  const textData = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="max-w-xl mx-auto overflow-hidden h-[100vh] shadow mt-12">
      <section className="px-6 pt-8">
        <div className="flex flex-row gap-1 w-full items-center justify-center">
          {Array(9)
            .fill(0)
            .map((_, i) => {
              return (
                <SlotMachine
                  key={i}
                  velocity={10}
                  textData={textData}
                  randomVelocity={true}
                  infinite={true}
                />
              );
            })}
        </div>
        <NameSearchBox />
        <div className="w-full flex flex-row justify-center items-center gap-2">
          <Image
            src={"/icons/swords.png"}
            width={24}
            height={24}
            alt="검 아이콘"
          />
          <h1>
            메이플스토리{" "}
            <span className="font-bold text-[#F68500]">전투력</span> 시뮬레이터
          </h1>
        </div>
        <div className="w-full flex justify-center items-center flex-col text-sm mt-5">
          <span className="text-sm animate-blink-text text-red-300">
            주의사항
          </span>
          <span>
            데몬어벤져, 데몬슬레이어, 제논, 제로{" "}
            <span className="text-red-500 font-bold">사용불가</span>
          </span>
          <span>이벤트 스킬(ex. 드림 메신저) 수치는 직접 입력해야 합니다.</span>
        </div>
      </section>
      <div className="fixed bottom-0 w-full max-w-xl">
        <MyFooter />
      </div>
    </div>
  );
}
