"use client";

import { cls } from "@/utils/cls";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Myheader = () => {
  const onClickMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};
  const [isRightBarOpen, setIsRightBarOpen] = useState<boolean>(false);

  return (
    <header className="bg-white border-b fixed top-0 w-full z-20">
      <nav
        className="mx-auto flex max-w-7xl items-center bg-white justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link className="-m-1.5 p-1.5" href="/">
            <span className="sr-only">Logo</span>
            <div className="w-8 h-8 relative">
              <Image
                src="/maplestory-icon.png"
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            onClick={() => {
              setIsRightBarOpen(true);
            }}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <div className="relative">
            <button
              onClick={(e) => onClickMenu(e)}
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 opacity-20 hover:cursor-not-allowed"
              aria-expanded="false"
              disabled
            >
              전투력 랭킹
            </button>
          </div>
          {/* <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Features
          </Link> */}
          <Link
            href="#"
            aria-disabled
            className="text-sm font-semibold leading-6 text-gray-900 opacity-20 hover:cursor-not-allowed"
          >
            게시판
          </Link>
          {/* <div className="relative">
            <button
              type="button"
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              aria-expanded="false"
            >
              Company
            </button>
          </div> */}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 opacity-20 hover:cursor-not-allowed"
            aria-disabled
          >
            로그인
          </Link>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div
          className={cls(
            "fixed inset-0 z-10 bg-black transform ease-in-out duration-300",
            isRightBarOpen ? "opacity-40" : "hidden"
          )}
        />
        <div
          className={cls(
            "fixed right-0 transform duration-300 ease-in-out inset-y-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10",
            isRightBarOpen ? "" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Logo</span>
              <div className="w-8 h-8 relative">
                <Image
                  className="h-8 w-auto"
                  src="/maplestory-icon.png"
                  alt=""
                  fill
                />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => {
                setIsRightBarOpen(false);
              }}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <div className="-mx-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:cursor-not-allowed opacity-20"
                    aria-controls="disclosure-1"
                    aria-expanded="false"
                    disabled
                  >
                    전투력 랭킹
                  </button>
                </div>
                <Link
                  href="#"
                  aria-disabled
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 opacity-20 hover:cursor-not-allowed"
                >
                  게시판
                </Link>
                {/* <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </Link>
                <div className="-mx-3">
                  <Link
                    href="#"
                    className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    aria-controls="disclosure-2"
                    aria-expanded="false"
                  >
                    Company
                  </Link>
                </div> */}
              </div>
              <div className="py-6">
                <Link
                  href="#"
                  aria-disabled
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 opacity-20 hover:cursor-not-allowed"
                >
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Myheader;
