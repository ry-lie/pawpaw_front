"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import NewMessage from "@/assets/icons/newMessage_icon.png";
import { fetchRoomList } from "@/lib/api/chat";
import { PATHS } from "@/constants/path";
import BasicProfile from "@/assets/icons/profile_icon.png";
import { useRouter } from "next/navigation";

interface Sender {
  id: number;
  nickname: string;
  imageUrl: string;
}

interface Room {
  id: string;
  partner: Sender;
  lastMessage: string;
  hasNewMessage: boolean;
}

export default function ChatList() {
  const [conversation, setConversation] = useState<Room[]>([]); // 방 목록 상태
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태
  const router = useRouter();

  // 방 목록 가져오기
  useEffect(() => {
    const loadRoomList = async () => {
      try {
        setIsLoading(true);
        const roomListData = await fetchRoomList();
        console.log(roomListData, "====룸리스트====");

        // 데이터 매핑
        const mappedRooms: Room[] = roomListData.map((room: any) => ({
          id: room.name,
          partner: room.partner,
          lastMessage: room.lastMessage,
          hasNewMessage: room.hasNewMessage,
        }));

        setConversation(mappedRooms);
      } catch (e) {
        console.error("방 목록을 가져오는데 실패했습니다.", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoomList();
  }, []);

  // 방 입장 이벤트
  const handleJoinRoom = (roomId: string, recipientId: number, recipientName: string) => {
    router.push(PATHS.CHATTING_DETAIL(roomId, recipientId));
  };
  // 방 나가기 이벤트
  const deleteChatRoom = (roomId: string) => {
    const updatedConversation = conversation.filter((room) => room.id !== roomId);
    setConversation(updatedConversation);
  };

  return (
    <div className="p-4 mb-12">
      <h1 className="text-xl font-bold mb-4 mt-12">채팅 목록</h1>
      <ul className="space-y-4 ">
        {conversation.map((room) => (
          <li
            key={room.id} // 고유 식별자로 설정
            className="flex justify-between items-center border p-2 rounded-lg"
            onClick={() => handleJoinRoom(room.id, room.partner.id, room.partner.nickname)}>

            <div className="flex items-center" >
              <Image
                src={room.partner?.imageUrl || BasicProfile}
                alt={`${room.partner?.nickname} 프로필 이미지`}
                className="h-10 w-10 rounded-full mr-4"
                width={40}
                height={40}
              />
              <div>
                <p className="font-bold">{room.partner?.nickname}</p>
                <p className="text-gray-500 text-sm">{room.lastMessage}</p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Button
                disabled={isLoading}
                btnType="submit"
                onClick={() => deleteChatRoom(room.id)}
                containerStyles="!text-base !text-black bg-transparent hover:underline hover:bg-transparent"
              >
                나가기
              </Button>
              {room.hasNewMessage && (
                <Image
                  src={NewMessage}
                  alt="new_message"
                  className="h-6 w-6"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
