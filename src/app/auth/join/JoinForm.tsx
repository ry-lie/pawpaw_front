"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import BasicProfile from "@/assets/icons/profile_icon.png";
import { registerAPI, RegisterPayload } from "@/lib/api/auth";
import { useDuplicateCheck } from "./useDuplicateCheck";
import { errorToast, successToast } from "@/utils/toast";
import { PATHS } from "@/constants/path";
import { useRouter } from "next/navigation";

interface JoinInputs {
  email: string;
  emailCode: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
}

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
    setError
  } = useForm<JoinInputs>({ mode: "onChange" });
  const router = useRouter();
  const [isEmailSending, setIsEmailSending] = useState(false); // 이메일 요청 로딩 상태
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null); // 업로드된 이미지 파일 상태
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null); // 미리보기 URL

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setProfileImageFile(file);

      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };
  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  const {
    isEmailChecked,
    isNicknameChecked,
    isVerificationEnabled,
    handleEmailCheck,
    handleNicknameCheck,
    handleEmailVerification,
    handleCodeVerification
  } = useDuplicateCheck({ getValues, setError });

  const onSubmit = async (data: JoinInputs) => {
    const payload: RegisterPayload = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      image: profileImageFile,
    };
    try {
      await registerAPI(payload);
      router.push(PATHS.LOGIN);
      successToast("회원가입 성공하셨습니다.")
    } catch (error) {
      errorToast("회원가입을 다시 시도해주세요.")
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex justify-center mb-4">
        <label htmlFor="profile-image-input" className="cursor-pointer">
          <Image
            src={profileImageUrl || BasicProfile.src}
            alt="프로필 이미지"
            className="rounded-full border-2 border-gray-300 w-24 h-24 object-cover"
            width={96}
            height={96}
          />
        </label>
        <input
          id="profile-image-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImageChange}
        />
      </div>

      <Input
        label="이메일"
        type="email"
        className="w-full h-12"
        {...register("email", {
          required: "이메일은 필수 입력 항목입니다.",
          pattern: { value: /\S+@\S+\.\S+/, message: "유효한 이메일 주소를 입력하세요" },
        })}
        errorMessage={errors.email?.message}
      >
        <Button
          btnType="button"
          onClick={handleEmailCheck}
          disabled={!getValues("email")}
          containerStyles={`w-[70px] h-[30px] font-normal text-xs ${!getValues("email") ? "bg-gray-300 text-gray-500" : "bg-primary text-white"}`}
        >
          중복 확인
        </Button>
      </Input>

      <Input
        label="이메일 인증코드"
        type="text"
        className="w-full h-12"
        {...register("emailCode", { required: "인증코드를 입력하세요" })}
        errorMessage={errors.emailCode?.message}
      >
        <div className="flex gap-2">
          <Button
            btnType="button"
            onClick={async () => {
              const email = getValues("email") || "";
              const emailPattern = /\S+@\S+\.\S+/;

              if (!email.trim()) {
                setError("email", {
                  type: "manual",
                  message: "이메일을 입력해주세요.",
                });
                return;
              }

              if (!emailPattern.test(email)) {
                setError("email", {
                  type: "manual",
                  message: "유효한 이메일 주소를 입력하세요.",
                });
                return;
              }

              try {
                setIsEmailSending(true);
                await handleEmailVerification();
              } finally {
                setIsEmailSending(false);
              }
            }}
            isLoading={isEmailSending}
            disabled={!isVerificationEnabled || isEmailSending}
            containerStyles={`w-[50px] h-[30px] font-normal text-xs ${isEmailSending ? "bg-gray-300 text-gray-500" : "!bg-alarm_orange !text-primary"
              }`}
          >
            {isEmailSending ? "로딩중" : "요청"}
          </Button>
          <Button
            btnType="button"
            onClick={handleCodeVerification}
            disabled={!getValues("emailCode") || !isEmailChecked}
            containerStyles={`w-[50px] h-[30px] font-normal text-xs ${!getValues("emailCode") ? "bg-gray-300 text-gray-500" : "bg-primary text-white"
              }`}
          >
            인증
          </Button>
        </div>
      </Input>

      <Input
        label="비밀번호"
        type="password"
        className="w-full h-12"
        {...register("password", {
          required: "비밀번호는 필수 입력 항목입니다.",
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            message: "대/소문자, 숫자, 특수문자 포함 최소 8자리 이상입니다."
          },
        })}
        errorMessage={errors.password?.message}
      />

      <Input
        label="비밀번호 확인"
        type="password"
        className="w-full h-12"
        {...register("confirmPassword", {
          required: "비밀번호 확인은 필수 입력 항목입니다",
          validate: (value, allFormData) =>
            value === allFormData.password || "비밀번호가 일치하지 않습니다.",
        })}
        errorMessage={errors.confirmPassword?.message}
      />

      <Input
        label="이름"
        type="text"
        className="w-full h-12"
        {...register("name", {
          required: "이름은 필수 입력 항목입니다.",
          maxLength: { value: 30, message: "이름은 최대 30글자 이하로 입력해야 합니다." },
        })}
        errorMessage={errors.name?.message}
      />

      <Input
        label="닉네임"
        type="text"
        className="w-full h-12 mb-3"
        {...register("nickname", {
          required: "닉네임은 필수 입력 항목입니다.",
          maxLength: { value: 30, message: "닉네임은 최대 30글자 이하로 입력해야 합니다." },
        })}
        errorMessage={errors.nickname?.message}
      >
        <Button
          btnType="button"
          onClick={handleNicknameCheck}
          disabled={!getValues("nickname")}
          containerStyles={`w-[70px] h-[30px] font-normal text-xs mb-3 ${!getValues("nickname") ? "bg-gray-300 text-gray-500" : "bg-primary text-white"}`}
        >
          중복 확인
        </Button>
      </Input>

      <Button
        disabled={!isValid || isSubmitting || !isEmailChecked || !isNicknameChecked}
        isLoading={isSubmitting}
        btnType="submit"
        containerStyles={`w-full h-12 !text-lg !font-medium ${isValid && isEmailChecked && isNicknameChecked && !isSubmitting ? "bg-primary text-white" : "bg-gray-300 text-gray-500"}`}
      >
        회원가입
      </Button>
    </form>
  );
}