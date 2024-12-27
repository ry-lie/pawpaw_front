import axiosInstance from "@/lib/axios";

// 마이페이지 (사용자와 반려동물의 정보를 조회)
export const getMyPage = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/users/${id}/my-pages`);
    return response.data;
  } catch (error: any) {
    console.error("마이페이지 데이터를 불러오는데 실패했습니다:", error);
    throw error;
  }
};