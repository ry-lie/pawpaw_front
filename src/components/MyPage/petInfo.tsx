'use client'; // Next.js에서 클라이언트 측 컴포넌트임

// components/PetInfo.tsx
import EditIcon from "@/assets/icons/edit_icon.png"
import TrashIcon from "@/assets/icons/trash_icon.png"
import WomanIcon from "@/assets/icons/woman_icon.png"
import ManIcon from "@/assets/icons/man_icon.png"
import PetProfile from "@/assets/icons/petProfile_icon.png"
import Image from 'next/image';

export const sizeMap: Record<string, string> = {
  SMALL: "소형",
  MEDIUM: "중형",
  LARGE: "대형",
};

export const genderMap: Record<string, string> = {
  MALE: "남자",
  FEMALE: "여자",
};

// Pet 타입 정의
interface Pet {
  id: number | undefined;
  name: string;
  age: number;
  gender: "MALE" | "FEMALE";
  size: "SMALL" | "MEDIUM" | "LARGE";
  description: string;
  imageUrl?: string; // 선택적 속성
}

// Props 타입 정의
interface PetInfoProps {
  pet: Pet;
  onEdit?: (id?: number) => void;
  onDelete?: (id?: number) => void;
}


export default function PetInfo({ pet, onEdit, onDelete }: PetInfoProps) {

  return (
    <section className="relative w-full max-w-mobile h-auto bg-white border border-stroke_gray rounded-lg p-10 flex flex-col gap-4 mb-5">
      {/* 수정 버튼 */}
      {onEdit && (
        <button
          onClick={() => onEdit(pet.id)}
          className="absolute top-4 right-16 mt-1 w-7 h-7"
        >
          <Image
            src={EditIcon}
            alt="수정"
            className="w-full h-full"
          />
        </button>
      )}

      {/* 삭제 버튼 */}
      {onDelete && (
        <button
          onClick={() => onDelete(pet.id)}
          className="absolute top-4 right-5 w-8 h-8"
        >
          <Image
            src={TrashIcon}
            alt="삭제"
            className="w-full h-full"
          />
        </button>
      )}

      <div className='w-full'>
        {/* 1. 프로필 이미지 섹션 */}
        <div className="flex justify-center mb-7">
          <Image
            src={pet.imageUrl || PetProfile}
            alt="pet"
            className="w-36 h-36 bg-white rounded-full"
            width={144} // 이미지의 기본 너비
            height={144} // 이미지의 기본 높이
          />
        </div>

        {/* 2. 이름 & 나이 (왼쪽), 성별 & 크기 섹션(오른쪽) */}
        <div className="flex justify-between xs:px-14 px-6 mb-1">
          {/* 이름 & 나이 */}
          <div>
            <div className='mb-2'>
              <span className='text-base font-bold mr-3 xs:mr-4'>이름 </span>
              <span className='text-base'>{pet.name}</span>
            </div>
            <div>
              <span className='text-base font-bold mr-3 xs:mr-4'>나이 </span>
              <span className='text-base'>{pet.age}</span>
            </div>
          </div>

          {/* 성별 & 크기 */}
          <div>
            {/* 성별 */}
            <div className='mb-2 flex items-center gap-2'>
              <span className='text-base font-bold mr-2'>성별 </span>
              <div className="flex items-center gap-2">
                {genderMap[pet.gender] === '여자' ? (
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
              <span className="text-base">{sizeMap[pet.size] || pet.size}</span>
            </div>
          </div>
        </div>

        {/* 3. 성격 섹션 */}
        {/* 반응형 추가 */}
        <div className='flex felx-row xs:px-14 px-6'>
          <div className='w-1/5 xs:w-1/6'>
            <span className='text-base font-bold'>성격 </span>
          </div>

          <div className='w-4/5 xs:5/6'>
            <span className="text-base">{pet.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
}