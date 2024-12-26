"use client";

import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import Image from "next/image";
import BasicProfile from "@/assets/icons/profile_icon.png";
import { convertFileToBase64, convertImageToBase64 } from "@/utils/imageConverter";
import { checkEmailDuplicate, checkNicknameDuplicate, registerAPI, RegisterPayload, sendVerificationCode, verifyCode } from "@/lib/api/auth";

interface JoinInputs {
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
    getValues,
    formState: { errors },
  } = useForm<JoinInputs>({
    mode: "onChange",
  });

  const { isValid } = useFormState({ control });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string>("/images/profile_icon.png"); // 기본 프로필 이미지 경로
  const [isEmailChecked, setIsEmailChecked] = useState(false);  // 이메일 중복 확인
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);  // 닉네임 중복 확인
  // 기본 프로필 이미지를 Base64로 변환하여 상태에 설정
  useEffect(() => {
    const initializeProfileImage = async () => {
      try {
        const base64Image = await convertImageToBase64(BasicProfile.src);
        setProfileImage(base64Image);
      } catch (error) {
        console.error("기본 프로필 이미지 변환 실패:", error);
      }
    };

    initializeProfileImage();
  }, []);

  // 업로드된 프로필 이미지를 Base64로 변환하여 상태에 설정
  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64Image = await convertFileToBase64(file);
        setProfileImage(base64Image);
      } catch (error) {
        console.error("이미지 업로드 변환 실패:", error);
      }
    }
  };
  const onSubmit: SubmitHandler<JoinInputs> = async (data) => {
    const { email, password, name, nickname } = data;
    const payload = { email, password, name, nickname, profileImage };
    setIsLoading(true);
    try {
      const response = await registerAPI(payload);
      console.log("회원가입 성공:", response);
    } catch (error) {
      console.error("회원가입 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailDuplicateCheck = async () => {
    try {
      const email = getValues("email") || "";
      const response = await checkEmailDuplicate(email);
      console.log("이메일 중복 확인 성공:", response);
      setIsEmailChecked(true);
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      control.setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.",
      });
    }
  };

  const handleSendVerificationCode = async () => {
    try {
      const email = getValues("email") || "";
      const response = await sendVerificationCode(email);
      console.log("인증 코드 요청 성공:", response);
    } catch (error) {
      console.error("인증 코드 요청 실패:", error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const email = getValues("email") || "";
      const verificationCode = getValues("emailCode") || "";
      const response = await verifyCode(email, verificationCode);
      console.log("인증 코드 확인 성공:", response);
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
    }
  };

  const handleNicknameDuplicateCheck = async () => {
    try {
      const nickname = getValues("nickname") || "";
      const response = await checkNicknameDuplicate(nickname);
      console.log("닉네임 중복 확인 성공:", response);
      setIsNicknameChecked(true);
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      control.setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 프로필 이미지 업로드 */}
      <div className="flex justify-center mb-4">
        <label htmlFor="profile-image-input" className="cursor-pointer">
          <Image
            src={profileImage || BasicProfile.src}
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
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            message: "대/소문자, 숫자, 특수문자 포함 최소 8자리 이상입니다."
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
          maxLength: {
            value: 30,
            message: "이름은 최대 30글자 이하로 입력해야 합니다.",
          },
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
          maxLength: {
            value: 30,
            message: "닉네임은 최대 30글자 이하로 입력해야 합니다.",
          },
        })}
        errorMessage={errors.nickname?.message}
      >
        <Button
          btnType="button"
          onClick={handleNicknameDuplicateCheck}
          containerStyles="w-[70px] h-[30px] font-normal text-xs"
        >
          중복 확인
        </Button>
      </Input>

      {/* 회원가입 버튼 */}
      <Button
        disabled={!isValid || isLoading || !isEmailChecked || !isNicknameChecked}
        isLoading={isLoading}
        btnType="submit"
        containerStyles="w-full h-14"
      >
        회원가입
      </Button>
    </form>
  );
}
