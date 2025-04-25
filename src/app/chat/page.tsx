"use client";

import Footer from "@/components/Footer";
import ChatList from "./ChatList";

// ❌ 삭제
// export const metadata = {
//   title: "채팅방 - 포포",
// };

export default function ChatListPage() {
  return (
    <div>
      <ChatList />
      <Footer />
    </div>
  );
}