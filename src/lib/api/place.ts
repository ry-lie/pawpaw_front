import { QueryKey, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
// 장소 목록 조회 (반경 및 카테고리 기준)
export const fetchNearbyPlaces = async ({
  category,
  radius,
  latitude,
  longitude,
}: {
  category: string;
  radius: number;
  latitude: number;
  longitude: number;
}) => {
  const response = await axiosInstance.get("/places/nearby-place-list", {
    params: {
      category: encodeURIComponent(category),
      radius,
      latitude,
      longitude,
    },
  });

  return response.data;
};

// 장소 상세 조회
export const fetchPlaceDetails = async (placeId: number) => {
  const response = await axiosInstance.get(`/places/${placeId}`);
  return response.data;
};

/*리뷰*/

// 리뷰 상세 조회
export const fetchReviewDetails = async (placeId: string, reviewId: string) => {
  const response = await axiosInstance.get(
    `/places/${placeId}/reviews/${reviewId}`,
  );
  return response.data;
};

// 리뷰 생성
export const createReview = async (
  placeId: string,
  data: { title: string; content: string; isLikeCliked: boolean },
) => {
  return await axiosInstance.post(`/places/${placeId}/reviews`, data);
};

// 리뷰 수정
export const updateReview = async (
  placeId: string,
  reviewId: string,
  data: { title: string; content: string; isLikeCliked: boolean },
) => {
  return await axiosInstance.put(
    `/places/${placeId}/reviews/${reviewId}`,
    data,
  );
};

// 리뷰 삭제
export const deleteReview = async (placeId: string, reviewId: string) => {
  return await axiosInstance.delete(`/places/${placeId}/reviews/${reviewId}`);
};
