"use client";

import { PATHS } from "@/constants/path";
import { useUserStore } from "@/stores/userStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { useAlarmStore } from "@/stores/alarmStore";
import { AlarmProps } from "@/stores/alarmStore";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";
import Image from "next/image";
import MiniLogo from "@/assets/images/logo/miniLogo.png";

const NONE_NAV_PAGE_LIST = [PATHS.LOGIN, PATHS.COMMUNITY_WRITE] as string[];

export default function Nav() {
  const router = useRouter();
  const alarms = useAlarmStore((state) => state.alarms);
  const addAlarm = useAlarmStore((state) => state.addAlarm);
  const updateAlarmStatus = useAlarmStore((state) => state.updateAlarmStatus);
  const removeAlarm = useAlarmStore((state) => state.removeAlarm);
  const { isLoggedIn, logout } = useUserStore(); // Zustand에서 상태 가져오기
  const [isLoading, setIsLoading] = useState(false);

  //알람이 없음
  const handleNoMessage = () => {
    if (alarms.length === 0) {
      toast("새로운 알람이 없습니다.", {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: true,
      });
    }
  };

  //다른사람이 나에게 알람을 요청
  const handleRequestChat = (sender: string) => {
    if (!isLoggedIn) {
      return;
    }
    const message = `${sender}님의 대화요청`;
    addAlarm({ sender, message, status: "pending" });
    const toastId = toast(
      <div>
        <p>{message}</p>
        <div>
          <Button
            disabled={isLoading}
            onClick={() => handleApprove(sender, toastId)}
            containerStyles="!text-base !bg-white !text-blue-500 !font-normal hover:!underline hover:!underline-offset-4 mr-1"
          >
            수락
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => handleReject(sender, toastId)}
            containerStyles="!text-base !bg-white !text-red-500 !font-normal hover:!underline hover:!underline-offset-4 mr-1"
          >
            거절
          </Button>
        </div>
      </div>,

      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        hideProgressBar: true,
      },
    );
  };

  //채팅 요청수락
  const handleApprove = (sender: string, toastId: React.ReactText) => {
    setIsLoading(true);
    toast.dismiss(toastId);
    toast.success(`${sender}님의 채팅을 수락했습니다.`, {
      autoClose: 800,
      position: "top-right",
    });
    updateAlarmStatus(sender, "accepted");
    const { nickname } = useUserStore.getState();
    if (nickname) {
      router.push(`/chat?sender=${nickname}&receiver=${sender}`);
    } else {
      toast.error("로그인이 필요합니다.", { autoClose: 1000 });
    }
  };

  //채팅 요청거절
  const handleReject = (sender: string, toastId: React.ReactText) => {
    setIsLoading(true);
    toast.dismiss(toastId);
    toast.error(`${sender}님의 채팅을 거절했습니다.`, {
      autoClose: 800,
      position: "top-right",
    });
    removeAlarm(sender);
  };

  //기존의 채팅방에서 새로운 메세지가 도착
  const ApproveChatNewMessage = (alarm: AlarmProps) => {
    if (alarm.status === "accepted") {
      toast(
        <div
          onClick={() => moveChatRoom(alarm.sender)}
          className="cursor-pointer"
        >
          <p>{alarm.sender}</p>
          <p>{alarm.message}</p>
        </div>,
        {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          hideProgressBar: true,
        },
      );
    }
  };

  //채팅방 이동
  const moveChatRoom = (sender: string) => {
    const { nickname } = useUserStore.getState();
    if (nickname) {
      router.push(`/chat?sender=${nickname}&receiver=${sender}`);
    }
  };

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

  const alarmsIcon = alarms.length > 0 ? Alrem_on : Alrem_off;

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
              {/*알람 버튼 진행 */}
              <Button
                onClick={() => {
                  if (alarms.length === 0) {
                    handleNoMessage();
                  } else {
                    alarms.forEach((alarm) => {
                      if (alarm.status === "pending") {
                        handleRequestChat(alarm.sender);
                      } else if (alarm.status === "accepted") {
                        ApproveChatNewMessage(alarm);
                      }
                    });
                    useAlarmStore.getState().setAlarms([]);
                  }
                }}
                containerStyles="h-6 w-6 !bg-transparent"
              >
                <Image src={alarmsIcon} alt="알람아이콘" />
              </Button>
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