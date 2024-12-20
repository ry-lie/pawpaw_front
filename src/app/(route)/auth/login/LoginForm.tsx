"use client";

import Input from "@/app/components/Input";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "@/app/components/Button";
import { PATHS } from "@/app/constants/path";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const methods = useForm<LoginInputs>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<LoginInputs> = data => {
    // fetch('/login', {
    //   method: 'POSt' ,
    //   headers: {
    //     "Content-Type" : "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    console.log(data);
  };
  const handleKakaoLogin = async () => {
    try {
      await signIn("kakao", { callbackUrl: "/" });
    } catch (error) {
      console.error("Kakao login failed", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          name="이메일"
          type="email"
          placeholder="이메일"
          className="w-full h-14"
          validate={(value: string) =>
            value
              ? value.includes("@")
                ? true
                : "유효한 이메일 주소를 입력하세요"
              : "이메일은 필수 입력 항목입니다"
          }
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          className="w-full h-14"
          validate={(value: string) =>
            value
              ? /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(value)
                ? true
                : "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다."
              : "비밀번호는 필수 입력 항목입니다"
          }
        />
        <Button
          title="로그인"
          btnType="submit"
          containerStyles="w-full h-14"
        />

        <div className="flex justify-center gap-7 mt-10 pb-5 border-b border-medium_gray">
          <Link href={PATHS.JOIN}>회원가입</Link>
          <Link href={PATHS.FIND_PASSWORD}>비밀번호 찾기</Link>
        </div>

        <button
          type="button"
          onClick={handleKakaoLogin}
        >
          <img src="/images/kakaoResource/kakao_login_large_wide.png" alt="카카오 로그인" className="mt-5" />
        </button>
      </form>
    </FormProvider>
  );
}
