"use client";

import axiosInstance from "@/lib/axios";
import ReviewForm from "../../ReviewForm";

interface ReviewModifyClientProps {
  initialData: { title: string; description: string; isRecommended: boolean };
  reviewId: string;
}

export default function ReviewModifyClient({ initialData, reviewId }: ReviewModifyClientProps) {
  const handleUpdate = async (data: { title: string; description: string; isRecommended: boolean }) => {
    try {
      await axiosInstance.put(`/api/reviews/${reviewId}`, data);
      alert("리뷰가 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  return <ReviewForm initialValues={initialData} onSubmit={handleUpdate} />;
}
