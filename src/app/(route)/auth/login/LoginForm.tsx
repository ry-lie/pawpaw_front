"use client";

import Input from "@/app/components/Input";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "@/app/components/Button";
import { PATHS } from "@/app/constants/path";
import KakaoLoginButton from "@/app/assets/images/kakaoResource/kakao_login_large_wide.png";
import Image from "next/image";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginInputs> = data => {
    console.log(data);
  };
  const handleKakaoLogin = async () => {
    try {
      await signIn("kakao", { callbackUrl: PATHS.MAIN });
    } catch (error) {
      console.error("Kakao login failed", error);
    }
  };

  return (

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        placeholder="이메일"
        className="w-full h-14"
        {...register("email", {
          validate: (value: string) =>
            value
              ? value.includes("@")
                ? true
                : "유효한 이메일 주소를 입력하세요"
              : "이메일은 필수 입력 항목입니다",
        })}
        errorMessage={errors.email?.message}
      />

      <Input
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="w-full h-14"
        {...register("password", {
          validate: (value: string) => {
            if (!value) return "비밀번호는 필수 입력 항목입니다";
            if (!/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/.test(value)) {
              return "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.";
            }
            return true;
          }
        })}
        errorMessage={errors.password?.message}
      />
      <Button
        btnType="submit"
        containerStyles="w-full h-14"
      >
        로그인
      </Button>

      <div className="flex justify-center gap-7 mt-10 pb-5 border-b border-medium_gray">
        <Link href={PATHS.JOIN}>회원가입</Link>
        <Link href={PATHS.FIND_PASSWORD}>비밀번호 찾기</Link>
      </div>

      <button
        type="button"
        onClick={handleKakaoLogin}
      >
        <Image src={KakaoLoginButton} alt="카카오 로그인" className="mt-5" />
      </button>
    </form>
  );
}
