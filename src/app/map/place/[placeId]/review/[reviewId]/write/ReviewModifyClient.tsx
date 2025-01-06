"use client";

import { PATHS } from "@/constants/path";
import { updateReview } from "@/lib/api/place";
import { errorToast, successToast } from "@/utils/toast";
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
      successToast("리뷰 수정 성공했습니다.")
    } catch (error) {
      errorToast("리뷰 수정 실패했습니다.")
    }
  };

  return <ReviewForm initialValues={initialData} onSubmit={handleUpdate} />;
}
