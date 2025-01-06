"use client";
import Footer from "@/components/Footer";
import Image from "next/image";
import PetLove from "@/assets/icons/petlove_icon.png"

import React, { useState, useEffect } from "react";

// api 연동
import { getMyPage } from "@/lib/api/user";
import PetInfo from "@/components/MyPage/petInfo";
import UserInfo from "@/components/MyPage/userInfo";

export default function UserInfoPage({ params }: { params: { userId: number } }) {
  // params에서 userId 추출
  const { userId } = params;
  const [userInfo, setUserInfo] = useState<any>(null);
  const [petContainers, setPetContainers] = useState<
    { id: number; pet: any; isEditing: boolean; isNew: boolean }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // (유저정보, 펫정보) 정보 조회 (getMyPage)
  useEffect(() => {

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
  }, []);

  return (
    <div className="relative min-h-screen overflow-y-auto">

      {/* 메인 컨테이너 */}
      {/* xs: -> 화면 크기가 426px 이상일 때 (425px = 대형 휴대기기)*/}
      <main className="flex flex-col gap-1 pt-16 pb-8 px-4 xs:px-16">

        {/* 1. 유저 정보 컨테이너 */}
        <div className="items-center">
          {userInfo ? (
            <UserInfo userInfo={userInfo} isMyInfo={false} />
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

        </div>
        <div className="items-center">
          {petContainers.map(({ id, pet, }) =>
            <PetInfo
              key={id}
              pet={pet}
            />
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


