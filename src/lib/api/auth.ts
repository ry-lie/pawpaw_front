import axiosInstance from "../axios";

// 로그인
export const loginAPI = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post(`/auth/login`, {
    email,
    password,
  });
  return response;
};

// 회원가입
export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  nickname: string;
  profileImage: File | null;
}
export const registerAPI = async (payload: RegisterPayload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("name", payload.name);
  formData.append("nickname", payload.nickname);

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  } else {
    // 기본 이미지 파일을 추가
    const defaultImageResponse = await fetch("/images/profile_icon.png");
    const defaultImageBlob = await defaultImageResponse.blob();
    const defaultImageFile = new File(
      [defaultImageBlob],
      "default_profile.png",
      {
        type: defaultImageBlob.type,
      },
    );
    formData.append("profileImage", defaultImageFile);
  }

  const response = await axiosInstance.post(`/auth/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// 이메일 중복 확인
export const checkEmailDuplicate = async (email: string) => {
  const response = await axiosInstance.post(`/auth/check-email`, { email });
  return response;
};

// 닉네임 중복 확인
export const checkNicknameDuplicate = async (nickname: string) => {
  const response = await axiosInstance.post(`/auth/check-nickname`, {
    nickname,
  });
  return response;
};

// 인증 코드 요청
export const sendVerificationCode = async (email: string) => {
  const response = await axiosInstance.post(`/auth/send-verification-email`, {
    email,
  });
  return response;
};

// 인증 코드 확인
export const verifyCode = async (email: string, verificationCode: string) => {
  const response = await axiosInstance.post(
    `/auth/validate-verification-code`,
    { email, verificationCode },
  );
  return response;
};

//임시 비밀번호 발급
export const temporaryPassword = async (email: string) => {
  const response = await axiosInstance.post(
    `/auth/send-temporary-password-email`,
    { email },
  );
  return response;
};
