"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import { errorToast, successToast } from "@/utils/Toast";
import { useState } from "react";
import { useDuplicateCheck } from "../join/useDuplicateCheck";
import { sendVerificationCode, temporaryPassword } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants/path";

type FindPasswordInput = {
  email: string;
  emailCode: string;
};

export default function FindPasswordForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FindPasswordInput>({ mode: "onChange" });
  const router = useRouter();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleCodeVerification } = useDuplicateCheck({
    getValues,
    setError,
  });

  const handleEmailSubmit = async () => {
    const email = getValues("email");
    if (!email) {
      setError("email", { type: "manual", message: "이메일을 입력해주세요" });
      return;
    }
    try {
      setIsLoading(true);
      await sendVerificationCode(email);
      setIsEmailSent(true);
      successToast("인증코드가 이메일로 발송되었습니다.");
    } catch (e) {
      errorToast("인증코드요청에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async () => {
    const emailCode = getValues("emailCode");
    if (!emailCode) {
      setError("emailCode", {
        type: "manual",
        message: "인증코드를 입력해주세요",
      });
      return;
    }
    try {
      setIsLoading(true);
      await handleCodeVerification();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async () => {
    const email = getValues("email");
    try {
      setIsLoading(true);
      await temporaryPassword(email);
      successToast("임시 비밀번호가 이메일로 발송되었습니다.");
      router.push(PATHS.LOGIN);
    } catch (e) {
      errorToast("임시 비밀번호 발급에 실패하였습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEmailSubmit();
        }}
      >
        <Input
          label="이메일"
          type="email"
          placeholder="abc@abc.com"
          className="w-80 mt-2"
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
            btnType="submit"
            containerStyles="mt-2 p-1"
            disabled={!getValues("email")}
          >
            요청
          </Button>
        </Input>
      </form>

      {isEmailSent && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCodeSubmit();
          }}
        >
          <Input
            label="인증코드"
            type="password"
            placeholder="인증번호를 입력하세요"
            className="w-80 mt-2"
            {...register("emailCode", {
              required: "인증번호를 입력하세요",
              pattern: {
                value: /^\d{5}$/,
                message: "올바른 숫자를 입력해주세요",
              },
            })}
            errorMessage={errors.emailCode?.message}
          >
            <Button
              btnType="submit"
              disabled={!getValues("emailCode")}
              containerStyles="mt-2 p-1"
            >
              확인
            </Button>
          </Input>
        </form>
      )}

      {isEmailSent && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button
            btnType="submit"
            disabled={isLoading}
            containerStyles="h-10 w-80 mt-10"
          >
            전송
          </Button>
        </form>
      )}
    </div>
  );
}
