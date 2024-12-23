import BasicProfileIncon from "@/app/assets/icons/profile_icon.png"
import Nav from "@/app/components/Nav/Nav";
import Image from "next/image";
export default function ReviewDetail() {
  return (
    <div>
      <Nav />
      <Image src={BasicProfileIncon} alt="프로필 이미지" width={80} height={80} />
      유저이름
    </div>
  );
}