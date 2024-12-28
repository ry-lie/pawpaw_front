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
// 요청 인터셉터 설정 (필요시 추가 가능)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 필요한 추가 헤더 설정 가능
//     return config;
//   },
//   (error) => {
//     console.error("요청 인터셉터 에러:", error);
//     return Promise.reject(error);
//   },
// );

// // 응답 인터셉터 설정
// axiosInstance.interceptors.response.use(
//   (response) => response.data, // 응답 데이터를 그대로 반환
//   (error) => {
//     if (error.response?.status === 401) {
//       console.error("권한없음");
//       redirect(PATHS.LOGIN); // 인증 실패 시 로그인 페이지로 이동
//     }
//     console.error("응답 인터셉터 에러:", error);
//     return Promise.reject(error);
//   },
// );

export default axiosInstance;
