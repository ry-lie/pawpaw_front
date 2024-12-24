import ReviewDeleteButton from "@/app/map/review/[id]/ReviewDeleteButton";
import BasicProfileIcon from "@/assets/icons/profile_icon.png";
import Button from "@/components/Button";
import Footer from '@/components/Footer'
import Input from "@/components/Input";
import Carousel from '@/components/Main/Carousel'
import axiosInstance from '@/lib/axios';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { FaEdit } from "react-icons/fa";
import Comment from "./Comment";
import LikeButton from "./LikeButton";

interface CommunityProps {
  id: string;
  writer: string;
  title: string;
  description: string;
  createdDate: string;
  isLiked: boolean;
  likeCount: number;
}
async function fetchCommunityDetail(communityId: string): Promise<CommunityProps> {
  const { data } = await axiosInstance.get(`/api/community/${communityId}`);
  return data;
}

const post = {
  id: "1",
  images: [
    "/images/이리온.jpg", // 임시로 public에 저장
    "/images/rioni.jpg",
    "/images/식당.png",
  ],
  profile: BasicProfileIcon,
  writer: "리온이 누나",
  createdDate: "2023-12-12",
  title: "여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페",
  description:
    "여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요",
  isLiked: true,
  likeCount: 10,
  comments: [
    {
      id: "c1",
      writer: "리온이 오빠",
      profile: "/images/rioni.jpg",
      createdDate: "2023-12-13",
      content: "여기 정말 비싸죠! 저도 공감합니다.",
    },
    {
      id: "c2",
      writer: "유저123",
      profile: "/images/rioni.jpg",
      createdDate: "2023-12-14",
      content: "저는 여기 가격은 괜찮다고 생각했는데, 좀 아쉬운 부분도 있네요.",
    },
    {
      id: "c3",
      writer: "카페 매니저",
      profile: "/images/rioni.jpg",
      createdDate: "2023-12-15",
      content: "고객님의 소중한 의견 감사드립니다! 앞으로 개선하도록 하겠습니다.",
    },
  ],
};


export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  //   const { data: review } = useQuery({
  //   queryKey: ["community", id],
  //   queryFn: () => fetchCommunityDetail(id),
  // });
  return (
    <div className='mt-12'>
      <Carousel
        carouselData={post.images.map((url, index) => ({
          id: index + 1,
          imgUrl: url,
          text: "",
        }))}
        height="h-[500px]"
        containerClassName="bg-[#f9f9f9]"
        imageClassName="object-contain max-h-full max-w-full "
      />
      <div className="mt-2 p-4 mb-14">
        <div className="flex items-center space-x-4 border-b-2 pb-2">
          <Image
            src={post?.profile}
            alt="프로필 이미지"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex justify-between  items-center w-full">
            <div className="text-md font-bold items-center">{post?.writer}</div>
            <div>
              {/**본인이면 뜨도록 수정 */}
              <div className="flex gap-3 justify-center">
                <Link href={`/map/review/write/${post.id}`}>
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </Link>
                <ReviewDeleteButton reviewId={id} />
              </div>
              <div className="text-gray-500 text-sm">{post?.createdDate}</div>
            </div>

          </div>

        </div>
        {/*제목 + 설명*/}
        <div className="mt-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold pl-1 flex">{post?.title}</h1>
          </div>
          <p className="mt-4 text-gray-700">{post?.description}</p>
          {/*좋아요*/}
          <div className="flex flex-col justify-center items-center mt-10">
            <LikeButton postId={post?.id} isLiked={post.isLiked} />
            <div>{post.likeCount}</div>
          </div>
        </div>
        <hr className="my-3" />
        {/*댓글*/}
        <div className="font-semibold text-lg">
          <h2>댓글 ({post.comments.length})</h2>
        </div>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              writer={comment.writer}
              profile={comment.profile}
              createdDate={comment.createdDate}
              content={comment.content}

            />
          ))}
        </div>
        <div className="flex gap-2">
          <Input name="comment" className="w-full" />
          <Button containerStyles="w-10 text-xs">등록</Button>
        </div>

      </div >
      <Footer />
    </div>
  )
}

