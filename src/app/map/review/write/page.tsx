"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ReviewProps {
  title: string;
  description: string;
}

export default function ReviewWritePage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ReviewProps>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ReviewProps> = async (data) => {
    const { title, description } = data;
    const payload = { title, description };

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
    <div className="mt-14 px-4">
      <h1 className="text-lg font-semibold">리뷰 남기기</h1>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
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
    </div>
  );
}
