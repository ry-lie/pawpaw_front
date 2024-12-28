import axios from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PATHS } from "../constants/path";

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
    if (error.response?.status === 401) {
      console.error("권한없음");
      redirect(PATHS.LOGIN);
    }
    console.error("응답 인터셉터 에러:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
