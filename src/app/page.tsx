import Footer from "@/components/Footer";
import HeartIcon from "../assets/icons/heart_icon.png";
import FireIcon from "../assets/icons/fire_icon.png";
import Image from "next/image";

import PostCard, { PostCardProps } from '@/components/Main/PostCard';
import HotDog1 from "@/assets/images/postCard/hot1.png";
import HotDog2 from "@/assets/images/postCard/hot2.png";

import Carousel from "@/components/Main/Carousel";
import Carousel1 from "@/assets/images/carousel/carousel1.png";
import Carousel2 from "@/assets/images/carousel/carousel2.png";
import Carousel3 from "@/assets/images/carousel/carousel3.png";

const carouselData = [
  { id: 1, imgUrl: Carousel1, text: "반려동물과\n함께하는 일상" },
  { id: 2, imgUrl: Carousel2, text: "반려동물과\n어디든지 함께해요" },
  { id: 3, imgUrl: Carousel3, text: "포포에서 만나는\n산책메이트" },
];


const posts: PostCardProps[] = [
  { category: '펫자랑', title: '우리 한식,두식,삼식이를 소개합니다.', imageUrl: HotDog1 },
  { category: '일상', title: '오늘 하루는 정말 특별했어요!' },
  { category: '일상', title: '우리 똘이 간식인데 이거 완전 추천해요!', imageUrl: HotDog2 },
  { category: '고민상담', title: '요즘 저희 강아지가 힘이 없는 것 같아요ㅠㅠ' },
  { category: '펫자랑', title: '저를 마중나오는 똘이가 정말 귀엽지 않나요?' },
  { category: '임시보호', title: '시베리안 허스키 임시보호 중입니다.' },
];


export default function Home() {
  return (
    <div className="min-h-screen">

      {/* 메인 컨테이너 */}
      <main className="mt-12 flex flex-col items-center gap-8">

        <Carousel carouselData={carouselData} />

        {/* 1. 캐러셀 
        <section className="w-full h-[260px] bg-gray-200 overflow-hidden">
          <div className="h-full flex items-center justify-center text-gray-600">
            캐러셀 영역 (이미지 슬라이드)
          </div>
        </section>
        */}


        {/* 컨테이너 - 인기글 섹션, 최신글 섹션 */}
        <div className="w-full max-w-mobile mx-auto px-6">
          {/* 인기글 섹션 */}
          <section className="w-full mb-7">
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Image
                src={HeartIcon}
                alt="heart"
                width={24}
                height={24}
                className="mx-1 mb-1"
              />
              인기글
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
              {posts.map((post, index) => (
                <PostCard
                  key={index}
                  category={post.category}
                  title={post.title}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </section>

          {/* 최신글 섹션 */}
          <section className="w-full mb-20">
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <Image
                src={FireIcon} // public 디렉토리 기준 경로
                alt="fire"
                width={24}
                height={24}
                className="mx-1 mb-1"
              />
              최신글
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
              {["어제 간 반려동물 핫플", "오늘 미용했어요", "오늘 병원 예약 있는 우리 주주...", "내일 갈 곳 추천"].map((item, index) => (
                <div
                  key={index}
                  className="w-40 h-24 bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer 카테고리 독바 */}
      <Footer />
    </div>
  );
}