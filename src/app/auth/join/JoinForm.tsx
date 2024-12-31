"use client";

import Input from "@/components/Input";
import React, { useEffect, useState } from "react";
import { useForm, useFormState, SubmitHandler } from "react-hook-form";
import Button from "@/components/Button";
import Image from "next/image";
import BasicProfile from "@/assets/icons/profile_icon.png";
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
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<JoinInputs>({
    mode: "onChange",
  });

  const { isValid } = useFormState({ control });
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);  // 이메일 중복 확인
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);  // 닉네임 중복 확인
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

  const onSubmit: SubmitHandler<JoinInputs> = async (data) => {
    const payload: RegisterPayload = {
      email: data.email,
      password: data.password,
      name: data.name,
      nickname: data.nickname,
      profileImage: profileImageFile,
    };

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
    const email = getValues("email") || "";

    if (!email.trim()) {
      control.setError("email", {
        type: "manual",
        message: "이메일을 먼저 입력해주세요.",
      });
      return;
    }
    try {
      const email = getValues("email") || "";
      const response = await checkEmailDuplicate(email);
      console.log("이메일 중복 확인 성공:", response);
      setIsEmailChecked(true);
    } catch (error) {
      console.error("이메일 중복 확인 실패:", error);
      control.setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다.",
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
      control.setError("emailCode", {
        type: "manual",
        message: "다시 요청해주세요.",
      });
    }
  };

  const handleVerifyCode = async () => {
    const emailCode = getValues("emailCode") || "";

    if (!emailCode.trim()) {
      control.setError("emailCode", {
        type: "manual",
        message: "인증코드를 먼저 입력해주세요.",
      });
      return;
    }
    try {
      const email = getValues("email") || "";
      const verificationCode = getValues("emailCode") || "";
      const response = await verifyCode(email, verificationCode);
      console.log("인증 코드 확인 성공:", response);
    } catch (error) {
      console.error("인증 코드 확인 실패:", error);
      control.setError("emailCode", {
        type: "manual",
        message: "인증코드가 올바르지 않습니다.",
      });
    }
  };

  const handleNicknameDuplicateCheck = async () => {
    const nickname = getValues("nickname") || "";

    if (!nickname.trim()) {
      control.setError("nickname", {
        type: "manual",
        message: "닉네임을 먼저 입력해주세요.",
      });
      return;
    }
    try {
      const nickname = getValues("nickname") || "";
      const response = await checkNicknameDuplicate(nickname);
      console.log("닉네임 중복 확인 성공:", response);
      setIsNicknameChecked(true);
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
      control.setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 프로필 이미지 업로드 */}
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
          disabled={!getValues("email") || isEmailChecked}
          containerStyles={`w-[70px] h-[30px] font-normal text-xs ${!getValues("email") || isEmailChecked ? "bg-gray-300 text-gray-500" : "bg-primary text-white"
            }`}
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
            disabled={!getValues("email") || isEmailChecked}

            containerStyles={`w-[50px] h-[30px] font-normal text-xs !bg-alarm_orange !text-primary ${!getValues("email") || isEmailChecked
              ? "bg-gray-300 text-gray-500"
              : "bg-primary text-white"
              }`}
          >
            요청
          </Button>
          <Button
            btnType="button"
            onClick={handleVerifyCode}
            disabled={!getValues("emailCode")}
            containerStyles={`w-[50px] h-[30px] font-normal text-xs ${!getValues("emailCode") ? "bg-gray-300 text-gray-500" : "bg-primary text-white"
              }`}
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
          disabled={!getValues("nickname") || isNicknameChecked} // 닉네임 입력 여부와 중복 확인 상태 반영
          containerStyles={`w-[70px] h-[30px] font-normal text-xs ${!getValues("nickname") || isNicknameChecked
            ? "bg-gray-300 text-gray-500"
            : "bg-primary text-white"
            }`}
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
