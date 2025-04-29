"use client"

import Footer from "@/components/Footer";
import HeartIcon from "../assets/icons/heart_icon.png";
import FireIcon from "../assets/icons/fire_icon.png";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
// import { getPopularBoardList, getLatestBoardList } from '@/lib/api/board';
import PostCard, { PostCardProps } from '@/components/Main/PostCard';
import StructureFotoer from "@/components/Main/StructureFooter";
import Carousel from "@/components/Main/Carousel";
import Carousel1 from "@/assets/images/carousel/carousel1.png";
import Carousel2 from "@/assets/images/carousel/carousel2.png";
import Carousel3 from "@/assets/images/carousel/carousel3.png";
import Link from "next/link";
import { PATHS } from "../constants/path";
import { useUserStore } from "@/stores/userStore";
import { getMyPage } from "@/lib/api/user";
import { useLocationUpdater } from "@/hooks/useLocationUpdater";
import { useTranslation } from "react-i18next";
import { getMockPopularPosts, getMockLatestPosts } from "@/mocks/community";

export interface BoardItem {
  id: number;
  korName?: string;
  category?: "일상" | "펫자랑" | "임시보호" | "고민상담";
  title: string;
  url?: string;
  imageUrl?: string;
}

export default function Home() {
  const { updateLocation } = useLocationUpdater(); //현재 위치 가져와서 업데이트하기
  const [popularPosts, setPopularPosts] = useState<PostCardProps[]>([]);
  const [latestPosts, setLatestPosts] = useState<PostCardProps[]>([]);
  const userStore = useUserStore();
  const { t, i18n } = useTranslation("main");

  const carouselData = [
    { id: 1, imgUrl: Carousel1, text: t("carouselText1") },
    { id: 2, imgUrl: Carousel2, text: t("carouselText2") },
    { id: 3, imgUrl: Carousel3, text: t("carouselText3") },
  ];

  /* 게시글 목데이터로 교체
  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularResponse = await getMockPopularPosts(6);
        const latestResponse = await getMockLatestPosts(6);

        setPopularPosts(
          Array.isArray(popularResponse.data.body.data)
            ? popularResponse.data.body.data.map((item: BoardItem) => ({
              id: item.id,
              category: item.korName,
              title: item.title,
              imageUrl: item.url,
            }))
            : []
        );

        setLatestPosts(
          Array.isArray(latestResponse.data.body.data)
            ? latestResponse.data.body.data.map((item: BoardItem) => ({
              id: item.id,
              category: item.category, // korName 사용
              title: item.title,
              imageUrl: item.imageUrl,
            }))
            : []
        );

      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);
  */
  
  // 게시글 목데이터로 교체
  useEffect(() => {
    setPopularPosts(
      getMockPopularPosts().map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category as "일상" | "펫자랑" | "임시보호" | "고민상담",
        imageUrl: item.imageList[0]?.url,
      }))
    );
  
    setLatestPosts(
      getMockLatestPosts().map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category as "일상" | "펫자랑" | "임시보호" | "고민상담",
        imageUrl: item.imageList[0]?.url,
      }))
    );
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const myInfo = await getMyPage(); // 유저 정보 요청
        const { canWalkingMate } = myInfo;

        useUserStore.getState().login();
        useUserStore.getState().initialize();
        if (canWalkingMate) {
          try {
            await updateLocation(); // 서버에 위치 업데이트
          } catch {
            console.error("위치 업데이트 중 오류가 발생했습니다.");
          }
        }
      } catch {

      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen">

      {/* 메인 컨테이너 */}
      <main className="mt-12 flex flex-col items-center gap-8">

        <Carousel carouselData={carouselData} />

        {/* 컨테이너 - 인기글 섹션, 최신글 섹션 */}
        <div className="w-full max-w-mobile mx-auto px-6">
          {/* 인기글 섹션 */}
          <section className="w-full mb-7">
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Image
                src={HeartIcon}
                alt="heart"
                width={24}
                height={24}
                className="mx-1 mb-1"
              />
              {t("popularPosts")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
              {popularPosts.map((post) => (
                <Link href={PATHS.COMMUNITY_DETAIL(post.id)} key={post.id}>
                  <PostCard
                    id={post.id}
                    category={post.category}
                    title={post.title}
                    imageUrl={post.imageUrl}
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* 최신글 섹션 */}
          <section className="w-full mb-10">
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Image
                src={FireIcon} // public 디렉토리 기준 경로
                alt="fire"
                width={24}
                height={24}
                className="mx-1 mb-1"
              />
              {t("popularPosts")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
              {latestPosts.map((post) => (
                <Link href={PATHS.COMMUNITY_DETAIL(post.id)} key={post.id}>
                  <PostCard
                    id={post.id}
                    category={post.category}
                    title={post.title}
                    imageUrl={post.imageUrl}
                  />
                </Link>

              ))}
            </div>
          </section>
        </div>

        {/* Footer: 웹사이트의 구조 */}          
        <StructureFotoer />
      </main>

      {/* Footer 카테고리 독바 */}
      <div className="mt-12">
      <Footer />
      </div>
    </div>
  );
}