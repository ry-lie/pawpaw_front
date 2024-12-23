"use client";

import Image from 'next/image';
import { StaticImageData } from 'next/image';
import ProudPetIcon from "@/assets/icons/proudPet_icon.png";
import ConsultationIcon from "@/assets/icons/consultation_icon.png";
import LifeIcon from "@/assets/icons/life_icon.png";
import ProtectIcon from "@/assets/icons/protect_icon.png";



export interface PostCardProps {
  category: '일상' | '펫자랑' | '임시보호' | '고민상담';
  title: string;
  imageUrl?: string | StaticImageData;
}

const categoryStyles = {
  일상: 'bg-gradient-to-r from-[#81E8FF] to-[#DAFEFF] text-blue-700',
  펫자랑: 'bg-gradient-to-r from-[#FFB12C] to-[#FFEFD3] text-blue-700',
  임시보호: 'bg-gradient-to-r from-[#FF7953] to-[#FFE0D4] text-blue-700',
  고민상담: 'bg-gradient-to-r from-[#B2EC45] to-[#E3FFAF] text-blue-700',
};

const categoryIcons = {
  일상: { src: LifeIcon, width: 50, height: 50 },
  펫자랑: { src: ProudPetIcon, width: 40, height: 40 },
  임시보호: { src: ProtectIcon, width: 50, height: 50 },
  고민상담: { src: ConsultationIcon, width: 50, height: 50 },
};

export default function PostCard({ category, title, imageUrl }: PostCardProps) {
  // 포스트카드 글자수 제한
  const maxLength = 11;

  return (
    <div className="rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
      {imageUrl ? (
        <div className="relative w-44 h-28">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      ) : (
        // 이미지 없을 때, 카테고리 별 포스트카드 기본 디자인
        <div
          className={`w-44 h-28 flex items-center justify-center ${categoryStyles[category]}`}
        >
          <Image
            src={categoryIcons[category].src}
            alt={`${category} 아이콘`}
            width={55}
            height={55}
            className="object-contain"
          />
        </div>
      )}
      {/* 포스트카드 글씨 영역 */}
      <div className="p-3 text-start">
        <p className="font-semibold text-sm">{title.length > maxLength ? `${title.slice(0, maxLength)}...` : title}</p>
      </div>
    </div>
  );
}