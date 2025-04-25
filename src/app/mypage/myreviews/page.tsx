"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { RiThumbUpFill } from "react-icons/ri";
import { getMyReviews } from "@/lib/api/user";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { PATHS } from "@/constants/path";

export type MyReviews = {
  reviewId: number;
  placeId: number;
  placeName: string;
  title: string;
  content: string;
  isLikeClicked: boolean;
}

export default function MyReviewsPage() {
  // 로그인
  const { initialize, id, isLoggedIn } = useUserStore();
  useEffect(() => {
    initialize(); // 사용자 정보 불러오기
  }, []);

  const [reviews, setReviews] = useState<MyReviews[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const take = 7;

  const fetchReviews = async (isLoadMore = false) => {
    if (isLoading || !isLoggedIn || !id) return;
    setIsLoading(true);
    setError(null);
    try {
      const currentCursor = isLoadMore ? cursor : null;

      const response = await getMyReviews(currentCursor, take);
      const fetchedPosts = response.body.data.reviews;
    
      if (fetchedPosts.length < take) {
        setHasMore(false);
      }
  
      if (isLoadMore) {
        setReviews((prev) => [...prev, ...fetchedPosts]);
      } else {
        setReviews(fetchedPosts);
      }
  
      if (fetchedPosts.length > 0) {
        setCursor(fetchedPosts[fetchedPosts.length - 1].reviewId); // 더보기 클릭 시 커서 업데이트
      } else {
        setCursor(null); // 더 이상 게시물이 없을 경우 커서를 null로 설정
      }
    } catch (error) {
      setError("리뷰를 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 ID가 변경될 때 상태 초기화
  useEffect(() => {
    console.log("useEffect triggered:", { isLoggedIn, id });
    if (isLoggedIn && id) {
      setReviews([]);
      setCursor(null);
      setHasMore(true);
      fetchReviews();
    }
  }, [isLoggedIn, id]);

  // 글자수 제한
  const isMobile = useMediaQuery("(max-width: 425px)");
  const titleMaxLength = isMobile ? 12 : 20;
  const contentMaxLength = isMobile ? 18 : 29;

  return (
    <div className="mt-10 p-4 xs:p-6">
      <h2 className="font-bold text-xl xs:text-2xl ml-2 mb-2">내가 작성한 리뷰</h2>
      {/* 게시글 컨테이너 */}
      <div className="space-y-2">
        {reviews.length === 0 && !isLoading && !error && (
            <p className="text-center mt-6 text-gray-500">작성한 리뷰가 없습니다.</p>
        )}
        {reviews.map((review) => (
          <Link
            href={PATHS.REVIEW_DETAIL(review.placeId, review.reviewId)}
            key={review.reviewId}
          >
            <div key={review.reviewId} className="p-2 xs:p-3 mb-2 border rounded-md bg-white">
              {/* 장소이름, 제목, 내용, 좋아요 */}
              <div className="flex">
                {/* 장소이름, 제목, 내용 */}
                <div className="w-full flex flex-col justify-center">
                  <span
                    className="text-xs xs:text-sm bg-gray-200 px-1.5 py-0.5 rounded-md mb-1"
                    style={{ width: "fit-content" }}
                  >
                    {review.placeName}
                  </span>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold">{review.title.length > titleMaxLength ? `${review.title.slice(0, titleMaxLength)}...` : review.title}</h3>
                  </div>

                  <div className="flex justify-between items-center">
                    <p>{review.content.length > contentMaxLength ? `${review.content.slice(0, contentMaxLength)}...` : review.content}</p>
                  </div>
                </div>

                {/* 좋아요 */}
                <div className="w-1/5 flex flex-col items-end justify-end">
                  {review.isLikeClicked && (
                    <RiThumbUpFill className="w-5 h-5 text-primary" />
                  )}
                </div>
              </div>

            </div>
          </Link>
        ))}

        {/* 로딩 메시지 */}
        {isLoading && <p className="text-center mt-4">Loading...</p>}

        {/* 더보기 버튼 */}
        {hasMore && (
          <button
            onClick={() => fetchReviews(true)}
            disabled={isLoading}
            className="w-full mt-4 py-2 font-medium bg-primary hover:bg-hover text-white rounded-md"
            >
            {isLoading ? "불러오는 중..." : "더 보기"}
          </button>
        )}

        {!hasMore && reviews.length > 0 && (
          <p className="text-center mt-6 text-gray-500">모든 리뷰를 확인했습니다.</p>
        )}

        {reviews.length === 0 && !isLoading && (
          <p className="text-center mt-6 text-gray-500">작성한 리뷰가 없습니다.</p>
        )}
      </div>

      {/* Footer 카테고리 독바 */}
      <div className="mt-12">
      <Footer />
      </div>
    </div>
  );
}