"use client"
import { RiThumbUpLine, RiThumbUpFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import DeleteButton from "@/components/DeleteButton";
import { fetchReviewDetails } from "@/lib/api/place";
import { useUserStore } from "@/stores/userStore";
import DefaultProfileImage from "@/assets/icons/profile_icon.png";

export default function ReviewDetail({
  params,
  searchParams,
}: {
  params: { placeId: string; reviewId: string };
  searchParams: { nickname: string };
}) {
  const { id } = useUserStore();
  const { reviewId, placeId } = params;
  const { nickname } = searchParams;
  const { data: review } = useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => fetchReviewDetails(placeId, reviewId),
    enabled: !!reviewId,
  });

  const profileImageUrl = review?.data.author.imageUrl || DefaultProfileImage;

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
            <div>{nickname}</div>
          </div>
          <div>
            {review?.data.author.id === id && (
              <div className="flex gap-3 justify-center">
                <Link href={PATHS.REVIEW_MODIFY(placeId, reviewId)}>
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </Link>
                <DeleteButton
                  id={reviewId}
                  placeId={placeId}
                  resourceType="reviews"
                  onSuccessRedirect={PATHS.MAP}
                  invalidateKeys={[["placeDetails", placeId]]}
                />
              </div>
            )}
            <div className="text-gray-500 text-sm">{review?.createdAt}</div>
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
