import { useState } from "react";
import Image from "next/image";
import TimeIcon from "@/assets/icons/place/place_time.png";
import PhoneIcon from "@/assets/icons/place/place_phone.png";
import CarIcon from "@/assets/icons/place/place_parking.png";
import PriceIcon from "@/assets/icons/place/place_price.png";
import InfoIcon from "@/assets/icons/place/place_info.png";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface AdditionalInfoProps {
  openingHour: string;
  closingDays: string;
  contact: string;
  hasParkingArea: boolean;
  additionalFees: string;
  allowSize: string;
  description: string;
  restrictions: string;
}

export function PlaceAdditionalInfo({
  openingHour,
  closingDays,
  contact,
  hasParkingArea,
  additionalFees,
  allowSize,
  description,
  restrictions,
}: AdditionalInfoProps) {
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);

  const toggleScheduleVisibility = () => {
    setIsScheduleVisible(!isScheduleVisible);
  };

  return (
    <div className="flex flex-col gap-1">
      {/* 운영시간 */}
      <p className="flex items-center gap-1">
        <Image
          src={TimeIcon}
          alt="운영시간 아이콘"
          width={20}
          className="flex-shrink-0 object-contain"
        />
        <span>운영시간 :</span>
        <span className="ml-2">{openingHour}</span>
        <button
          className="ml-2 text-strong_gray"
          onClick={toggleScheduleVisibility}
        >
          {isScheduleVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </p>

      {/* 휴무일 (토글로 제어) */}
      {isScheduleVisible && (
        <p className="flex ml-6">
          <span className="w-16">휴무일 :</span>
          <span>{closingDays}</span>
        </p>
      )}

      {/* 연락처 */}
      <p className="flex items-center gap-1">
        <Image
          src={PhoneIcon}
          alt="전화아이콘"
          width={16}
          className=""
        />
        {contact}
      </p>

      {/* 주차 여부 */}
      <p className="flex items-center gap-1">
        <Image
          src={CarIcon}
          alt="주차아이콘"
          width={18}
          className="flex-shrink-0 object-contain"
        />
        <span>{hasParkingArea ? "주차 가능" : "주차 불가"}</span>
      </p>

      {/* 추가 요금 */}
      <p className="flex items-center gap-1">
        <Image
          src={PriceIcon}
          alt="가격아이콘"
          width={18}
          className="flex-shrink-0 object-contain"
        />
        {additionalFees}
      </p>

      {/* 추가 정보 */}
      <div className="flex gap-1 items-start">
        {/* 아이콘 */}
        <Image
          src={InfoIcon} // 적합한 아이콘으로 교체
          alt="추가 정보 아이콘"
          width={20}
          className="flex-shrink-0 object-contain"
        />

        {/* 정보 텍스트 */}
        <div className="flex flex-col gap-1">
          <p>입장 가능 동물 크기: {allowSize}</p>
          <p>설명: {description}</p>
          <p>제한사항: {restrictions}</p>
        </div>
      </div>


    </div>
  );
}
