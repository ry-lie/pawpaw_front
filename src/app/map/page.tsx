
import Footer from "@/components/Footer";
import MapClient from "./MapClient";
export const metadata = {
  title: "반려동물 동반 가능 장소 찾기 - 포포",
  description: "내 위치를 기반으로 반려동물 동반 가능한 장소를 카테고리 별로 추천합니다.",
};


export default async function MapPage() {


  return (
    <div>
      <MapClient />
      <Footer />
    </div>
  )
}