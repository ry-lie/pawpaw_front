"use client";

import { useQueryClient } from "@tanstack/react-query";
import ReviewForm from "../ReviewForm";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";
import { createReview } from "@/lib/api/place";
import { errorToast, successToast } from "@/utils/toast";

interface ReviewCreateClientProps {
  placeId: number;
}
export default function ReviewCreateClient({ placeId }: ReviewCreateClientProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleCreate = async (data: { title: string; content: string; isLikeClicked: boolean }) => {
    try {
      const response = await createReview(placeId, data);
      const reviewId = response.data.body.data.reviewId;

      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      queryClient.invalidateQueries({ queryKey: ["reviewDetails", reviewId] });
      router.push(PATHS.REVIEW_DETAIL(placeId, reviewId))
      successToast("리뷰 등록을 성공했습니다.")
    } catch {
      errorToast("리뷰 등록에 실패했습니다.")
    }
  };

  return <ReviewForm onSubmit={handleCreate} />;
}
