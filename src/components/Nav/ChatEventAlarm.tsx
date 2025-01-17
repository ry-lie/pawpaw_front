import { useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Image from "next/image";
import { useAlarmStore } from "@/stores/alarmStore";
import { useUserStore } from "@/stores/userStore";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";
import useSocketStore from "@/stores/socketStore";

import { PATHS } from "@/constants/path";
import { useRouter } from "next/navigation";

const ChatEventAlram = () => {
  const alarms = useAlarmStore((state) => state.alarms);

  const removeAlarm = useAlarmStore((state) => state.removeAlarm);
  const { isLoggedIn, nickname } = useUserStore();
  const { socket, connect } = useSocketStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) return;

    //connect(); // 소켓 연결 시작

    const handleIncomingMessage = (data: any) => {
      console.log(data, "========알람 데이터==========");
      const alarmData = {
        sender: data.data.notification.sender.nickname,
        id: data.data.notification.id,
        roomName: data.data.notification.roomName,
        type: data.data.notification.type,
        message: data.data.notification.message,
        recipientId: data.data.notification.sender.id,
        recipientName: data.data.notification.sender.nickname,
      };


      if (alarmData.sender !== nickname) {
        if (alarmData.type === "RECEIVE_MESSAGE") {
          // 메시지 알림 토스트
          toast(`${alarmData.sender} 님의 메시지: ${alarmData.message}`);
        } else if (alarmData.type === "INVITE") {
          // 초대 알림 토스트
          toast(
            <div>
              <p>{`${alarmData.sender} 님의 초대`}</p>
              <div>
                <Button
                  onClick={() => handleApprove(alarmData.sender, alarmData.roomName, alarmData.recipientId, alarmData.recipientName)}
                  containerStyles="!text-base !bg-white !text-blue-500 !font-normal hover:!underline hover:!underline-offset-4 mr-1"
                >
                  수락
                </Button>
                <Button
                  onClick={() => handleReject(alarmData.sender)}
                  containerStyles="!text-base !bg-white !text-red-500 !font-normal hover:!underline hover:!underline-offset-4"
                >
                  거절
                </Button>
              </div>
            </div>,
            {
              position: "top-right",
              autoClose: false, // 자동 닫힘 비활성화
              closeOnClick: false, // 클릭 시 닫히지 않음
              draggable: false,
              hideProgressBar: true, // 진행 바 숨김
            }
          );
        }
      }

    }
    // 이벤트 리스너 등록
    socket.on("notification-response", handleIncomingMessage);
    return () => {
      // 컴포넌트 언마운트 시 소켓 연결 해제 및 리스너 제거
      socket.off("notification-response", handleIncomingMessage);
      //disconnect();
    };
  }, [isLoggedIn, connect]);

  // 채팅 요청 수락
  const handleApprove = async (sender: string, roomName: string, recipientId: number, recipientName: string) => {
    try {
      socket.emit("join", { roomName });
      toast.dismiss();
      toast.success(`${sender}님의 초대를 수락했습니다.`);
      // 채팅방으로 이동
      router.push(PATHS.CHATTING_DETAIL(roomName, recipientId));

    } catch (error) {
      console.error("Error approving message:", error);
      toast.error("초대를 수락할 수 없습니다.");
    }
  };

  // 채팅 요청 거절
  const handleReject = async (sender: string) => {
    try {
      toast.dismiss();
      toast.error(`${sender}님의 초대를 거절했습니다.`);
    } catch (error) {
      console.error("Error rejecting message:", error);
      toast.error("초대를 거절할 수 없습니다.");
    }
  };

  // 알람 아이콘 상태
  const alarmsIcon = alarms.length > 0 ? Alrem_on : Alrem_off;

  return (
    <Button containerStyles="h-6 w-6 !bg-transparent">
      <Image src={alarmsIcon} alt="알람아이콘" />
    </Button>
  );
};

export default ChatEventAlram;
