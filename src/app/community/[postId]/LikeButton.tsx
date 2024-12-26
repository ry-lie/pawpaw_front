"use client";

import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import axiosInstance from "@/lib/axios";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
}

export default function LikeButton({ postId, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);

  const handleClick = async () => {
    try {
      const newLikeState = !liked;
      setLiked(newLikeState);

      await axiosInstance.post("/api/like", {
        postId,
        isLiked: newLikeState,
      });
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
