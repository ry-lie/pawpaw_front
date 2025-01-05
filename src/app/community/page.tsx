"use client";

import React, { useState, useEffect } from "react";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png";
import EmptyPicture from "@/assets/icons/emptyPicture.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getBoardList } from "@/lib/api/board";
import { Post } from "@/types/post";

// 게시글 데이터 타입 정의
export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 카테고리
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [cursor, setCursor] = useState<number | null>(null); // 커서
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터 유무
  const take = 7; // 한번에 가져올 게시글 수

  const categories = ["전체", "펫 자랑", "고민 상담", "임시 보호", "일상"]; // 카테고리 목록

  // 한글 카테고리 -> 백엔드 카테고리 매핑
  const categoryMap: { [key: string]: string } = {
    "펫 자랑": "PROUD_PETS",
    "고민 상담": "CONSULTATION",
    "임시 보호": "PROTECT",
    "일상": "LIFE",
    "전체": "", // 전체는 빈 문자열로 처리
  };

  // 게시글 데이터 가져오기 함수
  const fetchPosts = async (isLoadMore = false) => {
    if (isLoading) return;

    

    setIsLoading(true);
    try {
      const categoryKey = categoryMap[selectedCategory] || ""; // 매핑된 카테고리 값 사용
      const response = await getBoardList(cursor, take, categoryKey);
      const fetchedPosts = response.data.body.data.boardList;

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
      console.error("게시글을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 변경 시 게시글 데이터 초기화 및 다시 가져오기
  useEffect(() => {
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    fetchPosts();
  }, [selectedCategory]);

  // 글자수 제한
  const isMobile = useMediaQuery("(max-width: 425px)");
  const titleMaxLength = isMobile ? 12 : 20;
  const contentMaxLength = isMobile ? 12 : 29;

  // 검색어에 따른 필터링
  const filteredPosts = posts.filter(
    (post) =>
      post.title.includes(searchQuery) || post.content.includes(searchQuery)
  );

  return (
    <div className="relative min-h-screen">
      <main className="mt-10 p-4 xs:p-6">
        {/* 검색창 */}
        <div className="mb-2 xs:mb-4">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm xs:text-base w-full p-1 xs:p-2 border rounded-md"
          />
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="mb-2 xs:mb-4 flex gap-0.5 xs:gap-2 justify-around">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full px-0.5 xs:px-4 py-1 rounded-xl text-xs xs:text-base ${
                selectedCategory === category
                  ? "bg-primary font-medium text-white"
                  : "bg-white text-gray-700 border-solid border border-stroke_gray"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 게시글 컨테이너 */}
        <div className="space-y-2">
          {filteredPosts.map((post) => (
            <div key={post.id} className="p-2 xs:p-3 border rounded-md bg-white">
              <div className="flex">
                {/* 이미지 */}
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
                {/* 제목, 내용 */}
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
                {/* 카테고리 & 좋아요 */}
                <div className="w-[30%] flex flex-col items-end justify-between">
                  <span className="text-xs bg-gray-200 px-1 py-0.5 rounded-md">
                    {post.category}
                  </span>
                  {post.isLikeClicked && (
                    <Image
                      src={BoardHeartIcon}
                      alt="좋아요 아이콘"
                      className="w-5 h-6"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 버튼 */}
        {hasMore && (
          <button
            onClick={() => fetchPosts(true)}
            disabled={isLoading}
            className="w-full mt-4 mb-12 py-2 font-medium bg-primary hover:bg-hover text-white rounded-md"
          >
            {isLoading ? "불러오는 중..." : "더 보기"}
          </button>
        )}

        {/* 플러스 버튼 */}
        <PlusButton href={PATHS.COMMUNITY_WRITE} />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}