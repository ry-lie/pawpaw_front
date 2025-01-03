import { AlarmProps, useAlarmStore } from "@/stores/alarmStore";
import { useUserStore } from "@/stores/userStore";
import { errorToast, infoToast, successToast } from "@/utils/Toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Image from "next/image";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

const ChatEventAlram = () => {
  const alarms = useAlarmStore((state) => state.alarms);
  const addAlarm = useAlarmStore((state) => state.addAlarm);
  const updateAlarmStatus = useAlarmStore((state) => state.updateAlarmStatus);
  const removeAlarm = useAlarmStore((state) => state.removeAlarm);
  const { isLoggedIn, nickname } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    if (!socket_url) {
      console.error("Socket URL이 설정되지 않았습니다.");
      errorToast("관리자에게 문의하세요");
      return;
    }
    const eventSource = new EventSource(`${socket_url}`);

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data?.body?.sender && data?.body?.message) {
          const sender = data.body.sender;
          const message = data.body.message;

          // 알람 상태 업데이트
          addAlarm({ sender, message, status: "pending" });

          // Toast 알림
          infoToast(`${sender} : ${message}`);

          const toastId = toast(
            <div>
              <p>{`${sender}님의 대화요청`}</p>
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
        }
      } catch (e) {
        console.error("이벤트 처리 오류", e);
        errorToast("메세지를 처리할 수 없습니다.");
      }
    };

    //채팅 요청수락
    const handleApprove = (sender: string, toastId: React.ReactText) => {
      setIsLoading(true);
      toast.dismiss(toastId);
      successToast(`${sender}님의 채팅을 수락했습니다.`, {
        autoClose: 800,
        position: "top-right",
      });
      updateAlarmStatus(sender, "accepted");
      const { nickname } = useUserStore.getState();
      if (nickname) {
        router.push(`/chat?sender=${nickname}&receiver=${sender}`);
      } else {
        errorToast("로그인이 필요합니다.", { autoClose: 1000 });
      }
      setIsLoading(false);
    };

    //채팅 요청거절
    const handleReject = (sender: string, toastId: React.ReactText) => {
      setIsLoading(true);
      toast.dismiss(toastId);
      errorToast(`${sender}님의 채팅을 거절했습니다.`, {
        autoClose: 800,
        position: "top-right",
      });
      removeAlarm(sender);
      setIsLoading(false);
    };

    const handleError = () => {
      console.error("SSE 연결오류");
      errorToast("서버와의 연결이 끊어졌습니다. 재연결을 시도합니다.");
    };

    eventSource.onmessage = handleMessage;
    eventSource.onerror = handleError;

    return () => {
      eventSource.close();
    };
  }, [addAlarm, isLoggedIn, nickname]);

  const moveChatRoom = (sender: string) => {
    const { nickname } = useUserStore.getState();
    if (nickname) {
      router.push(`/chat?sender=${nickname}&receiver=${sender}`);
    } else {
      errorToast("로그인이 필요합니다.");
    }
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

  const alarmsIcon = alarms.length > 0 ? Alrem_on : Alrem_off;

  //알람이 없음
  const handleButtonClick = () => {
    if (alarms.length === 0) {
      toast("새로운 알람이 없습니다.", {
        position: "top-right",
        autoClose: false,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: true,
      });
    } else {
      alarms.forEach((alarm) => {
        if (alarm.status === "pending") {
          moveChatRoom(alarm.sender);
        } else if (alarm.status === "accepted") {
          ApproveChatNewMessage(alarm);
        }
      });
      useAlarmStore.getState().setAlarms([]); // 알람 초기화 로직 추가
    }
  };

  return (
    <Button
      onClick={handleButtonClick}
      containerStyles="h-6 w-6 !bg-transparent"
    >
      <Image src={alarmsIcon} alt="알람아이콘" />
    </Button>
  );
};

export default ChatEventAlram;
