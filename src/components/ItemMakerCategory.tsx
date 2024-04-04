import Image from "next/image";
import AddOption from "./ItemMakers/AddOption";
import PotentialOption from "./ItemMakers/PotentialOption";
import ScrollOption from "./ItemMakers/Scrolls/ScrollOption";
import StarforceOption from "./ItemMakers/StarforceOption";

type ItemMakerCategoryProps = {
  category: string;
  itemLevel: number | undefined;
};

const ItemMakerCategory = ({ category, itemLevel }: ItemMakerCategoryProps) => {
  if (category === "---") {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col gap-4 pt-6">
        <Image
          src="/신난라라티콘.jpeg"
          width={120}
          height={120}
          alt="아이템 제작하기"
        />
        <div className="text-sm">아이템 제작하기</div>
      </div>
    );
  }
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
