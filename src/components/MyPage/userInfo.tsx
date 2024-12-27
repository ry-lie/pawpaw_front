"use client";

import { useMobile } from "@/hooks/useMobile";
import Link from "next/link";
import { PATHS } from "@/constants/path";
import Image from "next/image";
import BasicProfile from "@/assets/icons/profile_icon.png";

export default function UserInfo() {
  const { isMobile, isMounting } = useMobile();

  if (isMounting) return null; // 초기 렌더링 상태일 경우 아무것도 보여주지 않음

  return isMobile ? <MobileUserInfo /> : <DesktopUserInfo />;
};

const DesktopUserInfo = () => {
  return (
    <section className="w-full max-w-mobile h-36 bg-white border border-stroke_gray rounded-lg p-4 flex gap-4 items-center mb-3">
      {/* 유저 프로필 이미지 */}
      <Image src={BasicProfile} alt="profile" className="w-24 h-24 bg-white rounded-full ml-3 mr-1" />

      {/* 유저 정보 */}
      <div className="flex flex-col flex-grow justify-between">
        <div className="flex items-center justify-start">
          <h3 className="text-xl font-bold">견주</h3>
        </div>
        <Link href={PATHS.MY_INFO_MODIFY}>
          <button className="text-sm text-blue-500 underline flex justify-start mb-1 hover:text-blue-900">내 정보 수정</button>
        </Link>
        <div className="flex justify-start items-center">
          <div className="flex gap-4">
            <Link href={PATHS.MY_POSTS}>
              <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 글</span>
            </Link>
            <span className="text-sm text-gray-600 mt-0.5">|</span>
            <Link href={PATHS.MY_REVIEWS}>
              <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 리뷰</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="flex flex-col justify-between h-full">
        <button className="text-sm bg-primary text-white px-3 py-1 rounded-lg font-semibold">
          산책메이트 ON
        </button>
        <button className="text-sm text-red-500 underline ml-auto">
          로그아웃
        </button>
      </div>
    </section>
  );
};

const MobileUserInfo = () => {
  return (
    <section className="w-full h-auto bg-white border border-stroke_gray rounded-lg px-3 pt-3 py-2 flex flex-col gap-2 items-start mb-3">
      <div className="flex">
        {/* 유저 프로필 이미지 */}
        <Image src={BasicProfile} alt="profile" className="w-16 h-16 bg-white rounded-full mr-4" />

        {/* 유저 정보 */}
        <div className="flex flex-col flex-grow justify-center">

          <div className="flex items-center justify-start">
            <h3 className="text-lg font-bold mr-2">견주</h3>
            <Link href={PATHS.MY_INFO_MODIFY}>
            <button className="text-xs text-blue-500 underline flex justify-start hover:text-blue-900">내 정보 수정</button>
            </Link>
          </div>
          <button className="text-xs bg-primary text-white px-3 py-0.5 rounded-lg font-semibold">
            산책메이트 ON
          </button>
        </div>
      </div>


      {/* 가로선 추가 */}
      <div className="w-full border-t border-stroke_gray"></div>

      <div className="flex items-center justify-around w-full">
          <div className="flex gap-6">
            <Link href={PATHS.MY_POSTS}>
              <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 글</span>
            </Link>
            <span className="text-sm text-gray-600 mt-0.5">|</span>
            <Link href={PATHS.MY_REVIEWS}>
              <span className="text-sm text-gray-600 hover:text-accent_orange">내가 쓴 리뷰</span>
            </Link>
            <span className="text-sm text-gray-600 mt-0.5">|</span>
            <button className="text-sm text-red-500 underline ml-auto">
              로그아웃
            </button>
          </div>
        </div>
    </section>
  );
};
