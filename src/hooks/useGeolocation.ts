import { useEffect, useState } from "react";
interface Latlng {
  latitude: number; // 위도
  longitude: number; //경도
}
export const useGeolocation = () => {
  const [location, setLocation] = useState<Latlng | null>(null);
  const [error, setError] = useState<string | null>(null);

  //위치정보 요청
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("이 브라우저에서는 geolocation이 지원되지 않습니다.");
      return;
    }
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler); //성공시 successHandler, 실패시 errorHandler
  }, []);

  const successHandler = (res: GeolocationPosition) => {
    const { latitude, longitude } = res.coords;
    setLocation({ latitude, longitude });
    setError(null);
  };

  const errorHandler = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  return { location, error };
};
