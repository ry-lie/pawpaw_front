
import Footer from "@/components/Footer";
import axiosInstance from "@/lib/axios";
import MapClient from "./MapClient";
export const metadata = {
  title: "반려동물 동반 가능 장소 찾기 - 포포",
  description: "내 위치를 기반으로 반려동물 동반 가능한 장소를 카테고리 별로 추천합니다.",
};

{/**장소 데이터 받아와서 Kakaomap컴포넌트로 넘기기*/ }
export default async function MapPage() {
  //const places = await axiosInstance.get("/api/places").then((res) => res.data);

  return (
    <div>
      {/**내 위치 넘기기*/}
      <MapClient
        latitude={37.64454276}
        longitude={126.886336}
      />
      <Footer />
    </div>
  )
}