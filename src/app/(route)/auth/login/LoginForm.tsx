'use client';

import Input from "@/app/components/Input";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Link from "next/link";

type LoginInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const methods = useForm<LoginInputs>({
    mode: "onBlur",
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
          className="min-w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          validate={(value: string) =>
            value
              ? value.includes("@")
                ? true
                : "유효한 이메일 주소를 입력하세요"
              : "이메일은 필수 입력 항목입니다"
          }
        />
        <Input
          name="비밀번호"
          type="password"
          placeholder="비밀번호"
          className="min-w-full h-14 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          validate={(value: string) =>
            value
              ? /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z])(?=.*\\d).{8,}$/.test(value)
                ? true
                : "비밀번호는 최소 8자리 이상, 특수문자 포함해야 합니다."
              : "비밀번호는 필수 입력 항목입니다"
          }
        />
        <button
          type="submit"
          className="w-full h-14  bg-primary text-white rounded-md hover:bg-hover font-bold text-xl"
        >
          로그인
        </button>

        <div className="flex justify-center gap-7 mt-10 pb-5 border-b border-medium_gray">
          <Link href={'/auth/join'}>회원가입</Link>
          <Link href={'/auth/find-password'}>비밀번호 찾기</Link>
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
