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
export const getBoardList = async (cursor: number | null, take: number, category: string) => {
  const params = {
    cursor: cursor || null, // 커서 (시작 ID)
    take: take || 7,       // 한 번에 가져올 데이터 수
    category: category === "전체" ? "" : category, // "전체"면 공백 처리
  };
  return await axiosInstance.get(`/boards`, { params });
};

// 4. 게시글 생성
export interface postProps {
  imageList: { isPrimary: boolean; url: string }[]; // 이미지 객체 배열
  category: string;
  title: string;
  content: string;
}
export const addPost = async (data: postProps) => {
  const formData = new FormData();
  // 필드 추가
  // imageList 처리
  data.imageList.forEach((image) => {
    formData.append("imageList", image.url); // url만 추가
  });
  formData.append("category", data.category);
  formData.append("title", data.title);
  formData.append("content", data.content);
  // API 요청
  const response = await axios.post(`/boards`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

// 5. 게시글 상세 조회
export const fetchBoardDetail = async (postId: string) => {
  return await axiosInstance.get(`/boards/${postId}`);
};

// 6. 게시글 수정




// 7. 게시글 삭제
export const deletePost = async (postId: string) => {
  return await axiosInstance.delete(`/boards/${postId}`);
};

/* 댓글 */
// 1. 댓글 수정



// 2. 댓글 삭제
export const deleteComment = async (postId: string, commentId: string) => {
  return await axiosInstance.delete(`/boards/${postId}/comments/${commentId}`);
};

/*좋아요*/
export const toggleLike = async (postId: string, newLikeState: boolean) => {
  axiosInstance.post("/api/like", {
    postId,
    isLikeClicked: newLikeState,
  });
};
