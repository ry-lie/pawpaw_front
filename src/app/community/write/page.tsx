"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBack from "@/assets/icons/arrowBack.png";
import { handleImamgeUploading } from "@/utils/ImageUpload";
//import Input from "@/components/Input";

export default function CommunityWritePage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleChangeImage = handleImamgeUploading((file) => {
    const imageUrl = URL.createObjectURL(file);

    setUploadedImages((prev) => {
      const totalImages = prev.concat(imageUrl);
      return totalImages.slice(0, 4); // 이미지 최대 4개로 제한
    });
  });

  return (
    <div className="min-h-screen bg-white">
      {/* 자체 Nav바 (공통x) */}
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
      <main className="p-4 xs:p-6">
        {/* 이미지 업로드 */}
        <section className="mb-6">
          <div className="flex space-x-2 xs:space-x-4">
            {/* 이미지 업로더 */}
            <label
              htmlFor="image-upload"
              className={`w-16 h-16 xs:w-24 xs:h-24 flex items-center justify-center rounded-lg shadow cursor-pointer ${
                uploadedImages.length >= 4 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-200"
              }`}
              style={uploadedImages.length >= 4 ? { pointerEvents: "none" } : undefined}
            >
              <span className="text-gray-500">+</span>
            </label>
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleChangeImage}
            />
            {/* 업로드된 이미지 */}
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative w-16 h-16 xs:w-24 xs:h-24 rounded-lg shadow bg-cover">

                <div
                  className="absolute top-1 right-1 bg-white bg-opacity-30 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-primary hover:bg-opacity-70"
                  onClick={() =>
                    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <span className="text-xs xs:text-sm font-normal text-strong_gray hover:text-white">x</span>
                </div>

                <div
                  className="w-full h-full bg-cover rounded-lg"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>

              </div>
            ))}
          </div>
          <p className="text-xs xs:text-sm text-gray-500 mt-2 ml-3 xs:ml-6">최대 4장</p>
        </section>

        {/* 카테고리 선택 */}
        <section className="mb-6">
          <h2 className="text-base xs:text-lg font-bold mb-2">카테고리</h2>
          <div className="flex space-x-2 justify-around">
            {["펫 자랑", "고민 상담", "임시 보호", "일상"].map((category) => (
              <button
                key={category}
                className="w-full px-2 py-0.5 xs:px-4 xs:py-1 text-sm xs:text-base bg-background border border-solid border-stroke_gray rounded-xl hover:bg-stroke_gray focus:ring-2 focus:ring-primary"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* 제목 입력 */}
        <section className="mb-6">
          <h2 className="text-base xs:text-lg font-bold mb-2">제목</h2>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full text-sm xs:text-base px-4 py-2 border rounded-lg focus:ring-2 bg-background focus:ring-primary"
          />
        </section>

        {/* 설명 입력 */}
        <section className="mb-3">
          <h2 className="text-base xs:text-lg font-bold mb-2">설명</h2>
          <textarea
            placeholder="내용을 입력하세요"
            className="w-full text-sm xs:text-base px-4 py-2 border rounded-lg focus:ring-2 bg-background focus:ring-primary"
            rows={8}
          />
        </section>

        {/* 작성 완료 버튼 */}
        <div className="text-right">
          <button className="text-sm xs:text-base px-3 py-1 xs:px-5 xs:py-2 bg-primary text-white font-semibold rounded-lg hover:bg-hover">
            작성 완료
          </button>
        </div>
      </main>
    </div>
  );
}