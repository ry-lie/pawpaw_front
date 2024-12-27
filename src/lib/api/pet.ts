import axiosInstance from "@/lib/axios";

// 반려동물 정보 등록
export const addPetInfo = async (petData: {
  image?: File;
  name: string;
  age: number;
  description: string;
  gender: string;
  size: string;
}) => {
  try {
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
  } catch (error: any) {
    console.error("반려동물 정보를 추가하는데 실패했습니다:", error);
    throw error;
  }
};

// 반려동물 정보 수정
export const updatePetInfo = async (
  petId: string,
  petData: {
    image?: File;
    name?: string;
    age?: number;
    description?: string;
    gender?: string;
    size?: string;
  }
) => {
  try {
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
  } catch (error: any) {
    console.error("반려동물 정보를 수정하는데 실패했습니다:", error);
    throw error;
  }
};