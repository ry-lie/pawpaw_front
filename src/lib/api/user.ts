import axiosInstance from "@/lib/axios";

interface UserInfo {
  nickname: string;
  canWalkingMate: boolean;
  image?: string;
  password?: string;
  newPassword?: string;
}

interface userInfoRes {
  canWalkingMate: boolean;
  nickname: string;
  id: number;
}

// 마이페이지 (사용자와 반려동물의 정보를 조회)
export const getMyPage = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}/my-pages`);
  return response.data.body.data;
};

//현재 비밀번호 수정 + 산책메이트 on/off + 사용자 닉네임 수정
export const updateUser = async (
  id: number,
  data: Partial<UserInfo>,
): Promise<userInfoRes> => {
  const formData = new FormData();

  //닉네임
  if (data.nickname) {
    formData.append("nickname", data.nickname);
  }

  //산책메이트 on/off
  if (data.canWalkingMate) {
    formData.append("canWalkingMate", String(data.canWalkingMate));
  }

  //사진
  if (data.image) {
    formData.append("image", data.image);
  }

  //비밀번호
  if (data.password) {
    formData.append("password", data.password);
  }

  //새로운비밀번호
  if (data.newPassword) {
    formData.append("newPassword", data.newPassword);
  }
  const response = await axiosInstance.put(`/users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getUser = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

// 내가 쓴 글 조회 (/mypage/myposts)
export const getMyPosts = async (
  id: number,
  cursor: number | null = null,
  take: number = 7,
) => {
  const response = await axiosInstance.get(`/users/${id}/boards`, {
    params: {
      cursor,
      take,
    },
  });
  return response.data;
};

// 내가 쓴 리뷰 조회 (/mypage/myreviews)
export const getMyReviews = async (
  id: number,
  cursor: number | null = null,
  take: number = 7,
) => {
  const response = await axiosInstance.get(`/users/${id}/reviews`, {
    params: {
      cursor,
      take,
    },
  });
  return response.data;
};
