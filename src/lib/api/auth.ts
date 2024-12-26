import axiosInstance from "../axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  nickname: string;
  profileImage: string;
}
// 회원가입
export const registerAPI = async (payload: RegisterPayload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("name", payload.name);
  formData.append("nickname", payload.nickname);
  formData.append("profileImage", payload.profileImage);

  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/register`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/check-email`,
    { email },
  );
  return response.data;
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname: string) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/check-nickname`,
    { nickname },
  );
  return response.data;
};

// 인증 코드 요청
export const sendVerificationCode = async (email: string) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/send-verification-email`,
    { email },
  );
  return response.data;
};

// 인증 코드 확인
export const verifyCode = async (email: string, verificationCode: string) => {
  const response = await axiosInstance.post(
    `${API_BASE_URL}/auth/validate-verification-code`,
    { email, verificationCode },
  );
  return response.data;
};
