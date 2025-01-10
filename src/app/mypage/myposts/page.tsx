"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png"
import EmptyPicture from "@/assets/icons/emptyPicture.png";
import { getMyPosts } from "@/lib/api/user";
import { useUserStore } from "@/stores/userStore";
import useMediaQuery from "@/hooks/useMediaQuery";

export type MyPosts = {
  boardId: number;
  title: string;
  content: string;
  boardCategory: string;
  createdAt: string;
  imageList: { url: string; isPrimary: boolean }[];
  isLikeClicked: boolean;
}

export default function MyPostsPage() {

  const { initialize, id, isLoggedIn } = useUserStore();
  useEffect(() => {
    initialize(); // 세션 스토리지에서 사용자 정보 불러오기
  }, []);

  const [posts, setPosts] = useState<MyPosts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const take = 7;

  // 게시글 데이터 가져오기
  const fetchPosts = async (isLoadMore = false) => {
    if (isLoading || !isLoggedIn || !id) return;
    setIsLoading(true);
    setError(null);

    try {
      const currentCursor = isLoadMore ? cursor : null;

      const response = await getMyPosts(currentCursor, take);
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
        setCursor(fetchedPosts[fetchedPosts.length - 1].boardId); // 더보기 클릭 시 커서 업데이트
      } else {
        setCursor(null); // 더 이상 게시물이 없을 경우 커서를 null로 설정
      }
    } catch (error) {
      setError("게시글을 불러오는 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 사용자 ID가 변경될 때 상태 초기화
  useEffect(() => {
    console.log("useEffect triggered:", { isLoggedIn, id });
    if (isLoggedIn && id) {
      setPosts([]);
      setCursor(null);
      setHasMore(true);
      fetchPosts();
    }
  }, [isLoggedIn, id]);

  // 글자수 제한
  const isMobile = useMediaQuery("(max-width: 425px)");
  const titleMaxLength = isMobile ? 12 : 20;
  const contentMaxLength = isMobile ? 12 : 29;

  return (
    <div className="mt-10 p-4 xs:p-6">
      <h2 className="font-bold text-xl xs:text-2xl ml-2 mb-2">내가 작성한 글</h2>
      {/* 게시글 컨테이너 */}
      <div className="space-y-2">
        {posts.length === 0 && !isLoading && !error && (
          <p className="text-center mt-6 text-gray-500">작성한 게시글이 없습니다.</p>
        )}
        {posts.map((post) => (
          <div key={post.boardId} className="p-2 xs:p-3 border rounded-md bg-white">
            
            {/* 이미지칸, 게시글칸, 카테고리&좋아요 */}
            <div className="flex">
              {/* 1. 이미지 */}
              <Image
                  src={
                    post.imageList?.length > 0 && post.imageList.some((img) => img.url)
                      ? post.imageList.find((img) => img.isPrimary && img.url)?.url ||
                        post.imageList.find((img) => img.url)?.url ||
                        EmptyPicture.src // 유효한 URL이 없으면 기본 이미지
                      : EmptyPicture.src // Static Import된 기본 이미지
                  }
                  alt="게시글 이미지"
                  width={100}
                  height={100}
                  className="w-16 h-16 xs:w-20 xs:h-20 object-cover rounded-md mr-3"
                />
              {/* 2. 제목, 내용 */}
              <div className="w-full flex flex-col justify-center">
                <h3 className="font-bold">
                  {post.title.length > titleMaxLength
                    ? `${post.title.slice(0, titleMaxLength)}...`
                    : post.title}
                </h3>
                <p>
                  {post.content.length > contentMaxLength
                    ? `${post.content.slice(0, contentMaxLength)}...`
                    : post.content}
                </p>
              </div>

              {/* 3. 카테고리 & 좋아요 */}
              <div className="w-[30%] flex flex-col items-end justify-between">
                {/* 카테고리 표시 버튼 */}
                <span className="text-xs xs:text-sm bg-gray-200 px-1.5 py-0.5 rounded-md">
                  {post.boardCategory}
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
        {/* 로딩 메시지 */}
        {isLoading && <p className="text-center mt-4">Loading...</p>}

        {/* 더보기 버튼 */}
        {hasMore && (
          <button
            onClick={() => fetchPosts(true)}
            disabled={isLoading}
            className="w-full mt-4 py-2 font-medium bg-primary hover:bg-hover text-white rounded-md"
            >
            {isLoading ? "불러오는 중..." : "더 보기"}
          </button>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-center mt-6 text-gray-500">모든 게시글을 확인했습니다.</p>
        )}

        {posts.length === 0 && !isLoading && (
          <p className="text-center mt-6 text-gray-500">작성한 게시글이 없습니다.</p>
        )}
      </div>
      {/* Footer 카테고리 독바 */}
      <div className="mt-12">
      <Footer />
      </div>
    </div>
  );
}