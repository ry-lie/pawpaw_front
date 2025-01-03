import axiosInstance from "@/lib/axios";

interface UserInfo{
  id : number;
  nickname : string;
  canWalkingMate : boolean;
  image? : string;
  password? : string;
}

interface userInfoRes{
  success : boolean;
  data : UserInfo
}

// 마이페이지 (사용자와 반려동물의 정보를 조회)
export const getMyPage = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}/my-pages`);
  return response.data;
};

//현재 비밀번호 확인 + 산책메이트 on/off + 사용자 닉네임가져오기
export const updateUser = async(id : number, data : Partial<UserInfo>) : Promise<userInfoRes> => {
  const formData = new FormData();

  //필요한 것만 가지고 나오기
  //닉네임
  if(data.nickname){
    formData.append("nickname", data.nickname);
  }

  //산책메이트 on/off
  if(data.canWalkingMate){
    formData.append("canWalkingMate", String(data.canWalkingMate));
  }

  //사진
  if(data.image){
    formData.append("image", data.image);
  }

  //비밀번호
  if(data.password){
    formData.append("password", data.password);
  }

  const response = await axiosInstance.put(`/user/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}