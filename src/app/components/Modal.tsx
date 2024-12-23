"use client"
import { useEffect } from "react";
import { useModalStore } from "@/app/stores/modalStore";
import ExitButton from "@/app/assets/icons/exit.png";
import Image from "next/image";

export default function Modal() {
  const { isOpen, modalContent, closeModal } = useModalStore();

  // 모달 열릴 때 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // 스크롤 비활성화
    } else {
      document.body.style.overflow = ""; // 스크롤 복원
    }

    return () => {
      document.body.style.overflow = ""; // 컴포넌트 언마운트 시 스크롤 복원
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-96 relative">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <Image src={ExitButton} alt="닫기" width={20} height={20} />
        </button>
        {modalContent}
      </div>
    </div>
  );
}
