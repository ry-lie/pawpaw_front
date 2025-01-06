import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import Image from "next/image";
import LocationIcon from "@/assets/icons/place/place_location.png";
import { useQueryClient } from "@tanstack/react-query";
import { PlaceDetails } from "@/types/places";

interface PlaceAddressInfoProps {
  placeId: number;
}

export function PlaceAddressInfo({
  placeId
}: PlaceAddressInfoProps) {
  const [isAddressVisible, setIsAddressVisible] = useState(false);
  const queryClient = useQueryClient();
  const placeDetails = queryClient.getQueryData<PlaceDetails>(["placeDetails", placeId]);
  const toggleAddressVisibility = () => {
    setIsAddressVisible(!isAddressVisible);
  };

  return (
    <div className="flex flex-col gap-1 text-[12px] xs:text-[16px]">
      <p className="flex items-center">
        <Image
          src={LocationIcon}
          alt="위치 아이콘"
          width={20}
          height={20}
          className="h-5 w-5 flex-shrink-0 object-contain"
        />
        <span className="w-14">도로명: </span>
        <span>{placeDetails?.roadNameAddress}</span>
        <button
          className="ml-2 text-strong_gray"
          onClick={toggleAddressVisibility}
        >
          {isAddressVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </p>
      {isAddressVisible && (
        <div className="ml-4 mt-2 flex flex-col gap-1">
          <p>
            <span className="border border-stroke_gray rounded-md mr-2 text-strong_gray">
              지번
            </span>
            {placeDetails?.postalAddress}
          </p>
          <p>
            <span className="border border-stroke_gray rounded-md mr-2 text-strong_gray">
              우편번호
            </span>
            {placeDetails?.postalCode}
          </p>
        </div>
      )}
    </div>
  );
}
