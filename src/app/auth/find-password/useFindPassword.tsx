import { sendVerificationCode } from "@/lib/api/auth";
import { errorToast, successToast } from "@/utils/Toast";

export const handleEmailVerificationUseFindPassword = async (
  email: string,
): Promise<void> => {
  if (!email) {
    errorToast("이메일을 입력해주세요.");
    return;
  }

  try {
    await sendVerificationCode(email);
    successToast("이메일이 발송되었습니다.");
  } catch (error) {
    errorToast("인증 코드 요청에 실패했습니다. 다시 시도해주세요.");
  }
};
