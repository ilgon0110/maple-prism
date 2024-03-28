"use client";

import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log("error", error.message);
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col px-6">
      <Image
        src="/우는라라티콘.jpeg"
        width={100}
        height={100}
        alt="캐릭터정보를찾을수없습니다"
      />
      <h2 className="mt-1">{error.message}</h2>
      <div className="flex flex-row gap-2 mt-3">
        <button
          onClick={() => reset()}
          className="border border-slate-100 rounded px-4 py-1.5 text-sm flex justify-center items-center hover:bg-orange-500 hover:border-none hover:text-white transform ease-in-out duration-200"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="border border-slate-100 rounded px-4 py-1.5 text-sm flex justify-center items-center hover:bg-orange-500 hover:border-none hover:text-white transform ease-in-out duration-200"
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
