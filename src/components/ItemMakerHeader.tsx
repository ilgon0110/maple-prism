import useItemMakerInfoStore from "@/models/itemMakerInfo";
import { cls } from "@/utils/cls";
import { motion } from "framer-motion";

type ItemMakerHeaderProps = {
  category: string;
  onClickCategory: (e: React.MouseEvent<HTMLLIElement>) => void;
};

const ItemMakerHeader = ({
  category,
  onClickCategory,
}: ItemMakerHeaderProps) => {
  const { itemData } = useItemMakerInfoStore();
  const isNotReinforceItem =
    itemData?.scroll_upgradeable_count === "0" &&
    itemData.scroll_upgrade === "0" &&
    itemData.starforce === "0";
  const isCanStarForce = itemData?.scroll_upgradeable_count === "0";
  const isNotAddOptionItem =
    itemData?.item_equipment_part === "엠블렘" ||
    itemData?.item_equipment_part === "반지" ||
    itemData?.item_equipment_part === "뱃지" ||
    itemData?.item_equipment_part === "보조무기" ||
    itemData?.item_equipment_part === "기계 심장";
  return (
    <ul className="w-full space-x-5 text-sm text-gray-300 flex justify-center items-center mt-5 lg:block">
      <li
        className={cls(
          "float-left",
          category === "추가옵션" ? "text-indigo-600" : "",
          isNotAddOptionItem
            ? "text-black opacity-10 hover:cursor-not-allowed"
            : "hover:cursor-pointer"
        )}
        onClick={(e) => (isNotAddOptionItem ? () => {} : onClickCategory(e))}
      >
        추가옵션
        {category === "추가옵션" && (
          <motion.div
            className="w-full h-[1px] rounded bg-indigo-600"
            layoutId="underline"
          />
        )}
      </li>
      <li
        className={cls(
          "float-left",
          category === "주문서" ? "text-indigo-600" : "",
          isNotReinforceItem
            ? "text-black opacity-10 hover:cursor-not-allowed"
            : "hover:cursor-pointer"
        )}
        onClick={(e) => (isNotReinforceItem ? () => {} : onClickCategory(e))}
      >
        주문서
        {category === "주문서" && (
          <motion.div
            className="w-full h-[1px] rounded bg-indigo-600"
            layoutId="underline"
          />
        )}
      </li>
      <li
        className={cls(
          "float-left",
          category === "스타포스" ? "text-indigo-600" : "",
          isCanStarForce && !isNotReinforceItem
            ? "hover:cursor-pointer"
            : "text-black opacity-10 hover:cursor-not-allowed"
        )}
        onClick={(e) =>
          isCanStarForce && !isNotReinforceItem ? onClickCategory(e) : () => {}
        }
      >
        스타포스
        {category === "스타포스" && (
          <motion.div
            className="w-full h-[1px] rounded bg-indigo-600"
            layoutId="underline"
          />
        )}
      </li>
      <li
        className={cls(
          "float-left hover:cursor-pointer",
          category === "잠재옵션" ? "text-indigo-600" : ""
        )}
        onClick={(e) => onClickCategory(e)}
      >
        잠재옵션
        {category === "잠재옵션" && (
          <motion.div
            className="w-full h-[1px] rounded bg-indigo-600"
            layoutId="underline"
          />
        )}
      </li>
    </ul>
  );
};

export default ItemMakerHeader;
