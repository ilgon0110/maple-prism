import { ICharacterSymbol } from "@/types/characters/CharacterSymbol";

export const getExceptSymbolStat = (
  characterSymbol: ICharacterSymbol,
  targetStat: string
) => {
  return characterSymbol.symbol.reduce((acc, cur) => {
    return (
      acc +
      Number(cur[`symbol_${targetStat.toLowerCase()}` as keyof typeof cur])
    );
  }, 0);
};
