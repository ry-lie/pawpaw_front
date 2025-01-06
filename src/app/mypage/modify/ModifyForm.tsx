"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Confirm_icon from "@/assets/icons/confirm_icon.png";
import { errorToast, successToast } from "@/utils/toast";
import { useUserStore } from "@/stores/userStore";
import { updateUser } from "@/lib/api/user";
import { useDuplicateCheck } from "@/app/auth/join/useDuplicateCheck";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";

interface FormInput {
  nickname: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ModifyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
  });

  const nickname = useWatch({
    control,
    name: "nickname",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  const newPassword = useWatch({
    control,
    name: "newPassword",
  });
  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });

  const isPasswordMatch =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const DisabledBtn =
    !nickname ||
    (!newPassword && !password) ||
    (newPassword && !isPasswordMatch) ||
    Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!userId) {
      errorToast("로그인 정보를 찾을 수 없습니다. 다시 로그인해주세요");
      return;
    }

    try {
      setIsLoading(true);

      const updateData: Partial<{
        nickname: string;
        password: string;
        newPassword: string;
      }> = {};

      if (data.nickname !== userNickname) updateData.nickname = data.nickname;
      if (data.password && data.newPassword) {
        updateData.password = data.password;
        updateData.newPassword = data.newPassword;
      }

      const response = await updateUser(userId, updateData);

      successToast("회원정보 수정이 완료되었습니다.");
      router.push(PATHS.LOGIN);
    } catch (error) {
      errorToast("회원정보 수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const { handleNicknameCheck } = useDuplicateCheck({ getValues, setError });

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        닉네임
        <Input
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
            containerStyles="!text-base font-normal border bg-transparent !text-primary border-solid border-primary hover:!text-white"
          >
            중복확인
          </Button>
        </Input>
        <div>
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
          ></Input>

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
        <div className="space-x-10 mt-10 flex justify-center pt-5">
          <Button
            btnType="button"
            containerStyles="bg-stroke_gray w-20 h-10"
            disabled={isLoading}
          >
            <Link href={"/mypage"}>취소</Link>
          </Button>
          <Button
            btnType="submit"
            disabled={DisabledBtn}
            containerStyles="w-20 h-10"
          >
            확인
          </Button>
        </div>
      </form>
    </div>
  );
}
