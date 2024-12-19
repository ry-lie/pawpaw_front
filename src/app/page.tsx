import Nav from "@/app/components/Nav/Nav";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav 컴포넌트 */}
      <Nav />

      {/* 메인 컨테이너 */}
      <main className="flex flex-col items-center gap-8">
        {/* 1. 캐러셀 */}
        <section className="w-full h-[300px] bg-gray-200 overflow-hidden">
          <div className="h-full flex items-center justify-center text-gray-600">
            캐러셀 영역 (이미지 슬라이드)
          </div>
        </section>

        {/* 컨테이너 - 인기글 섹션, 최신글 섹션 */}
        <div className="w-full max-w-mobile mx-auto px-6">
          {/* 인기글 섹션 */}
          <section className="w-full mb-7">
            <h2 className="text-lg font-bold mb-1 flex items-center">
              <img src="/icons/heart_icon.png" alt="heart" className="h-6 w-6 mx-1 mb-1" />
              인기글
            </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {["저의 강아지...", "저의 고양이...", "펭귄 소개...", "사나이 샤나이...", "이 장소 완전 추천", "강와지와 보내는 행복한 일상"].map((item, index) => (
                  <div
                    key={index}
                    className="w-[170px] h-[100px] bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    {item}
                  </div>
                ))}
              </div>
          </section>

          {/* 최신글 섹션 */}
          <section className="w-full mb-20">
            <h2 className="text-lg font-bold mb-1 flex items-center">
                <img src="/icons/fire_icon.png" alt="fire" className="h-6 w-6 mx-1 mb-1" />
                최신글
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["어제 간 반려동물 핫플", "오늘 미용했어요", "오늘 병원 예약 있는 우리 주주...", "내일 갈 곳 추천"].map((item, index) => (
                <div
                  key={index}
                  className="w-[170px] h-[100px] bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Nav 컴포넌트 */}
      <Footer />
    </div>
  );
}