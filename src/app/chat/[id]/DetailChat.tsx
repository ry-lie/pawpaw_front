"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Nav from "@/components/Nav/Nav";
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
  // 시간 형식 정리 함수
  const sendTime = (timeString: string): string => {
    const date = new Date(timeString); // timestamp를 Date 객체로 변환
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("ko-KR", options);
  };

  return (
    <div className="flex flex-col h-screen justify-end items-center">
      <div className="w-full">
      <Nav/>
      </div>
        <div className="w-full mt-12">
          <ul
            ref={chatScroll}
            className="w-full flex overflow-y-auto mt-12 border-t-4 h-screen flex-col"
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
                    {sendTime(message.timestamp)}
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
