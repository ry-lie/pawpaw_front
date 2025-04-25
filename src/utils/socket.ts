// src/utils/socket.ts
import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

let socket: Socket;

// 클라이언트에서만 소켓 연결
if (typeof window !== "undefined") {
  socket = io(SERVER_URL as string, {
    transports: ["websocket"],
    withCredentials: true,
  });
} else {
  // 서버에서는 빈 객체로 대체 (사용되지 않도록 처리)
  socket = {} as Socket;
}

export default socket;