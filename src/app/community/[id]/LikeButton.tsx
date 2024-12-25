"use client";

import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toggleLike } from "@/lib/api/post";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
}

export default function LikeButton({ postId, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = async () => {
    try {
      const newLikeState = !liked; // 새로운 상태 계산
      setLiked(newLikeState); // 상태 업데이트
      await toggleLike(postId, newLikeState); // 서버 요청
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setLiked(liked); // 실패 시 상태 복구
    }
  };

  return (
    <button onClick={handleClick} className="focus:outline-none">
      {liked ? (
        <GoHeartFill className="w-10 h-10 text-[#F9595F]" />
      ) : (
        <GoHeart className="w-10 h-10 text-[#F9595F]" />
      )}
    </button>
  );
}
