"use client"

import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react"

type ConversationType = {
  id: string;
  participants: string[];
  lastMessage: string;
}
export default function ChatListPage() {

  const [conversation, setConversation] = useState<ConversationType[]>([]);

  const currentUser = "빠알간두볼";

  useEffect(()=>{
    const ChatList = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    const filterList = ChatList.filter(
      (room:ConversationType)=>
      Array.isArray(room.participants) 
      && room.participants.includes(currentUser)
  );
  
  setConversation(filterList);
  },[]);

  const deleteChatRoom = (roomId : string)=>{
    const updateChatRoom = conversation.filter((room)=>room.id !== roomId);
    setConversation(updateChatRoom);
    localStorage.setItem("chatRooms",
      JSON.stringify(updateChatRoom)
    )
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">채팅 목록</h1>
      <ul className="space-y-4">
        {conversation.map((room) => {
          const otherParticipant = room.participants.find((name) => name !== currentUser);

          return (
            <li key={room.id} className="flex justify-between items-center border p-2 rounded-lg">
              <Link href={`/chat/${room.id}?sender=${currentUser}&receiver=${otherParticipant}`}>
                <div>
                  <p className="font-bold">{otherParticipant}</p>
                  <p className="text-gray-500 text-sm">{room.lastMessage}</p>
                </div>
              </Link>
              <Button btnType="submit" onClick={()=>deleteChatRoom(room.id)} containerStyles="!text-base h-10 w-16 mr-3 ">
                나가기
              </Button>
            </li>
          );
        })}
      </ul>
      <Footer/>
    </div>
  );
}