"use client";

import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import ReviewForm from "../ReviewForm";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";
import { createReview } from "@/lib/api/place";

interface ReviewCreateClientProps {
  placeId: number;
}
export default function ReviewCreateClient({ placeId }: ReviewCreateClientProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleCreate = async (data: { title: string; content: string; isLikeClicked: boolean }) => {
    try {
      const response = await createReview(placeId, data);
      const { reviewId } = response.data;
      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      queryClient.invalidateQueries({ queryKey: ["reviewDetails", reviewId] });
      console.log('리뷰 등록 성공');
      router.push(PATHS.REVIEW_DETAIL(placeId, reviewId))

    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return <ReviewForm onSubmit={handleCreate} />;
}
