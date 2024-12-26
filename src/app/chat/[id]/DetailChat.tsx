"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Nav from "@/components/Nav/Nav";
import { NowDate } from "@/utils/NowTime";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Message_notsend from "@/assets/icons/message_notsend.png";
import Message_send from "@/assets/icons/message_send.png";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BUILD_ID_FILE } from "next/dist/shared/lib/constants";
import Link from "next/link";
import axios from "axios";

const chatSocket: Socket = io("ws://localhost:5000");

type chatMessagetype = {
  message: string;
  sender: string;
  receiver: string;
  timestamp: string; // 현재 시간을 저장하기 위한 속성 추가
};

type ChatRoom = {
  id: string;
  participant: string[];
  lastMessage: string;
}

export default function ChatRoomPage() {
  const searchParams = useSearchParams();
  const sender = searchParams.get("sender") || "자기자신";
  const receiver = searchParams.get("receiver") || "상태방";

  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatScroll = useRef<HTMLUListElement>(null);
  const [currentMessage, setCurrentMessage] = useState("");

  //상대방과의 로그 기록하기
  // useEffect(()=>{
  //   const saveLog = async()=>{
  //     try{
  //       const res = await axios.get(`/chat/log/${chatId}`);
  //       setChatLog(res.data);
  //     }
  //     catch(e){
  //       console.error('메세지를 가져오는데 실패하였습니다.', e)
  //     }
  //   }
  // })

  //마지막 메세지 업데이트하기(채팅로비에서 보여줄 마지막 업데이트)
  const updateLastMessage = (message: string) => {
    const chatRooms = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    const roomId = [sender, receiver].sort().join("-");
    const existingRoom = chatRooms.find(
      (room: ChatRoom) => room.id === roomId
    );
    if (existingRoom) {
      existingRoom.lastMessage = message;
    } else {
      chatRooms.push({
        id: roomId,
        participants: [sender, receiver],
        lastMessage: message,
      });
    }

    // 업데이트된 방 목록을 localStorage에 저장
    localStorage.setItem("chatRooms", JSON.stringify(chatRooms));
  };

  //메세지 주고 받기
  useEffect(() => {
    const getMessage = (data: chatMessagetype) => {
      if (data.receiver === sender) {
        setChatLog((prev) => [...prev, data]);
      }
    };

    chatSocket.on("message", getMessage);
    return () => {
      chatSocket.off("message", getMessage);
    };
  }, [sender]);

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
      const newMessage: chatMessagetype = {
        message: currentMessage,
        sender,
        receiver,
        timestamp: currentTime,
      };

      chatSocket.emit("message", newMessage);
      setChatLog((prev) => [...prev, newMessage])
      setCurrentMessage("")
    }

    //마지막 메세지 업데이트
    updateLastMessage(currentMessage);
  };

  const HandleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMessage(e.target.value);
  }

  return (
    <div className="flex flex-col h-screen">
      <ul
        ref={chatScroll}
        className="flex-1 flex flex-col overflow-y-auto border-t-4 pt-4 px-2"
      >
        <li className="font-bold flex justify-center mb-4">
          {receiver}님이 채팅신청을 수락했습니다.
        </li>
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
          id="chatWrite"
          type="text"
          value={currentMessage}
          onChange={HandleInputChage}
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
