'use client'; // Next.js에서 클라이언트 측 컴포넌트임

// components/PetInfo.tsx
import { useState } from 'react';
import EditIcon from "@/assets/icons/edit_icon.png"
import TrashIcon from "@/assets/icons/trash_icon.png"
import WomanIcon from "@/assets/icons/woman_icon.png"
import ManIcon from "@/assets/icons/man_icon.png"
import PetProfile from "@/assets/icons/petProfile_icon.png"
import Image from 'next/image';

export default function PetInfo({ pet, onEdit, onDelete }: { pet: any; onEdit: () => void; onDelete: () => void }) {
  return (
    <section className="relative w-full max-w-mobile h-auto bg-white border border-stroke_gray rounded-lg p-10 flex flex-col gap-4 mb-5">
      {/* 수정 버튼 */}
      <button onClick={onEdit} className="absolute top-4 right-16 mt-1 w-7 h-7">
        <Image
          src={EditIcon}
          alt="수정"
          className="w-full h-full"
        />
      </button>
      {/* 삭제 버튼 */}
      <button onClick={onDelete} className="absolute top-4 right-5 w-8 h-8">
        <Image 
          src={TrashIcon} 
          alt="삭제" 
          className="w-full h-full" />
      </button>

      <div className='w-full'>
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
            <div className='mb-2'>
              <span className='text-base font-bold mr-2'>이름 </span>
              <span className='text-base'>{pet.name}</span>
            </div>
            <div>
              <span className='text-base font-bold mr-2'>나이 </span>
              <span className='text-base'>{pet.age}</span>
            </div>
          </div>

          {/* 성별 & 크기 */}
          <div>
            {/* 성별 */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-base font-bold mr-2'>성별 </span>
              <div className="flex items-center gap-2">
                {pet.gender === '여자' ? (
                  <Image
                    src={WomanIcon}
                    alt="womanIcon"
                    className="w-5 h-5"
                  />
                ) : (
                  <Image
                    src={ManIcon}
                    alt="manIcon"
                    className="w-5 h-5"
                  />
                )}
              </div>
            </div>
            {/* 크기 */}
            <div className='mb-2 flex items-center gap-2'>
              <span className="text-base font-bold mr-2">크기</span>
              <span className="text-base">{pet.size}</span>
            </div>
          </div>
        </div>

        {/* 3. 성격 섹션 */}
        <div className='flex felx-row ml-14'>
          <div className='w-10'>
            <span className='text-base font-bold'>성격 </span>
          </div>

          <div className='w-60'>
            <span className="text-base">{pet.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}