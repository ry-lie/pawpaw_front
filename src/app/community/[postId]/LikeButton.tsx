"use client";

import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { toggleLike } from "@/lib/api/board";
import { useQueryClient } from "@tanstack/react-query";

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
}

export default function LikeButton({ postId, isLiked }: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const queryClient = useQueryClient();

  const handleClick = async () => {
    try {
      const newLikeState = !liked;
      setLiked(newLikeState);
      await toggleLike(postId, liked);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    } catch (error) {
      console.error("좋아요 실패:", error);
      setLiked(liked);
    }
  };

  return (
    <button onClick={handleClick} className="focus:outline-none">
      {liked ? (
        <GoHeartFill className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
      ) : (
        <GoHeart className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
      )}
    </button>
  );
}
