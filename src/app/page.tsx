import Nav from "@/app/components/Nav/Nav";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
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
          <section className="w-full">
            <h2 className="text-lg font-bold mb-1">🔥 인기글</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["저의 강아지...", "저의 고양이...", "펭귄 소개...", "사나이 샤나이...", "안녕안녕...", "바보아!!!"].map((item, index) => (
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
          <section className="w-full">
            <h2 className="text-lg font-semibold mb-4">🌟 최신글</h2>
            <div className="grid grid-cols-3 gap-4">
              {["주주 종합 병원", "티니핑 미용실", "반려동물 훈련소"].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
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