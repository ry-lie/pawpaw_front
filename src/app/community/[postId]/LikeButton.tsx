"use client";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { useState } from "react";

export default function LikeButton({
  isLiked,
  onLikeToggle,
  disabled,
}: {
  postId: number;
  isLiked: boolean;
  onLikeToggle: (newIsLiked: boolean) => Promise<void>;
  disabled?: boolean; // 버튼 비활성화 옵션
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      {/* 버튼 컨테이너 */}
      <div
        className="relative"
        onMouseEnter={() => {
          if (disabled) setShowTooltip(true);
        }}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <button
          onClick={() => {
            if (!disabled) {
              onLikeToggle(!isLiked);
            }
          }}
          className={`focus:outline-none ${disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {isLiked ? (
            <GoHeartFill className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
          ) : (
            <GoHeart className="w-8 h-8 xs:w-10 xs:h-10 text-[#F9595F]" />
          )}
        </button>
      </div>

      {/* 툴팁 */}
      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-primary text-white text-xs rounded-md px-2 py-1 shadow-md z-[100]"
          style={{ whiteSpace: "nowrap" }}
          role="tooltip"
        >
          로그인을 먼저 하세요
        </div>
      )}
    </div>
  );
}

