import AddOption from "./ItemMakers/AddOption";
import PotentialOption from "./ItemMakers/PotentialOption";
import ScrollOption from "./ItemMakers/Scrolls/ScrollOption";
import StarforceOption from "./ItemMakers/StarforceOption";

type ItemMakerCategoryProps = {
  category: string;
  itemLevel: number | undefined;
};

const ItemMakerCategory = ({ category, itemLevel }: ItemMakerCategoryProps) => {
  if (category === "추가옵션") {
    return <AddOption itemLevel={itemLevel} />;
  }
  if (category === "주문서") {
    return <ScrollOption itemLevel={itemLevel} />;
  }
  if (category === "스타포스") {
    return <StarforceOption itemLevel={itemLevel} />;
  }
  if (category === "잠재옵션") {
    return <PotentialOption itemLevel={itemLevel} />;
  }
  return <div></div>;
};

export default ItemMakerCategory;
