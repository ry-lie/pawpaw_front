"use client";

import React, { useState, useEffect } from "react";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png"
import EmptyPicture from "@/assets/icons/emptyPicture.png";
import { getMyPosts } from "@/lib/api/user";
import { Post } from "@/types/post";
import { useUserStore } from "@/stores/userStore";

export default function MyPostsPage() {
  const { id: userId, isLoggedIn } = useUserStore(); // 로그인된 사용자 정보 가져오기
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const take = 7;

  // 게시글 데이터 가져오기
  const fetchPosts = async (isLoadMore = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getMyPosts(userId, cursor, take); // 1은 사용자 ID 예시
      const fetchedPosts = response.body.data.boards;

      if (fetchedPosts.length < take) {
        setHasMore(false);
      }

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      } else {
        setPosts(fetchedPosts);
      }

      if (fetchedPosts.length > 0) {
        setCursor(fetchedPosts[fetchedPosts.length - 1].id);
      }
    } catch (error) {
      console.error("내가 쓴 글 데이터를 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
    }
  }, [isLoggedIn]);
  
  // 글자수 제한
  const titleMaxLength = 20;
  const contentMaxLength = 29;

  return (
    <div className="mt-10 p-6">
      <h2 className="font-bold text-2xl ml-2 mb-2">내가 작성한 글</h2>
      {/* 게시글 컨테이너 */}
      <div className="space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="p-3 border rounded-md bg-white">
            
            {/* 이미지칸, 게시글칸, 카테고리&좋아요 */}
            <div className="flex">
              {/* 1. 이미지 */}
              <Image
                src={
                  post.imageList.length > 0
                    ? post.imageList.find((img) => img.isPrimary)?.url || post.imageList[0].url
                    : EmptyPicture
                }
                alt="게시글 이미지"
                className="w-20 h-20 object-cover rounded-md mr-3 justify-center"
              />
              {/* 2. 제목, 내용 */}
              <div className="w-full flex flex-col justify-center">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">{post.title.length > titleMaxLength ? `${post.title.slice(0, titleMaxLength)}...` : post.title}</h3>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p>{post.content.length > contentMaxLength ? `${post.content.slice(0, contentMaxLength)}...` : post.content}</p>
                </div>
              </div>

              {/* 3. 카테고리 & 좋아요 */}
              <div className="w-1/5 flex flex-col items-end justify-between">
                {/* 카테고리 표시 버튼 */}
                <span className="text-sm bg-gray-200 px-1.5 py-0.5 rounded-md">
                  {post.category}
                </span>
                {/* 좋아요 */}
                {post.isLikeClicked && (
                  <Image
                    src={BoardHeartIcon} // 좋아요 아이콘 이미지 경로
                    alt="좋아요 아이콘"
                    className="w-6 h-7" // 아이콘 크기 조정
                  />
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 플러스 버튼 */}
      <PlusButton href={PATHS.COMMUNITY_WRITE} />

      {/* Footer 카테고리 독바 */}
      <Footer />
    </div>
  );
}