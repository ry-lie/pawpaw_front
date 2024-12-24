import axiosInstance from "../axios";

export const toggleLike = async (postId: string, isLiked: boolean) => {
  await axiosInstance.post("/api/like", {
    postId,
    isLiked,
  });
};
