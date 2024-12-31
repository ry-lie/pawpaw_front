"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/Button";
import { PATHS } from "@/constants/path";
import KakaoLoginButton from "@/assets/images/kakaoResource/kakao_login_large_wide.png";
import Image from "next/image";
import { loginAPI } from "@/lib/api/auth";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    mode: "onChange",
  });

  const { isValid } = useFormState({ control });
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const { email, password } = data;
    const payload = { email, password };

    setIsLoading(true);
    try {
      const response = await loginAPI(payload);
      if (response.status === 200) {
        console.log("로그인 성공", response);
        const { id, nickname } = response.data.body.data.user;
        useUserStore.getState().login({ id, nickname });
        router.push(PATHS.MAIN);
      } else {
        setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      setLoginError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setIsLoading(false);
    }
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
          required: "이메일은 필수 입력 항목입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "유효한 이메일 주소를 입력하세요",
          },
        })}
        errorMessage={errors.email?.message}
      />

      <Input
        type="password"
        placeholder="비밀번호"
        className="w-full h-14"
        {...register("password", {
          required: "비밀번호는 필수 입력 항목입니다.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            message: "대/소문자, 숫자, 특수문자 포함 최소 8자리 이상입니다."
          },
        })}
        errorMessage={errors.password?.message}
      />
      {loginError && <p className="text-red-500 text-sm">{loginError}</p>} {/* 에러 메시지 표시 */}
      <Button
        disabled={!isValid || isLoading}
        isLoading={isLoading}
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
