'use client'; // Next.js에서 클라이언트 측 컴포넌트임

// components/PetInfo.tsx
import { useState } from 'react';

export default function PetInfo() {
  const [isEditing, setIsEditing] = useState(false);
  // 반려동물 임시 정보
  const [pet, setPet] = useState({
    name: '댕댕이',
    breed: '푸들', // 성별
    age: 3,
    size: '소형',
    personality: '귀엽고 씩씩하며 사람을 잘 따르는 편! 그치만 처음에는 친해지는 시간이 필요',
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('반려동물 정보가 업데이트되었습니다.');
  };

  return (
    <section className="relative w-full max-w-mobile h-auto bg-white border border-stroke_gray rounded-lg p-10 flex flex-col gap-4">
      {/* 수정 버튼 */}
      <button
        onClick={isEditing ? handleSave : () => setIsEditing(true)}
        className="absolute top-4 right-4 w-8 h-8"
      >
        <img
          src={isEditing ? '/icons/check_icon.png' : '/icons/edit_icon.png'}
          alt={isEditing ? '수정 완료' : '수정'}
          className="w-full h-full"
        />
      </button>

      <div className='w-full'>
        {/* 1. 프로필 섹션 */}
        <div className="flex justify-center mb-7">
          <img
            src="/icons/profile_icon.png"
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
              {isEditing ? (
                <input
                  type="text"
                  value={pet.name}
                  onChange={(e) => setPet({ ...pet, name: e.target.value })}
                  className="border border-stroke_gray rounded px-1 w-16"
                />
              ) : (
                <span className='text-base'>{pet.name}</span>
              )}
            </div>
            <div>
              <span className='text-base font-bold mr-2'>나이 </span>
              {isEditing ? (
                <input
                  type="number"
                  value={pet.age}
                  onChange={(e) => setPet({ ...pet, age: +e.target.value })}
                  className="border border-stroke_gray rounded px-1 w-16"
                />
              ) : (
                <span className='text-base'>{pet.age}</span>
              )}
            </div>
          </div>
          
          {/* 성별 & 크기 */}
          <div>
            <div className='mb-2'>
              <span className='text-base font-bold mr-2'>성별 </span>
              {isEditing ? (
                <input
                  type="text"
                  value={pet.breed}
                  onChange={(e) => setPet({ ...pet, breed: e.target.value })}
                  className="border border-stroke_gray rounded px-1 w-16"
                />
              ) : (
                <span className='text-base'>{pet.breed}</span>
              )}
            </div>
            <div>
              <span className='text-base font-bold mr-2'>크기 </span>
              {isEditing ? (
                <input
                  type="text"
                  value={pet.size}
                  onChange={(e) => setPet({ ...pet, size: e.target.value })}
                  className="border border-stroke_gray rounded px-1 w-16"
                />
              ) : (
                <span className='text-base'>{pet.size}</span>
              )}
            </div>
          </div>
        </div>

        {/* 3. 성격 섹션 */}
        <div className='flex felx-row ml-16'>
          <div className='w-10'>
            <span className='text-base font-bold'>성격 </span>
          </div>

          <div className='w-60'>
          {isEditing ? (
            <textarea
              value={pet.personality}
              onChange={(e) => setPet({ ...pet, personality: e.target.value })}
              className="border border-stroke_gray rounded px-1 w-64 h-16 resize-none overflow-auto"
              maxLength={55}
            />
          ) : (
            <span className="text-base">{pet.personality}</span>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}