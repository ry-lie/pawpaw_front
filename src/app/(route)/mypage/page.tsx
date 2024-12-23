"use client";

import Nav from "@/app/components/Nav/Nav";
import Footer from "@/app/components/Footer";
import BasicProfile from "@/app/assets/icons/profile_icon.png"
import Image from "next/image";
import PetLove from "@/app/assets/icons/petlove_icon.png"

import React, { useState } from "react";
import PlusButton from "@/app/components/PlusButton";
import PetInfo from "./PetInfo"

export default function MyPage() {
  const [petContainers, setPetContainers] = useState<number[]>([]);

  const handleAddContainer = () => {
    setPetContainers([...petContainers, Date.now()]); // 새로운 컨테이너 추가
  };

  return (
    <div className="min-h-screen">

      {/* 메인 컨테이너 */}
      <main className="relative flex flex-col gap-1 pt-16 pb-8 px-14">
        
        <div className="items-center">
          {/* 1. 유저 정보 컨테이너 */}
          <section className="w-full max-w-mobile h-36 bg-white border border-stroke_gray rounded-lg p-4 flex gap-4 items-center mb-3">
  
            {/* (1) 유저 프로필 이미지 */}
            <Image src={BasicProfile} alt="profile" className="w-24 h-24 bg-white rounded-full ml-3 mr-1" />
            {/* (2) 유저 정보 */}
            <div className="flex flex-col flex-grow justify-between">
              <div className="flex items-center justify-start">
                <h3 className="text-xl font-bold">견주</h3>
              </div>

              <button className="text-sm text-blue-500 underline flex justify-start mb-1">내 정보 수정</button>

              <div className="flex justify-start items-center">
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">내가 쓴 글</span>
                  <span className="text-sm text-gray-600">|</span>
                  <span className="text-sm text-gray-600">내가 쓴 댓글</span>
                </div>
              </div>
            </div>

            {/* (3) 버튼 */}
            <div className="flex flex-col justify-between h-full">
              <button className="text-sm bg-primary text-white px-3 py-1 rounded-lg font-semibold">
                산책메이트 ON
              </button>
              <button className="text-sm text-red-500 underline ml-auto">
                로그아웃
              </button>
            </div>
          </section>
        </div>

        {/* 반동소 컨테이너*/}
        <div className="flex items-center gap-1 justify-start ml-2">
          {/* 이미지 아이콘 */}
          <Image src={PetLove} alt="petLove" className="w-6 h-6" />
          {/* 텍스트 */}
          <h2 className="text-lg font-bold text-gray-800">내 반려동물을 소개합니다</h2>
        </div>
        <div className="items-center">
          <PetInfo />
        </div>
      </main>

      {/* 플러스 버튼 */}
      <PlusButton onClick={handleAddContainer} />

      {/* Footer 카테고리 독바 */}
      <Footer />
    </div>
  )
}