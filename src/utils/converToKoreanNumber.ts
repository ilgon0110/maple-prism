export function convertToKoreanNumber(number: number) {
  const koreanUnits = [
    "",
    "만",
    "억",
    "조",
    "경",
    "해",
    "자",
    "양",
    "구",
    "간",
    "정",
    "재",
  ];

  if (number === 0) {
    return "영";
  }
  const numberArr = String(number).split("").reverse();

  for (let i = 0; i < numberArr.length; i++) {
    if (i % 4 === 0) {
      numberArr[i] += koreanUnits[i / 4];
    }
  }
  return numberArr.reverse().join("");
}
