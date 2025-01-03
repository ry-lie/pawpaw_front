import axiosInstance from "@/lib/axios";

// 마이페이지 (사용자와 반려동물의 정보를 조회)
export const getMyPage = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}/my-pages`);
  return response.data;
};

// 내가 쓴 글 조회 (myposts, myreviews)
export const getMyPosts = async (id: number, cursor: number | null = null, take: number = 7) => {
  const response = await axiosInstance.get(`/users/${id}/boards`, {
    params: {
      cursor,
      take,
    },
  });
  return response.data;
};