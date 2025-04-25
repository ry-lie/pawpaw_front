import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useUserStore } from "@/stores/userStore";
import Alrem_off from "@/assets/icons/alrem_off.png";
import Alrem_on from "@/assets/icons/alrem_on.png";
import useSocketStore from "@/stores/socketStore";
import { PATHS } from "@/constants/path";
import { useRouter } from "next/navigation";
import { getAlramList, updateAlarmStatus } from "@/lib/api/notification";

type NotificationType = "RECEIVE_MESSAGE" | "INVITE";

interface Sender {
  id: number;
  nickname: string;
}
interface Recipient {
  id: number;
  nickname: string;
}
interface Alarm {
  id: number;
  sender: Sender;
  recipient: Recipient;
  message: string | null;
  roomName: string;
  type: NotificationType;
  isRead: boolean;
}

const ChatEventAlarm = () => {
  const { isLoggedIn } = useUserStore();
  const { socket } = useSocketStore();
  const router = useRouter();

  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 초기 알림 데이터 가져오기
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getAlramList();
        const notificationList: Alarm[] = response.notificationList.map((notif: any) => ({
          id: notif.id,
          sender: notif.sender,
          recipient: notif.recipient,
          message: notif.message,
          roomName: notif.roomName,
          type: notif.type,
          isRead: notif.isRead,
        }));

        setAlarms(notificationList);
        setUnreadCount(notificationList.filter((notif) => !notif.isRead).length);
      } catch (error) {
        console.error("알림 리스트 가져오기 실패:", error);
      }
    };

    fetchNotifications();
  }, []);

  // 소켓 알림 처리
  useEffect(() => {
    if (!isLoggedIn) return;

    const handleIncomingMessage = (data: any) => {
      const newAlarm: Alarm = {
        id: data.data.notification.id,
        sender: data.data.notification.sender,
        recipient: data.data.notification.recipient,
        message: data.data.notification.message,
        roomName: data.data.notification.roomName,
        type: data.data.notification.type,
        isRead: false,
      };

      setAlarms((prev) => [...prev, newAlarm]);
      setUnreadCount((prev) => prev + 1);

      // 토스트 메시지
      if (newAlarm.type === "INVITE") {
        toast(
          <div>
            <p>{`${newAlarm.sender.nickname} 님의 초대`}</p>
            <div>
              <button
                onClick={() => handleApprove(newAlarm.id, newAlarm.roomName, newAlarm.sender.id)}
                className="text-blue-500 hover:underline"
              >
                수락
              </button>
              <button
                onClick={() => handleReject(newAlarm.id, newAlarm.sender.nickname)}
                className="text-red-500 hover:underline"
              >
                거절
              </button>
            </div>
          </div>
        );
      }
    };

    socket.on("notification-response", handleIncomingMessage);

    return () => {
      socket.off("notification-response", handleIncomingMessage);
    };
  }, [isLoggedIn]);

  // 알림 읽음 처리
  const markAsRead = async (id: number, roomName: string, recipientId: number) => {
    try {
      await updateAlarmStatus(id);
      setAlarms((prev) => prev.map((alarm) => (alarm.id === id ? { ...alarm, isRead: true } : alarm)));
      setUnreadCount((prev) => Math.max(prev - 1, 0));
      router.push(PATHS.CHATTING_DETAIL(roomName, recipientId));
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  };

  // 초대 수락
  const handleApprove = async (id: number, roomName: string, recipientId: number) => {
    socket.emit("join", { roomName });
    await updateAlarmStatus(id);
    // 상태 업데이트: 해당 알림 제거
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    setUnreadCount((prev) => Math.max(prev - 1, 0));
    toast.success("초대를 수락했습니다.");
    setIsDropdownOpen(false);
    router.push(PATHS.CHATTING_DETAIL(roomName, recipientId));
  };

  // 초대 거절
  const handleReject = async (id: number, senderNickname: string) => {
    toast.error(`${senderNickname} 님의 초대를 거절했습니다.`);
    await updateAlarmStatus(id);
    // 상태 업데이트: 해당 알림 제거
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
    setUnreadCount((prev) => Math.max(prev - 1, 0));

    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      {/* 알림 버튼 */}
      <button onClick={() => setIsDropdownOpen((prev) => !prev)} className="flex items-center gap-1">
        <Image src={unreadCount > 0 ? Alrem_on : Alrem_off} alt="알람 아이콘" width={24} height={24} />
        {unreadCount > 0 && <span>+{unreadCount}</span>}
      </button>

      {/* 알림 드롭다운 */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-md rounded-md max-h-96 overflow-y-auto z-50">
          <ul>
            {alarms.map((alarm) =>
              alarm.isRead ? null : (
                <li
                  key={alarm.id}
                  className="p-2 border-b text-gray"
                >
                  {alarm.type === "RECEIVE_MESSAGE" ? (
                    <p onClick={() => markAsRead(alarm.id, alarm.roomName, alarm.sender.id)}>
                      {`${alarm.sender.nickname}: ${alarm.message}`}
                    </p>
                  ) : (
                    <div>
                      <p>{`${alarm.sender.nickname}님이 초대했습니다.`}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleApprove(alarm.id, alarm.roomName, alarm.sender.id)}
                          className="text-blue-500 hover:underline"
                        >
                          수락
                        </button>
                        <button
                          onClick={() => handleReject(alarm.id, alarm.sender.nickname)}
                          className="text-red-500 hover:underline"
                        >
                          거절
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

export default ChatEventAlarm;
