"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import Confirm_icon from "@/assets/icons/confirm_icon.png";
import BasicProfile from "@/assets/icons/profile_icon.png";
import { errorToast, successToast } from "@/utils/toast";
import { useUserStore } from "@/stores/userStore";
import { useDuplicateCheck } from "@/app/auth/join/useDuplicateCheck";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";
import { getMyPage, updateUser } from "@/lib/api/user"; 

interface Pet {
  id: string;
  name: string;
  age: number;
}

interface MyPageResponse {
  id: string;
  nickname: string;
  email: string;
  canWalkingMate: boolean;
  imageUrl: string;
  petList: Pet[];
}

interface FormInput {
  nickname: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
  emailCode: string;
}

export default function UserProfileForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const userNickname = useUserStore((state) => state.nickname);
  const userId = useUserStore((state) => state.id);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {
      email: "",
      emailCode: "",
    },
  });

  const nickname = useWatch({ control, name: "nickname" });
  const password = useWatch({ control, name: "password" });
  const newPassword = useWatch({ control, name: "newPassword" });
  const confirmPassword = useWatch({ control, name: "confirmPassword" });

  // 새 비밀번호와 비밀번호 확인이 일치하는지 체크
  const isPasswordMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  // 버튼 비활성화 조건
  const DisabledBtn =
    !nickname ||
    (!newPassword && !password) ||
    (newPassword && !isPasswordMatch) ||
    Object.keys(errors).length > 0;

  // 프로필 이미지 변경
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImageFile(file);

      // 기존 URL 정리
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
      // 미리보기용 URL 생성
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  // 마이페이지 정보 불러오기 (이메일 등)
  useEffect(() => {
    const fetchUserEmail = async () => {
      if (userId) {
        try {
          const response: MyPageResponse = await getMyPage();
          setUserEmail(response.email);
        } catch (e) {
          console.error("사용자의 정보를 가져오지 못했습니다.", e);
        }
      }
    };
    fetchUserEmail();

    return () => {
      // 컴포넌트 언마운트 시 URL 해제
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [userId, profileImageUrl]);

  // 폼 전송
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!userId) {
      errorToast("로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      setIsLoading(true);

      // 폼데이터 생성
      const formData = new FormData();
      // 닉네임이 변경되었을 경우만
        formData.append("nickname", data.nickname);
      // }
      // 이미지를 선택한 경우만
      if (profileImageFile) {
        formData.append("image", profileImageFile);
      }

      // 만약 비밀번호 관련 로직을 서버에 보내고 싶다면(옵션):
        formData.append("password", data.password);
        formData.append("newPassword", data.newPassword);
      // }
    const response =await updateUser(formData);
    console.log(response);

      successToast("회원정보 수정이 완료되었습니다.");
      router.push(PATHS.LOGIN);
    } catch (err) {
      console.error(err);
      errorToast("회원정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const { handleNicknameCheck } = useDuplicateCheck({
    getValues,
    setError,
  });

  return (
    <div className="flex flex-col mt-12 mb-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2"
      >
        {/* 1. 회원정보 수정 타이틀 */}
        <div className="flex flex-col items-center mt-3 mb-3">
          <h1 className="text-2xl font-bold">회원정보 수정</h1>
        </div>

        {/* 2. 프로필 이미지 섹션 */}
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="profile-image-input" className="cursor-pointer">
              <Image
                src={profileImageUrl || BasicProfile}
                alt="프로필 이미지"
                width={96}
                height={96}
                className="rounded-full w-36 h-36"
              />
            </label>
            <Input
              name="fileInput"
              type="file"
              id="profile-image-input"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleProfileImageChange}
            />
            {userEmail && (
              <div className="text-base mt-2 text-left">
                {userEmail}
              </div>
            )}
        </div>

        {/* 3. 입력 필드 섹션 */}
        <div className="flex flex-col">
          <div className="space-y-3">
            <Input
                label="닉네임"
                type="string"
                className="w-80 h-10"
                placeholder={userNickname}
                {...register("nickname", {
                  required: "닉네임을 입력해주세요",
                })}
                errorMessage={errors.nickname?.message}
              >
                <Button
                  onClick={handleNicknameCheck}
                  containerStyles="!text-sm !font-medium !bg-alarm_orange hover:!bg-orange-200 !text-primary hover:!text-white p-1"
                >
                  중복확인
                </Button>
            </Input>

            <Input
              label="비밀번호"
              id="password"
              type="password"
              className="h-10 w-80"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>-])[A-Za-z\d!@#$%^&*(),.?":{}|<>-]{8,}$/,
                  message:
                    "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.",
                },
              })}
              errorMessage={errors.password?.message}
            />

            <Input
              label="새 비밀번호"
              id="newPassword"
              type="password"
              className="h-10 w-80"
              {...register("newPassword", {
                required: "새 비밀번호를 입력해주세요",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>-])[A-Za-z\d!@#$%^&*(),.?":{}|<>-]{8,}$/,
                  message:
                    "비밀번호는 최소 8자리 이상, 특수문자를 포함해야 합니다.",
                },
              })}
              errorMessage={errors.newPassword?.message}
            />

            <Input
              label="비밀번호 확인"
              id="confirmPassword"
              type="password"
              className="h-10 w-80"
              {...register("confirmPassword", {
                required: "비밀번호를 입력해주세요",
                validate: (value: string) =>
                  value === newPassword || "비밀번호가 일치하지 않습니다.",
              })}
              errorMessage={errors.confirmPassword?.message}
            >
              {isPasswordMatch && (
                <Image src={Confirm_icon} alt="체크표시" className="h-5 w-5" />
              )}
            </Input>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="space-x-10 mt-10 flex justify-center pt-5">
          <Button
            btnType="button"
            containerStyles="!text-lg !font-semibold bg-stroke_gray w-16 h-8"
            disabled={isLoading}
          >
            <Link href={"/mypage"}>취소</Link>
          </Button>
          <Button
            btnType="submit"
            disabled={DisabledBtn}
            containerStyles="!text-lg !font-semibold w-16 h-8"
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
