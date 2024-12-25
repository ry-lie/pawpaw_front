"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useModalStore } from "@/stores/modalStore";
import { SubmitHandler, useForm } from "react-hook-form";
import FindPasswordModal from "./FindPasswordModal";

type NicknameInput = {
  nickname: string;
};

export default function ModifyForm() {
  const { openModal } = useModalStore();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NicknameInput>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<NicknameInput> = (data) => {
    const { nickname } = data;
    const payload = { nickname };
    // fetch('/nickname',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json",
    //     },
    //     body:JSON.stringify(data)
    // });
    console.log("data", payload);
  };
  const DisableBtn = !watch("nickname")||Object.keys(errors).length>0;

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        닉네임
        <Input
          type="string"
          className="w-80 h-10"
          {...register("nickname", {
            required: "닉네임을 입력해주세요",
          })}
          errorMessage={errors.nickname?.message}
        />
      </form>
      <div className="flex justify-start w-full mt-2">
        <div
          className="flex font-medium text-xs underline underline-offset-4 text-blue-400 hover:text-blue-200 cursor-pointer"
          onClick={() => openModal(<FindPasswordModal />)}
        >
          비밀번호 변경
        </div>
      </div>
      <div className="space-x-10 mt-10">
        <Button btnType="button" containerStyles="bg-stroke_gray w-20 h-10">
          취소
        </Button>
        <Button btnType="submit" disabled={DisableBtn} containerStyles="w-20 h-10">
          확인
        </Button>
      </div>
    </div>
  );
}
