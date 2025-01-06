"use client";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { toggleLike } from "@/lib/api/board";
import { errorToast } from "@/utils/toast";
import { useState } from "react";

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
  onLikeToggle: (isLiked: boolean) => void;
}

export default function LikeButton({ postId, isLiked, onLikeToggle }: LikeButtonProps) {
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return; // 중복 클릭 방지
    setLoading(true);

    // 낙관적 업데이트
    setOptimisticLiked(!optimisticLiked);
    onLikeToggle(!optimisticLiked);

    try {
      await toggleLike(postId, !optimisticLiked);
    } catch (error) {
      // 요청 실패 시 롤백
      setOptimisticLiked(isLiked);
      onLikeToggle(isLiked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} className="focus:outline-none" disabled={loading}>
      {optimisticLiked ? (
        <GoHeartFill className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
      ) : (
        <GoHeart className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
      )}
    </button>
  );
}
