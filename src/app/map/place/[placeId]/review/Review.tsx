import { RiThumbUpFill } from "react-icons/ri";
import DefaultProfileImage from "@/assets/icons/profile_icon.png";
import Image from "next/image";
interface ReviewProps {
  id: number;
  nickname: string;
  title: string
  content: string;
  isLikeCliked: boolean;
  imageUrl: string;
}
export default function Review({ review }: { review: ReviewProps }) {
  const profileImageUrl = review?.imageUrl || DefaultProfileImage;
  return (
    <div className="flex gap-2 p-2 border border-stroke_gray rounded-md">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <Image
          src={profileImageUrl}
          alt="프로필 이미지"
          width={48}
          height={48}
          className="rounded-full"
        />
        {/* 작성자*/}
        <h3 className="font-semibold xs:text-xs text-[10px] text-center break-words w-[56px]">
          {review.nickname}
        </h3>
      </div>
      <div className="flex flex-col gap-1">
        {/* 리뷰 제목 */}
        <p className="xs:text-sm text-[12px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">
          {review.title}
        </p>
        {/* 리뷰 내용 */}
        <p className="xs:text-sm text-[12px] text-gray-600 line-clamp-3">
          {review.content}
        </p>
      </div>
      <div className="flex items-end">
        {review.isLikeCliked && (
          <div className="flex-shrink-0">
            <RiThumbUpFill className="w-6 h-6 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}
