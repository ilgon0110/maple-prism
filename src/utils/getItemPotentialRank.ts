export const getItemPotentialRank = (
  potential: string | null | undefined,
  addPotential: string | null | undefined
) => {
  if (potential === null) {
    switch (addPotential) {
      case "레어":
        return 1;
      case "에픽":
        return 2;
      case "유니크":
        return 3;
      case "레전드리":
        return 4;
      default:
        return 0;
    }
  }
  if (potential === "레어") {
    switch (addPotential) {
      case "에픽":
        return 2;
      case "유니크":
        return 3;
      case "레전드리":
        return 4;
      default:
        return 1;
    }
  }
  if (potential === "에픽") {
    switch (addPotential) {
      case "유니크":
        return 3;
      case "레전드리":
        return 4;
      default:
        return 2;
    }
  }
  if (potential === "유니크") {
    switch (addPotential) {
      case "레전드리":
        return 4;
      default:
        return 3;
    }
  }
  if (potential === "레전드리") {
    return 4;
  }
  return 0;
};
