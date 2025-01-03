"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewMessage from "@/assets/icons/newMessage_icon.png";
import Image from "next/image";
import { io } from "socket.io-client";
import { roomList } from "@/lib/api";
import { useUserStore } from "@/stores/userStore";

interface LastMessageType {
  text: string;
  sender: string;
  timestamp: string;
}

interface ConversationType {
  id: string;
  participants: string[];
  lastMessage: LastMessageType;
}

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function ChatList() {
  const [conversation, setConversation] = useState<ConversationType[]>([]);
  const [newMessage, setNewMessage] = useState<{ [key: string]: Boolean }>({});
  const socket = io(`${socket_url}`, { withCredentials: true });
  const [isLoading, setIsLoading] = useState(false);

  //유저 정보 가져오기
  const currentUser = useUserStore((state) => state.nickname);

  //방 목록 가져오기
  useEffect(() => {
    const loadRoomList = async () => {
      try {
        const roomListCheck = await roomList();
        const filterList: ConversationType[] = roomListCheck.map(
          (room: { roomId: string; userList: { id: string }[] }) => ({
            id: room.roomId,
            participants: room.userList.map((user) => user.id),
            lastMessage: { text: "", sender: "", timestamp: "" },
          }),
        );
        if (currentUser) {
          const userRooms = filterList.filter((room) =>
            room.participants.includes(currentUser),
          );
          setConversation(userRooms);
        } else {
          console.log("현재 사용자가 없습니다.");
        }
      } catch (e) {
        console.error("방목록을 가져오는데 실패했습니다.", e);
      }
    };
    loadRoomList;
  }, [currentUser]);

  //소캣 연결
  useEffect(() => {
    socket.on("connect", () => {
      console.log("소캣연결성공");
    });

    //새로운 메세지 수신
    socket.on(
      "receive-message",
      (message: LastMessageType & { roomId: string }) => {
        setNewMessage((prev) => ({ ...prev, [message.roomId]: true }));
      },
    );
  }, []);

  //방나가기 함수
  const deleteChatRoom = (roomId: string) => {
    const updateChatRoom = conversation.filter((room) => room.id !== roomId);
    setConversation(updateChatRoom);
    setNewMessage((prev) => ({ ...prev, [roomId]: false }));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">채팅 목록</h1>
      <ul className="space-y-4">
        {conversation.map((room) => {
          const otherParticipant = room.participants.find(
            (name) => name !== currentUser,
          );
          return (
            <li
              key={room.id}
              className="flex justify-between items-center border p-2 rounded-lg"
            >
              <Link
                href={`/chat/${room.id}?sender=${currentUser}&receiver=${otherParticipant}`}
              >
                <div>
                  <p className="font-bold">{otherParticipant}</p>
                  <p className="text-gray-500 text-sm">
                    {room.lastMessage.text}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col justify-center items-center">
                <Button
                  disabled={isLoading}
                  btnType="submit"
                  onClick={() => deleteChatRoom(room.id)}
                  containerStyles="!text-base !text-black bg-transparent hover:underline hover:bg-transparent"
                >
                  나가기
                </Button>
                {newMessage[room.id] && (
                  <Image
                    src={NewMessage}
                    alt="new_message"
                    className="h-6 w-6 "
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
