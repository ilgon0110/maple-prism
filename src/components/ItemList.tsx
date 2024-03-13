import Image from "next/image";
import Scrollbars from "react-custom-scrollbars-2";

type ItemListProps = {
  items: { name: string; url: string }[];
  myHats: { name: string; url: string } | undefined;
};

const ItemList = ({ items, myHats }: ItemListProps) => {
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="flex flex-row py-2 gap-2 px-2 w-full h-12 box-border bg-blue-100 ring-2 ring-blue-300 bg-opacity-80 rounded mb-4">
          <div className="w-8 h-8 relative">
            <Image
              src={myHats?.url || items[0].url}
              alt="이미지"
              fill
              style={{ objectFit: "contain" }}
              sizes="100%"
            />
          </div>
          <span className="text-xs text-gray-500">{myHats?.name}</span>
        </div>
      </div>
      <Scrollbars autoHide autoHeight autoHeightMin={"30vh"}>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
          {items.map((item) => {
            return (
              <div
                className="flex flex-row py-2 gap-2 px-2 w-auto h-12 box-border hover:bg-slate-300 group bg-slate-200 rounded"
                key={item.name}
              >
                <div className="w-8 h-8 relative">
                  <Image
                    src={item.url}
                    alt="이미지"
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="100%"
                  />
                </div>
                <span className="text-xs sm:text-[10px] text-gray-500">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </Scrollbars>
    </>
  );
};

export default ItemList;
