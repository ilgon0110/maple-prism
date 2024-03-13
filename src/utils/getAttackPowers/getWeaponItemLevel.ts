export const getWeaponItemLevel = (itemName: string | undefined) => {
  const prefix150 = "파프니르 ";
  const prefix160 = "앱솔랩스 ";
  const prefix200 = "아케인셰이드 ";
  const prefixGenesis = "제네시스 ";
  switch (true) {
    case itemName?.startsWith(prefix150):
      return 150;
    case itemName?.startsWith(prefix160):
      return 160;
    case itemName?.startsWith(prefix200):
      return 200;
    case itemName?.startsWith(prefixGenesis):
      return 200;
    default:
      return null;
  }
};
