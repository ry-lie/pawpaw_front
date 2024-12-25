
import { ReviewProps } from "@/app/map/PlaceDetail";
import { RiThumbUpFill } from "react-icons/ri";


export default function Review({ review }: { review: ReviewProps }) {
  return (
    <div className="flex gap-2 p-2 border border-stroke_gray rounded-md">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200" />
        {/* 작성자*/}
        <h3 className="font-semibold text-xs text-center break-words w-[56px]">
          {review.writer}
        </h3>
      </div>
      <div className="flex flex-col gap-1">
        {/* 리뷰 제목 */}
        <p className="text-sm font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
          {review.title}
        </p>
        {/* 리뷰 내용 */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {review.content}
        </p>
      </div>
      <div className="flex items-end">
        {review.isRecommanded && (
          <div className="flex-shrink-0">
            <RiThumbUpFill className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
