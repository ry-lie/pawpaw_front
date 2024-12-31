"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBack from "@/assets/icons/arrowBack.png";
import { handleImamgeUploading } from "@/utils/ImageUpload";
import { addPost, postProps } from "@/lib/api/board"; // API 함수 가져오기

export default function CommunityWritePage() {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // 이미지 업로더 (이미지 크기제한 유효성 검사 추가 예정)
  const handleChangeImage = handleImamgeUploading((file) => {
    const imageUrl = URL.createObjectURL(file);

    setUploadedImages((prev) => {
      const totalImages = prev.concat(imageUrl);
      return totalImages.slice(0, 4); // 이미지 최대 4개로 제한
    });
  });

  // 제목 유효성 검사
  const isTitleValid = title.trim().length > 0 && title.trim().length <= 30; // 1자 이상 30자 이하

  // 내용 유효성 검사
  const isContentValid = content.trim().length > 0 && new Blob([content]).size <= 1000; // 1자 이상, 1000Byte 이하

  // 전체 폼 유효성 검사
  const isFormValid = isTitleValid && isContentValid && category;
  
  const handleSubmit = async () => {
    if (!isFormValid) {
      alert("모든 필드를 올바르게 입력하세요.");
      return;
    }
    const postData: postProps = {
      imageList: uploadedImages.map((url, index) => ({
        isPrimary: index === 0, // 첫 번째 이미지를 기본 이미지로 설정
        url,
      })),
      category,
      title,
      content,
    };

    try {
      await addPost(postData);
      alert("게시글이 성공적으로 생성되었습니다.");
      //router.push("/community");
    } catch (error) {
      console.error("게시글 생성 중 오류 발생:", error);
      alert("게시글 생성에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 자체 Nav바 (공통x) */}
      <header className="bg-background p-2 h-12 flex items-center">
        <button
          className="text-gray-700 font-bold"
          onClick={() => router.back()}
        >
          <Image
            src={ArrowBack}
            alt="뒤로가기 아이콘"
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
              className={`w-16 h-16 xs:w-24 xs:h-24 flex items-center justify-center rounded-lg shadow cursor-pointer ${uploadedImages.length >= 4 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-200"
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
            {["펫 자랑", "고민 상담", "임시 보호", "일상"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)} // 카테고리 설정
                className={`w-full px-2 py-0.5 xs:px-4 xs:py-1 text-sm xs:text-base border border-solid border-stroke_gray rounded-xl focus:ring-2 focus:ring-primary ${
                  category === cat ? "bg-white text-accent_orange font-semibold" : "bg-background"
                }`}
              >
                {cat}
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
            className={`w-full text-sm xs:text-base px-4 py-2 border rounded-lg ${
              title.trim().length > 0 && title.trim().length <= 30
                ? ""
                : "border-primary"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* 제목 유효성 실패 */}
          {title.trim().length === 0 && (
            <p className="text-xs text-accent_orange mt-1 ml-1">제목을 입력해주세요.</p>
          )}
          {title.trim().length > 30 && (
            <p className="text-xs text-accent_orange mt-1 ml-1">제목은 최대 30자까지 입력 가능합니다.</p>
          )}
        </section>

        {/* 설명 입력 */}
        <section className="mb-3">
          <h2 className="text-base xs:text-lg font-bold mb-2">설명</h2>
          <textarea
            placeholder="내용을 입력하세요"
            className={`w-full text-sm xs:text-base px-4 py-2 border rounded-lg ${
              content.trim().length > 0 && new Blob([content]).size <= 1000
                ? ""
                : "border-accent_orange"
            }`}
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {/* 내용 유효성 실패 */}
          {content.trim().length === 0 && (
            <p className="text-xs text-accent_orange ml-1">내용을 입력해주세요.</p>
          )}
          {new Blob([content]).size > 1000 && (
            <p className="text-xs text-accent_orange ml-1">내용은 최대 500자까지 입력 가능합니다.</p>
          )}
        </section>

        {/* 작성 완료 버튼 */}
        <div className="text-right">
        <button
            className={`text-sm xs:text-base px-3 py-1 xs:px-5 xs:py-2 font-semibold rounded-lg ${
              isFormValid
                ? "bg-primary text-white hover:bg-hover"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            작성 완료
          </button>
        </div>
      </main>
    </div>
  );
}