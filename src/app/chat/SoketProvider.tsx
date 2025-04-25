"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
});

const socket_url = process.env.NEXT_PUBLIC_SOCKET_URL;

export default function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // ✅ 클라이언트에서만 실행되도록 io 호출!
    const newSocket = io(socket_url, {
      withCredentials: true,
      reconnectionAttempts: 3,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("create-room-response", (data) => {
      console.log("create-room-response data:", data);
    });

    newSocket.on("join-response", (data) => {
      console.log("join-response data:", data);
    });

    newSocket.on("send-message-response", (data) => {
      console.log("send-message-response data:", data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}