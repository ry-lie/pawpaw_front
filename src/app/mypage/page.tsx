"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import PetLove from "@/assets/icons/petlove_icon.png"
import PetAdd from "@/assets/icons/petAdd_icon.png"
import PetProfile from "@/assets/icons/petProfile_icon.png"

import React, { useState, useEffect } from "react";
import UserInfo from "../../components/MyPage/userInfo";
import PetInfo from "../../components/MyPage/petInfo";
import AddPetInfo from "../../components/MyPage/addPetInfo";
// api 연동
import { getMyPage } from "@/lib/api/user";
import { addPetInfo, updatePetInfo } from "@/lib/api/pet";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [petContainers, setPetContainers] = useState<
    { id: number; pet: any; isEditing: boolean; isNew: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // UserStore에서 ID 가져오기
  const { initialize, id: userId, isLoggedIn } = useUserStore();
  // 초기화 및 유저 ID 가져오기
  useEffect(() => {
    initialize();
  }, []);

  // (유저정보, 펫정보) 정보 조회 (getMyPage)
  useEffect(() => {
    if (!isLoggedIn || !userId) return; // 로그인되지 않았거나 ID가 없을 경우 종료
    const fetchData = async () => {
      try {
        const data = await getMyPage(userId);
        // 유저 정보 추출
        const userInfo = {
          nickname: data.nickname,
          canWalkingMate: data.canWalkingMate,
          imageUrl: data.imageUrl,
        };
        // 펫정보 추출
        const pets = (data.petList || []).map((pet: any) => ({
          id: pet.id,
          pet: {
            name: pet.name,
            age: pet.age,
            description: pet.description,
            gender: pet.gender,
            size: pet.size,
            imageUrl: pet.imageUrl,
          },
          isEditing: false,
        }));
        setUserInfo(userInfo); // 유저 정보 설정
        setPetContainers(pets);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isLoggedIn, userId]);

  // 반동소 칸 추가
  const handleAddContainer = () => {
    const newContainer = {
      id: Date.now(), // 임시 ID
      pet: {
        name: "",
        age: 0,
        description: "",
        gender: "",
        size: "",
        imageUrl: "",
      },
      isEditing: true,
      isNew: true, // 새로운 반려동물 추가 플래그
    };
    setPetContainers([...petContainers, newContainer]);
  };

  // 매핑
  const mapToServerData = (petData: any) => {
    const genderMap: Record<string, string> = {
      여자: "FEMALE",
      남자: "MALE",
    };
    const sizeMap: Record<string, string> = {
      소형: "SMALL",
      중형: "MEDIUM",
      대형: "LARGE",
    };
    return {
      ...petData,
      gender: genderMap[petData.gender] || petData.gender, // 서버 요구사항에 맞게 변환
      size: sizeMap[petData.size] || petData.size, // 서버 요구사항에 맞게 변환
    };
  };

  // 반려동물 등록 (addPetInfo)
  const handleAdd = async (newPet: any) => {
    try {
      const mappedPetData = mapToServerData(newPet); // 데이터를 서버 요구사항에 맞게 변환
      console.log("Calling addPetInfo API with data:", mappedPetData);
  
      // POST 요청
      const addedPet = await addPetInfo(mappedPetData);
  
      // 등록 후 전체 데이터 다시 조회
      const updatedData = await getMyPage(userId);
      const newPetData = updatedData.petList.find((pet: any) => pet.id === addedPet.id);
  
      setPetContainers((prev) =>
        prev.map((container) =>
          container.isNew
            ? {
                ...container,
                id: addedPet.id,
                pet: newPetData || {
                  ...newPet,
                  id: addedPet.id,
                  imageUrl: newPet.profileImage || PetProfile, // 기본 이미지
                },
                isEditing: false,
                isNew: false,
              }
            : container
        )
      );
    } catch (error) {
      console.error("Error while adding new pet info:", error);
      alert("추가에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleUpdate = async (id: number, updatedPet: any) => {
    try {
      const mappedPetData = mapToServerData(updatedPet); // 서버 요구사항에 맞게 데이터 매핑
      console.log("Calling updatePetInfo API for ID:", id);
  
      // PUT 요청
      await updatePetInfo(id, mappedPetData);
      // 수정 후 데이터 다시 조회
      const updatedData = await getMyPage(userId); // 유저 ID를 이용해 다시 데이터 조회
      const updatedPetList = updatedData.petList.find((pet: any) => pet.id === id); // 해당 반려동물 정보만 추출
  
      setPetContainers((prev) =>
        prev.map((container) =>
          container.id === id
            ? { ...container, pet: updatedPetList, isEditing: false }
            : container
        )
      );
    } catch (error) {
      console.error("Error while updating pet info:", error);
      alert("수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 삭제
  const handleDelete = (id: number) => {
    setPetContainers((prev) => prev.filter((container) => container.id !== id));
  };

  // 수정 모드 활성화
  const handleEdit = (id: number) => {
    setPetContainers((prev) =>
      prev.map((container) =>
        container.id === id ? { ...container, isEditing: true, isNew: false } : container
      )
    );
    console.log("Editing pet with ID:", id); // 디버깅: 클릭한 반려동물의 ID 확인
  };

  return (
    <div className="relative min-h-screen overflow-y-auto">

      {/* 메인 컨테이너 */}
      {/* xs: -> 화면 크기가 426px 이상일 때 (425px = 대형 휴대기기)*/}
      <main className="flex flex-col gap-1 pt-16 pb-8 px-4 xs:px-16">

        {/* 1. 유저 정보 컨테이너 */}
        <div className="items-center">
          {userInfo ? (
            <UserInfo userInfo={userInfo} />
          ) : (
            <p>유저 정보를 불러오는 중입니다...</p>
          )}
        </div>

        {/* 2. 반동소 컨테이너*/}
        <div className="flex items-center gap-1 justify-start ml-2">
          {/* 이미지 아이콘 */}
          <Image 
            src={PetLove} 
            alt="petLove" 
            className="h-6 w-6" 
            width={24} // 6rem = 24px
            height={24} 
          />          
          {/* 텍스트 */}
          <h2 className="text-lg font-bold text-gray-800 mr-0.5">내 반려동물을 소개합니다</h2>
          {/* 반려동물 추가 버튼 */}
          <button onClick={handleAddContainer} className="flex items-center text-xs bg-primary text-white px-2 pt-1 pb-0.5 rounded-xl font-semibold hover:bg-hover">
          <Image 
            src={PetAdd} 
            alt="펫추가" 
            className="h-2 w-2 mb-0.5 mr-0.5" 
            width={8} // 2rem = 8px
            height={8} 
          />
          반려동물 추가
          </button>
        </div>
        <div className="items-center">
          {petContainers.map(({ id, pet, isEditing, isNew }) =>
            isEditing ? (
              <AddPetInfo
                key={id}
                pet={pet}
                onSave={(updatedPet) => {
                  if (isNew) {
                    handleAdd(updatedPet); // 새로운 반려동물 추가
                  } else {
                    handleUpdate(id, updatedPet); // 기존 반려동물 수정
                  }
                }}
                onDelete={() => handleDelete(id)} // 삭제 콜백
              />
            ) : (
              <PetInfo
                key={id}
                pet={pet}
                onEdit={() => handleEdit(id)}
                onDelete={() => handleDelete(id)}
              />
            )
          )}
        </div>
      </main>

      {/* Footer 카테고리 독바 */}
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  )
}


