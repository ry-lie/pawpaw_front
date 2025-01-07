import axios from "axios";
import axiosInstance from "../axios";

/**게시글 */
// 1. 인기 글 목록 조회
export const getPopularBoardList = async (count: number) => {
  const params = {
    count,
  };
  return await axiosInstance.get(`/boards/popular-list`, { params });
};

// 2. 최신 글 목록 조회
export const getLatestBoardList = async (count: number) => {
  const params = {
    count,
  };
  return await axiosInstance.get(`/boards/latest-list`, { params });
};

// 3. 게시글 목록 조회
type BoardListParams = {
  cursor: number | null; // Cursor for pagination
  take: number; // Number of items to fetch
  category?: string; // Optional category
};

export const getBoardList = async (
  cursor: number | null,
  take: number,
  category: string | null,
) => {
  // params 타입 정의
  interface BoardListParams {
    cursor: number | null;
    take: number;
    category?: string; // 선택적 속성
  }

  // 기본 params 객체 생성
  const params: BoardListParams = {
    cursor: cursor || null, // 커서 (시작 ID)
    take: take || 7, // 한 번에 가져올 데이터 수
  };

  // category가 "전체"가 아닌 경우에만 추가
  if (category && category !== "전체") {
    params.category = category;
  }

  return await axiosInstance.get(`/boards`, { params });
};

// 4. 게시글 생성
// 게시글 작성 Payload 인터페이스
export interface PostPayload {
  imageList: File[]; // 이미지 배열 (최대 4장)
  category: string; // 카테고리 (예: "LIFE")
  title: string; // 게시글 제목 (최대 30자)
  content: string; // 게시글 내용 (최대 1,000Byte)
}

// 게시글 작성 API 함수
export const createPostAPI = async (payload: PostPayload) => {
  const formData = new FormData();

  // 이미지 파일 추가
  payload.imageList.forEach((image, index) => {
    formData.append(`imageList`, image);
  });
  // 기타 필수 값 추가
  formData.append("category", payload.category);
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  // API 요청
  const response = await axiosInstance.post(`/boards`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data; // API 응답 반환
};

// 5. 게시글 상세 조회
export const fetchBoardDetail = async (postId: number) => {
  return await axiosInstance.get(`/boards/${postId}`);
};

// 6. 게시글 수정
export const updatePostAPI = async (postId: number, payload: PostPayload) => {
  const formData = new FormData();

  payload.imageList.forEach((image, index) => {
    formData.append("imageList", image);
  });
  formData.append("category", payload.category);
  formData.append("title", payload.title);
  formData.append("content", payload.content);

  const response = await axiosInstance.put(`/boards/${postId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 7. 게시글 삭제
export const deletePost = async (postId: number) => {
  return await axiosInstance.delete(`/boards/${postId}`);
};

/* 댓글 */
// 1. 댓글 작성
export const createComment = async (postId: number, content: string) => {
  return await axiosInstance.post(`/boards/${postId}/comments`, {
    content,
  });
};
// 2. 댓글 삭제
export const deleteComment = async (postId: number, commentId: number) => {
  return await axiosInstance.delete(`/boards/${postId}/comments/${commentId}`);
};
// 3. 댓글 수정
export const updateComment = async (
  postId: number,
  commentId: number,
  content: string,
) => {
  return await axiosInstance.put(`/boards/${postId}/comments/${commentId}`, {
    content,
  });
};

/*좋아요*/
export const toggleLike = async (postId: number, newLikeState: boolean) => {
  axiosInstance.put(`/boards/${postId}/isLikeClicked`, {
    isLikeClicked: newLikeState,
  });
};
