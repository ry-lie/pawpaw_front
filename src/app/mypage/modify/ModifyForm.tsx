"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useModalStore } from "@/stores/modalStore";
import { SubmitHandler, useForm } from "react-hook-form";
import FindPasswordModal from "./FindPasswordModal";
import Link from "next/link";
import axios from "axios";

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

  const onSubmit: SubmitHandler<NicknameInput> = async(data) => {
    // try{
    //   const res = await axios.post('/nickname', data,{
    //     headers:{
    //       "Content-Type" : "application/json",
    //     },
    //   });
    //   console.log('res', res.data)
    // }
    // catch(e){
    //   console.error('Error:', e)
    // }
    //const { nickname } = data;
    //const payload = { nickname };
    console.log("data");
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
        >
          <Button containerStyles="!text-base font-normal border bg-transparent !text-primary border-solid border-primary hover:!text-white">
            중복확인
          </Button>
        </Input>
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
          <Link href={'/mypage'}>
          취소
          </Link>
        </Button>
        <Button btnType="submit" disabled={DisableBtn} containerStyles="w-20 h-10">
          확인
        </Button>
      </div>
    </div>
  );
}
