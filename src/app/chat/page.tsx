import Footer from "@/components/Footer";
import ChatList from "./ChatList";

export const metadata = {
  title : "채팅방 - 포포",
};


export default function ChatListPage() {

  return (
    <div>
      <ChatList />
      <Footer />
    </div>
  );
}