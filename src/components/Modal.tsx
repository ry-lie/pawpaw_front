"use client"
import { useEffect } from "react";
import { useModalStore } from "@/stores/modalStore";
import ExitButton from "@/assets/icons/exit.png";
import Image from "next/image";

export default function Modal() {
  const { isOpen, modalContent, closeModal } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 shadow-lg w-[345px] xs:w-[400px] relative">
        <button onClick={closeModal} className="absolute top-2 right-2">
          <Image src={ExitButton} alt="닫기" width={20} height={20} />
        </button>
        {modalContent}
      </div>
    </div>
  );
}
