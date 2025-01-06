"use client";
import { useState } from "react";
import { UseFormSetError, UseFormGetValues } from "react-hook-form";
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  sendVerificationCode,
  verifyCode,
} from "@/lib/api/auth";
import { errorToast, successToast, warningToast } from "@/utils/toast";
import { isAxiosError } from "axios";

interface DuplicateCheckProps {
  getValues: UseFormGetValues<any>;
  setError: UseFormSetError<any>;
}

export const useDuplicateCheck = ({
  getValues,
  setError,
}: DuplicateCheckProps) => {
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isVerificationEnabled, setIsVerificationEnabled] = useState(false); // 중복확인 결과 ok이면 요청 버튼 활성화

  /*이메일 중복 확인 */
  const handleEmailCheck = async () => {
    const email = getValues("email") || "";
    if (!email.trim()) {
      setError("email", {
        type: "manual",
        message: "이메일을 먼저 입력해주세요.",
      });
      return;
    }
    try {
      const response = await checkEmailDuplicate(email);
      if (response.status === 200) {
        successToast("사용 가능한 이메일입니다.");
        setIsEmailChecked(true);
        setIsVerificationEnabled(true);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage = "유효한 이메일 주소를 입력하세요";
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
        setIsEmailChecked(false);
        setIsVerificationEnabled(false);
      } else {
        setError("email", {
          type: "manual",
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        });
        setIsEmailChecked(false);
        setIsVerificationEnabled(false);
      }
    }
  };
  /*닉네임 중복 확인 */
  const handleNicknameCheck = async () => {
    const nickname = getValues("nickname") || "";
    if (!nickname.trim()) {
      setError("nickname", {
        type: "manual",
        message: "닉네임을 먼저 입력해주세요.",
      });
      return;
    }
    try {
      const response = await checkNicknameDuplicate(nickname);
      if (response.status === 200) {
        successToast("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true); // 닉네임 중복 확인 완료 상태 설정
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.body?.message ||
          "닉네임 확인 중 문제가 발생했습니다.";
        setError("nickname", {
          type: "manual",
          message: errorMessage,
        });
      } else {
        setError("nickname", {
          type: "manual",
          message: "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.",
        });
      }
      setIsNicknameChecked(false); // 실패 시 상태 초기화
    }
  };

  /*이메일 인증 코드 발송 */
  const handleEmailVerification = async () => {
    try {
      const email = getValues("email") || "";
      if (!isEmailChecked) {
        warningToast("이메일 중복 확인을 먼저 완료해주세요.");
        return;
      }
      await sendVerificationCode(email);
      successToast("이메일이 발송되었습니다.");
    } catch (error) {
      errorToast("다시 시도해주세요.");
    }
  };

  /*이메일 인증 코드 확인 */
  const handleCodeVerification = async () => {
    const email = getValues("email") || "";
    const emailCode = getValues("emailCode") || "";

    if (!emailCode.trim()) {
      setError("emailCode", {
        type: "manual",
        message: "인증코드를 먼저 입력해주세요.",
      });
      return;
    }
    try {
      await verifyCode(email, emailCode);
      successToast("인증되었습니다.");
    } catch (error) {
      setError("emailCode", {
        type: "manual",
        message: "인증코드가 올바르지 않습니다.",
      });
    }
  };

  return {
    isEmailChecked,
    isNicknameChecked,
    isVerificationEnabled,
    handleEmailCheck,
    handleNicknameCheck,
    handleEmailVerification,
    handleCodeVerification,
  };
};
