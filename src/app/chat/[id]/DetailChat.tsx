"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { nowDate } from "@/utils/nowTime";
import { useEffect, useRef, useState } from "react";
import Message_notsend from "@/assets/icons/message_notsend.png";
import Message_send from "@/assets/icons/message_send.png";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import CoustomNav from "./CustomNav";
import { useUserStore } from "@/stores/userStore";
import useSocketStore from "@/stores/socketStore";
import { formatTime } from "@/utils/formatTime";

type chatMessagetype = {
  message: string;
  sender: string;
  senderId: number;
  sendDate: string;
};


export default function ChatRoomPage() {
  const params = useParams();
  const roomName = params.id as string;
  const userNickname = useUserStore((state) => state.nickname);
  const userId = useUserStore((state) => state.id);
  const sender = userNickname;
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");
  const { socket, connect } = useSocketStore();
  //const { getChat } = useChatStore();
  //const chat = getChat(roomName);
  const searchParams = useSearchParams();

  const recipientId = searchParams.get("recipientId");

  useEffect(() => {

    // 메시지 수신 이벤트 리스너 등록
    const handleSendMessageResponse = (data: any) => {
      const currentTime = new Date().toISOString();
      const receiveMessage = {
        message: data.data.message,
        sender: data.data.sender,
        senderId: data.data.senderId,
        sendDate: nowDate(currentTime),
      };

      setChatLog((prev) => [...prev, receiveMessage]);
      setCurrentMessage("");
    };

    // 채팅방 내용 불러오기 이벤트 리스너 등록
    const handleGetMessageListResponse = (data: any) => {
      const messageList = data.data.messageList.map((msg: any) => ({
        message: msg.message,
        senderId: msg.senderId,
        recipientId: msg.recipientId,
        sendDate: formatTime(msg.sendDate, false),
      }));

      setChatLog(messageList); // 이전 채팅 내용 설정
    };
    socket.emit("get-message-list", { roomName: roomName });  // 채팅방 이전 내역 불러오기 요청
    socket.on("send-message-response", handleSendMessageResponse) // 메세지 수신
    socket.on("get-message-list-response", handleGetMessageListResponse); // 채탕방 이전 내역 불러오기

    return () => {
      socket.off("send-message-response", handleSendMessageResponse);
      socket.off("get-message-list-response", handleGetMessageListResponse);
    };
  }, [connect]);


  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [chatLog]);

  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      const currentTime = new Date().toISOString();
      const message: chatMessagetype = {
        message: currentMessage,
        sender,
        senderId: userId,
        sendDate: nowDate(currentTime),
      };

      socket.emit("send-message", { roomName, message: currentMessage, recipientId: recipientId, senderId: userId });

      setChatLog((prev) => [...prev, message]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="relative z-50">
      <CoustomNav />
      <div className="absolute ml-28 mt-2">
      </div>
      <div className="flex flex-col h-[95vh] pt-10">
        <ul
          ref={chatScroll}
          className="flex-1 flex flex-col overflow-y-auto pt-2 px-2"
        >
          {chatLog.map((message, userID) => (
            <div key={userID} className="flex flex-col items-start mb-2">
              <li
                className={`m-1 p-2 ${message.senderId === userId
                  ? "ml-auto bg-primary text-white"
                  : "mr-auto bg-stroke_gray text-black"
                  } rounded-lg`}
              >
                <div className="font-bold text-sm">{message.message}</div>
              </li>
              <span
                className={`text-gray-500 text-xs ${message.senderId === userId ? "ml-auto mr-2" : "mr-auto ml-2"
                  }`}
              >
                {message.sendDate}
              </span>
            </div>
          ))}
        </ul>
        <form
          onSubmit={submitMessage}
          className="w-full flex gap-2 border-t p-4 bg-white"
        >
          <Input
            name="메세지"
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="w-full border border-gray-300 rounded-md p-2"
          />
          <Button
            btnType="submit"
            containerStyles="bg-transparent hover:bg-transparent p-2"
            disabled={!currentMessage.trim()}
          >
            <Image
              src={currentMessage.trim() ? Message_send : Message_notsend}
              alt="send icon"
              className="h-6 w-6"
            />
          </Button>
        </form>
      </div>
    </div>
  );
}
