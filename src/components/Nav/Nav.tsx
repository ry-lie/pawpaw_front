"use client";

import { PATHS } from "@/constants/path";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../Button";
import { toast } from "react-toastify";

const NONE_NAV_PAGE_LIST = [PATHS.LOGIN, PATHS.COMMUNITY_WRITE] as string[];

export default function Nav() {

  const router = useRouter();
  const { isLoggedIn, logout } = useUserStore(); // Zustand에서 상태 가져오기
  useEffect(() => {
    useUserStore.getState().initialize();
  }, []);

  //채팅 요청
  const handleChatToastify = (another: string) => {
    toast(
      <div>
        <div className="flex items-center w-full">
          <p className="mb-2">{another}님이 채팅 요청하셨습니다.</p>
        </div>

        <div className="flex ">
          <Button
            onClick={() => handleApprove(another)}>수락</Button>
          <Button onClick={() => handleReject(another)}>거절</Button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      }
    )
  }

  //채팅 요청수락
  const handleApprove = (another: string) => {
    toast.info(`${another}님의 채팅을 수락했습니다.`,{
      autoClose:800,
      position:"top-right"
    });
   
  }

  //채팅 요청거절
  const handleReject = (another: string) => {
    toast.info(`${another}님의 채팅을 거절했습니다.`,{
      autoClose:800,
      position:"top-right"
    });
  }

  // 로그아웃
  const handleLogout = () => {
    if (confirm("로그아웃 하시겠습니까?")) {
      // Zustand 상태 초기화
      useUserStore.getState().logout();
      router.push(PATHS.LOGIN);
    }
  };

  const pathname = usePathname();
  if (NONE_NAV_PAGE_LIST.includes(pathname)) {
    return null;
  }


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-l border-r border-stroke_gray-600 px-6 py-4 max-w-mobile w-full mx-auto h-12">
      {/* 로고 영역 */}
      <div className="flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link href={PATHS.MAIN} className="text-lg font-semibold text-gray-800">
            LOGO
          </Link>
        </div>
        {/*알람 버튼 진행 */}
        <div className="ml-56">
          <Button 
          onClick={() => handleChatToastify("빠알간두볼")}
          containerStyles="text-black hover:!bg-white hover:!text-black hover:underline">알람테스트</Button>

        </div>

        {/* 로그인 및 로그아웃 버튼 */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-800 transition"
            >
              로그아웃
            </button>
          ) : (
            <>
              <Link href={PATHS.LOGIN} className="text-sm text-gray-600 hover:text-gray-800 transition">
                로그인
              </Link>
              <Link href={PATHS.JOIN} className="text-sm text-gray-600 hover:text-gray-800 transition">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
