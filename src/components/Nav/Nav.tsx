"use client";

import { PATHS } from "@/constants/path";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import MiniLogo from "@/assets/images/logo/miniLogo.png";
import ChatEventAlram from "./ChatEventAlarm";
import { logoutAPI } from "@/lib/api/auth";

const NONE_NAV_PAGE_LIST = [PATHS.LOGIN, PATHS.COMMUNITY_WRITE] as string[];

export default function Nav() {
  const router = useRouter();
  const { isLoggedIn, logout } = useUserStore(); // Zustand에서 상태 가져오기
  const [isLoading, setIsLoading] = useState(false);

  // 로그아웃
  const handleLogout = async () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      try {
        await logoutAPI();
        useUserStore.getState().logout();
        router.push(PATHS.LOGIN);
      } catch (error) {
        console.error("로그아웃 실패:", error);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const pathname = usePathname();
  if (NONE_NAV_PAGE_LIST.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-l border-r border-stroke_gray-600 pl-2 pr-6 py-4 max-w-mobile w-full mx-auto h-12">
      {/* 로고 영역 */}
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link href={PATHS.MAIN}>
            <Image
              src={MiniLogo}
              alt="미니 로고"
              className="xs:w-20 xs:h-8 w-14 h-6"
              priority
            />
          </Link>
        </div>

        {/* 로그인 및 로그아웃 버튼 */}
        <div className="flex justify-end items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-800 transition"
                disabled={isLoading}
              >
                로그아웃
              </button>
              <ChatEventAlram />
            </>
          ) : (
            <>
              <Link
                href={PATHS.LOGIN}
                className="text-sm text-gray-600 hover:text-gray-800 transition"
                onClick={(e) => {
                  if (isLoading) e.preventDefault();
                }}
              >
                로그인
              </Link>
              <Link
                href={PATHS.JOIN}
                className="text-sm text-gray-600 hover:text-gray-800 transition"
                onClick={(e) => {
                  if (isLoading) e.preventDefault();
                }}
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
