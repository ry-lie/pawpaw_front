"use client";

import { RiDeleteBinLine } from "react-icons/ri";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

interface ReviewDeleteButtonProps {
  reviewId: string;
}

export default function ReviewDeleteButton({ reviewId }: ReviewDeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("리뷰를 삭제하시겠습니까?")) {
      try {
        await axiosInstance.delete(`/api/reviews/${reviewId}`);
        alert("리뷰가 성공적으로 삭제되었습니다.");
        router.push("/map"); // 클라이언트에서 페이지 이동
      } catch (error) {
        console.error("리뷰 삭제 실패:", error);
        alert("삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <button onClick={handleDelete} aria-label="리뷰 삭제">
      <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
    </button>
  );
}
