"use client"
import Image from "next/image";
import PlusIcon from "@/assets/icons/plus_icon.png";

import { PATHS } from "@/constants/path";
import Link from "next/link";
import { useModalStore } from "@/stores/modalStore";
import Review from "./review/Review";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { fetchPlaceDetails } from "@/lib/api/place";
import Loading from "../../../loading";
import { PlaceAddressInfo } from "./PlaceAddressInfo";
import { PlaceAdditionalInfo } from "./PlaceAddtionalInfo";
export interface PlaceProps {
  id: number; // Primary Key
  name: string; // 시설명
  category: string; // 카테고리3
  postalCode: string | number; // 우편번호
  roadNameAddress: string; // 도로명주소
  postalAddress: string; // 지번주소
  contact: string; // 전화번호
  closingDays: string; // 휴무일
  openingHour: string; // 운영시간
  hasParkingArea: boolean; // 주차 가능 여부
  //price: string; // 입장(이용료)가격 정보
  allowSize: string; // 입장 가능 동물 크기
  restrictions: string; // 반려동물 제한사항
  description: string; // 기본 정보_장소설명
  additionalFees: string; // 애견 동반 추가 요금
  latitude: number; // 위도
  longitude: number; // 경도
  lastUpdate: string; // 최종작성일
  reviews?: ReviewProps[]; // 리뷰 배열 추가
}
export interface ReviewProps {
  id: number;
  nickname: string;
  title: string
  content: string;
  isLikeCliked: boolean;
}

{/**장소 상세 모달 */ }
export default function PlaceDetail({ placeId }: { placeId: number }) {
  const { closeModal } = useModalStore();

  const { data: placeDetails, isLoading, error } = useQuery({
    queryKey: ["placeDetails", placeId], // 쿼리 키
    queryFn: () => fetchPlaceDetails(placeId), // 데이터 가져오기 함수
    enabled: !!placeId, // placeId가 존재할 때만 쿼리 실행
  });


  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loading />
      </div>);
  }

  if (error) {
    return <div className="flex items-center justify-center w-full h-screen">장소 정보를 가져오는 데 실패했습니다.</div>;
  }


  if (!placeDetails) {
    return <div className="flex items-center justify-center w-full h-screen">해당 장소를 찾을 수 없습니다.</div>;
  }
  return (
    <div className="max-h-[600px] overflow-y-auto p-2">
      <h2 className="text-lg font-bold mb-4">{placeDetails.name}</h2>
      {/* 장소 주소 섹션 */}
      <PlaceAddressInfo
        roadNameAddress={placeDetails.roadNameAddress}
        postalAddress={placeDetails.postalAddress}
        postalCode={placeDetails.postalCode}
      />
      <hr className="my-4" />
      {/* 장소 추가 정보 섹션 */}
      <PlaceAdditionalInfo
        openingHour={placeDetails.openingHour}
        closingDays={placeDetails.closingDays}
        contact={placeDetails.contact}
        hasParkingArea={placeDetails.hasParkingArea}
        additionalFees={placeDetails.additionalFees}
        allowSize={placeDetails.allowSize}
        description={placeDetails.description}
        restrictions={placeDetails.restrictions}
      />
      <hr className="my-4" />

      {/* 리뷰 섹션 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-bold">리뷰</h2>
          <Link href={PATHS.REVIEW_WRITE(placeId)}><Image src={PlusIcon} alt="리뷰추가" width={20} height={20} onClick={closeModal} /></Link>
        </div>
        <div className="flex flex-col gap-2">
          {placeDetails.reviewList && placeDetails.reviewList.length > 0 ? (
            placeDetails.reviewList.map((review: ReviewProps) => (
              <Link
                key={review.id}
                href={PATHS.REVIEW_DETAIL(placeId, review.id)}
                onClick={() => closeModal()}
              >
                <Review key={review.id} review={review} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500">등록된 리뷰가 없습니다.</p>
          )}
        </div>

      </div>
    </div>
  );
}
