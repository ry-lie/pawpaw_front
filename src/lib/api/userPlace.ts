import { useGeolocation } from "@/utils/useGeolocation";
import axiosInstance from "../axios";
import { useState } from "react";

//내 위치 서버에 전달하기
export const updateMyLocation = async () => {
  const { location } = useGeolocation();
  if (!location) {
    return;
  }
  const response = await axiosInstance.post(`/api/mylocation`, {
    latitude: location.latitude,
    longitude: location.longitude,
  });
  return response.data;
};

//유저 위치 가져오기
export const anotherLocation = async () => {
  const [radius, setRadius] = useState(250);
  const response = await axiosInstance.get(`api/getLocation?radius=${radius}`);
  return response.data;
};
