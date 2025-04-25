import Image from "next/image";
import { useRouter } from "next/navigation";
import ArrowBack from "@/assets/icons/arrowBack.png";

export default function CoustomNav() {
  const router = useRouter();

  return (
    <header className="fixed top-0 w-full sm:max-w-mobile mx-auto bg-background p-2 h-12 flex items-center z-50">
      <button
        className="text-gray-700 font-bold"
        onClick={() => router.back()}
      >
        <Image
          src={ArrowBack}
          alt="뒤로가기 아이콘"
          className="w-8 h-8"
        />
      </button>
    </header>
  );
}