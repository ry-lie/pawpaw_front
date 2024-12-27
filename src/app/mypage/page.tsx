"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import PetLove from "@/assets/icons/petlove_icon.png"
import PetAdd from "@/assets/icons/petAdd_icon.png"

import React, { useState } from "react";
import UserInfo from "../../components/MyPage/userInfo";
import PetInfo from "../../components/MyPage/petInfo";
import AddPetInfo from "../../components/MyPage/addPetInfo";


export default function MyPage() {

  // 임시 펫 정보
  const [petContainers, setPetContainers] = useState<
    { id: number; pet: any; isEditing: boolean }[]
  >([
    {
      id: Date.now(),
      pet: {
        name: "댕댕이",
        age: 3,
        description: "귀엽고 씩씩하며 사람을 잘 따르는 편! 그치만 처음에는 친해지는 시간이 필요",
        gender: "여자",
        size: "소형",
        image: "",
        imageUrl: "",
      },
      isEditing: false,
    },
  ]);

  // 새 컨테이너 추가
  const handleAddContainer = () => {
    const newContainer = {
      id: Date.now(),
      pet: {
        name: "",
        age: 0,
        description: "",
        gender: "",
        size: "",
        image: "",
        imageUrl: "",
      },
      isEditing: true,
    };
    setPetContainers([...petContainers, newContainer]);
  };

  // 저장 (새 컨테이너에 작성한 것 or 기존거 수정한 것)
  const handleSave = (id: number, updatedPet: any) => {
    setPetContainers((prev) =>
      prev.map((container) =>
        container.id === id
          ? { ...container, pet: updatedPet, isEditing: false }
          : container
      )
    );
  };

  // 삭제
  const handleDelete = (id: number) => {
    setPetContainers((prev) => prev.filter((container) => container.id !== id));
  };

  // 수정 모드 활성화
  const handleEdit = (id: number) => {
    setPetContainers((prev) =>
      prev.map((container) =>
        container.id === id ? { ...container, isEditing: true } : container
      )
    );
  };

  return (
    <div className="relative min-h-screen">

      {/* 메인 컨테이너 */}
      {/* xs: -> 화면 크기가 426px 이상일 때 (425px = 대형 휴대기기)*/}
      <main className="flex flex-col gap-1 pt-16 pb-8 px-4 xs:px-16">

        {/* 1. 유저 정보 컨테이너 */}
        <div className="items-center">
          <UserInfo />
        </div>

        {/* 2. 반동소 컨테이너*/}
        <div className="flex items-center gap-1 justify-start ml-2">
          {/* 이미지 아이콘 */}
          <Image src={PetLove} alt="petLove" className="w-6 h-6" />
          {/* 텍스트 */}
          <h2 className="text-lg font-bold text-gray-800 mr-0.5">내 반려동물을 소개합니다</h2>
          {/* 반려동물 추가 버튼 */}
          <button onClick={handleAddContainer} className="flex items-center text-xs bg-primary text-white px-2 pt-1 pb-0.5 rounded-xl font-semibold hover:bg-hover">
            <Image src={PetAdd} alt="펫추가" className="w-2 h-2 mb-0.5 mr-0.5" />
            반려동물 추가
          </button>
        </div>
        <div className="items-center">
          {petContainers.map(({ id, pet, isEditing }) =>
            isEditing ? (
              <AddPetInfo
                key={id}
                pet={pet}
                onSave={(updatedPet) => handleSave(id, updatedPet)}
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


