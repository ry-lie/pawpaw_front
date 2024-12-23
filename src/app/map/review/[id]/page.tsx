import BasicProfileIncon from "@/assets/icons/profile_icon.png"
import Image from "next/image";
export default function ReviewDetail() {
  return (
    <div>
      <Image src={BasicProfileIncon} alt="프로필 이미지" width={80} height={80} />
      유저이름
    </div>
  );
}