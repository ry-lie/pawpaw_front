
import BasicProfileIcon from "@/assets/icons/profile_icon.png";
import { RiThumbUpLine, RiThumbUpFill, RiDeleteBinLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import DeleteButton from "@/components/DeleteButton";



interface ReviewProps {
  id: string;
  writer: string;
  title: string;
  description: string;
  createdDate: string;
  isLiked: boolean;
}

async function fetchReviewDetail(reviewId: string): Promise<ReviewProps> {
  const { data } = await axiosInstance.get(`/api/reviews/${reviewId}`);
  return data;
}

export default function ReviewDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  // const { data: review } = useQuery({
  //   queryKey: ["review", id],
  //   queryFn: () => fetchReviewDetail(id),
  // });

  const review = {
    id: 1,
    profile: BasicProfileIcon,
    writer: "리온이 누나",
    createdDate: "2023-12-12",
    title: "여기 카페 너무 비싸요 여기 카페 너무싸요 여기 카페 너무싸요 ",
    description: "여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요",
    isLiked: true
  }
  return (

    <div className="mt-14 p-5">
      <div className="flex items-center space-x-4 border-b-2 pb-2">
        <Image
          src={review?.profile}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex justify-between w-full">
          <div className="text-md font-bold flex items-center">
            <div>{review?.writer}</div>
          </div>
          <div>
            {/**본인이면 뜨도록 수정 */}
            <div className="flex gap-3 justify-center">
              <Link href={PATHS.REVIEW_MODIFY("1", "1")}>
                <FaEdit className="text-gray-400 w-5 h-5" />
              </Link>
              <DeleteButton
                id={id}
                resourceType="reviews"
                onSuccessRedirect={PATHS.MAP}
              />
            </div>
            <div className="text-gray-500 text-sm">{review?.createdDate}</div>
          </div>

        </div>

      </div>
      <div className="mt-6">
        <div className="flex gap-1">
          <div className="flex items-start">
            {review?.isLiked ? (
              <RiThumbUpFill className="text-primary w-7 h-7 " aria-label="추천" />
            ) : (
              <RiThumbUpLine className="text-gray-400 w-7 h-7" aria-label="비추천" />
            )}
          </div>

          <h1 className="text-lg font-bold flex">{review?.title}</h1>
        </div>

        <p className="mt-2 text-gray-700">{review?.description}</p>
      </div>
      <Footer />
    </div >
  );
}
