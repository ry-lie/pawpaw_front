import { useGeolocation } from "@/hooks/useGeolocation";
import axiosInstance from "../axios";

// //위치 정보 가져오기
export const useGetLocation = () => {
  const location = useGeolocation();
  if (!location) {
    throw new Error("위치 정보를 가져올 수 없습니다.");
  }
  return location;
};

// // //현재 위치 서버에 업데이트
export const updateMyLocation = async (latitude: number, longitude: number) => {
  return await axiosInstance.post(`/users/location`, {
    latitude,
    longitude,
  });
};

// //현재 위치를 기준으로 반경 내 사용자 검색
export const anotherLocation = async ({
  radius,
  latitude,
  longitude,
}: {
  radius : number;
  latitude : number;
  longitude :number;
}) =>{
  const response = await axiosInstance.get(`/users/nearby-users-list`,{
    params:{radius, latitude, longitude,}
  });
  return response.data;
}