"use client";

import Input from "@/app/components/Input";
import React, { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Button from "@/app/components/Button";

type JoinInputs = {
  email: string;
  emailCode: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
};

export default function JoinForm() {
  const methods = useForm<JoinInputs>({
    mode: "onChange",
    defaultValues: {
      email: '',
      emailCode: '',
      password: '',
      confirmPassword: '',
      name: '',
      nickname: '',
    },
  });


  const { handleSubmit, watch, formState: { isValid } } = methods;

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const onSubmit: SubmitHandler<JoinInputs> = (data) => {
    const { email, password, name, nickname } = data;
    const payload = { email, password, name, nickname, profileImage };

    console.log('서버로 전송할 데이터:', payload);
    // 서버로 전송
    // const formData = new FormData();
    // formData.append("email", email);
    // formData.append("password", password);
    // formData.append("name", name);
    // formData.append("nickname", nickname);
    // if (profileImage) formData.append("profileImage", profileImage);
    // fetch('/api/signup', {
    //   method: 'POST',
    //   body: formData,
    // });
  };
  const handleEmailDuplicateCheck = () => {
    const email = methods.getValues("email");
    console.log("이메일 중복 확인 요청:", email);
    // 서버에 이메일 중복 확인 요청
    // fetch('/api/check-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
  };

  const handleSendVerificationCode = () => {
    const email = methods.getValues("email");
    console.log("이메일 인증코드 발송 요청:", email);
    // 서버에 인증코드 발송 요청
    // fetch('/api/send-code', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email }),
    // });
  };

  const handleVerifyCode = () => {
    const emailCode = methods.getValues("emailCode");
    console.log("인증코드 확인 요청:", emailCode);
    // 서버에 인증코드 확인 요청
    // fetch('/api/verify-code', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ emailCode }),
    // }).then(response => setEmailVerified(true));
  };

  const password = watch('password');
  const validateConfirmPassword = (value: string) =>
    value === password || '비밀번호가 일치하지 않습니다.';

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div className="flex justify-center mb-4">
          <label htmlFor="profile-image-input" className="cursor-pointer">
            <img
              src={profileImage ? URL.createObjectURL(profileImage) : "/icons/basic-profile.png"}
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
        <div className="flex items-center">
          <Input
            name="email"
            label="이메일"
            type="email"
            placeholder="이메일을 입력하세요"
            className="w-full h-14"
            validate={(value: string) =>
              value.includes('@') || '유효한 이메일 주소를 입력하세요.'
            }
          >
            <Button
              title="중복 확인"
              btnType="button"
              handleClick={handleEmailDuplicateCheck}
              containerStyles="w-[70px] h-[30px] font-normal text-xs"
            />
          </Input>
        </div>
        <div className="flex items-center">
          <Input
            name="emailCode"
            label="이메일 인증코드"
            type="text"
            placeholder="인증코드를 입력하세요"
            className="w-full h-14"
          >
            <div className="flex gap-2">
              <Button
                title="요청"
                btnType="button"
                handleClick={handleSendVerificationCode}
                containerStyles="w-[50px] h-[30px] font-normal text-xs bg-alarm_orange text-primary"
              />
              <Button
                title="인증"
                btnType="button"
                handleClick={handleVerifyCode}
                containerStyles="w-[50px] h-[30px] font-normal text-xs"
              />
            </div>
          </Input>
        </div>
        <Input
          name="password"
          label="비밀번호"
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
        <Input
          name="confirmPassword"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          className="w-full h-14"
          validate={validateConfirmPassword}
        />
        <Input
          name="name"
          label="이름"
          type="text"
          placeholder="이름을 입력하세요"
          className="w-full h-14"
        />
        <Input
          name="nickname"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력하세요"
          className="w-full h-14"
        />
        <Button
          isDisabled={!isValid}
          title="회원가입"
          btnType="submit"
          containerStyles="w-full h-14"
        />
      </form>
    </FormProvider>
  );
}
