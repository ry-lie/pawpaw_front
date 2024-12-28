"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { NowDate } from "@/utils/NowTime";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Message_notsend from "@/assets/icons/message_notsend.png";
import Message_send from "@/assets/icons/message_send.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL
const socket = io(`ws://${socket_url}`);

type chatMessagetype = {
  message: string;
  sender: string;
  receiver: string;
  timestamp: string; // 현재 시간을 저장하기 위한 속성 추가
};


export default function ChatRoomPage() {
  const searchParams = useSearchParams();
  const sender = searchParams.get("sender") as string;
  const receiver = searchParams.get("receiver") as string;
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    // 소켓 연결 및 join 이벤트
    socket.on("connect", () => {
      console.log("소켓 연결 성공");
      socket.emit("join", {roomId : "room1",message:sender});
    });

    // 상대방이 들어왔을 때 확인
    socket.on("join", (data) => {
      if(data.nickname && data.nickname !== sender){
        setChatLog((prev)=>[
          ...prev,
          {message : `${data.nickname}님이 채팅을 수락했습니다.`, sender :"system", receiver:"", timestamp:new Date().toISOString()},
        ]);
      }
    });

    // 메시지 수신
    socket.on("receive-message", (data) => {
        setChatLog((prev) => [...prev, data]);
    });

    //소켓 해제
    return () => {
      socket.off("join");
      socket.off("receive-message");
    };
  }, []);

  // 메시지가 쌓일 때마다 스크롤 자동으로 이동
  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [chatLog]);

  // 메시지 전송
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

      // 서버에 메세지 전송
      socket.emit("send-message", {roomId : "room1", message:currentMessage});
      setChatLog((prev) => [...prev, message]);
      setCurrentMessage("");
    }
  };

  // input에 내용 저장
  const HandleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <ul
        ref={chatScroll}
        className="flex-1 flex flex-col overflow-y-auto border-t-4 pt-4 px-2"
      >
        {chatLog.map((message, index) => (
          <div key={index} className="flex flex-col items-start mb-2">
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
              {NowDate(message.timestamp)}
            </span>
          </div>
        ))}
      </ul>

      <form
        onSubmit={submitMessage}
        className="w-full flex gap-2 border-t p-4 bg-white"
      >
        <div className="flex justify-center items-center">
          <Button
            btnType="submit"
            containerStyles="h-8 w-20 !text-sm"
          >
            <Link href={'/chat'}>
              채팅목록
            </Link>
          </Button>
        </div>

        <Input
          type="text"
          value={currentMessage}
          onChange={HandleInputChange}
          placeholder="메세지를 입력하세요"
          className="w-full border border-gray-300 rounded-md p-2"
          name="chatWrite"
        />
        <Button btnType="submit" containerStyles="bg-transparent hover:bg-transparent p-2">
          <Image
            src={currentMessage.trim() ? Message_send : Message_notsend}
            alt="send icon"
            className="h-6 w-6"
          />
        </Button>
      </form>
    </div>
  );
}
