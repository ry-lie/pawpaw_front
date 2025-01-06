"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import WomanIcon from "@/assets/icons/woman_icon.png";
import ManIcon from "@/assets/icons/man_icon.png";
import CheckIcon from "@/assets/icons/check_icon.png";
import TrashIcon from "@/assets/icons/trash_icon.png";
import PetProfile from "@/assets/icons/petProfile_icon.png";
import { sizeMap, genderMap } from "./petInfo";
import { handleImamgeUploading } from "@/utils/ImageUpload";

export default function AddPetInfo({ pet, onSave, onDelete, }: { pet: any; onSave: (updatedPet: any) => void; onDelete: () => void;}) {
  const [newPet, setNewPet] = useState({
    ...pet,
    profileImage: pet.imageUrl || pet.profileImage || null, // 이미지 URL 설정
    gender: genderMap[pet.gender] || pet.gender || "", // 성별 초기값 매핑
    size: sizeMap[pet.size] || pet.size || "", // 크기 초기값 매핑
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 프로필 이미지 변경
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewPet((prev: typeof newPet) => ({
        ...prev,
        image: file,
        profileImage: imageUrl,
      }));
    } else {
      // 이미지를 새로 등록하지 않을 경우 아무 작업도 하지 않음
      setNewPet((prev: typeof newPet) => ({
        ...prev,
        image: prev.image, // 기존 이미지 유지
        profileImage: prev.profileImage, // 기존 이미지 미리보기 유지
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPet((prev: typeof newPet) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative w-full max-w-mobile h-auto bg-white border border-stroke_gray rounded-lg p-10 flex flex-col gap-4 mb-5">
      {/* 저장 버튼 */}
      <button onClick={() => onSave(newPet)} className="absolute top-4 right-16 mt-1 w-7 h-7">
        <Image src={CheckIcon} alt="저장" className="w-full h-full" />
      </button>
      {/* 삭제 버튼 */}
      <button onClick={onDelete} className="absolute top-4 right-5 w-8 h-8">
        <Image src={TrashIcon} alt="삭제" className="w-full h-full" />
      </button>

      <div className="w-full">
        {/* 1. 프로필 이미지 섹션 */}
        <div
          className="flex justify-center mb-7"
          onClick={() => fileInputRef.current?.click()} // 클릭하면 파일 선택 창 열기
        >
          <Image
            src={newPet.profileImage || PetProfile}
            alt="pet"
            className="w-36 h-36 bg-white rounded-full cursor-pointer"
            width={144}
            height={144}
            onClick={() => fileInputRef.current?.click()}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImageChange} // handleImageUploading 연결
        />

        {/* 2. 이름 & 나이 (왼쪽), 성별 & 크기 섹션(오른쪽) */}
        <div className="flex justify-between mb-1">
          {/* 이름 & 나이 */}
          <div>
            <div className="mb-3">
              <span className="text-base font-bold mr-2">이름 </span>
              <input
                type="text"
                name="name"
                value={newPet.name}
                onChange={handleChange}
                className="border border-stroke_gray rounded px-1 w-16"
              />
            </div>
            <div>
              <span className="text-base font-bold mr-2">나이 </span>
              <input
                type="number"
                name="age"
                value={newPet.age}
                onChange={handleChange}
                className="border border-stroke_gray rounded px-1 w-16"
              />
            </div>
          </div>

          {/* 성별 & 크기 */}
          <div>
            {/* 성별 */}
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base font-bold mr-2">성별 </span>
              <div className="flex gap-1">
                {/* 여자 버튼 */}
                <button
                  onClick={() => setNewPet({ ...newPet, gender: "여자" })}
                  className={`py-1 px-2 rounded-lg border ${
                    newPet.gender === "여자" ? "bg-red-100" : "bg-white"
                  }`}
                >
                  <Image src={WomanIcon} alt="womanIcon" className="w-5 h-5" />
                </button>
                {/* 남자 버튼 */}
                <button
                  onClick={() => setNewPet({ ...newPet, gender: "남자" })}
                  className={`py-1 px-2 rounded-lg border ${
                    newPet.gender === "남자" ? "bg-blue-100" : "bg-white"
                  }`}
                >
                  <Image src={ManIcon} alt="manIcon" className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* 크기 */}
            <div className="mb-2 flex items-center gap-2">
              <span className="text-base font-bold mr-2">크기</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setNewPet({ ...newPet, size: "소형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    newPet.size === "소형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  소
                </button>
                <button
                  onClick={() => setNewPet({ ...newPet, size: "중형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    newPet.size === "중형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  중
                </button>
                <button
                  onClick={() => setNewPet({ ...newPet, size: "대형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    newPet.size === "대형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  대
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 성격 섹션 */}
        {/* 반응형 추가 */}
        <div className="flex felx-row">
          <div className="w-10">
            <span className="text-base font-bold">성격 </span>
          </div>
          <div className="w-auto xs:w-60">
            <textarea
              name="description"
              value={newPet.description}
              onChange={handleChange}
              className="border border-stroke_gray rounded px-1 w-52 xs:w-64 h-16 resize-none overflow-auto"
              maxLength={55}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
