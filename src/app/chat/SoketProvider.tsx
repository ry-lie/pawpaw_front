"use client";

import { createContext, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

export default function SocketProvider({ children }: { children: ReactNode }) {
  const socket = io("ws://localhost:5001/chats", {
    withCredentials: true,
    reconnectionAttempts: 3,
  });

  useEffect(() => {
    // 소켓 연결 처리
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("create-room-response", (data) => {
      console.log("create-room-response data:", data);
    });

    socket.on("join-response", (data) => {
      console.log("join-response data:", data);
    });

    socket.on("send-message-response", (data) => {
      console.log("send-message-response data:", data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
