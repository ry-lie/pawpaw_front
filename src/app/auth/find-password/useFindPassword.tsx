import {
  sendVerificationCode,
  temporaryPassword,
  verifyCode,
} from "@/lib/api/auth";
import { isAxiosError } from "axios";

export const findPasswordApis = () => ({
  //인증코드 전송
  sendCode : async (email: string) => {
    try {
      await sendVerificationCode(email);
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        throw new Error("이메일이 존재하지 않습니다.");
      } else {
        throw new Error("서버에 문제가 발생하였습니다.");
      }
    }
  },
  //인증코드 확인
  verifyCodeCheck: async (email: string, verificationCode: string) => {
    try {
      return await verifyCode(email, verificationCode);
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        throw new Error("인증코드가 유효하지 않습니다.");
      } else {
        throw new Error("서버에 문제가 발생하였습니다.");
      }
    }
  },
  //인증코드 제출
 temporaryPasswordSubmit : async (email: string) => {
    try {
      await temporaryPassword(email);
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        throw new Error("이메일과 인증코드가 유효하지 않습니다.");
      } else {
        throw new Error("서버에 문제가 발생하였습니다.");
      }
    }
  },
});
