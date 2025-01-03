"use client"
import Loading from "@/app/loading";
import { fetchReviewDetails } from "@/lib/api/place";
import { useUserStore } from "@/stores/userStore";
import { useQuery } from "@tanstack/react-query";
import ReviewModifyClient from "./ReviewModifyClient";

export default function ReviewModifyPage({ params }: { params: { placeId: number; reviewId: number } }) {
  const { placeId, reviewId } = params;
  const userStore = useUserStore();
  const userId = userStore.id;
  const { data: reviewDetails, isLoading, error } = useQuery({
    queryKey: ["reviewDetails", placeId, reviewId],
    queryFn: () => fetchReviewDetails(placeId, reviewId),
    enabled: !!placeId && !!reviewId, // placeId와 reviewId가 존재할 때만 요청
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-screen">리뷰 데이터를 가져오는 데 실패했습니다.</div>;
  }

  return (
    <div className="mt-14 px-4">
      <h1 className="text-lg font-semibold">리뷰 수정하기</h1>
      <ReviewModifyClient
        initialData={reviewDetails}
        reviewId={reviewId}
        placeId={placeId}
        userId={userId}
      />
    </div>
  );
}
