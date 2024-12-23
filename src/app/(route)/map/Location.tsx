"use client"
import { useState, useEffect } from "react";
import KakaoMap from "./KakaoMap";
{/**내 위치를 어디서 받을건지 아직 고민 */ }
const LocationPage = () => {
  const [latitude, setLatitude] = useState<number>(37.51936);
  const [longitude, setLongitude] = useState<number>(127.1136256);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = () => {
      setIsFetching(true);
      setError(null);

      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        setIsFetching(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setIsFetching(false);
        },
        (err) => {
          console.log(err);
          setError(`Error fetching location: ${err.message}`);
          setIsFetching(false);
        }
      );
    };

    // 페이지에 진입할 때 위치를 가져옴
    fetchLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {/* {isFetching ? (
        <p className="text-blue-500">위치 정보를 가져오는 중...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : latitude && longitude ? (
        <div>
          <p className="text-lg">위도: {latitude}</p>
          <p className="text-lg">경도: {longitude}</p>
        </div>
      ) : (
        <p className="text-gray-500">위치 정보 없음</p>
      )} */}
      <KakaoMap latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default LocationPage;
