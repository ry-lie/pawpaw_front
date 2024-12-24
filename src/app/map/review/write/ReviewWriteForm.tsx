"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

interface ReviewProps {
  title: string;
  description: string;
  isRecommended: boolean;
}

export default function ReviewWriteFormPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Omit<ReviewProps, "isRecommended">>(); // 추천 여부는 별도로 관리
  const [isLoading, setIsLoading] = useState(false);
  const [isRecommended, setIsRecommended] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Omit<ReviewProps, "isRecommended">> = async (data) => {
    const { title, description } = data;
    const payload: ReviewProps = { title, description, isRecommended };

    console.log("서버로 전송할 데이터:", payload);

    setIsLoading(true);
    try {
      await axiosInstance.post("/api/reviews", payload);
      alert("리뷰가 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("title", { required: "제목은 필수 입력 항목입니다." })}
        label="제목"
        className="w-full"
      />
      <label className="block text-md font-bold text-gray-700 mt-2">내용</label>
      <textarea
        {...register("description", { required: "내용은 필수 입력 항목입니다." })}
        className="w-full border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm resize-none h-96"
        placeholder="내용을 입력하세요"
      />
      {/* 추천 버튼 */}
      <div className="flex flex-col justify-center items-center mt-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={`flex items-center justify-center w-20 h-20 rounded-full ${isRecommended ? "bg-primary text-white" : "bg-gray-200"
              }`}
            onClick={() => setIsRecommended((prev) => !prev)} // 토글 동작
          >
            {isRecommended ? (
              <RiThumbUpFill className="w-12 h-12" aria-label="추천됨" />
            ) : (
              <RiThumbUpLine className="w-12 h-12" aria-label="추천" />
            )}
          </button>
        </div>
        <div className="text-gray-700 mt-2">이 장소를 추천하시나요?</div>
      </div>

      <div className="flex">
        <Button
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          btnType="submit"
          containerStyles="text-[16px] font-medium ml-auto px-2 mt-2"
        >
          작성
        </Button>
      </div>
    </form>
  );
}
