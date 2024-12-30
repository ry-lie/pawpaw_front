"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/stores/modalStore";
import Script from "next/script";
import Image from "next/image";
import FootPrint from "@/assets/icons/footprint.png";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import { useGeolocation } from "@/utils/useGeolocation";
import { useUserStore } from "@/stores/userStore";
import Loading from "../loading";
import { fetchNearbyPlaces } from "@/lib/api/place";
import PlaceDetail from "./place/[placeId]/PlaceDetail";
export interface PlaceProps {
  id: number; // Primary Key
  name: string; // 시설명
  category: string; // 카테고리
  postalCode: string | number; // 우편번호
  roadNameAddress: string; // 도로명주소
  postalAddress: string; // 지번주소
  contact: string; // 전화번호
  closingDays: string; // 휴무일
  openingHour: string; // 운영시간
  hasParkingArea: boolean; // 주차 가능 여부
  allowSize: string; // 입장 가능 동물 크기
  restrictions: string; // 반려동물 제한사항
  description: string; // 기본 정보_장소설명
  additionalFees: string; // 애견 동반 추가 요금
  latitude?: number; // 위도 (데이터에서 누락된 경우 optional로 설정)
  longitude?: number; // 경도 (데이터에서 누락된 경우 optional로 설정)
  lastUpdate: string; // 최종작성일
  createdAt: string; // 생성 일자
  createdUser: string; // 생성한 사용자
  updatedAt: string; // 업데이트 일자
  updatedUser?: string | null; // 업데이트한 사용자 (null 가능)
}

interface MapClientProps {
  latitude: number;
  longitude: number;
}

{/**지도페이지 상태, 이벤트 처리 담당 컴포넌트 */ }
export default function MapClient({ latitude, longitude }: MapClientProps) {
  const { location } = useGeolocation();
  const { openModal } = useModalStore();
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [radius, setRadius] = useState(250); // 기본 반경 250m
  const [category, setCategory] = useState("동물약국"); // 기본 카테고리

  useEffect(() => {
    async function loadPlaces() {
      try {
        if (!location) return;

        const data = await fetchNearbyPlaces({
          category,
          radius,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setPlaces(data.body.data);
      } catch (error) {
        console.error("장소 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    loadPlaces();
  }, [radius, category, location]);

  const nickname = useUserStore((state) => state.nickname);
  console.log("ssssssssss", places)
  if (!location) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>
    );
  }
  console.log(location.latitude, location.longitude, "내 위도경도")
  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);


      // 내 위치 마커 이미지 설정
      const myLocationImageSrc = "/images/mapMaker/my_location.png";
      const myLocationImageSize = new window.kakao.maps.Size(101, 68);
      const myLocationImageOption = { offset: new window.kakao.maps.Point(25, 34) };

      const myLocationMarkerImage = new window.kakao.maps.MarkerImage(
        myLocationImageSrc,
        myLocationImageSize,
        myLocationImageOption
      );

      // 내 위치 마커 생성
      const myLocationMarker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        image: myLocationMarkerImage,
        title: `${nickname}님의 위치`,
      });

      // 내 위치 마커를 지도에 추가
      myLocationMarker.setMap(map);

      // 카테고리에 따른 마커 이미지 매핑
      const markerImages: Record<string, string> = {
        "동물약국": "/images/mapMaker/animal_pharmacy.png",
        "미술관": "/images/mapMaker/art_gallery.png",
        "카페": "/images/mapMaker/cafe.png",
        "동물병원": "/images/mapMaker/animal_hospital.png",
        "반려동물용품": "/images/mapMaker/pet_supplies.png",
        "미용": "/images/mapMaker/beauty.png",
        "문예회관": "/images/mapMaker/cultural_center.png",
        "펜션": "/images/mapMaker/pension.png",
        "식당": "/images/mapMaker/restaurant.png",
        "여행지": "/images/mapMaker/travel_destination.png",
        "위탁관리": "/images/mapMaker/management.png",
        "박물관": "/images/mapMaker/museum.png",
        "호텔": "/images/mapMaker/hotel.png",
      };

      // 마커 생성
      places.forEach((place) => {
        const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImages[place.category],
          new window.kakao.maps.Size(50, 68),
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
