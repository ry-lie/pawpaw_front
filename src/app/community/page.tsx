"use client";

import React, { useState, useEffect } from "react";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png"
import EmptyPicture from "@/assets/icons/emptyPicture.png";
import useMediaQuery from "@/hooks/useMediaQuery";
import { getBoardList } from "@/lib/api/board"; // getBoardList 가져오기
// 임시 게시글 이미지
import HotDog1 from "@/assets/images/postCard/hot1.png";
import HotDog2 from "@/assets/images/postCard/hot2.png";

// 게시글 데이터 타입 정의
type Post = {
  id: number;
  category: string;
  title: string;
  content: string;
  isLikeClicked: boolean;
  imageList: { isPrimary: boolean; url: string }[];
};

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["전체", "펫 자랑", "고민 상담", "임시 보호", "일상"];

  // 게시글 데이터 가져오기 함수
  const fetchPosts = async (category: string) => {
    setIsLoading(true);
    try {
      const response = await getBoardList(category === "전체" ? "" : category);
      setPosts(response.data);
    } catch (error) {
      console.error("게시글을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리 변경 시 게시글 다시 가져오기
  useEffect(() => {
    fetchPosts(selectedCategory);
  }, [selectedCategory]);

  // 카테고리 및 검색어에 따른 게시글 필터링
  const filteredPosts = posts.filter((post) =>
    post.title.includes(searchQuery)
  );

  // 글자수 제한
  const isMobile = useMediaQuery("(max-width: 425px)"); // 425px 이하 감지
  const titleMaxLength = isMobile ? 15 : 20;
  const contentMaxLength = isMobile ? 18 : 29;

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
                selectedCategory === category ? "bg-primary font-medium text-white" : "bg-white text-gray-700 border-solid border border-stroke_gray"
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
                  className="w-16 h-16 xs:w-20 xs:h-20 object-cover rounded-md mr-3 justify-center"
                />
                {/* 2. 제목, 내용 */}
                <div className="w-full flex flex-col justify-center">
                  <div className="flex justify-between items-center mb-0.5 xs:mb-2 xs:text-base text-sm">
                    <h3 className="font-bold">{post.title.length > titleMaxLength ? `${post.title.slice(0, titleMaxLength)}...` : post.title}</h3>
                  </div>

                  <div className="flex justify-between items-center mb-0.5 xs:mb-2 xs:text-base text-sm">
                    <p>{post.content.length > contentMaxLength ? `${post.content.slice(0, contentMaxLength)}...` : post.content}</p>
                  </div>
                </div>

                {/* 3. 카테고리 & 좋아요 */}
                <div className="w-[30%] xs:w-1/5 flex flex-col items-end justify-between">
                  {/* 카테고리 표시 버튼 */}
                  <span className="text-xs xs:text-sm bg-gray-200 px-1 xs:px-1.5 py-0.5 rounded-md">
                    {post.category}
                  </span>
                  {/* 좋아요 */}
                  {post.isLikeClicked && (
                    <Image
                      src={BoardHeartIcon} // 좋아요 아이콘 이미지 경로
                      alt="좋아요 아이콘"
                      className="w-5 h-6 xs:w-6 xs:h-7" // 아이콘 크기 조정
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
      </main>
    </div>
  );
}