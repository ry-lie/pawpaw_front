"use client"
import Image from "next/image";
import PlusIcon from "@/assets/icons/plus_icon.png";

import { PATHS } from "@/constants/path";
import Link from "next/link";
import { useModalStore } from "@/stores/modalStore";
import Review from "./review/Review";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaceDetails } from "@/lib/api/place";
import Loading from "../../../loading";
import { PlaceAddressInfo } from "./PlaceAddressInfo";
import { PlaceAdditionalInfo } from "./PlaceAddtionalInfo";
import { RiThumbUpFill } from "react-icons/ri";

interface ReviewProps {
  id: number;
  nickname: string;
  title: string
  content: string;
  isLikeClicked: boolean;
  imageUrl: string;
}

{/**장소 상세 모달 */ }
export default function PlaceDetail({ placeId }: { placeId: number }) {
  const { closeModal } = useModalStore();
  const { data: placeDetails, error, isFetching } = useQuery({
    queryKey: ["placeDetails", placeId], // 쿼리 키
    queryFn: () => fetchPlaceDetails(placeId), // 데이터 가져오기 함수
    enabled: !!placeId, // placeId가 존재할 때만 쿼리 실행
  });
  //추천 수
  const likeCount = placeDetails?.reviewList
    ? placeDetails.reviewList.filter((review: any) => review?.isLikeClicked === true).length
    : 0;
  // 장소 리뷰 존재 여부
  const isReviewListEmpty = placeDetails?.reviewList && placeDetails?.reviewList.length > 0;
  return (
    <div className="h-[450px] xs:h-[650px] flex flex-col">

      {isFetching ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loading />
        </div>
      ) : error ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-500">장소 정보를 가져오는 데 실패했습니다.</p>
        </div>
      ) : !placeDetails ? (
        <div className="flex items-center justify-center flex-1">
          <p className="text-gray-500">해당 장소를 찾을 수 없습니다.</p>
        </div>
      ) : (
        <div className="overflow-y-auto p-2 flex-1 ">
          {/* 로딩 후 장세 상세 조회*/}
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-bold">{placeDetails.name}</h2>
            <div className="flex items-center gap-1">
              <RiThumbUpFill className="text-primary w-4 h-4 mb-0.5" aria-label="추천" />
              <span className="text-[14px] xs:text-[16px] font-semibold text-primary">{likeCount}</span>
            </div>
          </div>

          {/* 장소 주소 정보*/}
          <PlaceAddressInfo placeId={placeId} />
          <hr className="my-4" />
          {/* 장소 추가 정보*/}
          <PlaceAdditionalInfo placeId={placeId} />
          <hr className="my-4" />
          {/* 리뷰컨테이너*/}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <h2 className="xs:text-lg text-base font-bold">리뷰</h2>
              <Link href={PATHS.REVIEW_WRITE(placeId)}>
                <Image src={PlusIcon} alt="리뷰추가" width={20} height={20} onClick={closeModal} className="w-4 h-4 xs:w-5 xs:h-5 mb-1"/>
              </Link>
            </div>
            {/* 리뷰*/}
            <div className="flex flex-col gap-2">
              {isReviewListEmpty ? (
                placeDetails?.reviewList.map((review: ReviewProps) => (
                  <Link
                    key={review.id}
                    href={PATHS.REVIEW_DETAIL(placeId, review.id)}
                    onClick={(e) => {
                      closeModal(); // 모달 닫기
                    }}
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
      )}
    </div>
  );

}