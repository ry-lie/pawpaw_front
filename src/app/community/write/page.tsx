"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ArrowBack from "@/assets/icons/arrowBack.png";
import { handleImageUploading } from "@/utils/imageUpload";
import { createPostAPI, updatePostAPI, PostPayload, fetchBoardDetail } from "@/lib/api/board";
import { errorToast, successToast } from "@/utils/toast";
import { PATHS } from "@/constants/path";

export default function CommunityWritePage({
  mode = "create", // 기본값은 작성 모드
  postId,
}: {
  mode: "create" | "edit";
  postId?: number; // 수정 모드일 경우 게시글 ID
}) {
  const router = useRouter();
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; isPrimary: boolean; file: File }[]
  >([]);
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // 게시글 데이터 로드
  useEffect(() => {
    if (mode === "edit" && postId) {
      const loadPostData = async () => {
        try {
          const response = await fetchBoardDetail(postId); // 게시글 데이터 불러오기
          const post = response.data.body.data;
          // 상태 업데이트
          setUploadedImages(
            post.imageList.map((url: string) => ({
              url,
              file: null, // 기존 이미지는 URL로 처리
            }))
          );
          setCategory(post.category);
          setTitle(post.title);
          setContent(post.content);
        } catch (error) {
          errorToast("게시글 데이터를 불러오는 데 실패했습니다.");
        }
      };
      loadPostData();
    }
  }, [mode, postId]);

  const handleChangeImage = handleImageUploading((file) => {
    if (uploadedImages.length >= 4) {
      errorToast("이미지는 최대 4장까지만 업로드 가능합니다.");
      return;
    }
    setUploadedImages((prev) => [
      ...prev,
      { url: URL.createObjectURL(file), isPrimary: false, file },
    ]);
  });

  // 게시글 작성 or 수정
  const handleSubmit = async () => {
    // 유효성 검사
    const isTitleValid = title.trim().length > 0 && title.trim().length <= 30;
    const isContentValid =
      content.trim().length > 0 && new Blob([content]).size <= 1000;
    const isFormValid = isTitleValid && isContentValid && category;

    if (!isFormValid) {
      errorToast("입력한 정보를 확인해주세요.");
      return;
    }
    const payload: PostPayload = {
      imageList: uploadedImages.map((image) => image.file),
      category,
      title,
      content,
    };
    try {
      if (mode === "create") {
        // 작성 모드
        const response = await createPostAPI(payload);
        successToast("게시글이 작성되었습니다!");
        router.push(PATHS.COMMUNITY);
      } else if (mode === "edit" && postId) {
        // 수정 모드
        await updatePostAPI(postId, payload);
        successToast("게시글이 수정되었습니다!");
        router.push(`/community/${postId}`);
      }
    } catch (error) {
      errorToast("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  {/* 카테고리 매핑 */ }
  const categoryMapping: { [key: string]: string } = {
    "펫 자랑": "PROUD_PETS",
    "고민 상담": "CONSULTATION",
    "임시 보호": "PROTECT",
    "일상": "LIFE",
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-background p-2 h-12 flex items-center">
        <button
          className="text-gray-700 font-bold"
          onClick={() => router.back()}
        >
          <Image src={ArrowBack} alt="뒤로가기 아이콘" className="w-8 h-8" />
        </button>
      </header>

      <main className="p-4 xs:p-6">
        {/* 이미지 업로드 */}
        <section className="mb-6">
          <div className="flex space-x-2 xs:space-x-4">
            <label
              htmlFor="image-upload"
              className={`w-16 h-16 xs:w-24 xs:h-24 flex items-center justify-center rounded-lg shadow cursor-pointer ${uploadedImages.length >= 4
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-gray-200"
                }`}
              style={
                uploadedImages.length >= 4
                  ? { pointerEvents: "none" }
                  : undefined
              }
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
            {uploadedImages.map((image, index) => (
              <div
                key={index}
                className="relative w-16 h-16 xs:w-24 xs:h-24 rounded-lg shadow bg-cover"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div
                  className="absolute top-1 right-1 bg-white bg-opacity-30 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hover:bg-primary hover:bg-opacity-70"
                  onClick={() =>
                    setUploadedImages((prev) =>
                      prev.filter((_, i) => i !== index)
                    )
                  }
                >
                  <span className="text-xs xs:text-sm font-normal text-strong_gray hover:text-white">
                    x
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs xs:text-sm text-gray-500 mt-2 ml-3 xs:ml-6">
            최대 4장
          </p>
        </section>

        {/* 카테고리 선택 */}
        <section className="mb-6">
          <h2 className="text-base xs:text-lg font-bold mb-2">카테고리</h2>
          <div className="flex space-x-2 justify-around">
            {Object.keys(categoryMapping).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(categoryMapping[cat])} // 카테고리 설정
                className={`w-full px-2 py-0.5 xs:px-4 xs:py-1 text-sm xs:text-base border border-solid border-stroke_gray rounded-xl focus:ring-2 focus:ring-primary ${category === categoryMapping[cat] ? "bg-white text-accent_orange font-semibold" : "bg-background"
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
            className={`w-full text-sm xs:text-base px-4 py-2 border rounded-lg ${title.trim().length > 0 && title.trim().length <= 30
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
            className={`w-full text-sm xs:text-base px-4 py-2 border rounded-lg ${content.trim().length > 0 && new Blob([content]).size <= 1000
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
            className={`text-sm xs:text-base px-3 py-1 xs:px-5 xs:py-2 font-semibold rounded-lg ${title && content && category
              ? "bg-primary text-white hover:bg-hover"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            onClick={handleSubmit}
          >
            작성 완료
          </button>
        </div>
      </main>
    </div>
  );
}