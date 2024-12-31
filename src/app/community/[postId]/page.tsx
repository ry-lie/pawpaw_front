"use client";

import { useEffect, useState } from "react";
import { fetchBoardDetail } from "@/lib/api/board";
import Image from "next/image";
import DeleteButton from "@/components/DeleteButton";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { PATHS } from "@/constants/path";
import Carousel from "@/components/Main/Carousel";
import LikeButton from "./LikeButton";
import Comment from "./Comment";
import Loading from "@/app/loading";

export default function CommunityDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchBoardDetail(id);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error("게시물 로드 실패:", err);
        setError("게시물을 불러오는 중 문제가 발생했습니다.");
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>게시물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <Carousel
        carouselData={post.imageList.map((url: string, index: number) => ({
          id: index + 1,
          imgUrl: url,
          text: "",
        }))}
        height="h-[500px]"
        containerClassName="bg-white"
        imageClassName="object-contain max-h-full max-w-full border border-x-0 border-stroke_gray"
      />

      {/* 글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray">
        <div className="flex items-center space-x-2 border-b border-stroke_gray pb-2">
          <Image
            src={post?.profile}
            alt="프로필 이미지"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <div className="text-md font-bold">{post?.nickname}</div>
              <button className="text-accent_orange text-sm flex items-center">
                채팅
              </button>
            </div>
            <div>
              <div className="flex gap-2 justify-end mb-0.5">
                <DeleteButton id={id} resourceType="posts" onSuccessRedirect={PATHS.COMMUNITY} />
              </div>
              <div className="text-gray-500 text-sm">{post?.createdAt}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pb-4">
          <h1 className="text-base xs:text-lg font-bold">{post?.title}</h1>
          <p className="mt-4 text-sm xs:text-base text-gray-700">{post?.content}</p>
          <div className="flex flex-col justify-center items-center mt-10">
            <LikeButton postId={id} isLiked={post.isLiked} />
            <div className="text-sm xs:text-lg">{post.likeCount}</div>
          </div>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray mb-14">
        <h2 className="ml-2 mb-1 text-base xs:text-lg">
          댓글 ({post.commentList.length})
        </h2>
        <div className="bg-white border-x mb-4">
          {post.commentList.map((comment: any) => (
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
      </div>

      <Footer />
    </div>
  );
}
