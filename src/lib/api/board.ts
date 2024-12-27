import axiosInstance from "../axios";

/**게시글 */
// 게시글 삭제
export const deletePost = async (postId: string) => {
  return await axiosInstance.delete(`/api/boards/${postId}`);
};

/*댓글 */
// 댓글 삭제
export const deleteComment = async (postId: string, commentId: string) => {
  return await axiosInstance.delete(
    `/api/boards/${postId}/comments/${commentId}`,
  );
};
