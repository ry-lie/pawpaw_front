import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Button from "../Button";
import Image from "next/image";
import { useAlarmStore } from "@/stores/alarmStore";
import { useUserStore } from "@/stores/userStore";
import { currentAlram, readedAlram } from "@/lib/api/notification";
import { successToast, errorToast, infoToast } from "@/utils/toast";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";

interface NotificationProps {
  id: number;
  isRead: boolean;
  roomName: string;
  type: string;
  message: string | null;
  sender: {
    id: number;
    nickname: string;
  };
  recipient: {
    id: number;
    nickname: string;
  };
}

const ChatEventAlram = () => {
  const alarms = useAlarmStore((state) => state.alarms);
  const addAlarm = useAlarmStore((state) => state.addAlarm);
  const removeAlarm = useAlarmStore((state) => state.removeAlarm);
  const { isLoggedIn } = useUserStore();
  const router = useRouter();

  // 로그인 시 알람 확인
  useEffect(() => {
    if (!isLoggedIn) return;

    const loginAlram = async () => {
      try {
        console.log("currentAlram 호출 시작");
        const data = await currentAlram();
        console.log("currentAlram 호출 성공:", data);

        // 반환된 데이터 구조 확인 후 수정
        const notificationList = data.body?.data?.notificationList || [];
        console.log("알림 목록 확인:", notificationList);

        if (notificationList.length > 0) {
          successToast("새로운 알림이 있습니다!");

          notificationList.forEach((notification: NotificationProps) => {
            console.log("알림 데이터 처리 중:", notification);

            if (!notification.isRead) {
              const alarmData = {
                sender: notification.sender.nickname,
                message: JSON.stringify({
                  id: notification.id,
                  roomName: notification.roomName,
                  type: notification.type,
                }),
                status: "pending" as "pending", // 타입 단언
              };

              console.log("추가될 알람 데이터:", alarmData);
              addAlarm(alarmData); // 알람 추가
            }
          });
        } else {
          console.log("알림 데이터가 없습니다.");
          infoToast("새로운 알람이 없습니다.");
        }
      } catch (error) {
        console.error("currentAlram 호출 실패:", error);
        errorToast("알림을 불러오는 데 실패했습니다.");
      }
    };


    loginAlram();
  }, [isLoggedIn, addAlarm]);

  // 알람 아이콘 클릭 처리
  const handleButtonClick = () => {
    console.log(alarms)
    if (alarms.length === 0) {
      infoToast("새로운 알람이 없습니다.");
    } else {
      alarms.forEach((alarm) => {
        if (alarm.status === "pending") {
          const parsedMessage = JSON.parse(alarm.message);
          const toastId = toast(
            <div>
              <p>{`${alarm.sender} 님의 초대`}</p>
              <div>
                <Button
                  onClick={() =>
                    handleApprove(parsedMessage.id, alarm.sender, toastId)
                  }
                  containerStyles="!text-base !bg-white !text-blue-500 !font-normal hover:!underline hover:!underline-offset-4 mr-1"
                >
                  수락
                </Button>
                <Button
                  onClick={() =>
                    handleReject(parsedMessage.id, alarm.sender, toastId)
                  }
                  containerStyles="!text-base !bg-white !text-red-500 !font-normal hover:!underline hover:!underline-offset-4"
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
      });
    }
  };

  // 채팅 요청 수락
  const handleApprove = async (id: number, sender: string, toastId: React.ReactText) => {
    try {
      await readedAlram(id);
      toast.dismiss(toastId);
      successToast(`${sender}님의 초대를 수락했습니다.`);
      removeAlarm(sender);
      router.push(`/chat?roomId=${id}`);
    } catch (error) {
      console.error("채팅 요청 수락 중 오류:", error);
      errorToast("초대를 수락할 수 없습니다.");
    }
  };

  // 채팅 요청 거절
  const handleReject = async (id: number, sender: string, toastId: React.ReactText) => {
    try {
      await readedAlram(id);
      toast.dismiss(toastId);
      errorToast(`${sender}님의 초대를 거절했습니다.`);
      removeAlarm(sender);
    } catch (error) {
      console.error("채팅 요청 거절 중 오류:", error);
      errorToast("초대를 거절할 수 없습니다.");
    }
  };

  // 알람 아이콘 상태
  const alarmsIcon = alarms.length > 0 ? Alrem_on : Alrem_off;

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