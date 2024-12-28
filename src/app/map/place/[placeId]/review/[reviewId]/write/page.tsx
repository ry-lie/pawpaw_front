"use client"
import Loading from "@/app/loading";
import { fetchReviewDetails } from "@/lib/api/place";
import { useQuery } from "@tanstack/react-query";
import ReviewModifyClient from "./ReviewModifyClient";

export default function ReviewModifyPage({ params }: { params: { placeId: string; reviewId: string } }) {
  const { placeId, reviewId } = params;
  // const { data: reviewData, isLoading, error } = useQuery({
  //   queryKey: ["reviewDetails", placeId, reviewId],
  //   queryFn: () => fetchReviewDetails(placeId, reviewId),
  //   enabled: !!placeId && !!reviewId, // placeId와 reviewId가 존재할 때만 요청
  // });

  // if (isLoading) {
  //   return <div><Loading /></div>;
  // }

  // if (error) {
  //   return <div>리뷰 데이터를 가져오는 데 실패했습니다.</div>;
  // }


  const initialData = {
    title: "기존 제목",
    content: "기존 내용",
    isLikeCliked: true,
  };

  return (
    <div className="mt-14 px-4">
      <h1 className="text-lg font-semibold">리뷰 수정하기</h1>
      <ReviewModifyClient
        initialData={initialData}
        reviewId={reviewId}
        placeId={placeId}
      />
    </div>
  );
}
