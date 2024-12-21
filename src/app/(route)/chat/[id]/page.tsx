"use client"
import Button from "@/app/components/Button";
import Nav from "@/app/components/Nav/Nav";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { io, Socket } from "socket.io-client"

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

  //const {data : session} = useSession();

  //메세지 전송
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatRef.current?.value && nickname) {
      chatSocket.emit("message", { message: chatRef.current.value, sender: nickname });
      chatRef.current.value = "";
    }
  };

  //메세지 받기
  const getMessage = (data: chatMessagetype) => {
    setChatLog((prev) => [...prev, data]);
  }

  useEffect(() => {
    chatSocket.on("message", getMessage);
    return () => {
      chatSocket.off("message", getMessage);
    }
  }, []);

  useEffect(() => {
    if (chatScroll.current) {
      chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
    }
  }, [chatLog])

  const methods = useForm();

  const submitNickname = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickname)
      setIsNicknameSet(true);
  }

  // const userNickname = session?.user?.email; //추후 nickname으로 변경할꺼

  return (
    <FormProvider {...methods}>
      <div className=" flex flex-col h-screen justify-end items-center">
        <Nav />

        {!isNicknameSet ? (
          <form className="flex w-full h-14" onSubmit={submitNickname}>
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary" />
            <Button
              title="닉네임"
              btnType="submit"
              containerStyles="h-10 w-14 ml-2" />
          </form>
        ) : (<>

          <ul
            ref={chatScroll}
            className="w-full h-full flex flex-col overflow-y-auto mt-12 border-t-4 border-green-800"
          >
            {chatLog.map((message, index) => (
              <li
                className={`m-2 rounded-2xl p-3 ${message.sender === nickname ? "bg-primary ml-auto" : "bg-stroke_gray mr-auto"}`}
                key={index}
              >
                <strong>{message.sender}:</strong> {message.message}
              </li>
            ))}
          </ul>

          <form
            className="w-full flex h-14" onSubmit={submitMessage}>
            <div className="flex w-full">
              <div className="flex h-15 w-full p-1 bg-medium_gray">

                <input
                  type="text"
                  className="w-full border border-stroke_gray p-2 rounded-md shadow-sm focus:border-primary focus:ring-primary"
                  ref={chatRef}
                />

                <Button title="전송"
                  btnType="submit"
                  containerStyles="h-10 w-14 ml-2" />

              </div>
            </div>
          </form>
        </>)}
      </div>
    </FormProvider>
  );

}