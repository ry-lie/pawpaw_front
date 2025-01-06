import Footer from "@/components/Footer";
import PersonRadius from "./PersonRadius";

export const metadata = {
  title: "산책메이트 - 포포",
  description: "주변 산책 친구들을 찾아보세요",
}; 

export default function WalkMatePage() {
  return (
    <div>
      <PersonRadius />
      <Footer />
    </div>
  );
}
