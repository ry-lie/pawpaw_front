import { AlarmProps, useAlarmStore } from "@/stores/alarmStore";
import { useUserStore } from "@/stores/userStore";
import { errorToast, infoToast, successToast } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Image from "next/image";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";
import { currentAlram, readedAlram } from "@/lib/api/notification";

interface NotificationProps {
  id: number;
  sender: {
    id: number;
    nickname: string;
  };
  message: string;
  isRead: boolean;
}

const ChatEventAlram = () => {
  const alarms = useAlarmStore((state) => state.alarms);
  const addAlarm = useAlarmStore((state) => state.addAlarm);
  const updateAlarmStatus = useAlarmStore((state) => state.updateAlarmStatus);
  const removeAlarm = useAlarmStore((state) => state.removeAlarm);
  const { isLoggedIn } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // 알림 데이터 주기적으로 조회
  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchAlarms = async () => {
      try {
        const data = await currentAlram();
        if (data.notificationList) {
          data.notificationList.forEach((notification: NotificationProps) => {
            addAlarm({
              sender: notification.sender.nickname,
              message: notification.message,
              status: notification.isRead ? "accepted" : "pending",
            });
          });
        }
      } catch (error) {
        console.error("알람 데이터를 가져오는 중 오류 발생:", error);
        errorToast("알림을 불러오는 데 실패했습니다.");
      }
    };

    fetchAlarms();

    const interval = setInterval(fetchAlarms, 5000); // 5초마다 알림 조회
    return () => clearInterval(interval);
  }, [isLoggedIn, addAlarm]);

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
                onClick={() => handleApprove(data.body.id, sender, toastId)}
                containerStyles="!text-base !bg-white !text-blue-500 !font-normal hover:!underline hover:!underline-offset-4 mr-1"
              >
                수락
              </Button>
              <Button
                disabled={isLoading}
                onClick={() => handleReject(data.body.id, sender, toastId)}
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
          }
        );
      }
    } catch (e) {
      console.error("이벤트 처리 오류", e);
      errorToast("메세지를 처리할 수 없습니다.");
    }
  };

  // 채팅 요청 수락
  const handleApprove = async (id: number, sender: string, toastId: React.ReactText) => {
    setIsLoading(true);
    try {
      await readedAlram(id);
      toast.dismiss(toastId);
      successToast(`${sender}님의 채팅을 수락했습니다.`, {
        position: "top-right",
      });
      updateAlarmStatus(sender, "accepted");

      const { nickname } = useUserStore.getState();
      if (nickname) {
        router.push(`/chat?sender=${nickname}&receiver=${sender}`);
      } else {
        errorToast("로그인이 필요합니다.", { autoClose: 1000 });
      }
    } catch (e) {
      console.error("채팅 수락 처리 중 오류 발생", e);
      errorToast("채팅 수락에 실패하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅 요청 거절
  const handleReject = async (id: number, sender: string, toastId: React.ReactText) => {
    setIsLoading(true);
    try {
      await readedAlram(id);
      toast.dismiss(toastId);
      errorToast(`${sender}님의 채팅을 거절했습니다.`, {
        autoClose: 800,
      });
      removeAlarm(sender);
    } catch (e) {
      console.error("채팅 거절 처리 중 오류 발생", e);
      errorToast("채팅 거절에 실패하였습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const moveChatRoom = (sender: string) => {
    const { nickname } = useUserStore.getState();
    if (nickname) {
      router.push(`/chat?sender=${nickname}&receiver=${sender}`);
    } else {
      errorToast("로그인이 필요합니다.");
    }
  };

  // 기존 채팅방에서 새로운 메시지가 도착
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
        }
      );
    }
  };

  const alarmsIcon = alarms.length > 0 ? Alrem_on : Alrem_off;
  console.log(handleMessage);

  // 알람 버튼 클릭 처리
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
      useAlarmStore.getState().setAlarms([]);
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
