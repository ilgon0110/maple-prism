"use client";

import useInput from "@/hooks/useInput";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

const NameSearchBox = () => {
  const [name, onChangeName] = useInput("");
  const queryClient = useQueryClient();
  const onClick = () => {
    queryClient.invalidateQueries();
    queryClient.cancelQueries();
  };

  return (
    <div className="bg-white py-8 lg:px-8">
      <div className="sm:col-span-3 mt-4 max-w-xl mx-auto">
        <label
          htmlFor="last-name"
          className="block text-sm font-medium leading-6 text-gray-900 text-center"
        ></label>
        <div className="mt-2">
          <div className="flex relative items-center">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              value={name}
              onChange={onChangeName}
              placeholder="캐릭터 닉네임 입력"
              className="block w-full rounded-full border-0 py-2 pl-5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#F68500] transform ease-in-out duration-200 sm:text-sm sm:leading-6"
            />
            <Link
              href={{ pathname: `/name`, query: { name: name } }}
              className="rounded-full bg-[#F68500] absolute right-2 p-2 text-white"
              onClick={onClick}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.875 2.625C4.52779 2.625 2.625 4.52779 2.625 6.875C2.625 9.22221 4.52779 11.125 6.875 11.125C8.01683 11.125 9.0535 10.6747 9.8171 9.94202C9.83518 9.91913 9.85479 9.89705 9.87592 9.87592C9.89705 9.85479 9.91913 9.83518 9.94202 9.8171C10.6747 9.0535 11.125 8.01683 11.125 6.875C11.125 4.52779 9.22221 2.625 6.875 2.625ZM11.4367 10.376C12.1819 9.40641 12.625 8.19245 12.625 6.875C12.625 3.69936 10.0506 1.125 6.875 1.125C3.69936 1.125 1.125 3.69936 1.125 6.875C1.125 10.0506 3.69936 12.625 6.875 12.625C8.19245 12.625 9.40641 12.1819 10.376 11.4367L12.5947 13.6553C12.8876 13.9482 13.3624 13.9482 13.6553 13.6553C13.9482 13.3624 13.9482 12.8876 13.6553 12.5947L11.4367 10.376Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameSearchBox;
