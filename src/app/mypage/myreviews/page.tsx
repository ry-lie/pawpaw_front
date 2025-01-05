"use client";

import React, { useState } from "react";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png"
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

  // 임시 게시글들
  const reviews = [
    {
      reviewId: 1,
      placeId: 2,
      placeName: "두나의 하루",
      title: "여기 좋아요",
      content: "선생님 완전 친절쓰",
      "isLikeClicked": true,
    },
    {
      reviewId: 2,
      placeId: 2,
      placeName: "두나의 하루",
      title: "여기 가지 마시오",
      content: "선생님 완전 불친절해요,,,,, 비추추추추추추추ㅜㅊ",
      "isLikeClicked": false,
    },
  ];

  // 글자수 제한
  const isMobile = useMediaQuery("(max-width: 425px)");
  const titleMaxLength = isMobile ? 12 : 20;
  const contentMaxLength = isMobile ? 12 : 29;

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