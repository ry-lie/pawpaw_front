"use client";

import { PATHS } from "@/constants/path";
import { updateReview } from "@/lib/api/place";
import { useUserStore } from "@/stores/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ReviewForm from "../../ReviewForm";

interface ReviewModifyClientProps {
  initialData: { title: string; content: string; isLikeClicked: boolean };
  reviewId: number;
  placeId: number;
  userId: number;
}

export default function ReviewModifyClient({ initialData, reviewId, placeId, userId }: ReviewModifyClientProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleUpdate = async (data: { title: string; content: string; isLikeClicked: boolean }) => {
    try {
      await updateReview(placeId, reviewId, userId, data);
      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      //queryClient.invalidateQueries({ queryKey: ["reviews", reviewId] }); //만약 리뷰 상세가 업데이트되지 않는다면 주석해제
      router.push(PATHS.REVIEW_DETAIL(placeId, reviewId))
    } catch (error) {
      console.error("리뷰 수정 실패:", error);
    }
  };

  return <ReviewForm initialValues={initialData} onSubmit={handleUpdate} />;
}
