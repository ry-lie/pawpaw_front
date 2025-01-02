"use client"
import { RiThumbUpLine, RiThumbUpFill, RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import { deleteReview, fetchReviewDetails } from "@/lib/api/place";
import { useUserStore } from "@/stores/userStore";
import DefaultProfileImage from "@/assets/icons/profile_icon.png";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatISODate";



export default function ReviewDetail({
  params,
}: {
  params: { placeId: number; reviewId: number };
  searchParams: { nickname: string };
}) {
  const { id } = useUserStore();
  const { reviewId, placeId } = params;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: review } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => fetchReviewDetails(placeId, reviewId),
    enabled: !!reviewId,
  });
  console.log(review, "리뷰상세");
  const handleDeleteReview = async () => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) return;

    try {
      await deleteReview(placeId, reviewId);
      queryClient.invalidateQueries({ queryKey: ["placeDetails", placeId] });
      queryClient.invalidateQueries({ queryKey: ["reviewDetails", reviewId] });
      router.push(PATHS.MAP);
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
    }
  };
  const profileImageUrl = review?.author.imageUrl || DefaultProfileImage;

  return (

    <div className="mt-14 p-5">
      <div className="flex items-center space-x-4 border-b-2 pb-2">
        <Image
          src={profileImageUrl}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex justify-between w-full">
          <div className="text-md font-bold flex items-center">
            <div>{review?.author.nickname}</div>
          </div>
          <div>
            {review?.author.id === id && (
              <div className="flex gap-3 justify-end">
                <Link href={PATHS.REVIEW_MODIFY(placeId, reviewId)}>
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </Link>
                <button onClick={handleDeleteReview} aria-label="삭제">
                  <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
                </button>
              </div>
            )}
            <div className="text-gray-500 text-sm">{formatDate(review?.createdAt)}</div>
          </div>

        </div>

      </div>
      <div className="mt-6">
        <div className="flex gap-1">
          <div className="flex items-start">
            {review?.isLikeClicked ? (
              <RiThumbUpFill className="text-primary w-7 h-7 " aria-label="추천" />
            ) : (
              <RiThumbUpLine className="text-gray-400 w-7 h-7" aria-label="비추천" />
            )}
          </div>

          <h1 className="text-lg font-bold flex">{review?.title}</h1>
        </div>

        <p className="mt-2 text-gray-700">{review?.content}</p>
      </div>
      <Footer />
    </div >
  );
}
