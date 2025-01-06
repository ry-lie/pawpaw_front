import { useGeolocation } from "@/utils/useGeolocation";
import axiosInstance from "../axios";
// import { useState } from "react";

// //위치 정보 가져오기
// const getLocation = () => {
//   const { location } = useGeolocation();
//   if (!location) {
//     throw new Error("위치정보를 가져올수 없습니다.");
//   }
//   return location;
// };

// // //현재 위치 서버에 업데이트
export const updateMyLocation = async (latitude: number, longitude: number) => {
  return await axiosInstance.post(`/users/location`, {
    latitude,
    longitude,
  });
};

// //현재 위치를 기준으로 반경 내 사용자 검색
// export const anotherLocation = async () => {
//   try {
//     const { latitude, longitude } = getLocation();
//     const radius = 250;
//     const response = await axiosInstance.get(`/user/search`, {
//       params: { latitude, longitude, radius },
//     });
//     return response.data;
//   } catch (e: unknown) {
//     if (e instanceof Error) {
//       console.error(e.message);
//     } else {
//       console.error("알수없는 오류가 발생했습니다.", e);
//     }
//   }
// };
