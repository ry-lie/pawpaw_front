"use client";

import React from "react";
import Image from "next/image";
import PlusIcon from "@/assets/icons/plus_icon.png";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { errorToast } from "@/utils/toast";

interface PlusButtonProps {
  href: string; // 이동할 경로
}

export default function PlusButton({ href }: PlusButtonProps) {
  const userId = useUserStore((state) => state.id); // 사용자 ID 가져오기
  const router = useRouter();

  const handleClick = () => {
    if (!userId) {
      // 사용자 ID가 없으면 에러 메시지 표시
      errorToast("로그인이 필요합니다.");
      return;
    }

    // 사용자 ID가 있으면 페이지 이동
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-14 xs:right-[430px] right-3 p-4"
      aria-label="Add Button"
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
