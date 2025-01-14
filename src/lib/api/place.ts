import axiosInstance from "../axios";
// 장소 목록 조회 (반경 및 카테고리 기준)
export const fetchNearbyPlaces = async ({
  category,
  radius,
  latitude,
  longitude,
}: {
  category?: string; // Optional 처리
  radius: number;
  latitude: number;
  longitude: number;
}) => {
  // params 타입 정의
  interface NearbyPlacesParams {
    radius: number;
    latitude: number;
    longitude: number;
    category?: string;
  }

  // params 객체 생성
  const params: NearbyPlacesParams = {
    radius,
    latitude,
    longitude,
  };

  // category가 있으면 추가
  if (category) {
    params.category = category;
  }

  const response = await axiosInstance.get("/places/nearby-place-list", {
    params,
  });

  return response.data;
};

// 장소 상세 조회
export const fetchPlaceDetails = async (placeId: number) => {
  const response = await axiosInstance.get(`/places/${placeId}`);
  return response.data.body.data.data;
};

/*리뷰*/

// 리뷰 상세 조회
export const fetchReviewDetails = async (placeId: number, reviewId: number) => {
  const response = await axiosInstance.get(
    `/places/${placeId}/reviews/${reviewId}`,
  );
  return response.data.body.data;
};

// 리뷰 생성
export const createReview = async (
  placeId: number,
  data: { title: string; content: string; isLikeClicked: boolean },
) => {
  return await axiosInstance.post(`/places/${placeId}/reviews`, data);
};

// 리뷰 수정
export const updateReview = async (
  placeId: number,
  reviewId: number,
  userId: number,
  data: { title: string; content: string; isLikeClicked: boolean },
) => {
  const requestData = {
    title: data.title,
    content: data.content,
    isLikeClicked: data.isLikeClicked,
    id: placeId,
    userId,
    reviewId,
  };

  return await axiosInstance.put(
    `/places/${placeId}/reviews/${reviewId}`,
    requestData,
  );
};

// 리뷰 삭제
export const deleteReview = async (placeId: number, reviewId: number) => {
  return await axiosInstance.delete(`/places/${placeId}/reviews/${reviewId}`);
};
