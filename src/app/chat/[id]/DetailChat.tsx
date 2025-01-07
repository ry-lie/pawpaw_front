"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { nowDate } from "@/utils/nowTime";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Message_notsend from "@/assets/icons/message_notsend.png";
import Message_send from "@/assets/icons/message_send.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import CoustomNav from "./CustomNav";

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;
const socket = io(`${socket_url}`, {withCredentials: true});

type chatMessagetype = {
  message: string;
  sender: string;
  receiver: string;
  timestamp: string; // 현재 시간을 저장하기 위한 속성 추가
};

export default function ChatRoomPage() {
  const searchParams = useSearchParams();
  const roomName = searchParams.get("roomName") as string;
  const sender = searchParams.get("sender") as string;
  const receiver = searchParams.get("receiver") as string;
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    //const roomName = [sender, receiver].sort().join("-");
    socket.on("connect", () => {
      console.log("소켓 연결 성공");
    });
  
    socket.emit("join", { roomName, message: sender });
    socket.on("join-response", (context) => {
      console.log(context.message);
      console.log(context.data);
    });
  
    socket.on("send-message-response", (context) => {
      console.log(`수신메셎;: ${context.data.message}`)
      const currentTime = new Date().toISOString();
      const recieveMessage: chatMessagetype = {
        message: context.data.message,
        sender: "1",
        receiver,
        timestamp: currentTime,
      };
      setChatLog((prev) => [...prev, recieveMessage]);
      setCurrentMessage("");
    });
  
    return () => {
      socket.off("join");
      socket.off("send-message-response");
    };
  }, [receiver, sender]);
  

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
        receiver,
        timestamp: currentTime,
      };

      socket.emit("send-message", { roomName, message: currentMessage, recipientId: 2 });
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
              {message.sender !== sender && (
                <span className="font-bold text-sm pl-2">{message.sender}</span>
              )}
              <li
                className={`m-1 p-2 ${message.sender === sender
                    ? "ml-auto bg-primary text-white"
                    : "mr-auto bg-stroke_gray text-black"
                  } rounded-lg`}
              >
                <div className="font-bold text-sm">{message.message}</div>
              </li>
              <span
                className={`text-gray-500 text-xs ${message.sender === sender ? "ml-auto mr-2" : "mr-auto ml-2"
                  }`}
              >
                {nowDate(message.timestamp)}
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
