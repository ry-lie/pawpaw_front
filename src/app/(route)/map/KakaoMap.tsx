'use client';

import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav/Nav";
import { PATHS } from "@/app/constants/path";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 사용자 위치로 변경
        level: 3,
      };
      new window.kakao.maps.Map(mapContainer, mapOption);
    });
  };

  return (
    <>
      <div className="flex w-full h-12 mt-12  gap-2 text-xs">
        <div className="px-1">
          <label htmlFor="radius" className="mb-1">
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
          <label htmlFor="category" className="mb-1">
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
        <Link href={PATHS.WALKMATE}>산책메이트</Link>
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
