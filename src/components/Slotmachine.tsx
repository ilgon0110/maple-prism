"use client";

import { cls } from "@/utils/cls";
import { AnimatePresence, Variants, motion } from "framer-motion";
import React from "react";
import { useCallback, useEffect, useState } from "react";

type SlotMachineProps = {
  textData: string[];
  infinite?: boolean;
  velocity: number;
  randomVelocity?: boolean;
  endText?: string;
};

interface VariantProps {
  scaleY: number;
  y: string | number;
  opacity: number;
  filter: string;
}

const ARRAY_REPEAT = 1;

function SlotMachine({
  textData,
  infinite,
  velocity,
  randomVelocity,
  endText,
}: SlotMachineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [randomVelocityValue, setRandomVelocityValue] = useState(0);
  const [textArr, setTextArr] = useState(
    Array(ARRAY_REPEAT).fill(textData).flat()
  );
  const lastIndex = textArr.length - 1;
  useEffect(() => {
    if (!!endText) {
      setTextArr((prev) => {
        prev.push(endText);
        return prev;
      });
    }
  }, [endText]);
  const getDuration = useCallback(
    (base: number, index: number) => {
      if (randomVelocity) {
        return base * (randomVelocityValue * (textData.length * 10) + 1) * 0.5;
      }
      return ((base * (index + 1)) / velocity) * 100 * 0.5;
    },
    [textData, velocity, randomVelocity, randomVelocityValue]
  );

  useEffect(() => {
    setRandomVelocityValue(Math.random());
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (infinite) {
          return prev < lastIndex - 1 ? prev + 1 : 0;
        }
        return prev < lastIndex ? prev + 1 : prev;
      });
    }, getDuration(10, currentIndex));
    return () => clearInterval(interval);
  }, [currentIndex, lastIndex, infinite]);

  const variants: Variants = {
    initial: { scaleY: 1, y: "-90%", opacity: 0.6 },
    animate: ({ isLast }) => {
      let props: VariantProps = {
        scaleY: 1,
        y: 0,
        opacity: 1,
        filter: "blur(1px)",
      };
      return props;
    },
    exit: { scaleY: 1, y: "100%", opacity: 0.6 },
  };

  return (
    <div className="w-6 h-6 xs:w-10 xs:h-10 relative">
      <div className="w-full h-full overflow-hidden flex justify-center items-center absolute">
        <AnimatePresence mode="popLayout">
          {textArr.map((text, i) => {
            const isLast = i === lastIndex;
            return (
              i === currentIndex && (
                <motion.p
                  className={cls(
                    "font-bold text-center overflow-hidden",
                    Number.isNaN(Number(text))
                      ? "text-[16px] xs:text-2xl"
                      : "text-[20px] xs:text-3xl"
                  )}
                  key={text}
                  custom={{ isLast }}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: getDuration(isLast ? 0.1 : 0.01, i),
                    ease: isLast ? "easeInOut" : "linear",
                  }}
                >
                  {text}
                </motion.p>
              )
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
export const MemoizedSlotMachine = React.memo(SlotMachine);
