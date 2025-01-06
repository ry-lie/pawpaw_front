import axios, { isAxiosError } from "axios";

import { PATHS } from "../constants/path";
import { errorToast } from "@/utils/toast";

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 자동 포함
});

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error)) {
      if (!isServerApiError(error)) {
        errorToast("서버와 통신이 원활하지 않습니다.");
      }

      if (error.status === 401) {
        errorToast("로그인 해주세요.");
        window.location.href = PATHS.LOGIN;
      }

      if (isServerApiError(error)) {
        errorToast(error.response.data.message);
      }
      return Promise.reject(error);
    }
    errorToast(error.message);
    console.error("응답 인터셉터 에러:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;

interface ErrorMeta {
  response: {
    data: {
      status: number | string;
      message: string;
    };
  };
  status: number;
}

const isServerApiError = (error: any): error is ErrorMeta => {
  return isAxiosError(error) && !!error.response?.data;
  //전달될 에러가 axios 라이브러리를 통해 전달된것인가?

  //참일때, 전달된 인자를 ErrorMeta라는 타입으로 간주
  //axiox를 통해 호출된 에러 메세지 존해한다면?
};
