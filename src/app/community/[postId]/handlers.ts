import { PATHS } from "@/constants/path";
import {
  createComment,
  deleteComment,
  deletePost,
  updateComment,
  fetchBoardDetail,
} from "@/lib/api/board";
import { successToast, errorToast } from "@/utils/Toast";
// 댓글 등록 이벤트
export const handleAddComment = async (
  postId: number,
  comment: string,
  setPost: (data: any) => void,
  setComment: (value: string) => void,
) => {
  try {
    await createComment(postId, comment);
    successToast("댓글이 등록되었습니다.");
    setComment(""); // 댓글 입력 초기화
    const response = await fetchBoardDetail(postId);
    setPost(response?.data?.body?.data);
  } catch (error) {
    errorToast("댓글 등록에 실패했습니다.");
  }
};
// 댓글 수정 이벤트
export const handleModifyComment = async (
  postId: number,
  commentId: number,
  updatedContent: string,
  setPost: (data: any) => void,
) => {
  try {
    await updateComment(postId, commentId, updatedContent);
    successToast("댓글이 수정되었습니다.");
    const updatedPost = await fetchBoardDetail(postId);
    setPost(updatedPost.data.body.data);
  } catch (error) {
    errorToast("댓글 수정에 실패했습니다.");
  }
};
// 댓글 삭제 이벤트
export const handleDeleteComment = async (
  postId: number,
  commentId: number,
  setPost: (data: any) => void,
) => {
  if (!confirm("댓글을 삭제하시겠습니까?")) return;

  try {
    await deleteComment(postId, commentId);
    successToast("댓글이 삭제되었습니다.");
    const updatedPost = await fetchBoardDetail(postId);
    setPost(updatedPost.data.body.data);
  } catch (error) {
    errorToast("댓글 삭제에 실패했습니다.");
  }
};
// 글 삭제 이벤트
export const handleDeletePost = async (postId: number) => {
  if (!confirm("글을 삭제하시겠습니까?")) return;

  try {
    await deletePost(postId);
    window.location.href = PATHS.MAP;
    successToast("글이 삭제되었습니다.");
  } catch (error) {
    errorToast("글 삭제에 실패했습니다.");
  }
};
