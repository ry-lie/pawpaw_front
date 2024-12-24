"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBack from "@/assets/icons/arrowBack.png";
//import Input from "@/components/Input";

export default function CommunityWritePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Nav바 */}
      <header className="bg-background p-2 h-12 flex items-center">
        <button
          className="text-gray-700 font-bold"
          onClick={() => router.back()}
        >
          <Image
            src= {ArrowBack}
            alt= "뒤로가기 아이콘"
            className="w-8 h-8"
          />
        </button>
      </header>

      {/* 작성 페이지 내용 */}
      <main className="p-6">
        {/* 이미지 업로드 */}
        <section className="mb-6">
          <div className="flex space-x-4">
            <label
              htmlFor="image-upload"
              className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-lg shadow cursor-pointer"
            >
              <span className="text-gray-500">+</span>
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
            />
            <div className="w-24 h-24 bg-cover rounded-lg shadow">
              <img
                src="/example.jpg"
                alt="업로드된 이미지"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 ml-6">최대 5장</p>
        </section>

        {/* 카테고리 선택 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">카테고리</h2>
          <div className="flex space-x-2 justify-around">
            {["펫 자랑", "고민 상담", "임시 보호", "일상"].map((category) => (
              <button
                key={category}
                className="w-full px-4 py-1 bg-background border border-solid border-stroke_gray rounded-xl hover:bg-stroke_gray focus:ring-2 focus:ring-primary"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 제목 입력 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">제목</h2>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-background focus:ring-primary"
          />
        </section>

        {/* 설명 입력 */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">설명</h2>
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-background focus:ring-primary"
            rows={8}
          />
        </section>

        {/* 작성 완료 버튼 */}
        <div className="text-right">
          <button className="px-5 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-hover">
            작성 완료
          </button>
        </div>
      </main>
    </div>
  );
}