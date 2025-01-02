"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { useForm, useWatch } from "react-hook-form";
import { findPasswordApis } from "./useFindPassword";
import { errorToast, infoToast, successToast } from "@/utils/Toast";
import { useState } from "react";

type FindPasswordInput = {
  email: string;
  code: string;
};

export default function FindPasswordForm() {
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit: handleSubmitRequest,
    register: registerRequest,
    control: controlRequest,
    formState: { errors: errorsRequest },
  } = useForm<FindPasswordInput>({
    mode: "onChange",
  });

  const {
    handleSubmit: handleSubmitCode,
    register: registerCode,
    control: controlCode,
    formState: { errors: errorsCode },
  } = useForm<FindPasswordInput>({
    mode: "onChange",
  });

  const email = useWatch({
    control: controlRequest,
    name: "email",
  });

  const code = useWatch({
    control: controlCode,
    name: "code",
  });

  const isValidEmail = !email || !!errorsRequest.email;
  const isValidCode = !code || !!errorsCode.code;

  const { sendCode, verifyCodeCheck, temporaryPasswordSubmit } =
  findPasswordApis();

  const onSubmitOfRequest = async (data: FindPasswordInput) => {
    try {
      if (!data.code) {
        await sendCode(data.email);
        infoToast("인증번호가 이메일로 전송되었습니다.");
        setIsEmailCheck(true);
      }
    } catch (e) {
      setIsEmailCheck(false);
      errorToast(
        e instanceof Error ? e.message : "서버에 문제가 발생하였습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitofCode = async (data: FindPasswordInput) => {
    try {
      const result = await verifyCodeCheck(data.email, data.code);
      if (result.success) {
        successToast("인증번호가 확인되었습니다.");
        setIsCode(true);
      }
    } catch (e) {
      setIsCode(false);
      errorToast(
        e instanceof Error ? e.message : "서버에 문제가 발생하였습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitCheck = async () => {
    try {
      if (!isEmailCheck || !isCode) {
        errorToast("이메일 또는 인증코드를 확인해주세요");
        return;
      }
      await temporaryPasswordSubmit(email);
      successToast("비밀번호가 성공적으로 변경되었습니다.");
      setIsEmailCheck(false);
      setIsCode(false);
    } catch (e) {
      errorToast(
        e instanceof Error ? e.message : "서버에 문제가 발생하였습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitRequest(onSubmitOfRequest)}>
        <Input
          label="이메일"
          type="email"
          placeholder="abc@abc.com"
          className="w-80 mt-2"
          {...registerRequest("email", {
            required: "이메일은 필수 입력 항목입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "유효한 이메일 주소를 입력하세요",
            },
          })}
          errorMessage={errorsRequest.email?.message}
        >
          <Button btnType="submit" containerStyles="mt-2" disabled={isValidEmail}>
            요청
          </Button>
        </Input>
      </form>

      <form onSubmit={handleSubmitCode(onSubmitofCode)}>
        <Input
          label="인증코드"
          type="password"
          placeholder="인증번호를 입력하세요"
          className="w-80 mt-2"
          {...registerCode("code", {
            required: "인증번호를 입력하세요",
            pattern: {
              value: /^\d{5}$/,
              message: "올바른 숫자를 입력해주세요",
            },
          })}
          errorMessage={errorsCode.code?.message}
          disabled={!isEmailCheck || isLoading}
        >
          <Button btnType="submit" disabled={isValidCode}>
            확인
          </Button>
        </Input>
      </form>

      <form onSubmit={onSubmitCheck}>
        <Button
          btnType="submit"
          disabled={!isValidEmail || !isValidCode || isLoading}
          containerStyles="h-10 w-80 mt-10"
        >
          전송
        </Button>
      </form>
    </div>
  );
}
