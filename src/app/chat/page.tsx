import Footer from "@/components/Footer";
import ChatRoomPage from "./[id]/page"

export const metadata = {
  title : "채팅방 - 포포",
};


export default function ChatListPage() {

  return (
    <div>
      <ChatRoomPage />
      <Footer />
    </div>
  );
}