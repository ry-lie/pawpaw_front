import Nav from "@/app/components/Nav/Nav";
import Footer from "@/app/components/Footer";
import PetInfo from "./petInfo";
import BasicProfile from "@/app/assets/icons/profile_icon.png"
import Image from "next/image";
export default function MyPage() {
  return (
    <div className="min-h-screen">
      {/* Nav 컴포넌트 */}
      <Nav />

      {/* 메인 컨테이너 */}
      <main className="flex flex-col items-center gap-8 mt-20">
        {/* 1. 유저 정보 컨테이너 */}
        <section className="w-[495px] h-[160px] bg-white border border-stroke_gray rounded-lg p-4 flex gap-4 items-center">

          {/* (1) 유저 프로필 이미지 */}
          <Image src={BasicProfile} alt="profile" className="w-[97px] h-[97px] bg-white rounded-full ml-3 mr-1" />
          {/* (2) 유저 정보 */}
          <div className="flex flex-col flex-grow justify-between">
            <div className="flex items-center justify-start">
              <h3 className="text-[24px] font-bold">견주</h3>
            </div>

            <button className="text-sm text-blue-500 underline flex justify-start mb-1">내 정보 수정</button>

            <div className="flex justify-start items-center">
              <div className="flex gap-4">
                <span className="text-sm text-gray-600">내가 쓴 글</span>
                <span className="text-sm text-gray-600">|</span>
                <span className="text-sm text-gray-600">내가 쓴 댓글</span>
              </div>
            </div>
          </div>

          {/* (3) 버튼 */}
          <div className="flex flex-col justify-between h-full">
            <button className="text-sm bg-primary text-white px-3 py-1 rounded-lg font-semibold">
              산책메이트 ON
            </button>
            <button className="text-sm text-red-500 underline ml-auto">
              로그아웃
            </button>
          </div>
        </section>

        {/* 반동소 컨테이너*/}
        <PetInfo />


      </main>

      {/* Nav 컴포넌트 */}
      <Footer />
    </div>
  )
}