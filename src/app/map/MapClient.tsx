"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useModalStore } from "@/stores/modalStore";
import Script from "next/script";
import Image from "next/image";
import FootPrint from "@/assets/icons/footprint.png";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import { useGeolocation } from "@/hooks/useGeolocation";
import Loading from "../loading";
import { fetchNearbyPlaces } from "@/lib/api/place";
import PlaceDetail from "./place/[placeId]/PlaceDetail";
import { IoIosWarning } from "react-icons/io";

export interface PlaceProps {
  id: number;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
}

const CATEGORY_MAP: Record<string, string> = {
  동물약국: "ANIMAL_PHARMACY",
  미술관: "ART_GALLERY",
  동물병원: "ANIMAL",
  미용: "BEAUTY",
  반려동물용품: "PET_SUPPLIES",
  문예회관: "CULTURAL_CENTER",
  펜션: "GUESTHOUSE",
  카페: "CAFE",
  호텔: "HOTEL",
  박물관: "MUSEUM",
  위탁관리: "PET_BOARDING",
  여행지: "TOURIST_ATTRACTION",
  식당: "RESTAURANT"
};
{/**지도페이지 상태, 이벤트 처리 담당 컴포넌트 */ }
export default function MapClient() {
  const { location, error } = useGeolocation();
  const { openModal } = useModalStore();
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [radius, setRadius] = useState(250); // 기본 반경 250m
  const [category, setCategory] = useState(""); // 기본 카테고리

  // 카테고리에 따른 마커 이미지 매핑
  const markerImages = useMemo(() => ({
    "동물약국": "/images/mapMaker/animal_pharmacy.webp",
    "미술관": "/images/mapMaker/art_gallery.webp",
    "카페": "/images/mapMaker/cafe.webp",
    "동물병원": "/images/mapMaker/animal_hospital.webp",
    "반려동물용품": "/images/mapMaker/pet_supplies.webp",
    "미용": "/images/mapMaker/beauty.webp",
    "문예회관": "/images/mapMaker/cultural_center.webp",
    "펜션": "/images/mapMaker/pension.webp",
    "식당": "/images/mapMaker/restaurant.webp",
    "여행지": "/images/mapMaker/travel_destination.webp",
    "위탁관리": "/images/mapMaker/management.webp",
    "박물관": "/images/mapMaker/museum.webp",
    "호텔": "/images/mapMaker/hotel.webp",
  }), []);

  useEffect(() => {
    async function loadPlaces() {
      try {
        if (!location) return;

        // 카테고리를 영어로 변환
        const mappedCategory = CATEGORY_MAP[category] || category;

        const data = await fetchNearbyPlaces({
          category: mappedCategory,
          radius,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setPlaces(data.body.data);
        loadKakaoMap();
      } catch (error) {
        console.error("장소 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    loadPlaces();
  }, [radius, category, location]);


  useEffect(() => {
    if (!location || places.length === 0) return;

    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) return;

      const map = new window.kakao.maps.Map(mapContainer, {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      });

      const myLocationMarkerImage = new window.kakao.maps.MarkerImage(
        "/images/mapMaker/my_location.webp",
        new window.kakao.maps.Size(101, 68),
        { offset: new window.kakao.maps.Point(25, 34) }
      );

      const myLocationMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        image: myLocationMarkerImage,
        title: `현재 위치`,
      });
      myLocationMarker.setMap(map);

      places.forEach((place) => {
        const markerImage = new window.kakao.maps.MarkerImage(
          markerImages[place.category as keyof typeof markerImages],
          new window.kakao.maps.Size(35, 53),
          { offset: new window.kakao.maps.Point(16, 32) }
        );

        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(place.latitude, place.longitude),
          image: markerImage,
        });

        marker.setMap(map);

        window.kakao.maps.event.addListener(marker, "click", () => {
          openModal(<PlaceDetail placeId={place.id} />);
        });
      });
    });
  }, [location, places, markerImages, openModal]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
        <div className="flex items-center text-accent_orange">
          <IoIosWarning />
          <p>지도 권한 허용이 필요한 페이지입니다.</p>
        </div>
        <div className="text-[12px] flex flex-col items-center">
          <p>위치서비스가 필요합니다.</p>
          <p>브라우저 설정에서 위치 서비스를 활성화해주세요.</p>
        </div>

      </div>
    );
  }
  if (!location) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  const loadKakaoMap = () => {
    if (!window.kakao || !window.kakao.maps) {
      console.warn("Kakao Map is not yet loaded");
      return;
    }
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      // 내 위치 마커 이미지 설정
      const myLocationMarkerImage = new window.kakao.maps.MarkerImage(
        "/images/mapMaker/my_location.webp",
        new window.kakao.maps.Size(101, 68),
        { offset: new window.kakao.maps.Point(25, 34) }
      );

      // 내 위치 마커 생성
      const myLocationMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        image: myLocationMarkerImage,
        title: `현재 위치`,
      });

      // 내 위치 마커를 지도에 추가
      myLocationMarker.setMap(map);

      if (!places || places.length === 0) {
        return; // 장소가 없으면 내 위치 마커만 추가하고 종료
      }


      // 마커 생성
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImages[place.category as keyof typeof markerImages],
          new window.kakao.maps.Size(35, 53),
          { offset: new window.kakao.maps.Point(16, 32) }
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        marker.setMap(map);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, "click", () => {
          openModal(<PlaceDetail placeId={place.id} />);
        });

      });

    });
  };

  return (
    <>
      {/* 반경 및 카테고리 선택 */}
      <div className="flex w-full h-12 mt-12 px-2 text-xs justify-between">
        <div className="flex">
          <div className="px-1">
            <label htmlFor="radius">반경</label>
            <select
              id="radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value={250}>250m</option>
              <option value={500}>500m</option>
              <option value={1000}>1000m</option>
            </select>
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-1"
            >
              <option value="">전체</option>
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
        <div className="flex items-center bg-primary hover:bg-hover text-white rounded-md h-fit p-1 gap-1">
          <Image src={FootPrint} alt="발자국" width={16} />
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