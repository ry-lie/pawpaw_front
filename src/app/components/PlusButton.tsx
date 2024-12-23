"use client";

import React from "react";
import Image from "next/image"; // Image 컴포넌트 추가
import PlusIcon from "@/app/assets/icons/plus_icon.png";

interface PlusButtonProps {
  onClick: () => void; // 클릭 이벤트를 props로 받음
}

export default function PlusButton({ onClick }: PlusButtonProps) {
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