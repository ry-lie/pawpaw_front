"use client"
import Nav from "@/app/components/Nav/Nav";
import Link from "next/link";
import { useEffect, useState } from "react"

type ConversationType = {
  id : string;
  name : string;
  lastMessage : string;
}
export default function ChatListPage() {

  const[conversation, setConversation] = useState<ConversationType[]>([]);

  useEffect(()=>{
    setConversation([
      {id : "1", name : "사용자 1", lastMessage : "ㅎㅇ"},
      {id : "2", name : "사용자 2", lastMessage : "ㅎㅇ"}
    ]);
  },[])
  return (
    <div>
      <Nav/>
      <ul>
        {conversation.map((room)=>(
          <li key = {room.id}>
            <Link href={`/chat/${room.id}`}>
            <div>{room.id}</div>
            <div>{room.lastMessage}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}