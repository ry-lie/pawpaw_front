"use client";

import Input from "@/components/Input";
import React, { useState } from "react";
import { useForm, useFormState, SubmitHandler, useWatch } from "react-hook-form";
import Button from "@/components/Button";
import Image from "next/image";
import BasicProfile from "@/assets/icons/profile_icon.png";

type JoinInputs = {
  email: string;
  emailCode: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
};

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<JoinInputs>({
    mode: "onChange",
  });

  const { isValid } = useFormState({ control });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<JoinInputs> = async (data) => {
    const { email, password, name, nickname } = data;
    const payload = { email, password, name, nickname, profileImage };

    console.log("서버로 전송할 데이터:", payload);

    setIsLoading(true);
    try {
      // 회원가입 로직 작성 예정
      console.log("회원가입 성공");
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailDuplicateCheck = () => {
    console.log("이메일 중복 확인 요청");
  };

  const handleSendVerificationCode = () => {
    console.log("인증 코드 요청");
  };

  const handleVerifyCode = () => {
    console.log("인증 코드 확인");
  };

  const password = useWatch({
    control,
    name: "password",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 프로필 이미지 업로드 */}
      <div className="flex justify-center mb-4">
        <label htmlFor="profile-image-input" className="cursor-pointer">
          <Image
            src={profileImage ? URL.createObjectURL(profileImage) : BasicProfile}
            alt="프로필 이미지"
            className="rounded-full border-2 border-gray-300 w-24 h-24 object-cover"
          />
        </label>
        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setProfileImage(file);
            }
          }}
        />
      </div>

      {/* 이메일 입력 */}
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        className="w-full h-12"
        {...register("email", {
          required: "이메일은 필수 입력 항목입니다.",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "유효한 이메일 주소를 입력하세요",
          },
        })}
        errorMessage={errors.email?.message}
      >
        <Button
          btnType="button"
          onClick={handleEmailDuplicateCheck}
          containerStyles="w-[70px] h-[30px] font-normal text-xs"
        >
          중복 확인
        </Button>
      </Input>

      {/* 이메일 인증 */}
      <Input
        label="이메일 인증코드"
        type="text"
        placeholder="인증코드를 입력하세요"
        className="w-full h-12"
        {...register("emailCode", {
          required: "인증코드를 입력하세요",
        })}
        errorMessage={errors.emailCode?.message}
      >
        <div className="flex gap-2">
          <Button
            btnType="button"
            onClick={handleSendVerificationCode}
            containerStyles="w-[50px] h-[30px] font-normal text-xs !bg-alarm_orange !text-primary"
          >
            요청
          </Button>
          <Button
            btnType="button"
            onClick={handleVerifyCode}
            containerStyles="w-[50px] h-[30px] font-normal text-xs"
          >
            인증
          </Button>
        </div>
      </Input>

      {/* 비밀번호 입력 */}
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        className="w-full h-12"
        {...register("password", {
          required: "비밀번호는 필수 입력 항목입니다.",
          pattern: {
            value: /^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/,
            message: "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.",
          },
        })}
        errorMessage={errors.password?.message}
      />

      {/* 비밀번호 확인 */}
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        className="w-full h-12"
        {...register("confirmPassword", {
          required: "비밀번호 확인은 필수 입력 항목입니다",
          validate: (value, allFormData) =>
            value === allFormData.password || "비밀번호가 일치하지 않습니다.",
        })}
        errorMessage={errors.confirmPassword?.message}
      />

      {/* 이름 입력 */}
      <Input
        label="이름"
        type="text"
        placeholder="이름을 입력하세요"
        className="w-full h-12"
        {...register("name", {
          required: "이름은 필수 입력 항목입니다.",
        })}
        errorMessage={errors.name?.message}
      />

      {/* 닉네임 입력 */}
      <Input
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력하세요"
        className="w-full h-12"
        {...register("nickname", {
          required: "닉네임은 필수 입력 항목입니다.",
        })}
        errorMessage={errors.nickname?.message}
      >
        <Button
          btnType="button"
          onClick={handleEmailDuplicateCheck}
          containerStyles="w-[70px] h-[30px] font-normal text-xs"
        >
          중복 확인
        </Button>
      </Input>

      {/* 회원가입 버튼 */}
      <Button
        disabled={!isValid || isLoading}
        isLoading={isLoading}
        btnType="submit"
        containerStyles="w-full h-14"
      >
        회원가입
      </Button>
    </form>
  );
}
