"use client";

import { useEffect, useState } from "react";
import { useModalStore } from "@/stores/modalStore";
import Script from "next/script";
import Image from "next/image";
import FootPrint from "@/assets/icons/footprint.png";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import PlaceDetail, { PlaceProps } from "./PlaceDetail";

interface MapClientProps {
  latitude: number;
  longitude: number;
}
const data = [
  {
    "id": 1,
    "name": "1004 약국",
    "category": "동물약국",
    "postalCode": 10598,
    "roadNameAddress": "경기도 고양시 덕양구 동세로 19",
    "postalAddress": "경기도 고양시 덕양구 동산동 352-1",
    "contact": "02-381-5052",
    "latitude": 37.64454276,
    "longitude": 126.886336,
    "closingDays": "매주 토, 일, 법정공휴일",
    "openingHour": "월~금 09:00~18:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true,
    "reviews": [
      {
        "id": 1,
        "writer": "깡깡이",
        "content": "의사쌤이 엄청 친절하시고 시설 굳",
        "date": "2023-12-24",
        "isRecommanded": true
      },
      {
        "id": 2,
        "writer": "리온",
        "content": "강아지가 편하게 진료를 받았어요!",
        "date": "2023-12-23",
        "isRecommanded": false
      },
      {
        "id": 2,
        "writer": "리온",
        "content": "강아지가 편하게 진료를 받았어요!",
        "date": "2023-12-23",
        "isRecommanded": false
      },
      {
        "id": 2,
        "writer": "리온",
        "content": "강아지가 편하게 진료를 받았어요!",
        "date": "2023-12-23",
        "isRecommanded": false
      }
    ]
  },
  {
    "id": 2,
    "name": "1004섬수석미술관",
    "category": "미술관",
    "postalCode": 58831,
    "roadNameAddress": "전라남도 신안군 자은면 자은서부2길 508-68",
    "postalAddress": "전라남도 신안군 자은면 백산리 633-54",
    "contact": "061-240-8359",
    "latitude": 34.8800925,
    "longitude": 125.996874,
    "closingDays": "매주 월요일",
    "openingHour": "화~일 09:00~18:00",
    "allowSize": "해당없음",
    "restrictions": "해당없음",
    "description": "미술관",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": false
  },
  {
    "id": 3,
    "name": "100세건강약국",
    "category": "동물약국",
    "postalCode": 13989,
    "roadNameAddress": "경기도 안양시 만안구 안양로 408",
    "postalAddress": "경기도 안양시 만안구 안양동 856-4",
    "contact": "031-465-1320",
    "latitude": 37.40715043,
    "longitude": 126.914837,
    "closingDays": "매주 일요일, 법정공휴일",
    "openingHour": "월~금 09:00~21:00, 토 09:00~20:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true
  },
  {
    "id": 4,
    "name": "100세약국",
    "category": "동물약국",
    "postalCode": 7223,
    "roadNameAddress": "서울특별시 영등포구 양평로 24",
    "postalAddress": "서울특별시 영등포구 당산동6가 217-4",
    "contact": "02-2678-8217",
    "latitude": 37.53325958,
    "longitude": 126.903741,
    "closingDays": "매주 일요일, 법정공휴일",
    "openingHour": "월~금 08:30~21:00, 토 08:30~18:30",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true
  },
  {
    "id": 5,
    "name": "100세약국",
    "category": "동물약국",
    "postalCode": 16484,
    "roadNameAddress": "경기도 수원시 팔달구 경수대로 568",
    "postalAddress": "경기도 수원시 팔달구 인계동 942-4",
    "contact": "031-239-4801",
    "latitude": 37.27627151,
    "longitude": 127.030911,
    "closingDays": "매주 일요일, 법정공휴일",
    "openingHour": "월~금 09:00~19:00, 토 09:00~15:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": false
  },
  {
    "id": 6,
    "name": "100세약국",
    "category": "동물약국",
    "postalCode": 21545,
    "roadNameAddress": "인천광역시 남동구 남동대로 892",
    "postalAddress": "인천광역시 남동구 간석동 207-3",
    "contact": "032-427-7585",
    "latitude": 37.4620717,
    "longitude": 126.708644,
    "closingDays": "매주 토, 일",
    "openingHour": "월~금 08:30~22:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true
  },
  {
    "id": 7,
    "name": "100코달리 와인바",
    "category": "카페",
    "postalCode": 4585,
    "roadNameAddress": "서울특별시 중구 다산로38길 11",
    "postalAddress": "서울특별시 중구 신당동 292-152",
    "contact": "0507-1346-6774",
    "latitude": 37.56330525,
    "longitude": 127.016417,
    "closingDays": "매주 월요일",
    "openingHour": "화~일 18:00~02:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "애견카페",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": false
  },
  {
    "id": 8,
    "name": "100평 광장약국",
    "category": "동물약국",
    "postalCode": 11758,
    "roadNameAddress": "경기도 의정부시 동일로 732",
    "postalAddress": "경기도 의정부시 금오동 441-65",
    "contact": "031-847-1269",
    "latitude": 37.75195739,
    "longitude": 127.049286,
    "closingDays": "매주 토, 일, 법정공휴일",
    "openingHour": "월~금 10:00~18:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "동물약국",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true
  },
  {
    "id": 9,
    "name": "107page",
    "category": "카페",
    "postalCode": 39204,
    "roadNameAddress": "경상북도 구미시 봉곡서로 87-34",
    "postalAddress": "경상북도 구미시 봉곡동 56-2",
    "contact": "0507-1331-7179",
    "latitude": 36.15863384,
    "longitude": 128.30627,
    "closingDays": "매주 월요일",
    "openingHour": "화~일 12:00~22:00",
    "allowSize": "모두 가능",
    "restrictions": "마당, 1층만 입장 가능, 목줄, 배변봉투",
    "description": "애견카페",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": true
  },
  {
    "id": 10,
    "name": "119동물병원",
    "category": "동물병원",
    "postalCode": 42913,
    "roadNameAddress": "대구광역시 달성군 다사읍 달구벌대로 893",
    "postalAddress": "대구광역시 달성군 다사읍 매곡리 1551-1",
    "contact": "053-585-1195",
    "latitude": 35.85715733,
    "longitude": 128.466544,
    "closingDays": "연중무휴",
    "openingHour": "월~금 09:30~18:30, 토 09:30~16:00, 일 12:00~12:30, 법정공휴일 09:30~16:00",
    "allowSize": "모두 가능",
    "restrictions": "제한사항 없음",
    "description": "일반동물병원",
    "additionalFees": "없음",
    "lastUpdate": "2022-11-30",
    "hasParkingArea": false
  }
]
{/**지도페이지 상태, 이벤트 처리 담당 컴포넌트 */ }
export default function MapClient({ latitude, longitude }: MapClientProps) {
  const { openModal } = useModalStore();
  const [places, setPlaces] = useState<PlaceProps[]>([]);
  const [radius, setRadius] = useState(250); // 기본 반경 250m
  const [category, setCategory] = useState("동물약국"); // 기본 카테고리

  // useEffect(() => {
  //   // 반경과 카테고리에 따라 서버에서 장소 데이터를 가져옴
  //   async function fetchPlaces() {
  //     try {
  //       const response = await fetch(
  //         `/api/places?radius=${radius}&category=${encodeURIComponent(category)}&latitude=${latitude}&longitude=${longitude}`
  //       );
  //       const data = await response.json();
  //       setPlaces(data);
  //     } catch (error) {
  //       console.error("Failed to fetch places:", error);
  //     }
  //   }
  //   fetchPlaces();
  // }, [radius, category, latitude, longitude]);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);
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

      data.forEach((place) => {
        console.log("Marker Image Path:", markerImages[place.category]);
        const markerPosition = new window.kakao.maps.LatLng(place.latitude, place.longitude);

        const markerImage = new window.kakao.maps.MarkerImage(
          markerImages[place.category], // 카테고리에 맞는 이미지 URL
          new window.kakao.maps.Size(50, 68), // 마커 크기 설정
          { offset: new window.kakao.maps.Point(16, 32) } // 중심점 설정
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
