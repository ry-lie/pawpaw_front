import BasicProfileIcon from "@/assets/icons/profile_icon.png";
import Button from "@/components/Button";
import DeleteButton from "@/components/DeleteButton";
import Footer from '@/components/Footer'
import Input from "@/components/Input";
import Carousel from '@/components/Main/Carousel'
import { PATHS } from "@/constants/path";
import axiosInstance from '@/lib/axios';
import Image from "next/image";
import Link from "next/link";
import React from 'react'
import { FaEdit } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import Comment from "./Comment";
import LikeButton from "./LikeButton";

interface CommunityProps {
  id: string;
  nickname: string;
  title: string;
  content: string;
  createdDate: string;
  isLiked: boolean;
  likeCount: number;
}
async function fetchCommunityDetail(communityId: string): Promise<CommunityProps> {
  const { data } = await axiosInstance.get(`/api/community/${communityId}`);
  return data;
}

const post = {

  imageList: [
    "/images/이리온.jpg", // 임시로 public에 저장
    "/images/rioni.jpg",
    "/images/식당.png",
  ],
  profile: BasicProfileIcon,
  nickname: "리온이 누나",
  createdAt: "2023-12-12",
  title: "여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페",
  content:
    "여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요 여기 카페 너무 비싸요",
  isLiked: true,
  likeCount: 10,
  commentList: [
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
        carouselData={post.imageList.map((url, index) => ({
          id: index + 1,
          imgUrl: url,
          text: "",
        }))}
        height="h-[500px]"
        containerClassName="bg-white"
        imageClassName="object-contain max-h-full max-w-full border border-x-0 border-stroke_gray"
      />

      {/* 1. 글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray">
        <div className="flex items-center space-x-2 border-b border-stroke_gray pb-2">
          {/*작성자 프로필 이미지 */}
          <Image
            src={post?.profile}
            alt="프로필 이미지"
            width={40}
            height={40}
            className="rounded-full"
          />
          {/*작성자 */}
          <div className="flex justify-between  items-center w-full">
            <div className="flex gap-2">
              <div className="text-md font-bold items-center">{post?.nickname}</div>
              <button className="text-accent_orange text-sm flex items-center"><TbMessageDots className="mb-0.5 w-4 h-4" />채팅</button>
            </div>

            <div>
              {/**본인이면 뜨도록 수정 */}
              <div className="flex gap-2 justify-end mb-0.5">
                <Link href={PATHS.COMMUNITY_WRITE}>
                  <FaEdit className="text-gray-400 w-5 h-5" />
                </Link>
                <DeleteButton
                  id={id}
                  resourceType="posts"
                  onSuccessRedirect={PATHS.COMMUNITY}
                />
              </div>
              {/*작성일*/}
              <div className="text-gray-500 text-sm">{post?.createdAt}</div>
            </div>
          </div>
        </div>

        {/*제목 + 설명*/}
        <div className="mt-6 pb-4">
          <div className="flex items-center">
            <h1 className="text-base xs:text-lg font-bold pl-1 flex">{post?.title}</h1>
          </div>
          <p className="mt-4 text-sm xs:text-base text-gray-700">{post?.content}</p>
          {/*좋아요*/}
          <div className="flex flex-col justify-center items-center mt-10">
            <LikeButton postId={id} isLiked={post.isLiked} />
            <div className="text-sm xs:text-lg">{post.likeCount}</div>
          </div>
        </div>
      </div>
      
      {/* 2. 댓글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray mb-14">
        {/*댓글*/}
        <div className="font-semibold text-lg mt-4 border-b border-stroke_gray">
          <h2 className="ml-2 mb-1 text-base xs:text-lg">댓글 ({post.commentList.length})</h2>
        </div>

        {/* 댓글 목록 */}
        <div className="bg-white border-x mb-4">
          {post.commentList.map((comment) => (
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
          <Button containerStyles="w-14 !text-sm !font-medium">등록</Button>
        </div>
      </div >

      <Footer />
    </div>
  )
}

