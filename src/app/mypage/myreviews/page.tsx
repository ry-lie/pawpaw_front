"use client";

import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import useMediaQuery from "@/hooks/useMediaQuery";
import { RiThumbUpFill } from "react-icons/ri";
import { getMyReviews } from "@/lib/api/user";
import { useUserStore } from "@/stores/userStore";

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
      const response = await getMyReviews(id, cursor, take);
      const fetchedReviews = response.body.data.reviews;

      if (fetchedReviews.length < take) { setHasMore(false); }
      if (isLoadMore) {
        setReviews((prev) => [...prev, ...fetchedReviews]);
      } else {
        setReviews(fetchedReviews);
      }
      if (fetchedReviews.length > 0) {
        setCursor(fetchedReviews[fetchedReviews.length - 1].id);
      }
    } catch (error) {
      setError("리뷰를 불러오는 중 문제가 발생했습니다.");
      console.error("내가 쓴 리뷰 데이터를 가져오는 중 오류 발생:", error);
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
        {reviews.map((reviews) => (
          <div key={reviews.reviewId} className="p-2 xs:p-3 border rounded-md bg-white">

            {/* 장소이름, 제목, 내용, 좋아요 */}
            <div className="flex">
              {/* 장소이름, 제목, 내용 */}
              <div className="w-full flex flex-col justify-center">
                <span
                  className="text-xs xs:text-sm bg-gray-200 px-1.5 py-0.5 rounded-md mb-1"
                  style={{ width: "fit-content" }}
                >
                  {reviews.placeName}
                </span>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{reviews.title.length > titleMaxLength ? `${reviews.title.slice(0, titleMaxLength)}...` : reviews.title}</h3>
                </div>

                <div className="flex justify-between items-center">
                  <p>{reviews.content.length > contentMaxLength ? `${reviews.content.slice(0, contentMaxLength)}...` : reviews.content}</p>
                </div>
              </div>

              {/* 좋아요 */}
              <div className="w-1/5 flex flex-col items-end justify-end">
                {reviews.isLikeClicked && (
                  <RiThumbUpFill className="w-5 h-5 text-primary" />
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Footer 카테고리 독바 */}
      <Footer />
    </div>
  );
}