import { cls } from "@/utils/cls";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";

type MySelectProps = {
  option: string[];
  onClickLeftList?: (inputString: string) => void;
  selectedOption: string;
  onChangeSelectRightOption?: (inputString: string) => void;
  onChangeSelectOption?: (inputString: string) => void;
  showUp?: boolean;
};

const MySelect = ({
  option,
  onClickLeftList,
  selectedOption,
  onChangeSelectRightOption,
  onChangeSelectOption,
  showUp,
}: MySelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null);
  const [selectOpen, setSelectOpen] = useState(false);
  const isLeftSelectBar = !!onClickLeftList;
  const isRightSelectBar = !!onChangeSelectRightOption;
  const isJustSelectBar = !!onChangeSelectOption;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onClick = (inputString: string) => {
    setSelectOpen(false);
    if (isLeftSelectBar) {
      onClickLeftList(inputString);
    }
    if (isRightSelectBar) {
      onChangeSelectRightOption(inputString);
    }
    if (isJustSelectBar) {
      onChangeSelectOption(inputString);
    }
  };
  return (
    <div ref={selectRef}>
      <div className="relative">
        <button
          type="button"
          className="relative w-full min-w-28 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm sm:text-base sm:leading-6"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setSelectOpen(!selectOpen)}
        >
          <span className="block truncate">{selectedOption}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        <ul
          className={cls(
            "absolute z-10 mt-1 h-fit w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs md:text-base",
            selectOpen ? "block" : "hidden",
            showUp ? "-mt-24" : ""
          )}
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {option.map((name) => {
            return (
              <li
                key={uuid()}
                className="text-gray-900 relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                id="listbox-option-0"
                aria-selected="false"
                role="option"
                onClick={() => onClick(name)}
              >
                <span className="font-normal block truncate">{name}</span>
                {selectedOption === name ? (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MySelect;
