//현재 코드들 모두 auth.ts로 이동시킬것
import axiosInstance from "../axios";
import axios from "axios"

//인증코드 전송
export const SendVerificationCode = async (email: string) => {
    const response = await axiosInstance.post(`/auth/send-verification-email`, { email });
    return response
}

//인증코드 확인
export const CheckVerificationCode = async (email: string, code: string) => {
    const response = await axiosInstance.post(`/auth/validate-verification-code`,
        {
            email,
            verificationCode: code,
        });
    return response;
}

//임시 비밀번호 발급
export const TemporaryPassword = async (email: string) => {
    const response = await axiosInstance.post(`/auth/send-temporary-password-email`, { email });
    return response
}

//이 코드부터는 chat에서 사용할것
const socket_url = process.env.SOCKET_URL;

//이전 로그 가져오기
export const ReadChatLog = async (roomId: string) => {
    const response = await axiosInstance.get(`${socket_url}`);
    return response.data;
}
//방목록 가져오기
export const RoomList = async () => {
    const response = await axiosInstance.get(`${socket_url}`);
    return response.data;
}

