export const PATHS = {
  MAIN: "/",
  LOGIN: "/auth/login",
  JOIN: "/auth/join",
  FIND_PASSWORD: "/auth/find-password",

  MYPAGE: "/mypage",
  MY_INFO_MODIFY: "/mypage/modify",
  MY_POSTS: "/mypage/myposts",
  MY_REVIEWS: "/mypage/myreviews",

  MAP: "/map",
  WALKMATE: "/map/walkmate",
  REVIEW_DETAIL: (placeId: number, reviewId: number) =>
    `/map/place/${placeId}/review/${reviewId}`,
  REVIEW_WRITE: (placeId: number) => `/map/place/${placeId}/review/write`,
  REVIEW_MODIFY: (placeId: number, reviewId: number) =>
    `/map/place/${placeId}/review/${reviewId}}/write`,

  COMMUNITY: "/community",
  COMMUNITY_DETAIL: (id: number) => `/community/${id}`,
  COMMUNITY_WRITE: "/community/write",

  CHATTING_LIST: "/chat",
  CHATTING_DETAIL: (id: string) => `/chat/${id}`,
} as const;
