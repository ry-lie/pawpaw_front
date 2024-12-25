
import { GoHeart, GoHeartFill } from "react-icons/go";
import { ReviewProps } from "../PlaceDetail";

export default function Review({ review }: { review: ReviewProps }) {
  return (
    <div className="flex items-center gap-4 p-2 border-b">
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200" />
      <div className="flex-grow">
        <h3 className="font-semibold text-sm">{review.writer}</h3>

        <p className="text-sm text-gray-600">{review.content}</p>
        <p className="text-xs text-gray-500">{review.date}</p>

      </div>
      <div className="flex-shrink-0">
        {review.isRecommanded ? (
          <GoHeartFill className="w-6 h-6 text-[#F9595F]" />
        ) : (
          <GoHeart className="w-6 h-6 text-gray-400" />
        )}
      </div>
    </div>
  );
}
