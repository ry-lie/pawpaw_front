"use client";

import { updateReview } from "@/lib/api/place";
import { useQueryClient } from "@tanstack/react-query";
import ReviewForm from "../../ReviewForm";

interface ReviewModifyClientProps {
  initialData: { title: string; content: string; isLikeCliked: boolean };
  reviewId: string;
  placeId: string;
}

export default function ReviewModifyClient({ initialData, reviewId, placeId }: ReviewModifyClientProps) {
  const queryClient = useQueryClient();
  const handleUpdate = async (data: { title: string; content: string; isLikeCliked: boolean }) => {
    try {
      await updateReview(placeId, reviewId, data);
      alert("리뷰가 성공적으로 수정되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      //queryClient.invalidateQueries({ queryKey: ["reviews", reviewId] }); //만약 리뷰 상세가 업데이트되지 않는다면 주석해제
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
      alert("리뷰 수정에 실패했습니다.");
    }
  };

  return <ReviewForm initialValues={initialData} onSubmit={handleUpdate} />;
}
