import placeMock from "./placeMock.json";
import Image from "next/image";
import LocationIcon from "@/assets/icons/place/place_location.png";
import TimeIcon from "@/assets/icons/place/place_time.png";
import PhoneIcon from "@/assets/icons/place/place_phone.png";
import CarIcon from "@/assets/icons/place/place_parking.png";
import PriceIcon from "@/assets/icons/place/place_price.png";
import InfoIcon from "@/assets/icons/place/place_info.png";
import PlusIcon from "@/assets/icons/plus_icon.png";

import { PATHS } from "@/constants/path";
import Link from "next/link";
import { useModalStore } from "@/stores/modalStore";
import Review from "./place/[placeId]/review/Review";
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
  writer: string;
  title: string
  content: string;
  date: string;
  isRecommanded: boolean;
}
async function fetchPlaceDetails(placeId: string) {
  // 장소 설명 받아오는 부분 추가 예정
}

{/**장소 상세 모달 */ }
export default function PlaceDetail({ placeId }: { placeId: number }) {
  const { closeModal } = useModalStore();
  // const placeDetails = fetchPlaceDetails(placeId);
  // ID에 해당하는 데이터를 검색
  const placeDetails = placeMock.find((place) => place.id === placeId) as PlaceProps | undefined;

  if (!placeDetails) {
    return <div>해당 장소를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-h-[600px] overflow-y-auto p-2">
      <h2 className="text-lg font-bold mb-4">{placeDetails.name}</h2>
      <div className="flex flex-col gap-1">
        <p className="flex">
          <Image src={LocationIcon} alt="위치 아이콘" width={20} height={20} className="h-5 w-5 flex-shrink-0 object-contain" />
          <span>도로명주소 :</span>
          {placeDetails.roadNameAddress}
        </p>
        <p className="ml-6">
          <span className="border border-stroke_gray rounded-md mr-2 text-strong_gray">지번</span>
          {placeDetails.postalAddress}
        </p>
        <p className="ml-6">
          <span className="border border-stroke_gray rounded-md mr-2 text-strong_gray">우편번호</span>
          {placeDetails.postalCode}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-1">
        <p className="flex gap-1">
          <Image src={TimeIcon} alt="운영시간 아이콘" width={20} height={20} className="flex-shrink-0 object-contain" />
          운영시간 :
          {placeDetails.openingHour}
        </p>
        <p className="flex">
          <span className="w-16 ml-6">휴무일 :</span>
          <span>{placeDetails.closingDays}</span>
        </p>
        <p className="flex gap-1">
          <Image src={PhoneIcon} alt="전화아이콘" width={16} height={16} className="" />
          {placeDetails.contact}
        </p>
        <p className="flex gap-1">
          <Image src={CarIcon} alt="주차아이콘" width={18} height={18} className="flex-shrink-0 object-contain" />
          <span>{placeDetails.hasParkingArea ? "주차 가능" : "주차 불가"}</span>
        </p>
        <p className="flex gap-1">
          <Image src={PriceIcon} alt="가격아이콘" width={18} height={18} className="flex-shrink-0 object-contain" />
          {placeDetails.additionalFees}
        </p>
        <p className="flex gap-1">
          <Image src={InfoIcon} alt="정보" width={20} height={20} className="flex-shrink-0 object-contain" />
          입장가능 동물 크기- {placeDetails.allowSize}, 설명- {placeDetails.description}, 제한사항- {placeDetails.restrictions}
        </p>
      </div>

      <hr className="my-4" />

      {/* 리뷰 섹션 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-lg font-bold">리뷰</h2>
          <Link href={PATHS.REVIEW_WRITE("1")}><Image src={PlusIcon} alt="리뷰추가" width={20} height={20} onClick={closeModal} /></Link>
        </div>
        <div className="flex flex-col gap-2">
          {placeDetails.reviews && placeDetails.reviews.length > 0 ? (
            placeDetails.reviews.map((review: ReviewProps) => (
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
