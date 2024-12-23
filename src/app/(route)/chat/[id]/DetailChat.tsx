"use client";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Nav from "@/app/components/Nav/Nav";
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

  // 시간 형식 정리 함수
  const Time = (timeString: string): string => {
    const date = new Date(timeString); // timestamp를 Date 객체로 변환
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("ko-KR", options);
  };

  // 메시지 전송
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatRef.current?.value && nickname) {
      const currentTime = new Date().toISOString(); // ISO 형식으로 현재 시간 저장
      const newMessage: chatMessagetype = {
        message: chatRef.current.value,
        sender: nickname,
        timestamp: currentTime,
      };
      chatSocket.emit("message", newMessage);
      setChatLog((prev) => [...prev, newMessage]); // 추가한 메시지를 로컬 상태에 저장
      chatRef.current.value = ""; // 입력 필드 초기화
    }
  };

  // 메시지 받기
  const getMessage = (data: chatMessagetype) => {
    setChatLog((prev) => {
      // 동일한 메시지가 연속해서 들어오는 것을 방지합니다
      if (prev.length > 0 && prev[prev.length - 1].message === data.message) {
        return prev; // 같은 메시지가 들어오면 추가하지 않음
      }
      return [...prev, data];
    });
  };

  // 메시지 주고받기
  useEffect(() => {
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

  // 닉네임 입력받기
  const submitNickname = () => {
    const inputNickname = prompt("닉네임을 입력하세요");
    if (inputNickname) {
      setNickname(inputNickname);
      setIsNicknameSet(true);
    } else {
      alert("닉네임을 입력하지 않았습니다.");
    }
  };

  // 컴포넌트가 처음 렌더링될 때 닉네임 입력 요청
  useEffect(() => {
    if (!isNicknameSet) {
      submitNickname();
    }
  }, [isNicknameSet]);

  return (
    <div className="flex flex-col h-screen justify-end items-center">
      <Nav />
      {isNicknameSet ? (
        <div className="w-full">
          <ul
            ref={chatScroll}
            className="w-full flex flex-col overflow-y-auto mt-12 border-t-4"
          >
            {chatLog.map((message, index) => (
              <li
                key={index}
                className={`m-2 p-3 ${
                  message.sender === nickname
                    ? "ml-auto bg-primary"
                    : "mr-auto bg-stroke_gray"
                } rounded-lg max-w-[60%]`}
              >
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-sm">{message.sender}</span>
                  <span className="text-gray-500 text-xs">
                    {Time(message.timestamp)}
                  </span>
                </div>
                <div className="text-sm">{message.message}</div>
              </li>
            ))}
          </ul>
          <form onSubmit={submitMessage} className="w-full flex gap-2 mt-2">
            <Input
              name="chat"
              type="text"
              ref={chatRef}
              placeholder="메세지를 입력하세요"
              className="w-full"
            />
            <Button btnType="submit" containerStyles="h-10 w-14">
              전송
            </Button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
