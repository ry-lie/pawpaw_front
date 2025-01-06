import axiosInstance from "@/lib/axios";

// 1. 반려동물 정보 등록
export const addPetInfo = async (petData: {
  image: File | null;
  name: string;
  age: number;
  description: string;
  gender: string;
  size: string;
}) => {
  // FormData 객체를 생성하여 이미지와 데이터를 함께 전송
  const formData = new FormData();
  if (petData.image) formData.append("image", petData.image);
  formData.append("name", petData.name);
  formData.append("age", petData.age.toString());
  formData.append("description", petData.description);
  formData.append("gender", petData.gender);
  formData.append("size", petData.size);
  const response = await axiosInstance.post("/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


// 2. 반려동물 정보 수정
export const updatePetInfo = async (
  petId: number,
  petData: {
    image?: File;
    name?: string;
    age?: number;
    description?: string;
    gender?: string;
    size?: string;
  }
) => {
  // FormData 객체를 생성하여 수정 데이터 전송
  const formData = new FormData();
  if (petData.image) formData.append("image", petData.image);
  if (petData.name) formData.append("name", petData.name);
  if (petData.age) formData.append("age", petData.age.toString());
  if (petData.description) formData.append("description", petData.description);
  if (petData.gender) formData.append("gender", petData.gender);
  if (petData.size) formData.append("size", petData.size);
  const response = await axiosInstance.put(`/pets/${petId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 3. 반려동물 정보 삭제
export const deletePetInfo = async (petId: number) => {
  return await axiosInstance.delete(`/pets/${petId}`);
};