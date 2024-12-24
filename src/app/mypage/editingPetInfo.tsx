"use client";

import { useState } from "react";
import Image from "next/image";
import WomanIcon from "@/assets/icons/woman_icon.png";
import ManIcon from "@/assets/icons/man_icon.png";
import CheckIcon from "@/assets/icons/check_icon.png";
import PetProfile from "@/assets/icons/petProfile_icon.png";

export default function EditingPetInfo({
  pet,
  onSave,
}: {
  pet: any;
  onSave: (updatedPet: any) => void;
}) {
  const [updatedPet, setUpdatedPet] = useState({ ...pet }); // pet을 복사하여 초기값 설정

  return (
    <section className="relative w-full max-w-mobile h-auto bg-white border border-stroke_gray rounded-lg p-10 flex flex-col gap-4">
      {/* 저장 버튼 */}
      <button onClick={() => onSave(updatedPet)} className="absolute top-4 right-4 w-8 h-8">
        <Image src={CheckIcon} alt="저장 완료" className="w-full h-full" />
      </button>

      <div className="w-full">
        {/* 1. 프로필 섹션 */}
        <div className="flex justify-center mb-7">
          <Image
            src={PetProfile}
            alt="pet"
            className="w-44 h-44 bg-white rounded-full"
          />
        </div>

        {/* 2. 이름 & 나이 (왼쪽), 성별 & 크기 섹션(오른쪽) */}
        <div className="flex justify-around mb-1">
          {/* 이름 & 나이 */}
          <div>
            <div className="mb-2">
              <span className="text-base font-bold mr-2">이름 </span>
              <input
                type="text"
                value={updatedPet.name}
                onChange={(e) => setUpdatedPet({ ...updatedPet, name: e.target.value })}
                className="border border-stroke_gray rounded px-1 w-16"
              />
            </div>
            <div>
              <span className="text-base font-bold mr-2">나이 </span>
              <input
                type="number"
                value={updatedPet.age}
                onChange={(e) =>
                  setUpdatedPet({ ...updatedPet, age: parseInt(e.target.value) || 0 })
                }
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
                  onClick={() => setUpdatedPet({ ...updatedPet, breed: "여자" })}
                  className={`py-1 px-2 rounded-lg border ${
                    updatedPet.breed === "여자" ? "bg-red-100" : "bg-white"
                  }`}
                >
                  <Image src={WomanIcon} alt="womanIcon" className="w-5 h-5" />
                </button>
                {/* 남자 버튼 */}
                <button
                  onClick={() => setUpdatedPet({ ...updatedPet, breed: "남자" })}
                  className={`py-1 px-2 rounded-lg border ${
                    updatedPet.breed === "남자" ? "bg-blue-100" : "bg-white"
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
                  onClick={() => setUpdatedPet({ ...updatedPet, size: "소형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    updatedPet.size === "소형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  소
                </button>
                <button
                  onClick={() => setUpdatedPet({ ...updatedPet, size: "중형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    updatedPet.size === "중형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  중
                </button>
                <button
                  onClick={() => setUpdatedPet({ ...updatedPet, size: "대형" })}
                  className={`py-1 px-2 text-base font-semibold rounded-lg border ${
                    updatedPet.size === "대형" ? "bg-stroke_gray" : "bg-white"
                  }`}
                >
                  대
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 성격 섹션 */}
        <div className="flex felx-row ml-16">
          <div className="w-10">
            <span className="text-base font-bold">성격 </span>
          </div>
          <div className="w-60">
            <textarea
              value={updatedPet.personality}
              onChange={(e) =>
                setUpdatedPet({ ...updatedPet, personality: e.target.value })
              }
              className="border border-stroke_gray rounded px-1 w-64 h-16 resize-none overflow-auto"
              maxLength={55}
            />
          </div>
        </div>
      </div>
    </section>
  );
}