"use client";

import { RiDeleteBinLine } from "react-icons/ri";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
  id: string; // 삭제 대상 ID
  resourceType: "reviews" | "posts" | "comments"; // 삭제할 리소스 타입
  onSuccessRedirect?: string; // 성공 시 리디렉션할 경로 (옵션)
  onError?: (error: any) => void; // 에러 처리 콜백 (옵션)
}

export default function DeleteButton({ id, resourceType, onSuccessRedirect = "/", onError }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm(`${resourceType === "reviews" ? "리뷰" : "게시글"}을 삭제하시겠습니까?`)) {
      try {
        await axiosInstance.delete(`/api/${resourceType}/${id}`);
        alert(`${resourceType === "reviews" ? "리뷰" : "게시글"}이 성공적으로 삭제되었습니다.`);
        if (onSuccessRedirect) {
          router.push(onSuccessRedirect);
        }
      } catch (error) {
        console.error(`${resourceType === "reviews" ? "리뷰" : "게시글"} 삭제 실패:`, error);
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
        if (onError) onError(error);
      }
    }
  };

  return (
    <button onClick={handleDelete} aria-label="삭제">
      <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
    </button>
  );
}
