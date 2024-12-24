"use client";

import React, { useState } from "react";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import PlusButton from "@/components/PlusButton";
import Footer from "@/components/Footer";
import BoardHeartIcon from "@/assets/icons/boardHeart_icon.png"
import EmptyPicture from "@/assets/icons/emptyPicture.png";
// 임시 게시글 이미지
import HotDog1 from "@/assets/images/postCard/hot1.png";
import HotDog2 from "@/assets/images/postCard/hot2.png";
 

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["전체", "펫 자랑", "고민 상담", "임시 보호", "일상"];

  // 임시 게시글들
  const posts = [
    {
      id: 1,
      category: "일상",
      title: "우리 한식, 두식, 삼식이를 여러분들께 소개합니다.",
      content: "백구이고요, 이제 한살 먹은 베이비들입니다. 애기들이라서 돌보기 조금 힘들지만 그래도 넘 귀여워요ㅠㅠ",
      isLike: false,
      imageList: [
        { isPrimary: true, url: HotDog1 },
        { isPrimary: false, url: HotDog2 },
      ],
    },
    {
      id: 2,
      category: "펫 자랑",
      title: "저의 강아지 이리온군을 소개합니다~",
      content: "10살 푸들입니다!",
      isLike: true,
      imageList: [],
    },
    {
      id: 3,
      category: "고민 상담",
      title: "평택 싸나이를 소개합니다.",
      content: "저의 애착 인형입니다.",
      isLike: false,
      imageList: [],
    },
    {
      id: 4,
      category: "고민 상담",
      title: "평택 싸나이를 소개합니다.",
      content: "저의 애착 인형입니다.",
      isLike: false,
      imageList: [],
    },
  ];

  // 카테고리별 게시글 필터링
  const filteredPosts = posts.filter(
    (post) =>
      (selectedCategory === "전체" || post.category === selectedCategory) &&
      post.title.includes(searchQuery)
  );

  // 글자수 제한
  const titleMaxLength = 20;
  const contentMaxLength = 29;

  return (
    <div className="mt-10 p-6">
      {/* 검색창 */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색어를 입력하세요..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* 카테고리 필터 버튼 */}
      <div className="mb-4 flex gap-2 justify-around">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`w-full px-4 py-1 rounded-xl ${
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
                {post.isLike && (
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