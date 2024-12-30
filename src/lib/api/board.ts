import axiosInstance from "../axios";

/**게시글 */
// 게사글 조화
export const fetchBoardDetail = async (postId: string) => {
  return await axiosInstance.get(`/boards/${postId}`);
};
// 게시글 삭제
export const deletePost = async (postId: string) => {
  return await axiosInstance.delete(`/boards/${postId}`);
};

/*댓글 */
// 댓글 삭제
export const deleteComment = async (postId: string, commentId: string) => {
  return await axiosInstance.delete(`/boards/${postId}/comments/${commentId}`);
};
