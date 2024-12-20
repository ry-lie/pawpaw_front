"use client"
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Nav from "@/app/components/Nav/Nav";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { io, Socket } from "socket.io-client"


const chatSocket: Socket = io("ws://localhost:5000");

type chatMessagetype = {
  message: string;
};

export default function ChatRoomPage() {
  const [chatLog, setChatLog] = useState<chatMessagetype[]>([]);
  const chatRef = useRef<HTMLInputElement>(null);
  //const {data : session} = useSession();

  //메세지 전송
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (chatRef.current?.value) {
      chatSocket.emit("message", { message: chatRef.current.value });
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
  const methods = useForm();

  // const userNickname = session?.user?.email; //추후 nickname으로 변경할꺼

  return (
    <FormProvider {...methods}>
      <div className=" flex flex-col h-full justify-end items-center">
        <Nav />

        <ul className="w-full h-full flex flex-col overflow-y-auto">
          {chatLog.map((message, index) => (
            <li className="bg-primary p-2" key={index}>
              {message.message}
            </li>
          ))}
        </ul>

        <form
          className="w-full flex h-14" onSubmit={submitMessage}>
          <div className="flex">

          <input
          type="text"
          className="w-5/6 outline-none py-1 px-2 bg-green-900 text-xl text-white"
          ref={chatRef}
        />


            <Button title="전송"
              btnType="submit"
              containerStyles="h-5 w-20" />
          </div>
        </form>
      </div>
    </FormProvider>
  );

}