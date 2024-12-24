"use client";

import { PATHS } from "@/constants/path";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import FootPrint from "@/assets/icons/footprint.png";
import { useModalStore } from "@/stores/modalStore";
import PlaceDetail from "./PlaceDetail";

interface location {
  longitude: number;
  latitude: number
};
export default function KakaoMap({ latitude, longitude }: location) {
  const { openModal } = useModalStore();
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 사용자 위치로 변경
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      // 지도에 마커 표시
      marker.setMap(map);

      // 마커 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, "click", () => {
        openModal(
          <PlaceDetail placeId={1} />
        );
      });
    });
  };

  return (
    <>
      <div className="flex w-full h-12 mt-12 px-2 text-xs justify-between">

        <div className="flex">
          <div className="px-1">
            <label htmlFor="radius" className="">
              반경
            </label>
            <select
              name="radius"
              id="radius"

              className="border border-gray-300 rounded-md p-1"
            >
              <option value="250">250m</option>
              <option value="500">500m</option>
              <option value="1000">1000m</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="">
              카테고리
            </label>
            <select
              name="category"
              id="category"

              className="border border-gray-300 rounded-md p-1"
            >
              <option value="동물약국">동물약국</option>
              <option value="미술관">미술관</option>
              <option value="카페">카페</option>
              <option value="동물병원">동물병원</option>
              <option value="반려동물용품">반려동물용품</option>
              <option value="미용">미용</option>
              <option value="문예회관">문예회관</option>
              <option value="펜션">펜션</option>
              <option value="식당">식당</option>
              <option value="여행지">여행지</option>
              <option value="위탁관리">위탁관리</option>
              <option value="박물관">박물관</option>
              <option value="호텔">호텔</option>
            </select>
          </div>
        </div>
        <div className="flex items-center bg-primary hover:bg-hover text-white rounded-md h-fit p-1 gap-1" >
          <Image src={FootPrint} alt="발자국" width={16} height={16} />
          <Link href={PATHS.WALKMATE}>산책메이트</Link>
        </div>

      </div>
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
      <div id="map" className="w-full h-screen"></div>
    </>
  );
}
