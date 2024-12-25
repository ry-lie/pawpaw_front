"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Nav from "@/components/Nav/Nav";
import { NowDate } from "@/utils/NowTime";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const chatSocket: Socket = io("ws://localhost:5000");

type chatMessagetype = {
  message: string;
  sender: string;
  timestamp: string; // 현재 시간을 저장하기 위한 속성 추가
};

export default function ChatRoomPage() {
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatRef = useRef<HTMLInputElement>(null);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [nickname, setNickname] = useState("");
  const [isNicknameSet, setIsNicknameSet] = useState(false);

  //닉네임 설정
  useEffect(() => {
    const inputNickname = prompt("닉네임을 입력하세요");
    if (inputNickname) {
      setNickname(inputNickname);
    }
  }, []);

  //메세지 주고 받기
  useEffect(() => {
    const getMessage = (data: chatMessagetype) => {
      setChatLog((prev) => [...prev, data]); 
    };

    chatSocket.on("message", getMessage);
    return () => {
      chatSocket.off("message", getMessage);
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
    if (chatRef.current?.value && nickname) {
      const currentTime = new Date().toISOString();
      const newMessage: chatMessagetype = {
        message: chatRef.current.value,
        sender: nickname,
        timestamp: currentTime,
      };
      chatSocket.emit("message", newMessage); // 서버로 메시지 전송
      chatRef.current.value = ""; // 입력 필드 초기화
    }
  };
  if (!nickname) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full flex-1 flex flex-col justify-end">  
        <ul
          ref={chatScroll}
          className="flex flex-col overflow-y-auto border-t-4 pt-12 h-full"
        >
            {chatLog.map((message, index) => (
              <li
                key={index}
                className={`m-2 p-3 ${message.sender === nickname
                  ? "ml-auto bg-primary"
                  : "mr-auto bg-stroke_gray"
                  } rounded-lg max-w-[60%]`}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm">{message.sender}</span>
                  <span className="text-gray-500 text-xs">
                    {NowDate(message.timestamp)}
                  </span>
                </div>
                <div className="text-sm">{message.message}</div>
              </li>
            ))}
          </ul>
          <form onSubmit={submitMessage} className="w-full flex gap-2 mt-2">
            <Input
              id="chatWrite"
              type="text"
              ref={chatRef}
              placeholder="메세지를 입력하세요"
              className="w-full"
              name="chatWrite"
            />
            <Button btnType="submit" containerStyles="h-10 w-14">
              전송
            </Button>
          </form>
        </div>
  
    </div>
  );
}
