"use client";

import { QueryKey, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import ReviewForm from "../ReviewForm";

interface ReviewCreateClientProps {
  placeId: string;
}

export default function ReviewCreateClient({ placeId }: ReviewCreateClientProps) {
  const queryClient = useQueryClient();

  const handleCreate = async (data: { title: string; content: string; isLikeCliked: boolean }) => {
    try {
      await axiosInstance.post(`/api/places/${placeId}/reviews`, data);
      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      console.log('리뷰 등록 성공')
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  return <ReviewForm onSubmit={handleCreate} />;
}
