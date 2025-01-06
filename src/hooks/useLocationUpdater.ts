import { updateMyLocation } from "@/lib/api/userPlace";
import { useGeolocation } from "@/utils/useGeolocation";

export const useLocationUpdater = () => {
  const { location } = useGeolocation();

  // 현재 위치 가져오기
  const getLocation = () => {
    if (!location) {
      throw new Error("위치 정보를 가져올 수 없습니다.");
    }
    return location;
  };

  // 현재 위치 업데이트
  const updateLocation = async () => {
    if (!location) {
      console.error("위치 정보를 가져올 수 없습니다.");
      return;
    }

    try {
      await updateMyLocation(location.latitude, location.longitude);
      console.log("위치 업데이트 성공");
    } catch (e) {
      console.error("위치 업데이트 중 오류가 발생했습니다.", e);
    }
  };

  return { getLocation, updateLocation };
};
