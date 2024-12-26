"use client";

import axiosInstance from "@/lib/axios";
import ReviewForm from "../ReviewForm";

export default function ReviewCreateClient() {
  const handleCreate = async (data: { title: string; description: string; isRecommended: boolean }) => {
    try {
      await axiosInstance.post("/api/reviews", data);
      alert("리뷰가 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };

  return <ReviewForm onSubmit={handleCreate} />;
}
