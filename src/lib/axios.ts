import axios from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PATHS } from "../constants/path";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 자동 포함
});

// // 요청 인터셉터
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();
//     if (session?.accessToken) {
//       config.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("Unauthorized! Redirecting to login...");
//       redirect(PATHS.LOGIN); // 인증 실패 시 로그인 페이지로 이동
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
