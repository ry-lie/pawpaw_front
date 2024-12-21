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
};

export default function ChatRoomPage() {
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatRef = useRef<HTMLInputElement>(null);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [nickname, setNickname] = useState("");
  const [isNicknameSet, setIsNicknameSet] = useState(false);

  // 메시지 전송
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatRef.current?.value && nickname) {
      chatSocket.emit("message", {
        message: chatRef.current.value,
        sender: nickname,
      });
      chatRef.current.value = ""; // 입력 필드 초기화
    }
  };

  // 메시지 받기
  const getMessage = (data: chatMessagetype) => {
    setChatLog((prev) => [...prev, data]);
  };

  // 메시지 주고받기
  useEffect(() => {
    chatSocket.on("message", getMessage);
    return () => {
      chatSocket.off("message", getMessage);
    };
  }, []);

  // 메시지가 쌓일 때마다 스크롤 자동으로 스크롤
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
  }, [isNicknameSet]); // 의존성 배열에 isNicknameSet 추가

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
                className={`m-2 rounded-2xl p-3 ${message.sender === nickname ? "bg-primary ml-auto" : "bg-stroke_gray mr-auto"}`}
              >
                <strong>{message.sender}:</strong> {message.message}
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
