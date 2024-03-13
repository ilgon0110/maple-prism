import { UNION_INFO } from "@/constants/unions";
import { ICharacterUnionRaider } from "@/types/characters/CharacterUnionRaider";

const getUnionStepByLevel = (level: number) => {
  if (level < 100) {
    return "B";
  } else if (level < 140) {
    return "A";
  } else if (level < 200) {
    return "S";
  } else if (level < 250) {
    return "SS";
  } else return "SSS";
};

export const checkSameClassInUnion = (
  characterUnionRaider: ICharacterUnionRaider
) => {
  const results: (string | undefined)[] = [];
  const jobs: string[] = [];
  characterUnionRaider.union_block.forEach((block) => {
    if (jobs.includes(block.block_class)) {
      const blockStep = getUnionStepByLevel(+block.block_level);
      const blockEffect = UNION_INFO.find(
        (info) => info.job === block.block_class
      )?.values.find((value) => value.step === blockStep)?.value;
      results.push(blockEffect);
    } else {
      jobs.push(block.block_class);
    }
  });
  return results;
};
