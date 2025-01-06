"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

interface ReviewFormProps {
  initialValues?: { title: string; content: string; isLikeClicked: boolean }; // 수정 시 초기값
  onSubmit: (data: { title: string; content: string; isLikeClicked: boolean }) => Promise<void>; // 작성/수정 핸들러
}

export default function ReviewForm({ initialValues, onSubmit }: ReviewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    reset, // 폼 초기화를 위한 reset 함수
  } = useForm({
    defaultValues: initialValues || { title: "", content: "" },
  });

  const [isLikeClicked, setIsLikeClicked] = useState(initialValues?.isLikeClicked || false);
  const handleFormSubmit: SubmitHandler<{ title: string; content: string }> = async (data) => {

    try {
      await onSubmit({ ...data, isLikeClicked });
      reset(); // 폼 초기화
    } catch (error) {
      console.error("작업 실패:", error);
    }
  };

  return (
    <form className="my-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        {...register("title", { required: "제목은 필수 입력 항목입니다." })}
        label="제목"
        className="w-full"
      />
      <label className="block text-md font-bold text-gray-700 mt-2">내용</label>
      <textarea
        {...register("content", { required: "내용은 필수 입력 항목입니다." })}
        className="w-full border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm resize-none h-96"
        placeholder="내용을 입력하세요"
      />
      {/* 추천 버튼 */}
      <div className="flex flex-col justify-center items-center mt-6">
        <div className="flex space-x-4">
          <button
            type="button"
            className={`flex items-center justify-center w-20 h-20 rounded-full ${isLikeClicked ? "bg-primary text-white" : "bg-gray-200"
              }`}
            onClick={() => setIsLikeClicked((prev) => !prev)}
          >
            {isLikeClicked ? (
              <RiThumbUpFill className="w-12 h-12" aria-label="추천됨" />
            ) : (
              <RiThumbUpLine className="w-12 h-12" aria-label="추천안됨" />
            )}
          </button>
        </div>
        <div className="text-gray-700 mt-2">이 장소를 추천하시나요?</div>
      </div>

      <div className="flex">
        <Button
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
          btnType="submit"
          containerStyles="!text-base text-[16px] font-medium ml-auto px-2 py-1 mt-2"
        >
          {initialValues ? "수정 완료" : "작성 완료"}
        </Button>
      </div>
    </form>
  );
}
