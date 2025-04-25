import { Socket } from "socket.io-client";
import { create } from "zustand";
import socket from "@/utils/socket";

type SocketStore = {
  socket: Socket;
  connect: () => void;
  disconnect: () => void;
};

const useSocketStore = create<SocketStore>((set) => ({
  socket,
  connect: () => {
    if (!socket.connected) {
      socket.connect();
    }
  },
  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },
}));

export default useSocketStore;