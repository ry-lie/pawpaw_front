import axiosInstance from "@/lib/axios";

interface userInfoRes {
  canWalkingMate: boolean;
  nickname: string;
  id: number;
  data?: {
    imageUrl?: string;
  };
}

// 마이페이지 (사용자와 반려동물의 정보를 조회)
export const getMyPage = async () => {
  const response = await axiosInstance.get(`/users/my-pages`);
  return response.data.body.data;
};

//현재 비밀번호 수정 + 산책메이트 on/off + 사용자 닉네임 수정
export const updateUser = async (formData: FormData): Promise<userInfoRes> => {
  // // 닉네임
  // if (data.nickname) {
  //   formData.append("nickname", data.nickname);
  // }

  // // 산책 메이트 on/off
  // if (data.canWalkingMate) {
  //   formData.append("canWalkingMate", String(data.canWalkingMate));
  // }

  // // 사진
  // if (data.image instanceof File) {
  //   formData.append("image", data.image);
  // }

  // // 비밀번호
  // if (data.password) {
  //   formData.append("password", data.password);
  // }

  // // 새로운 비밀번호
  // if (data.newPassword) {
  //   formData.append("newPassword", data.newPassword);
  // }

  const response = await axiosInstance.put(`/users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUser = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data.body?.data; // 정확한 경로로 email 추출
  } catch (error) {
    console.error("API 요청 실패:", error);
    throw error;
  }
};

// 내가 쓴 글 조회 (/mypage/myposts)
export const getMyPosts = async (
  cursor: number | null,
  take: number,
) => {
  const response = await axiosInstance.get(`/users/boards`, {
    params: {
      cursor: cursor || null, // 커서 (시작 ID)
      take: take || 7, // 한 번에 가져올 데이터 수
    },
  });
  return response.data;
};

// 내가 쓴 리뷰 조회 (/mypage/myreviews)
export const getMyReviews = async (
  cursor: number | null = null,
  take: number = 7,
) => {
  const response = await axiosInstance.get(`/users/reviews`, {
    params: {
      cursor,
      take,
    },
  });
  return response.data;
};

// 산책 메이트 여부 변경
export const toggleWorkingMate = async (
  imageUrl: File | undefined,
  canWalkingMate: boolean,
) => {
  const formData = new FormData();

  formData.append("canWalkingMate", String(canWalkingMate));
  if (imageUrl) {
    formData.append("image", imageUrl);
  }

  const response = await axiosInstance.put(`/users/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
