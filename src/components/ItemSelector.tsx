import { getItemJson } from "@/utils/getItemJson";
import ItemList from "./ItemList";
import SelectBar from "./SelectBar";
import hats from "@/jsons/item-hat.json";

const ItemSelector = () => {
  const hatList = getItemJson(hats);
  const myHats = getItemJson(hats).find(
    (item) => item.name === "하이네스 원더러햇"
  );
  return (
    <div>
      <SelectBar />
      <ItemList items={hatList} myHats={myHats} />
    </div>
  );
};

export default ItemSelector;
