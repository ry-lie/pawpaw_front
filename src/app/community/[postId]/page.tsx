"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Carousel from "@/components/Main/Carousel";
import Comment from "./Comment";
import Loading from "@/app/loading";
import { formatDate } from "@/utils/formatISODate";
import { handleAddComment, handleDeleteComment, handleDeletePost, handleModifyComment } from "./handlers";
import { fetchBoardDetail } from "@/lib/api/board";
import { RiDeleteBinLine } from "react-icons/ri";
import LikeButton from "./LikeButton";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import { FaEdit } from "react-icons/fa";
import { PATHS } from "@/constants/path";
import Link from "next/link";

interface CommunityDetailPageProps {
  params: {
    postId: number;
  };
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  likeCount: number;
  isLikeClicked: boolean;
  author: {
    id: number;
    nickname: string;
    imageUrl?: string;
  };
  imageList: { url: string }[];
  commentList: CommentData[];
}

interface CommentData {
  id: number;
  author: {
    id: number;
    nickname: string;
    imageUrl?: string;
  }
  createdAt: string;
  content: string;
}

export default function CommunityDetailPage({ params }: CommunityDetailPageProps) {
  const { postId } = params;
  const userId = useUserStore((state) => state.id);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  const router = useRouter();
  const handleEditPost = (postId: number) => {
    router.push(`/community/edit/${postId}`);
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetchBoardDetail(postId);
        setPost(response?.data?.body?.data);
        setLoading(false);
      } catch (err) {
        console.error("게시물 로드 실패:", err);
        setLoading(false);
      }
    };

    loadPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
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
      {post.imageList.length > 0 && (
        <Carousel
          carouselData={post.imageList.map((item, index) => ({
            id: index + 1,
            imgUrl: item.url,
          }))}
          height="h-[400px]"
          containerClassName="bg-white"
          imageClassName="object-contain max-h-full max-w-full border border-x-0 border-stroke_gray"
        />
      )}

      {/* 글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray">
        <div className="flex items-center space-x-2 border-b border-stroke_gray pb-2">
          {/**유저 프로필 이미지*/}
          <Link href={PATHS.USER_INFO(post?.author.id)}>
            <div className="w-[45px] h-[45px] rounded-full overflow-hidden border border-medium_gray">
              <Image
                src={post?.author.imageUrl || "/images/profile_icon.png"}
                alt="프로필 이미지"
                width={45}
                height={45}
                objectFit="cover"
              />
            </div>
          </Link>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <Link href={PATHS.USER_INFO(post?.author.id)}>
                <div className="flex gap-2">
                  {/**유저 닉네임*/}
                  <div className="text-md font-bold">  {post?.author?.nickname || "익명"}</div>
                  <button className="text-accent_orange text-sm flex items-center">
                    채팅
                  </button>
                </div>
              </Link>
              {/**본인이면 수정, 삭제버튼 */}
              <div>
                {post?.author?.id === userId && (
                  <div className="flex gap-2 justify-end mb-0.5">
                    {/* 수정 버튼 */}
                    <button 
                      onClick={() => {    
                        handleEditPost(postId)}} 
                      aria-label="수정"
                    >
                      <FaEdit className="text-gray-400 w-5 h-5" />
                    </button>
                    {/* 삭제 버튼 */}
                    <button onClick={() => handleDeletePost(postId)} aria-label="삭제">
                      <RiDeleteBinLine className="text-gray-400 w-5 h-5" />
                    </button>
                  </div>
                )}
                {/**글 작성 날짜*/}
                <div className="text-gray-500 text-sm whitespace-nowrap">{formatDate(post?.createdAt || "알 수 없음")}</div>
              </div>
            </div>
          </div>


        </div>
        {/**글 제목, 내용*/}
        <div className="mt-6 pb-4">
          <div className="flex flex-col justify-between h-[300px] xs:h-[350px] px-3">
            <div>
              <h1 className="text-base xs:text-lg font-bold break-words">  {post?.title || "제목 없음"}</h1>
              <p className="mt-4 text-sm xs:text-base text-gray-700 break-words"> {post?.content || "내용 없음"}</p>
            </div>
            {/**좋아요 버튼*/}
            <div className="flex flex-col justify-center items-center mt-10">
              <LikeButton postId={postId} isLiked={!!post?.isLikeClicked} />
              <div className="text-sm xs:text-lg">{post?.likeCount || 0}</div>
            </div>
          </div>


        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-2 px-4 pb-4 border-b border-stroke_gray mb-14">
        <h2 className="ml-2 mb-1 text-base xs:text-lg">
          댓글 ({(post?.commentList || []).length})
        </h2>
        <div className="bg-white border-x border-t mb-4">
          {(post?.commentList || []).map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              writer={comment.author.nickname || "익명"}
              profile={comment.author.imageUrl || "/images/profile_icon.png"}
              createdDate={formatDate(comment.createdAt || "알 수 없음")}
              content={comment.content || ""}
              onEdit={(commentId, updatedContent) =>
                handleModifyComment(postId, commentId, updatedContent, setPost)
              }
              onDelete={(commentId) => handleDeleteComment(postId, commentId, setPost)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            name="comment"
            className="w-full"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
          />
          <Button
            containerStyles="w-14 !text-sm !font-medium"
            disabled={!comment.trim()}
            onClick={() => handleAddComment(postId, comment, setPost, setComment)}
          >
            등록
          </Button>
        </div>
      </div>

      <Footer />
    </div >
  );
}
