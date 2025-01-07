"use client"

import { createContext, ReactNode, useEffect } from "react";
import { io, Socket } from "socket.io-client"

interface SocketContextProps {
    socket: Socket | null;
}

export const SocketContext = createContext<SocketContextProps>({
    socket: null,
});

export default function ChatLayout({ children }: { children: ReactNode }) {
    const socket = io("ws://kdt-react-node-1-team01.elicecoding.com:5001/chats", {
        withCredentials: true,
        reconnectionAttempts: 3,
    });

    useEffect(() => {
        //소캣연결
        socket.on("connect", () => {
            console.log("Socket connect", socket.id);
        });

        socket.on("create-room-response", (data) => {
            console.log("create-room-response data =>", data);
        });

        socket.on("join-response", (data) => {
            console.log("join-response data =>", data);
        });

        socket.on("send-message-response", (data) => {
            console.log("send-message-response data =>", data);
        });

        return () => {
            socket.disconnect();
        };
    }, []);
    return(
        <SocketContext.Provider value={{socket}}>
            <div>
                <main>
                    {children}
                </main>
            </div>
        </SocketContext.Provider>
    )

}