import { useState } from "react";
import { UseFormSetError, UseFormGetValues } from "react-hook-form";
import {
  checkEmailDuplicate,
  checkNicknameDuplicate,
  sendVerificationCode,
  verifyCode,
} from "@/lib/api/auth";

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
      await checkEmailDuplicate(email);
      setIsEmailChecked(true);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "이미 사용 중인 이메일입니다.",
      });
    }
  };

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
      await checkNicknameDuplicate(nickname);
      setIsNicknameChecked(true);
    } catch (error) {
      setError("nickname", {
        type: "manual",
        message: "이미 사용 중인 닉네임입니다.",
      });
    }
  };

  const handleEmailVerification = async () => {
    try {
      const email = getValues("email") || "";
      await sendVerificationCode(email);
    } catch (error) {
      setError("emailCode", { type: "manual", message: "다시 요청해주세요." });
    }
  };

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
    handleEmailCheck,
    handleNicknameCheck,
    handleEmailVerification,
    handleCodeVerification,
  };
};
