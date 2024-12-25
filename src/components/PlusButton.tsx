"use client";

import React from "react";
import Image from "next/image"; // Image 컴포넌트 추가
import PlusIcon from "@/assets/icons/plus_icon.png";
import Link from "next/link";

interface PlusButtonProps {
  onClick?: () => void; // 클릭 이벤트를 props로 받음
  href?: string; // 이동할 경로
}

export default function PlusButton({ onClick, href }: PlusButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <button
          className="fixed bottom-14 right-[430px] p-4"
        >
          <div className="shadow-md rounded-full">
            <Image
              src={PlusIcon}
              alt="Plus Icon"
              width={50} // 명시적으로 크기 설정
              height={50}
              className="cursor-pointer"
          />
        </div>
        </button>
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className="absolute bottom-14 right-[430px] p-4"
      aria-label="Add Button" // 접근성을 위해 추가
    >
      <div className="shadow-md rounded-full">
        <Image
          src={PlusIcon}
          alt="Plus Icon"
          width={50} // 명시적으로 크기 설정
          height={50}
          className="cursor-pointer"
        />
      </div>
    </button>
  );
}