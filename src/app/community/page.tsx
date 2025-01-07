"use client";

import Image from "next/image";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import React, { useState, useEffect } from "react";
import { getBoardList } from "@/lib/api/board";
import { Post } from "@/types/post";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png";
import EmptyPicture from "@/assets/icons/emptyPicture.png";
import useMediaQuery from "@/hooks/useMediaQuery";


// 게시글 데이터 타입 정의
export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 카테고리
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [posts, setPosts] = useState<Post[]>([]); // 게시글 데이터
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [cursor, setCursor] = useState<number | null>(null); // 커서
  const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터 유무
  const [showHeader, setShowHeader] = useState(true); // 검색창 & 카테고리 표시 상태
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
      const currentCursor = isLoadMore ? cursor : null; // 카테고리 변경 시 커서를 초기화

      const response = await getBoardList(currentCursor, take, categoryKey);
      const fetchedPosts = response.data.body.data.boardList;

      if (fetchedPosts.length < take) {
        setHasMore(false);
      }

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      } else {
        setPosts(fetchedPosts); // 카테고리 변경 시 이전 데이터를 덮어씌움
      }

      if (fetchedPosts.length > 0) {
        setCursor(fetchedPosts[fetchedPosts.length - 1].id); // 더보기 클릭 시 커서 업데이트
      } else {
        setCursor(null); // 더 이상 게시물이 없을 경우 커서를 null로 설정
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

  // // 스크롤 방향 감지
  useEffect(() => {
    let lastScrollY = window.scrollY; // 마지막 스크롤 위치 추적

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // 스크롤 다운 & 일정 거리 이상
        setShowHeader(false);
      } else {
        // 스크롤 업
        setShowHeader(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* 검색창 & 카테고리 필터 버튼 */}
      <div
        className={`fixed top-12 items-center sm:w-[598px] w-[calc(100%-2px)] bg-background px-4 xs:px-6 overflow-hidden transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
            }`}
      >
      {/* 검색창 */}
        <div className="mb-2 xs:mb-2">
          <input
            type="text"
            placeholder="검색어를 입력하세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-sm xs:text-base w-full p-1 xs:p-2 border rounded-md"
          />
        </div>

        {/* 카테고리 필터 버튼 */}
        <div className="mb-2 xs:mb-2 flex gap-0.5 xs:gap-2 justify-around">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full px-0.5 xs:px-4 py-1 rounded-xl text-xs xs:text-base ${selectedCategory === category
                ? "bg-primary font-medium text-white"
                : "bg-white text-gray-700 border-solid border border-stroke_gray"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <main className="mt-[108px] xs:mt-[120px] p-4 xs:p-6">
        {/* 게시글 컨테이너 */}
        <div className="space-y-2">
          {filteredPosts.map((post) => (
            <Link href={PATHS.COMMUNITY_DETAIL(post.id)} key={post.id} >
              <div className="mb-2 p-2 xs:p-3 border rounded-md bg-white">
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
            </Link>
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